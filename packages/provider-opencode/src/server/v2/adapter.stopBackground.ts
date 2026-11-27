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
import { bindReconcile } from "./adapter.reconcile.ts";
import { bindBackfill } from "./adapter.backfill.ts";
import { bindSubmit } from "./adapter.submit.ts";
import { bindHandleEvent } from "./adapter.handleEvent.ts";
import { bindAttachChild } from "./adapter.attachChild.ts";
import { bindStartChildTurn } from "./adapter.startChildTurn.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindStopBackground = (ctx: any) =>
Effect.fnUntraced(function* (state: ThreadState) {
    const {
      INTERRUPT_TIMEOUT,
      announced,
      answer,
      background,
      busy,
      child,
      childId,
      client,
      discardWakes,
      exit,
      id,
      info,
      lock,
      make,
      markUnsettled,
      own,
      runningCalls,
      session,
      sessionID,
      sessionId,
      sessionsOf,
      settleCall,
      shell,
      shells,
      state,
      status,
      stopShell,
      stopStrays,
      syncRosterAncestors,
      values,
      wake
    } = pickScriptcBindCtx(ctx);

      for (const [id, shell] of shells) {
        if (shell.running && sessionsOf(state).includes(shell.state))
          yield* lock.withPermit(stopShell(id)).pipe(Effect.ignore({ log: true }));
      }
      const calls = runningCalls(state).filter((call) => call.background);
      const callers = sessionsOf(state);
      // Ended subagent calls can run again to answer their own background reports.
      const followUps = callers.filter(
        (caller) =>
          caller.subagent !== undefined &&
          busy.has(caller.sessionId) &&
          !isOrchestrationV2WorkActive(caller.subagent.call.status),
      );
      // Child sessions are announced before call progress names them; use announcements to stop unnamed children.
      const announcedTo = (caller: ThreadState) =>
        [...announced.values()].flatMap((info) =>
          info.parentID === caller.sessionId ? [info.sessionID] : [],
        );
      const childrenOf = (call: SubagentCall) =>
        call.child === undefined ? announcedTo(call.state) : [call.child.sessionId];
      const children = new Map(
        calls.flatMap((call) => childrenOf(call).map((childId) => [childId, call.state] as const)),
      );
      const unreached = new Set<string>();
      for (const [childId, caller] of children) {
        caller.stoppedChildren.add(childId);
        const reached = yield* client.session
          .interrupt({ sessionID: Session.ID.make(childId) })
          .pipe(
            Effect.catchTags({ SessionNotFoundError: () => Effect.void }),
            Effect.timeout(INTERRUPT_TIMEOUT),
            Effect.tapCause((cause) =>
              Effect.logWarning("Could not stop an OpenCode subagent.", cause),
            ),
            Effect.exit,
            Effect.map(Exit.isSuccess),
          );
        if (!reached) unreached.add(childId);
      }
      for (const followUp of followUps) {
        yield* client.session
          .interrupt({ sessionID: Session.ID.make(followUp.sessionId) })
          .pipe(
            Effect.catchTags({ SessionNotFoundError: () => Effect.void }),
            Effect.timeout(INTERRUPT_TIMEOUT),
            Effect.ignore({ log: true }),
          );
      }
      yield* lock.withPermit(
        Effect.gen(function* () {
          for (const call of calls) {
            if (childrenOf(call).some((childId) => unreached.has(childId))) continue;
            yield* settleCall(call, "interrupted");
          }
          for (const caller of callers) {
            for (const report of caller.reports.values()) {
              caller.stoppedChildren.add(report.childId);
            }
          }
          const running = state.wakes.some((wake) => wake.running);
          discardWakes(state, state.wakes.splice(0));
          yield* syncRosterAncestors(state);
          if (running) {
            markUnsettled(state);
            yield* client.session
              .interrupt({ sessionID: Session.ID.make(state.sessionId) })
              .pipe(Effect.timeout(INTERRUPT_TIMEOUT), Effect.ignore({ log: true }));
          }
        }),
      );
      yield* stopStrays(state);
    });
