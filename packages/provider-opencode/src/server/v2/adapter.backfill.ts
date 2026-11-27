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

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindBackfill = (ctx: any) =>
Effect.fnUntraced(function* (sessionId: string, state: ThreadState) {
    const {
      client,
      emitRetry,
      emitText,
      emitTool,
      files,
      id,
      job,
      known,
      lock,
      make,
      name,
      now,
      outcome,
      output,
      promptOf,
      providerTurn,
      retry,
      sessionID,
      sessionId,
      startedAt,
      state,
      status,
      text,
      textOf,
      updateRetry,
      values
    } = pickScriptcBindCtx(ctx);

      const turn = state.active;
      if (turn === undefined) return undefined;
      const promptId = promptOf(turn.providerTurn);
      const { before } = turn;
      if (promptId === undefined && before === undefined) return undefined;
      const start = before !== undefined ? before : promptId;
      const read = yield* OpenCode2Client.paginate(
        { sessionID: Session.ID.make(sessionId), order: "desc" as const, limit: 50 },
        client.message.list,
      ).pipe(
        Stream.takeUntil((message) => message.id === start),
        Stream.runCollect,
        Effect.catchTags({ SessionNotFoundError: () => Effect.succeed(null) }),
      );
      return yield* lock.withPermit(
        Effect.gen(function* () {
          if (state.active !== turn) return undefined;
          if (read === null) return { outcome: "missing" as const };
          // Without this turn's start in history, all retrieved turns are older.
          const found = start === null || read.at(-1)?.id === start;
          if (!found) return undefined;
          const recent = before !== undefined && before !== null ? read.slice(0, -1) : read;
          for (const message of recent) {
            if (message.type === "user" && turn.steers.delete(message.id)) {
              turn.settledInbox.add(message.id);
            }
          }
          const idle = recent.find((message) => message.type === "idle");
          const assistant = recent.find((message) => message.type === "assistant");
          if (assistant?.retry !== undefined) {
            // Snapshots omit when the retry was scheduled, so only its remaining delay is known.
            yield* updateRetry(
              state,
              turn,
              assistant.retry,
              DateTime.toEpochMillis(assistant.retry.at) -
                DateTime.toEpochMillis(yield* DateTime.now),
            );
          } else if (
            turn.retry !== undefined &&
            assistant !== undefined &&
            assistant.error === undefined &&
            assistant.content.length > 0
          ) {
            yield* emitRetry(state, turn, "completed");
            turn.retry = undefined;
          }
          for (const message of recent.toReversed()) {
            if (message.type !== "assistant" || state.active !== turn) continue;
            const ordinals = { text: 0, reasoning: 0 };
            for (const [index, part] of message.content.entries()) {
              if (part.type === "text" || part.type === "reasoning") {
                const block = { assistantMessageID: message.id, ordinal: ordinals[part.type]++ };
                // OpenCode saves a block's text only when the block ends, so the last block of a
                // response still streaming stays open and keeps the text that already arrived.
                const open =
                  message.time.streamed === undefined && index === message.content.length - 1;
                yield* emitText(
                  state,
                  turn,
                  block,
                  part.type,
                  (text) => (open && !part.text.startsWith(text) ? text : part.text),
                  !open,
                );
                continue;
              }
              if (part.type !== "tool") continue;
              turn.closingText = undefined;
              if (!turn.tools.has(part.id)) {
                turn.tools.set(part.id, { name: part.name, input: {} });
                turn.startedAt.set(part.id, yield* DateTime.now);
              }
              const tool = turn.tools.get(part.id)!;
              if (typeof part.state.input === "object" && part.state.input !== null) {
                tool.input = part.state.input as Record<string, unknown>;
              }
              if (part.state.status === "completed") {
                yield* emitTool(state, turn, part.id, "completed", {
                  output: textOf(part.state.content),
                  files: part.state.content.flatMap((content) =>
                    content.type === "file" ? [content] : [],
                  ),
                  metadata: part.state.metadata,
                });
                if (
                  ![...state.imageJobs.values()].some(
                    (job) => job.turn === turn && job.toolId === part.id,
                  )
                )
                  turn.tools.delete(part.id);
              } else if (part.state.status === "error") {
                yield* emitTool(state, turn, part.id, "failed", {
                  output: part.state.error.message,
                  metadata: part.state.metadata,
                });
                turn.tools.delete(part.id);
              } else {
                yield* emitTool(state, turn, part.id, "running");
              }
            }
          }
          return idle === undefined ? undefined : { outcome: idle.outcome };
        }),
      );
    });
