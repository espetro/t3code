// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of adapter.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
import { pickScriptcBindCtx } from "./scriptcBindScope.ts";
import * as Path from "effect/Path";
import * as Option from "effect/Option";
import * as NodeURL from "node:url";

import {
  AbsolutePath,
  Agent,
  Form,
  Location,
  Model,
  Permission,
  Provider,
  Session,
  SessionMessage,
  Skill,
  type OpenCodeEvent,
} from "@opencode/client/effect";
import * as Shell from "@opencode/schema/shell";
import { Mcp } from "@opencode/schema/mcp";
import {
  PROVIDER_SEND_TURN_MAX_IMAGE_BYTES,
  isOrchestrationV2WorkActive,
  parseGoalCommand,
  type ChatAttachment,
  type OrchestrationV2AppThread,
  type OrchestrationV2ConversationMessage,
  type OrchestrationV2ExecutionNode,
  type OrchestrationV2ProviderCapabilities,
  type OrchestrationV2ProviderFailure,
  type OrchestrationV2ProviderRetry,
  type OrchestrationV2ProviderSession,
  type OrchestrationV2ProviderThread,
  type OrchestrationV2ProviderTurn,
  type OrchestrationV2PlanStep,
  type OrchestrationV2RuntimeRequest,
  type OrchestrationV2Subagent,
  type OrchestrationV2TurnItem,
  type OrchestrationV2UserInputQuestion,
  type MessageId,
  type ModelSelection,
  type PlanId,
  type ProviderApprovalDecision,
  type ProviderInstanceId,
  type RunId,
  type RuntimeRequestId,
} from "@t3tools/contracts";
import type * as Cause from "effect/Cause";
import * as DateTime from "effect/DateTime";
import * as Deferred from "effect/Deferred";
import * as Digest from "effect/crypto/Digest";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Hex from "effect/encoding/Hex";
import * as Exit from "effect/Exit";
import * as P from "effect/Predicate";
import * as FileSystem from "effect/FileSystem";
import * as Queue from "effect/Queue";
import * as Schedule from "effect/Schedule";
import * as Scope from "effect/Scope";
import * as Schema from "effect/Schema";
import * as Semaphore from "effect/Semaphore";
import * as Stream from "effect/Stream";

import * as ProviderHost from "@t3tools/provider-core/server/ProviderHost";
import * as OpenCode2Client from "./OpenCode2Client.ts";
import * as OpenCode2Server from "./OpenCode2Server.ts";
import * as OpenCodeRuntime from "../OpenCodeRuntime.ts";
import { readableProviderErrorMessage } from "../providerErrorMessage.ts";
import * as McpProviderSessions from "@t3tools/provider-core/server/McpProviderSessions";
import { buildRuntimeInstructions } from "@t3tools/provider-core/server/runtimeInstructions";
import { t3OrchestrationSystemPrompt } from "@t3tools/provider-core/server/orchestrationInstructions";
import { SKILL_MENTION_PATTERN } from "@t3tools/shared/composerInlineTokens";
import { HTML_RENDER_TOOL_NAME } from "@t3tools/shared/htmlRender";
import {
  htmlRenderFromToolItem,
  SEND_TO_USER_TOOL_NAME,
  sentMessageFromToolItem,
} from "@t3tools/shared/toolOutput";
import { compareSemverVersions } from "@t3tools/shared/semver";
import * as KeyedLock from "@t3tools/shared/KeyedLock";
import { modelSelectionsEqual } from "@t3tools/shared/model";
import { causeErrorTag } from "@t3tools/shared/observability";

import {
  isProviderNativeImageAttachment,
  providerMessageTextWithAttachmentPaths,
} from "@t3tools/provider-core/server/attachmentPrompt";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import {
  backgroundWorkNotification,
  type BackgroundWorkReport,
} from "@t3tools/provider-core/server/notification";
import * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import {
  makeProviderFailure,
  makeProviderRetryTurnItem,
} from "@t3tools/provider-core/server/failure";
import {
  makeSubagentChildThread,
  makeSubagentConversationArtifacts,
  subagentThreadTitle,
} from "@t3tools/provider-core/server/subagentProjection";
import * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";
import { turnScopedSelectionTransition } from "@t3tools/provider-core/server/selectionTransition";
import { OPENCODE_PROVIDER, openCodePermissionRequestKind } from "../adapter.ts";
import {
  openCodeCodeModeHtmlRenders,
  openCodeCodeModeSentMessages,
  openCodeCommandFailed,
  openCodeToolTurnItem,
  stripOpenCodeReturnedSentMessage,
} from "../toolItems.ts";
import { bindOnTurnEvent } from "./adapter.onTurnEvent.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindRoute = (ctx: any) =>
Effect.fnUntraced(function* (
      event: OpenCode2Client.OpenCode2StreamEvent,
      sessionId: string | undefined,
      held = false,
    ) {
    const {
      cancelled,
      client,
      data,
      decodeGoal,
      delivered,
      emitDeliveredReport,
      emitExternalPrompt,
      emitProviderThread,
      endExecution,
      endIfSettled,
      executionEnd,
      form,
      held,
      id,
      inboxID,
      isOwnPrompt,
      item,
      message,
      model,
      now,
      onAsked,
      onReport,
      onTurnEvent,
      onWake,
      own,
      pending,
      prompt,
      refreshGoal,
      request,
      result,
      selected,
      session,
      sessionID,
      sessionId,
      settleRequest,
      startChildTurn,
      status,
      stopped,
      subagent,
      supportsNativeGoals,
      takeReports,
      threads,
      updateGoal,
      updatedAt,
      values,
      wake,
      withReportedModel
    } = pickScriptcBindCtx(ctx);

      const ended =
        !held && (event.type === "unreadable.execution.ended" || executionEnd(event.type))
          ? threads.get(sessionId ?? "")
          : undefined;
      if (ended?.unsettled === true) {
        ended.unsettled = false;
        return;
      }
      if (event.type === "unreadable.execution.started") {
        const turn = threads.get(event.sessionID)?.active;
        if (turn !== undefined) {
          turn.awaitingStart = false;
          turn.heldEnd = undefined;
          return;
        }
      }
      if (event.type === "unreadable.execution.ended") {
        const state = threads.get(event.sessionID);
        const turn = state?.active;
        if (state === undefined || turn === undefined || turn.awaitingStart) return;
        return yield* endExecution(
          state,
          turn,
          event.executionType === "session.execution.succeeded"
            ? { status: turn.interrupted ? "interrupted" : "completed" }
            : event.executionType === "session.execution.interrupted"
              ? { status: "interrupted" }
              : {
                  status: "failed",
                  failure: makeProviderFailure({
                    message: "OpenCode ended the turn with an error this version cannot read.",
                    class: "provider_error",
                  }),
                },
        );
      }
      if (event.type === "permission.asked") {
        return yield* onAsked({ type: "permission", request: event.data });
      }
      if (event.type === "form.created")
        return yield* onAsked({ type: "form", form: event.data.form });
      if (
        event.type === "permission.replied" ||
        event.type === "form.replied" ||
        event.type === "form.cancelled"
      ) {
        const nativeId = event.type === "permission.replied" ? event.data.requestID : event.data.id;
        const entry = [...pending.values()].find((candidate) => candidate.native.id === nativeId);
        if (entry === undefined || entry.answering) return;
        const answered =
          event.type === "form.replied" ||
          (event.type === "permission.replied" && event.data.reply !== "reject");
        return yield* settleRequest(entry, answered ? "resolved" : "cancelled");
      }
      if (sessionId === undefined) return;
      const state = threads.get(sessionId);
      if (state === undefined) return;
      if (event.type === "rpc.opencode.goal.changed") {
        if (!supportsNativeGoals()) return;
        const goal = yield* decodeGoal(event.data["goal"]).pipe(Effect.result);
        if (goal._tag === "Failure") {
          yield* Effect.logWarning(
            "Could not decode an OpenCode goal update; refreshing its state.",
          );
          return yield* refreshGoal(state);
        }
        yield* updateGoal(state, goal.success);
        if (state.active !== undefined) yield* endIfSettled(state, state.active);
        return;
      }
      if (event.type === "session.model.selected" || event.type === "session.step.started") {
        if (event.type === "session.model.selected") state.model = event.data.model;
        const providerThread = withReportedModel(state.providerThread, event.data.model);
        if (providerThread !== state.providerThread) {
          state.providerThread = { ...providerThread, updatedAt: yield* DateTime.now };
          yield* emitProviderThread(state);
        }
      }
      if (
        event.type === "session.inbox.enqueued" &&
        state.subagent !== undefined &&
        state.active === undefined
      ) {
        state.subagent.queued ??= event.data.inboxID;
      }
      if (event.type === "session.inbox.enqueued" && event.data.item.type === "synthetic") {
        return yield* onReport(state, event.data.inboxID, event.data.item.payload);
      }
      if (event.type === "session.inbox.cancelled" || event.type === "session.inbox.delivered") {
        const report = state.reports.get(event.data.inboxID);
        state.reports.delete(event.data.inboxID);
        const external = state.externalPrompts.get(event.data.inboxID);
        state.externalPrompts.delete(event.data.inboxID);
        const turn = state.active;
        if (turn !== undefined && turn.steers.delete(event.data.inboxID)) {
          turn.settledInbox.add(event.data.inboxID);
          if (event.type === "session.inbox.cancelled") yield* endIfSettled(state, turn);
        } else if (
          event.type === "session.inbox.delivered" &&
          external !== undefined &&
          turn !== undefined
        ) {
          yield* emitExternalPrompt(state, turn, event.data.inboxID, external.text);
        } else if (
          event.type === "session.inbox.delivered" &&
          report !== undefined &&
          turn !== undefined
        ) {
          yield* emitDeliveredReport(state, turn, event.data.inboxID, report.report);
        }
        return;
      }
      // No T3 turn existed while a wake held these, so its user items came from another client.
      if (
        event.type === "session.inbox.enqueued" &&
        event.data.item.type === "user" &&
        (state.active === undefined || (held && state.subagent === undefined))
      ) {
        const text = event.data.item.payload.text;
        if (state.subagent !== undefined) state.subagent.prompt ??= text;
        // T3's own prompts can be admitted after a failed submit ended their turn.
        else if (!isOwnPrompt(event.data.inboxID)) {
          state.externalPrompts.set(event.data.inboxID, {
            text,
            leads: !held && state.reports.size === 0,
          });
        }
        return;
      }
      const started =
        event.type === "session.execution.started" || event.type === "unreadable.execution.started";
      if (state.subagent !== undefined && state.active === undefined && started) {
        if ((yield* takeReports(state)).stopped) {
          state.subagent.queued = undefined;
          return;
        }
        return yield* startChildTurn(state);
      }
      const turn = state.active;
      if (turn === undefined) {
        if (started && state.subagent === undefined) return yield* onWake(state);
        return;
      }
      if (turn.awaitingStart) {
        if (event.type === "session.execution.started") turn.awaitingStart = false;
        return;
      }
      return yield* onTurnEvent(state, turn, event);
    });
