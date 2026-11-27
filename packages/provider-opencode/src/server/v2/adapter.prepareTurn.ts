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
import { bindStopBackground } from "./adapter.stopBackground.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindPrepareTurn = (ctx: any) =>
Effect.fnUntraced(function* (
      sessionId: string,
      state: ThreadState,
      turnInput: ProviderAdapter.ProviderAdapterV2TurnInput,
    ) {
    const {
      INSTRUCTIONS_KEY,
      INVENTORY_TIMEOUT,
      MCP_TOOL_RELOAD_SETTLE,
      background,
      call,
      clearing,
      client,
      connection,
      entry,
      existing,
      host,
      make,
      mcpServerNameFor,
      mcpSessions,
      model,
      modelSelection,
      paths,
      prompt,
      removeMcp,
      server,
      session,
      sessionID,
      sessionId,
      shell,
      started,
      state,
      turn,
      value
    } = pickScriptcBindCtx(ctx);

      const mcpSession = yield* mcpSessions.read(turnInput.threadId);
      const directory = turnInput.runtimePolicy.cwd ?? host.paths.cwd;
      const name = yield* mcpServerNameFor(turnInput.threadId);
      // An external server may not reach T3's MCP endpoint, as with 1.x.
      const wanted =
        mcpSession === undefined || connection.external
          ? undefined
          : { name, directory, credential: mcpSession.authorizationHeader };
      if (
        state.mcp !== undefined &&
        (wanted === undefined ||
          state.mcp.directory !== wanted.directory ||
          state.mcp.credential !== wanted.credential)
      ) {
        yield* removeMcp(state.mcp);
        state.mcp = undefined;
      }
      // Idle Location eviction drops runtime MCP servers without clearing T3's cache.
      // Re-adding an unchanged config keeps its existing connection.
      let mcpAvailable = false;
      if (wanted !== undefined) {
        const fresh = state.mcp === undefined;
        mcpAvailable = yield* client.mcp
          .add({
            server: name,
            location: { directory },
            config: new Mcp.RemoteConfig({
              type: "remote",
              url: mcpSession!.endpoint,
              headers: { Authorization: wanted.credential },
              oauth: false,
            }),
          })
          .pipe(
            Effect.timeout(INVENTORY_TIMEOUT),
            Effect.as(true),
            Effect.catchCause((cause) =>
              Effect.logWarning("Could not add T3 Code's MCP server to OpenCode.", cause).pipe(
                Effect.as(false),
              ),
            ),
          );
        if (mcpAvailable) state.mcp = wanted;
        // Before 2.2.6, OpenCode loads a new server's tools 100 ms after it connects, and a prompt sent sooner lacks them.
        if (mcpAvailable && fresh && compareSemverVersions(connection.version, "2.2.6") < 0) {
          yield* Effect.sleep(MCP_TOOL_RELOAD_SETTLE);
        }
      }
      const instructions = [
        buildRuntimeInstructions({
          agentFeedback: mcpAvailable ? (turnInput.agentFeedback ?? "off") : "off",
          harness: "OpenCode",
          model: turnInput.modelSelection.model,
          runtimePolicy: turnInput.runtimePolicy,
        }),
        t3OrchestrationSystemPrompt(mcpAvailable, mcpSession?.capabilities?.has("device") === true),
        mcpAvailable
          ? "To wait for a background shell you started (tests, a build), call `t3_background_wait` with its shell ID before you end your turn. Do not mark work you leave running, or PRs."
          : undefined,
      ]
        .filter((part) => part !== undefined && part.length > 0)
        .join("\n\n");
      if (instructions !== state.instructions) {
        yield* client.session.instructions.entry.put({
          sessionID: Session.ID.make(sessionId),
          key: INSTRUCTIONS_KEY,
          value: instructions,
        });
        state.instructions = instructions;
      }
    });
