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

import {
  nativeThreadId,
  selectAutoApprovedPermissionOption,
  selectPermissionOptionId,
} from "./adapter.helpers.ts";
import type { AcpAdapterV2UserInputRequest } from "./adapter.helpers.ts";

export const bindWireAcpRuntimeHandlers = (ctx: any): any =>
  Effect.fnUntraced(function* (
    targetRuntime: AcpSessionRuntime.AcpSessionRuntime["Service"],
    handlerGeneration: number,
    handlerOptions: {
      readonly sessionUpdates?: boolean;
      readonly terminals?: boolean;
      readonly mcp?: boolean;
      readonly scope?: Scope.Scope;
    } = {},
  ) {
    const {
      acknowledgeNativeResponse,
      activeContext,
      activeSessionId,
      activeTurn,
      adoptLateSessionSetup,
      applyLateBackgroundMutation,
      awaitRequestTurn,
      backgroundCommandTurn,
      beginApprovalRequest,
      captureProposedPlan,
      clientPolicyContext,
      clientPolicyGrants,
      finalizeTurn,
      finishRegisteredBackgroundTool,
      finishSubagentFromNotice,
      flavor,
      followsAgentWorkState,
      handleSessionUpdate,
      handledBackgroundTaskIdsInActiveTurn,
      holdingAgentRequest,
      input,
      lastProposedPlanMarkdown,
      lateSessionSetup,
      latestRuntimePolicy,
      markSessionCompacted,
      nativeBuildConfigurationBySessionId,
      nextElicitationOrdinal,
      options,
      pendingRuntimeRequests,
      postSettleContinuationEnabled,
      projectAcpRuntimeSessionUpdate,
      recordWakeReport,
      refreshModelSwitchCapability,
      registerNativeResponseAcknowledgement,
      reportProviderRetry,
      requestUserInputWithAdmission,
      runRuntimeCallbackAtGeneration,
      runtime,
      runtimeMcpBridge,
      runtimeScope,
      sessionScope,
      stoppedRunQuarantine,
      toolOutputText,
      unreadToolCalls,
      wireAcpRuntimeHandlers,
      wireAcpRuntimeMcpHandlers,
      wireAcpRuntimeTerminalHandlers,
    } = pickBindCtx(ctx);

    yield* targetRuntime.getEvents().pipe(
      Stream.runForEach((event) => {
        if (event._tag === "EventStreamBarrier") {
          return Deferred.succeed(event.acknowledge, undefined).pipe(Effect.asVoid);
        }
        return runRuntimeCallbackAtGeneration(
          handlerGeneration,
          Effect.andThen(
            event._tag === "ConfigOptionsUpdated"
              ? refreshModelSwitchCapability
              : event._tag === "SessionSetupAdopted"
                ? Effect.suspend(() => {
                    const adopt = adoptLateSessionSetup(
                      targetRuntime,
                      event.result,
                      nativeBuildConfigurationBySessionId.get(event.result.sessionId),
                    );
                    if (lateSessionSetup.openSessionConfigured) return adopt;
                    lateSessionSetup.pending = adopt;
                    return Effect.void;
                  })
                : Effect.void,
            flavor.onSessionEvent?.(event, input.runtimePolicy.cwd ?? process.cwd()) ?? Effect.void,
          ),
        ).pipe(Effect.asVoid);
      }),
      Effect.forkIn(handlerOptions.scope ?? runtimeScope ?? sessionScope),
    );
    const requestUserInput = (
      request: AcpAdapterV2UserInputRequest,
      requestContext: EffectAcpProtocol.AcpRequestContext,
    ) =>
      requestUserInputWithAdmission(
        handlerGeneration,
        Effect.succeed(request),
        requestContext.requestId,
      );
    const clientFileSystem = flavor.clientFileSystem;
    if (clientFileSystem !== undefined) {
      yield* targetRuntime.handleReadTextFile((request) =>
        clientPolicyContext.pipe(
          Effect.flatMap(({ policy }) => clientFileSystem.readTextFile(request, policy.cwd)),
        ),
      );
      const writeTextFile = clientFileSystem.writeTextFile;
      if (writeTextFile !== undefined) {
        yield* targetRuntime.handleWriteTextFile((request) =>
          clientPolicyContext.pipe(
            Effect.flatMap(({ policy }) => writeTextFile(request, policy.cwd)),
          ),
        );
      }
    }
    if (handlerOptions.mcp !== false) {
      yield* wireAcpRuntimeMcpHandlers(targetRuntime, runtimeMcpBridge);
    }
    if (handlerOptions.terminals !== false) {
      yield* wireAcpRuntimeTerminalHandlers(targetRuntime);
    }
    if (handlerOptions.sessionUpdates !== false) {
      yield* targetRuntime.handleSessionUpdate((rawNotification) =>
        projectAcpRuntimeSessionUpdate(handlerGeneration, rawNotification),
      );
    }
    yield* targetRuntime.handleRequestPermission((nativeParams, requestContext) =>
      Effect.gen(function* () {
        if (
          postSettleContinuationEnabled &&
          flavor.wakeOnDetachedRequest &&
          nativeParams.sessionId !== (yield* Ref.get(activeSessionId))
        ) {
          return { outcome: { outcome: "cancelled" } } as const;
        }
        const trackedTurn = yield* Ref.get(activeTurn);
        const params =
          trackedTurn !== null && nativeParams.sessionId === (yield* Ref.get(activeSessionId))
            ? withTrackedPermissionToolCall(
                nativeParams,
                trackedTurn.tools.get(nativeParams.toolCall.toolCallId),
              )
            : nativeParams;
        const transportRequestId = requestContext.requestId;
        const permissionQuestion = flavor.extractPermissionQuestion?.(params);
        if (permissionQuestion !== undefined) {
          const userInput = yield* requestUserInputWithAdmission(
            handlerGeneration,
            Effect.succeed({
              nativeItemId: `${params.sessionId}:question:${params.toolCall.toolCallId}`,
              nativeMethod: "session/request_permission",
              nativeRequestId: params.toolCall.toolCallId,
              nativeSessionId: params.sessionId,
              questions: [permissionQuestion.question],
            }),
            transportRequestId,
          );
          const response =
            userInput.answers === null ? undefined : permissionQuestion.respond(userInput.answers);
          yield* userInput.acknowledgeNativeResponse;
          return response ?? ({ outcome: { outcome: "cancelled" } } as const);
        }
        const answerableParams =
          flavor.answerablePermissionOptions === undefined
            ? params
            : { ...params, options: flavor.answerablePermissionOptions(params) };
        const dispositionFor = (
          policy: ProviderAdapter.ProviderAdapterV2RuntimePolicy,
          request: EffectAcpSchema.RequestPermissionRequest,
        ) => (flavor.permissionDisposition ?? acpPermissionDisposition)(policy, request);
        // Kiro leaves the kind off the permission request for a `tool_call` it already
        // sent, so policy takes it and the call's changed paths from that tool. Tool ids
        // are only unique within a session and these are the root session's tools, so
        // callers pass no tool for another session's request.
        const policyRequest = (knownTool: AcpToolCallState | undefined) =>
          withTrackedChangedPaths(
            params.toolCall.kind == null && knownTool?.kind !== undefined
              ? { ...params, toolCall: { ...params.toolCall, kind: knownTool.kind } }
              : params,
            unreadToolCalls.has(params.sessionId, params.toolCall.toolCallId)
              ? withUnknownChangedPaths(knownTool, params.toolCall.toolCallId)
              : knownTool,
          );
        const arrivalTool =
          trackedTurn !== null && params.sessionId === (yield* Ref.get(activeSessionId))
            ? trackedTurn.tools.get(params.toolCall.toolCallId)
            : undefined;
        if (
          (followsAgentWorkState &&
            dispositionFor(latestRuntimePolicy, policyRequest(arrivalTool)) === "ask") ||
          (postSettleContinuationEnabled && flavor.wakeOnDetachedRequest)
        ) {
          if (!(yield* awaitRequestTurn(handlerGeneration)))
            return { outcome: { outcome: "cancelled" } } as const;
        }
        const admitted = yield* runRuntimeCallbackAtGeneration(
          handlerGeneration,
          Effect.gen(function* () {
            const context = followsAgentWorkState
              ? yield* Ref.get(activeTurn)
              : yield* activeContext;
            const disposition = dispositionFor(
              context?.input.runtimePolicy ?? latestRuntimePolicy,
              policyRequest(
                params.sessionId === (yield* Ref.get(activeSessionId))
                  ? context?.tools.get(params.toolCall.toolCallId)
                  : undefined,
              ),
            );
            if (disposition === "allow") {
              const optionId = selectAutoApprovedPermissionOption(answerableParams);
              return {
                _tag: "Immediate" as const,
                response:
                  optionId === undefined
                    ? ({ outcome: { outcome: "cancelled" } } as const)
                    : ({ outcome: { outcome: "selected", optionId } } as const),
              };
            }
            if (disposition === "deny") {
              const optionId = selectPermissionOptionId(answerableParams, "decline");
              return {
                _tag: "Immediate" as const,
                response:
                  optionId === undefined
                    ? ({ outcome: { outcome: "cancelled" } } as const)
                    : ({ outcome: { outcome: "selected", optionId } } as const),
              };
            }
            return {
              _tag: "Pending" as const,
              pending: yield* beginApprovalRequest(
                yield* activeContext,
                params,
                handlerGeneration,
                transportRequestId,
              ),
            };
          }),
        );
        if (Option.isNone(admitted)) {
          return yield* Effect.never;
        }
        if (admitted.value._tag === "Immediate") {
          const response = admitted.value.response;
          const checked = yield* runRuntimeCallbackAtGeneration(
            handlerGeneration,
            Effect.gen(function* () {
              const nativeResponseAcknowledgement = yield* Deferred.make<
                void,
                EffectAcpErrors.AcpError
              >();
              yield* registerNativeResponseAcknowledgement(
                handlerGeneration,
                transportRequestId,
                nativeResponseAcknowledgement,
              );
              return response;
            }),
          );
          return Option.isSome(checked) ? checked.value : yield* Effect.never;
        }
        const {
          context,
          decision: pendingDecision,
          requestId,
          transportRequestId: pendingTransportRequestId,
        } = admitted.value.pending;
        const parsedPermission = parsePermissionRequest(params);
        const answered = yield* Deferred.await(pendingDecision).pipe(
          Effect.ensuring(
            runRuntimeCallbackAtGeneration(
              handlerGeneration,
              Ref.update(pendingRuntimeRequests, (current) => {
                const updated = new Map(current);
                updated.delete(String(requestId));
                return updated;
              }),
            ).pipe(Effect.asVoid),
          ),
        );
        // A card that never offered "this session" (Kiro's, whose
        // allow_always saves a workspace rule) cannot be answered with
        // it by a stale client or a hand-made respond call.
        const offeredOptions = flavor.approvalOptions?.(params);
        const decision =
          answered === "acceptForSession" &&
          offeredOptions !== undefined &&
          !offeredOptions.some((option) => option.decision === "acceptForSession")
            ? "accept"
            : answered;
        if (decision === "accept" || decision === "acceptForSession") {
          clientPolicyGrants.recordApproval({
            toolKind: parsedPermission.kind,
            scope: decision === "acceptForSession" ? "session" : "turn",
            turnKey: String(context.providerTurnId),
          });
        }
        const response = (() => {
          if (decision === "cancel") {
            return { outcome: { outcome: "cancelled" } } as const;
          }
          const optionId = selectPermissionOptionId(answerableParams, decision);
          return optionId === undefined
            ? ({ outcome: { outcome: "cancelled" } } as const)
            : ({ outcome: { outcome: "selected", optionId } } as const);
        })();
        const checked = yield* runRuntimeCallbackAtGeneration(
          handlerGeneration,
          Effect.succeed(response),
        );
        if (Option.isNone(checked)) return yield* Effect.never;
        yield* acknowledgeNativeResponse(handlerGeneration, pendingTransportRequestId);
        return checked.value;
      }).pipe(
        Effect.mapError(
          (cause) =>
            new EffectAcpErrors.AcpTransportError({
              detail: "Failed to handle an ACP permission request",
              cause,
            }),
        ),
        holdingAgentRequest(handlerGeneration),
      ),
    );
    yield* targetRuntime.handleElicitation((params, requestContext) =>
      Effect.gen(function* () {
        const transportRequestId = requestContext.requestId;
        if (
          params.mode === "form" &&
          (unknownRecord(params._meta)?.codex_approval_kind === "mcp_tool_call" ||
            transportRequestId.startsWith("mcp_tool_call_approval_"))
        ) {
          const mcpApprovalDisposition = yield* runRuntimeCallbackAtGeneration(
            handlerGeneration,
            Effect.gen(function* () {
              const context = yield* activeContext;
              const disposition = acpMcpToolApprovalElicitationDisposition(
                context.input.runtimePolicy,
                params,
                transportRequestId,
              );
              if (disposition === undefined || disposition === "ask") {
                return disposition;
              }
              const nativeResponseAcknowledgement = yield* Deferred.make<
                void,
                EffectAcpErrors.AcpError
              >();
              yield* registerNativeResponseAcknowledgement(
                handlerGeneration,
                transportRequestId,
                nativeResponseAcknowledgement,
              );
              return disposition;
            }),
          );
          if (Option.isNone(mcpApprovalDisposition)) return yield* Effect.never;
          if (mcpApprovalDisposition.value === "allow") {
            return { action: "accept", content: {} } as const;
          }
        }
        if (
          params.mode === "url" &&
          "url" in params &&
          typeof params.url === "string" &&
          "elicitationId" in params &&
          typeof params.elicitationId === "string"
        ) {
          const { elicitationId, url } = params;
          const admitted = yield* runRuntimeCallbackAtGeneration(
            handlerGeneration,
            Effect.gen(function* () {
              const nativeResponseAcknowledgement = yield* Deferred.make<
                void,
                EffectAcpErrors.AcpError
              >();
              yield* registerNativeResponseAcknowledgement(
                handlerGeneration,
                transportRequestId,
                nativeResponseAcknowledgement,
              );
              const accepted = yield* (
                flavor.onUrlElicitation?.({
                  elicitationId,
                  url,
                  message: params.message,
                }) ?? Effect.succeed(false)
              );
              return accepted ? ({ action: "accept" } as const) : ({ action: "decline" } as const);
            }),
          );
          if (Option.isNone(admitted)) return yield* Effect.never;
          return admitted.value;
        }
        if (params.mode !== "form" || !("requestedSchema" in params)) {
          return { action: "decline" } as const;
        }
        const nativeForm = flavor.extractElicitationForm?.(params);
        const parsedForm =
          nativeForm === undefined
            ? parseElicitationForm(params.requestedSchema, params.message, {
                allowOther: unknownRecord(params._meta)?.["cognition.ai/allowOther"] === true,
              })
            : undefined;
        const form: ElicitationQuestionForm | undefined =
          nativeForm !== undefined
            ? withOptionalChoices(nativeForm, params.requestedSchema)
            : parsedForm === undefined
              ? undefined
              : {
                  questions: parsedForm.questions,
                  respond: (answers) => {
                    const content = parsedForm.content(answers);
                    return content === undefined
                      ? { action: "cancel" }
                      : { action: "accept", content };
                  },
                };
        if (form === undefined) return { action: "decline" } as const;
        const elicitationScopeId =
          "sessionId" in params ? params.sessionId : `request:${params.requestId}`;

        const userInput = yield* requestUserInputWithAdmission(
          handlerGeneration,
          Effect.gen(function* () {
            const ordinal = yield* Ref.getAndUpdate(
              nextElicitationOrdinal,
              (current) => current + 1,
            );
            const nativeRequestId = `${elicitationScopeId}:elicitation:${ordinal}`;
            return {
              nativeItemId: nativeRequestId,
              nativeRequestId,
              questions: form.questions,
            };
          }),
          transportRequestId,
        );
        const response =
          userInput.answers === null
            ? ({ action: "cancel" } as const)
            : form.respond(userInput.answers);
        yield* userInput.acknowledgeNativeResponse;
        return response;
      }).pipe(holdingAgentRequest(handlerGeneration)),
    );
    if (flavor.registerExtensions !== undefined) {
      yield* flavor.registerExtensions({
        runtime: targetRuntime,
        reportProviderRetry: (notice) =>
          runRuntimeCallbackAtGeneration(handlerGeneration, reportProviderRetry(notice)).pipe(
            Effect.asVoid,
          ),
        requestUserInput,
        captureProposedPlan,
        lastProposedPlanMarkdown,
        finishSubagent: (notice) =>
          runRuntimeCallbackAtGeneration(
            handlerGeneration,
            Effect.gen(function* () {
              if (yield* Ref.get(stoppedRunQuarantine)) return;
              if ((yield* Ref.get(activeSessionId)) !== notice.sessionId) return;
              yield* finishSubagentFromNotice(notice);
            }),
          ).pipe(Effect.asVoid),
        markSessionCompacted: (sessionId) =>
          runRuntimeCallbackAtGeneration(handlerGeneration, markSessionCompacted(sessionId)).pipe(
            Effect.asVoid,
          ),
        reportForegroundWork: (notice) =>
          runRuntimeCallbackAtGeneration(
            handlerGeneration,
            Effect.gen(function* () {
              if (yield* Ref.get(stoppedRunQuarantine)) return;
              if ((yield* Ref.get(activeSessionId)) === notice.sessionId) {
                ctx.rootForegroundWork = notice.state;
              }
              const context = yield* Ref.get(activeTurn);
              if (
                context === null ||
                context.finalized ||
                context.interrupted ||
                context.nativeThreadId !== notice.sessionId
              )
                return;
              if (notice.state === "running") {
                context.workAccepted = true;
              } else if (context.workAccepted) {
                yield* Deferred.succeed(context.foregroundIdle, undefined);
                yield* finalizeTurn(context, "completed");
              }
            }),
          ).pipe(Effect.asVoid),
        applyBackgroundTaskMutation: (incoming) =>
          runRuntimeCallbackAtGeneration(
            handlerGeneration,
            Effect.gen(function* () {
              if (yield* Ref.get(stoppedRunQuarantine)) return;
              if ((yield* Ref.get(activeSessionId)) !== incoming.sessionId) return;
              const context = yield* backgroundCommandTurn(incoming.taskId);
              let mutation = incoming;
              if (
                incoming.status !== "running" &&
                context !== undefined &&
                (incoming.report?.kind === "command" ||
                  context.backgroundCommands.has(incoming.taskId))
              ) {
                const previous = context.backgroundCommands.get(incoming.taskId);
                const toolCallId = context.toolCallIdsByBackgroundTaskId.get(incoming.taskId);
                const tool = toolCallId === undefined ? undefined : context.tools.get(toolCallId);
                const output =
                  incoming.output ??
                  previous?.output ??
                  (tool === undefined ? undefined : toolOutputText(tool));
                // Missing exit codes decode as success; they cannot undo a known failure.
                const completion = {
                  status: previous?.status === "failed" ? "failed" : incoming.status,
                  ...(output === undefined ? {} : { output }),
                };
                context.backgroundCommands.set(incoming.taskId, completion);
                mutation = { ...incoming, ...completion };
              }
              if (
                mutation.status !== "running" &&
                mutation.report !== undefined &&
                !(yield* Ref.get(handledBackgroundTaskIdsInActiveTurn)).has(mutation.taskId)
              ) {
                yield* recordWakeReport(mutation.taskId, {
                  ...mutation.report,
                  outcome: mutation.status,
                });
              }
              yield* applyLateBackgroundMutation(mutation.sessionId, mutation);
              if (mutation.status !== "running") {
                yield* finishRegisteredBackgroundTool({
                  taskId: mutation.taskId,
                  status: mutation.status,
                  ...(mutation.output === undefined ? {} : { output: mutation.output }),
                });
              }
            }),
          ).pipe(Effect.asVoid),
      });
    }
  });
