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

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindOnTurnEvent = (ctx: any) =>
Effect.fnUntraced(function* (
      state: ThreadState,
      turn: ActiveTurn,
      event: OpenCode2Client.OpenCode2StreamEvent,
    ) {
    const {
      attachChild,
      background,
      calls,
      claudeUsageLimit,
      compaction,
      emitCompaction,
      emitRetry,
      emitShell,
      emitSubagent,
      emitText,
      emitTool,
      id,
      isUsageLimit,
      lastStep,
      message,
      model,
      models,
      name,
      nativeId,
      now,
      prompt,
      providerTurn,
      readShellOutput,
      replaying,
      retry,
      session,
      sessionID,
      settleCall,
      shell,
      shellInfo,
      shells,
      startCall,
      startedAt,
      state,
      status,
      steps,
      stringField,
      subagent,
      subagentOutput,
      syncRosterAncestors,
      text,
      textOf,
      turn,
      updateRetry,
      values
    } = pickScriptcBindCtx(ctx);

      // OpenCode sends nothing when a retry goes through; the provider's first output marks it.
      if (
        turn.retry !== undefined &&
        (event.type === "session.text.started" ||
          event.type === "session.reasoning.started" ||
          event.type === "session.tool.input.started")
      ) {
        yield* emitRetry(state, turn, "completed");
        turn.retry = undefined;
      }
      switch (event.type) {
        case "session.text.started":
        case "session.reasoning.started":
        case "session.text.delta":
        case "session.reasoning.delta":
        case "session.text.ended":
        case "session.reasoning.ended": {
          const data = event.data;
          const kind = event.type.startsWith("session.text.") ? "text" : "reasoning";
          return yield* emitText(state, turn, data, kind, (text) =>
            "delta" in data ? text + data.delta : "text" in data ? data.text : text,
          );
        }
        case "session.tool.input.started":
          turn.closingText = undefined;
          if (event.data.name === "question") return;
          if (event.data.name === "subagent") return yield* startCall(state, turn, event.data.id);
          turn.tools.set(event.data.id, { name: event.data.name, input: {} });
          turn.startedAt.set(event.data.id, yield* DateTime.now);
          return yield* emitTool(state, turn, event.data.id, "running");
        case "session.tool.called": {
          const call = state.calls.get(event.data.id);
          if (call !== undefined) {
            const { input } = event.data;
            call.prompt = stringField(input, "prompt") ?? call.prompt;
            call.title = stringField(input, "description") ?? call.title;
            call.agent = stringField(input, "agent");
            call.model = stringField(input, "model") ?? call.model;
            call.background = input["background"] === true;
            return yield* emitSubagent(call);
          }
          const tool = turn.tools.get(event.data.id);
          if (tool !== undefined) tool.input = event.data.input;
          return yield* emitTool(state, turn, event.data.id, "running");
        }
        case "session.tool.progress": {
          const call = state.calls.get(event.data.id);
          const childId = stringField(event.data.metadata, "sessionID");
          if (call !== undefined && childId !== undefined) yield* attachChild(call, childId);
          return;
        }
        case "session.tool.success": {
          const call = state.calls.get(event.data.id);
          if (call !== undefined) {
            const childId = stringField(event.data.metadata, "sessionID");
            if (childId !== undefined) yield* attachChild(call, childId);
            // Background and joined-background calls return at launch; reports settle them.
            if (event.data.metadata?.["status"] === "running") {
              if (call.background) return;
              call.background = true;
              return yield* emitSubagent(call);
            }
            return yield* settleCall(call, "completed", subagentOutput(textOf(event.data.content)));
          }
          const shellId = stringField(event.data.metadata, "shellID");
          const tool = turn.tools.get(event.data.id);
          if (
            shellId !== undefined &&
            tool?.name === "shell" &&
            event.data.metadata?.["exit"] === undefined &&
            event.data.metadata?.["signal"] === undefined &&
            event.data.metadata?.["timeout"] !== true
          ) {
            shells.set(shellId, {
              state,
              turn,
              toolId: event.data.id,
              tool,
              command: stringField(tool.input, "command") ?? "Shell command",
              ...(replaying?.awaited.has(shellId) === true ? { awaited: true } : {}),
              running: true,
              output: "",
              cursor: 0,
            });
            const known = shellInfo.get(shellId);
            const ended = replaying?.ended.get(shellId);
            const tracked = shells.get(shellId)!;
            tracked.running =
              ended === undefined && (known === undefined || known.status === "running");
            yield* readShellOutput(shellId, !tracked.running).pipe(Effect.ignore({ log: true }));
            yield* emitShell(
              shellId,
              tracked.running
                ? "running"
                : (ended?.status ??
                    (known?.status === "killed"
                      ? "interrupted"
                      : known?.exit === 0
                        ? "completed"
                        : "failed")),
              ended?.exit ?? known?.exit,
            );
            if (ended !== undefined) shells.delete(shellId);
            yield* syncRosterAncestors(state);
            return;
          }
          if (shellId !== undefined) shellInfo.delete(shellId);
          const output = textOf(event.data.content);
          yield* emitTool(state, turn, event.data.id, "completed", {
            output,
            files: event.data.content.flatMap((part) => (part.type === "file" ? [part] : [])),
            metadata: event.data.metadata,
          });
          if (
            ![...state.imageJobs.values()].some(
              (job) => job.turn === turn && job.toolId === event.data.id,
            )
          )
            turn.tools.delete(event.data.id);
          return;
        }
        case "session.tool.failed": {
          const aborted = event.data.error.type === "aborted";
          const call = state.calls.get(event.data.id);
          if (call !== undefined) {
            return yield* settleCall(
              call,
              aborted ? "interrupted" : "failed",
              event.data.error.message,
            );
          }
          yield* emitTool(state, turn, event.data.id, aborted ? "interrupted" : "failed", {
            output: event.data.error.message,
            metadata: event.data.metadata,
          });
          turn.tools.delete(event.data.id);
          return;
        }
        case "session.compaction.started":
          turn.compaction = {
            nativeId: `${turn.providerTurn.id}:compaction:${turn.compactions++}`,
            startedAt: yield* DateTime.now,
          };
          return yield* emitCompaction(state, turn, "running");
        case "session.compaction.ended":
          return yield* emitCompaction(state, turn, "completed", event.data.text);
        case "session.compaction.failed":
          return yield* emitCompaction(state, turn, "failed");
        case "session.step.started":
          turn.startedSteps += 1;
          turn.models.add(`${event.data.model.providerID}/${event.data.model.id}`);
          return;
        case "session.step.ended":
        case "session.step.failed": {
          const tokens = event.data.tokens;
          if (tokens === undefined) return;
          turn.steps += 1;
          turn.lastStep = tokens;
          turn.usage.input += tokens.input + tokens.cache.read + tokens.cache.write;
          turn.usage.cached += tokens.cache.read;
          turn.usage.cacheWrite += tokens.cache.write;
          turn.usage.output += tokens.output + tokens.reasoning;
          turn.usage.reasoning += tokens.reasoning;
          return;
        }
        case "session.retry.scheduled":
          return yield* updateRetry(state, turn, event.data, event.data.at - event.created);
        case "session.execution.started":
          turn.heldEnd = undefined;
          return;
        case "session.execution.succeeded":
          return yield* endExecution(state, turn, {
            status: turn.interrupted ? "interrupted" : "completed",
          });
        case "session.execution.interrupted":
          return yield* endExecution(state, turn, { status: "interrupted" });
        case "session.execution.failed": {
          const { type, message, status, response } = event.data.error;
          return yield* endExecution(state, turn, {
            status: "failed",
            failure: makeProviderFailure({
              message: readableProviderErrorMessage(message, status, response?.body),
              code: type,
              class: isUsageLimit(event.data.error) ? "usage_limit" : "provider_error",
              resetAt: claudeUsageLimit(message)?.resetAt ?? null,
            }),
          });
        }
        default:
          return;
      }
    });
