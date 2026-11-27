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

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindHandleEvent = (ctx: any) =>
Effect.fnUntraced(function* (event: OpenCode2Client.OpenCode2StreamEvent) {
    const {
      announced,
      busy,
      childOwners,
      clearing,
      data,
      emitShell,
      events,
      executionEnd,
      exit,
      holderOf,
      id,
      info,
      lost,
      next,
      ownerOf,
      readShellOutput,
      route,
      session,
      sessionID,
      sessionOfEvent,
      shellInfo,
      shells,
      started,
      status,
      strays,
      stringField,
      syncRosterAncestors,
      threads,
      value
    } = pickScriptcBindCtx(ctx);

      if (event.type === "shell.created") {
        const sessionId = stringField(event.data.info.metadata, "sessionID");
        if (sessionId !== undefined && ownerOf(sessionId) !== undefined) {
          shellInfo.set(event.data.info.id, event.data.info);
          if (shellInfo.size > 128) shellInfo.delete(shellInfo.keys().next().value!);
        }
        return;
      }
      if (event.type === "shell.exited" || event.type === "shell.deleted") {
        const known = shellInfo.get(event.data.id);
        if (known !== undefined)
          shellInfo.set(event.data.id, {
            ...known,
            status: event.type === "shell.deleted" ? "killed" : event.data.status,
            exit: "exit" in event.data ? event.data.exit : undefined,
          });
        const shell = shells.get(event.data.id);
        if (shell === undefined || !shell.running || shell.stopping === true) return;
        if (event.type === "shell.exited")
          yield* readShellOutput(event.data.id, true).pipe(Effect.ignore({ log: true }));
        shell.running = false;
        yield* emitShell(
          event.data.id,
          event.type === "shell.deleted" || event.data.status === "killed"
            ? "interrupted"
            : event.data.exit === 0
              ? "completed"
              : "failed",
          "exit" in event.data ? event.data.exit : undefined,
        );
        shells.delete(event.data.id);
        shellInfo.delete(event.data.id);
        yield* syncRosterAncestors(shell.state);
        return;
      }
      const sessionId = sessionOfEvent(event);
      const cleared = sessionId === undefined ? undefined : clearing.get(sessionId);
      if (cleared !== undefined) {
        if (event.type === "unreadable.execution.ended" || executionEnd(event.type)) {
          return yield* Deferred.succeed(cleared, undefined);
        }
        if (
          event.type === "session.execution.started" ||
          event.type === "unreadable.execution.started"
        ) {
          return;
        }
      }
      if (sessionId !== undefined) {
        if (
          event.type === "session.execution.started" ||
          event.type === "unreadable.execution.started"
        ) {
          // Executions are serial: a second start proves the unsettled run lost its end.
          const state = threads.get(sessionId);
          if (state !== undefined) state.starts += 1;
          if (state?.unsettled === true) {
            if (state.unsettledStarted) state.unsettled = false;
            else state.unsettledStarted = true;
          }
          busy.add(sessionId);
        } else if (event.type === "unreadable.execution.ended" || executionEnd(event.type)) {
          busy.delete(sessionId);
        }
      }
      if (event.type === "session.created" && event.data.parentID !== undefined) {
        const strayCaller = strays.get(event.data.parentID);
        if (strayCaller !== undefined) {
          strays.set(event.data.sessionID, strayCaller);
          return;
        }
        const owner = ownerOf(event.data.parentID);
        if (owner !== undefined) {
          childOwners.set(event.data.sessionID, owner);
          announced.set(event.data.sessionID, event.data);
          holderOf(event.data.parentID)?.wakes.at(-1)?.children.add(event.data.sessionID);
        }
        return;
      }
      const holder = sessionId === undefined ? undefined : holderOf(sessionId);
      const held = holder?.wakes.at(-1);
      if (holder !== undefined && held !== undefined) {
        held.events.push(event);
        if (
          sessionId === holder.sessionId &&
          (event.type === "unreadable.execution.ended" || executionEnd(event.type))
        ) {
          held.running = false;
        }
        return;
      }
      return yield* route(event, sessionId);
    });
