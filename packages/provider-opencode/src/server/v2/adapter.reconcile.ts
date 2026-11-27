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
import { bindRoute } from "./adapter.route.ts";
import { bindFinishTurn } from "./adapter.finishTurn.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindReconcile = (ctx: any) =>
Effect.fn("OpenCode2Adapter.reconcile")(function* () {
    const {
      INVENTORY_TIMEOUT,
      LOST_BACKGROUND,
      backfill,
      busy,
      callsAbove,
      cancelled,
      client,
      endExecution,
      failure,
      finishTurn,
      hasBackground,
      id,
      lock,
      make,
      message,
      onAsked,
      outcome,
      ownerOf,
      pending,
      recoverImages,
      requestTurn,
      rootOf,
      runningCalls,
      sessionScope,
      sessionsOf,
      settleCall,
      settleRequest,
      status,
      strays,
      subagent,
      syncRoster,
      threads,
      values
    } = pickScriptcBindCtx(ctx);

      // Read deepest sessions first; subagent turns end before their waiting parents.
      const running = [...threads]
        .filter(([, state]) => state.active !== undefined)
        .toSorted(([left], [right]) => callsAbove(right).length - callsAbove(left).length);
      const background = [...threads.values()].filter(
        (state) => state.subagent === undefined && hasBackground(state),
      );
      const marked = [...threads.values()].some((state) => state.unsettled);
      if (
        running.length === 0 &&
        background.length === 0 &&
        busy.size === 0 &&
        !marked &&
        strays.size === 0
      ) {
        return;
      }
      const active = { ...(yield* client.session.active()) };
      for (const sessionId of busy) if (!(sessionId in active)) busy.delete(sessionId);
      for (const state of threads.values()) {
        if (state.unsettled && !(state.sessionId in active)) state.unsettledStarted = true;
      }
      for (const childId of strays.keys()) if (!(childId in active)) strays.delete(childId);
      for (const [sessionId, state] of running) {
        const turn = state.active;
        if (turn === undefined) continue;
        turn.missedEvents = true;
        const ended = yield* backfill(sessionId, state);
        if (ended?.outcome === "missing") {
          delete active[Session.ID.make(sessionId)];
          busy.delete(sessionId);
        }
        yield* lock.withPermit(
          Effect.gen(function* () {
            if (state.active !== turn) return;
            if (sessionId in active) {
              turn.heldEnd = undefined;
              return;
            }
            if (ended?.outcome === "missing") {
              return yield* finishTurn(state, { status: "interrupted" }, "broken");
            }
            const terminal: TurnTerminal =
              ended?.outcome === "succeeded"
                ? { status: turn.interrupted ? "interrupted" : "completed" }
                : ended?.outcome === "failed"
                  ? {
                      status: "failed",
                      failure: makeProviderFailure({
                        message:
                          "OpenCode ended the turn with an error while T3 Code was reconnecting.",
                        class: "provider_error",
                      }),
                    }
                  : { status: "interrupted" };
            yield* endExecution(state, turn, terminal);
          }),
        );
      }
      for (const state of threads.values()) {
        yield* lock
          .withPermit(recoverImages(state).pipe(Effect.timeout(INVENTORY_TIMEOUT)))
          .pipe(Effect.ignore({ log: true }));
      }
      yield* lock.withPermit(
        Effect.gen(function* () {
          for (const state of background) {
            for (const call of runningCalls(state)) {
              const child = call.child?.sessionId;
              if (child === undefined || !(child in active)) {
                yield* settleCall(call, "interrupted", LOST_BACKGROUND);
              }
            }
            const sessions = sessionsOf(state);
            for (const session of sessions) {
              discardWakes(session, session.wakes.splice(0));
              session.reports.clear();
            }
            for (const session of sessions.toReversed()) yield* syncRoster(session);
          }
          // Stopped off the lock this reconcile holds; one still running waits for a Stop.
          for (const thread of new Set([...strays.values()].map(rootOf))) {
            yield* Effect.forkIn(stopStrays(thread), sessionScope);
          }
        }),
      );
      const listed = new Map<string, Set<string>>();
      for (const sessionId of Object.keys(active)) {
        const owner = ownerOf(sessionId);
        if (owner === undefined) continue;
        const turn = requestTurn(sessionId)?.turn;
        // Replies may settle during these reads; an older snapshot must not ask again.
        const known = new Set([...pending.values()].map((entry) => entry.native.id));
        const sessionID = Session.ID.make(sessionId);
        const [permissions, forms] = yield* Effect.all([
          client.permission.list({ sessionID }),
          client.session.form.list({ sessionID }),
        ]);
        yield* lock.withPermit(
          Effect.gen(function* () {
            if (ownerOf(sessionId) !== owner || requestTurn(sessionId)?.turn !== turn) return;
            listed.set(sessionId, new Set([...permissions, ...forms].map((request) => request.id)));
            const shown = new Set([...pending.values()].map((entry) => entry.native.id));
            for (const request of permissions) {
              if (!shown.has(request.id) && !known.has(request.id))
                yield* onAsked({ type: "permission", request });
            }
            for (const form of forms) {
              if (!shown.has(form.id) && !known.has(form.id))
                yield* onAsked({ type: "form", form });
            }
          }),
        );
      }
      yield* lock.withPermit(
        Effect.gen(function* () {
          for (const entry of Array.from(pending.values())) {
            if (listed.get(entry.sessionId)?.has(entry.native.id) !== true) {
              yield* settleRequest(entry, "cancelled");
            }
          }
        }),
      );
    });
