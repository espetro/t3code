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

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindSubmit = (ctx: any) =>
Effect.fnUntraced(function* (
      sessionId: string,
      turnInput: ProviderAdapter.ProviderAdapterV2TurnInput,
      state: ThreadState,
      turn: ActiveTurn,
    ) {
    const {
      ACTIVE_CHECK_TIMEOUT,
      INVENTORY_TIMEOUT,
      busy,
      clearing,
      client,
      commandOf,
      data,
      directory,
      endExecution,
      entry,
      events,
      finishTurn,
      goal,
      history,
      host,
      lock,
      make,
      markBefore,
      message,
      model,
      name,
      paths,
      prompt,
      promptFiles,
      promptText,
      readGoal,
      session,
      sessionId,
      skillsMentioned,
      started,
      starts,
      state,
      status,
      supportsNativeGoals,
      turn,
      turnPromptId,
      value
    } = pickScriptcBindCtx(ctx);

      const sessionID = Session.ID.make(sessionId);
      const sending = () => {
        if (state.active !== turn || turn.interrupted) return false;
        turn.unsent = false;
        return true;
      };
      const finishControl = lock.withPermit(
        Effect.suspend(() =>
          state.active === turn ? finishTurn(state, { status: "completed" }) : Effect.void,
        ),
      );
      const text = turnInput.message.text.trim();
      const bare = turnInput.message.attachments.length === 0;
      const id = turnPromptId(sessionId, turnInput.attemptId);
      const goalCommand = supportsNativeGoals() ? parseGoalCommand(turnInput.message) : null;
      if (goalCommand?.type === "show") {
        if (!sending()) return;
        yield* readGoal(state);
        return yield* finishControl;
      }
      if (bare && text === "/compact") {
        if (!sending()) return;
        return yield* client.session.compact({ sessionID, id }).pipe(Effect.asVoid);
      }
      const location = { directory: turnInput.runtimePolicy.cwd ?? host.paths.cwd };
      const command = bare ? commandOf(text) : undefined;
      if (command !== undefined) {
        const commands = yield* client.command.list({ location }).pipe(
          Effect.timeout(INVENTORY_TIMEOUT),
          Effect.map((list) => list.data),
          Effect.orElseSucceed(() => []),
        );
        if (commands.some((entry) => entry.name === command.name)) {
          // session.command neither accepts nor returns our ID; record the preceding history boundary.
          const newest = yield* client.message.list({ sessionID, order: "desc", limit: 1 });
          const before = newest.data[0]?.id ?? null;
          yield* markBefore(sessionId, before);
          if (!sending()) return;
          if (goalCommand?.type === "pause" || goalCommand?.type === "clear") {
            // OpenCode rejects pausing or clearing a missing goal; Codex treats that as a no-op.
            yield* client.session.command({ sessionID, ...command }).pipe(
              Effect.catchIf(
                (error) =>
                  error._tag === "CommandExecutionError" && error.message === "No goal is set.",
                () => Effect.void,
              ),
            );
            return yield* finishControl;
          }
          yield* client.session.command({ sessionID, ...command });
          // A command that never prompts the model starts no execution, so no event ends its turn.
          const idle = () => state.active === turn && !busy.has(sessionId);
          if (!idle()) return;
          const active = yield* client.session
            .active()
            .pipe(Effect.timeout(ACTIVE_CHECK_TIMEOUT), Effect.option);
          if (active._tag === "None") {
            return yield* Effect.logWarning("Could not check whether an OpenCode command started.");
          }
          if (sessionId in active.value) return;
          // An execution that already ended left history behind; its events may still trail this reply.
          const ran = yield* OpenCode2Client.paginate(
            { sessionID, order: "desc" as const, limit: 1 },
            client.message.list,
          ).pipe(
            Stream.takeWhile((message) => message.id !== before),
            Stream.filter(
              (message) =>
                message.type === "user" || message.type === "assistant" || message.type === "idle",
            ),
            Stream.runHead,
            Effect.timeout(ACTIVE_CHECK_TIMEOUT),
            Effect.option,
          );
          if (ran._tag === "None") {
            return yield* Effect.logWarning("Could not check whether an OpenCode command ran.");
          }
          if (ran.value._tag === "Some") return;
          return yield* lock.withPermit(
            Effect.suspend(() =>
              idle()
                ? endExecution(state, turn, {
                    status: turn.interrupted ? "interrupted" : "completed",
                  })
                : Effect.void,
            ),
          );
        }
      }
      const skills = yield* skillsMentioned(location, text);
      const files = yield* promptFiles(turnInput.message.attachments);
      const messageText = turnInput.resume ? "" : yield* promptText(turnInput);
      if (!sending()) return;
      return yield* client.session
        .prompt({
          sessionID,
          id,
          text: messageText,
          ...(files.length === 0 ? {} : { files }),
          ...(skills.length === 0
            ? {}
            : { skills: skills.map((id) => ({ id: Skill.ID.make(id) })) }),
        })
        .pipe(Effect.asVoid);
    });
