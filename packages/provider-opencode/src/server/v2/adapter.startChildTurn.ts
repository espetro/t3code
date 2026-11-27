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

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindStartChildTurn = (ctx: any) =>
Effect.fnUntraced(function* (child: ThreadState) {
    const {
      callsAttachedTo,
      child,
      completedAt,
      driver,
      emit,
      emitProviderTurn,
      idAllocator,
      makeTurn,
      message,
      messageId,
      modelSelection,
      nodeId,
      now,
      ordinalOf,
      ref,
      sessionId,
      status,
      text,
      turnItem
    } = pickScriptcBindCtx(ctx);

      const subagent = child.subagent;
      if (subagent === undefined || child.active !== undefined) return;
      subagent.turns += 1;
      for (const call of callsAttachedTo(child)) call.run ??= subagent.turns;
      const startedAt = yield* DateTime.now;
      const nativeTurnId = `${child.sessionId}:turn:${subagent.turns}`;
      const rootNodeId = idAllocator.derive.nodeFromProviderItem({
        driver,
        nativeItemId: `${nativeTurnId}:root`,
      });
      const providerTurn: OrchestrationV2ProviderTurn = {
        id: idAllocator.derive.providerTurn({ driver, nativeTurnId }),
        providerThreadId: child.providerThread.id,
        nodeId: rootNodeId,
        runAttemptId: null,
        nativeTurnRef: ref(nativeTurnId, "weak"),
        ordinal: subagent.turns,
        status: "running",
        startedAt,
        completedAt: null,
      };
      const turn = makeTurn(
        {
          appThread: subagent.appThread,
          threadId: subagent.appThread.id,
          runId: null,
          runOrdinal: subagent.call.turn.input.runOrdinal,
          rootNodeId,
          modelSelection: subagent.appThread.modelSelection,
          runtimePolicy: subagent.call.turn.input.runtimePolicy,
        },
        providerTurn,
        { scope: `${child.sessionId}:`, awaitingStart: false },
      );
      turn.before = subagent.queued;
      subagent.queued = undefined;
      child.active = turn;
      child.sessionScopedBackground = false;
      yield* emit({
        type: "node.updated",
        driver,
        node: {
          id: rootNodeId,
          threadId: turn.input.threadId,
          runId: null,
          parentNodeId: null,
          rootNodeId,
          kind: "root_turn",
          status: "running",
          countsForRun: false,
          providerThreadId: child.providerThread.id,
          providerTurnId: providerTurn.id,
          nativeItemRef: ref(nativeTurnId, "weak"),
          runtimeRequestId: null,
          checkpointScopeId: null,
          startedAt,
          completedAt: null,
        },
      });
      yield* emitProviderTurn(turn, providerTurn);
      const prompt = subagent.prompt;
      subagent.prompt = undefined;
      if (prompt !== undefined && prompt.length > 0) {
        const nativeId = `${nativeTurnId}:prompt`;
        const artifacts = makeSubagentConversationArtifacts({
          messageId: idAllocator.derive.messageFromProviderItem({ driver, nativeItemId: nativeId }),
          senderThreadId: subagent.call.turn.input.threadId,
          turnItemId: idAllocator.derive.turnItemFromProviderItem({
            driver,
            nativeItemId: nativeId,
          }),
          threadId: turn.input.threadId,
          rootNodeId,
          providerThreadId: child.providerThread.id,
          providerTurnId: providerTurn.id,
          nativeItemRef: ref(nativeId, "weak"),
          role: "user",
          text: prompt,
          ordinal: ordinalOf(turn, nativeId),
          now: startedAt,
        });
        yield* emit({ type: "message.updated", driver, message: artifacts.message });
        yield* emit({ type: "turn_item.updated", driver, turnItem: artifacts.turnItem });
      }
    });
