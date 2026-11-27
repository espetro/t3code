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

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindAttachChild = (ctx: any) =>
Effect.fnUntraced(function* (call: SubagentCall, childId: string) {
    const {
      REQUEST_REPLY_TIMEOUT,
      announced,
      calls,
      childOwners,
      driver,
      emit,
      emitProviderThread,
      emitSubagent,
      idAllocator,
      model,
      modelSelection,
      nativeId,
      newThreadState,
      ref,
      rootOf,
      state,
      status,
      threads,
      updatedAt,
      withReportedModel
    } = pickScriptcBindCtx(ctx);

      if (call.child !== undefined) return;
      const info = announced.get(childId);
      announced.delete(childId);
      const now = yield* DateTime.now;
      const nodeId = idAllocator.derive.nodeFromProviderItem({
        driver,
        nativeItemId: call.nativeId,
      });
      const childThreadId = idAllocator.derive.subagentThread({
        driver,
        nativeThreadId: childId,
        providerInstanceId: instanceId,
      });
      const providerThreadId = idAllocator.derive.providerThread({
        driver,
        nativeThreadId: childId,
        providerInstanceId: instanceId,
      });
      if (info?.model !== undefined) call.model = `${info.model.providerID}/${info.model.id}`;
      call.title = call.title ?? info?.title ?? null;
      const parentThread = call.turn.input.appThread;
      const appThread = makeSubagentChildThread({
        parentThread,
        childThreadId,
        parentNodeId: nodeId,
        activeProviderThreadId: providerThreadId,
        providerInstanceId: instanceId,
        modelSelection: {
          instanceId,
          model: call.model ?? call.turn.input.modelSelection.model,
        },
        title: subagentThreadTitle({
          parentTitle: parentThread.title,
          title: call.title,
          prompt: call.prompt,
          ordinal: call.ordinal,
        }),
        now,
        createdBy: "agent",
        creationSource: "provider",
      });
      const providerThread: OrchestrationV2ProviderThread = {
        id: providerThreadId,
        driver,
        providerInstanceId: instanceId,
        providerSessionId: input.providerSessionId,
        appThreadId: childThreadId,
        ownerNodeId: nodeId,
        nativeThreadRef: ref(childId),
        nativeConversationHeadRef: null,
        status: "active",
        firstRunOrdinal: null,
        lastRunOrdinal: null,
        handoffIds: [],
        forkedFrom: null,
        createdAt: now,
        updatedAt: now,
      };
      const previous = threads.get(childId);
      // A call to a running child steers that run; OpenCode reports it once for all its calls.
      if (previous?.active !== undefined) call.run = previous.subagent?.turns;
      const subagent = {
        call,
        appThread,
        turns: previous?.subagent?.turns ?? 0,
        prompt: call.prompt,
        queued: undefined,
      };
      const child =
        previous ?? newThreadState(childId, providerThread, call.state.directory, subagent);
      child.subagent = subagent;
      child.sessionScopedBackground = false;
      child.model = info?.model ?? child.model;
      child.providerThread = withReportedModel(providerThread, child.model);
      child.directory = call.state.directory;
      child.agent = info?.agent ?? call.agent ?? child.agent;
      child.rules = info?.permissions ?? child.rules;
      threads.set(childId, child);
      childOwners.set(childId, rootOf(call.state));
      call.child = child;
      yield* emit({ type: "app_thread.created", driver, appThread });
      yield* emitProviderThread(child);
      yield* emitSubagent(call);
      // Reused child sessions may retain old mode rules; refresh policy as soon as the call identifies them.
      if (info === undefined) {
        yield* writeRules(child, rootOf(call.state).policy).pipe(
          Effect.timeout(REQUEST_REPLY_TIMEOUT),
          Effect.ignore({ log: true }),
        );
      }
    });
