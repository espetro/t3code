// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of adapter.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original value.
import { pickScriptcBindCtx } from "./scriptcBindScope.ts";
import * as HostProcess from "@t3tools/shared/HostProcess";
import * as NodeUtil from "node:util";
import { AgentScope } from "@t3tools/shared/AgentScope";
import { getModelSelectionStringOptionValue } from "@t3tools/shared/model";
import { readToolOutputImage } from "@t3tools/shared/toolOutput";
import { isWorkspaceImagePreviewPath } from "@t3tools/shared/filePreview";
import * as Predicate from "effect/Predicate";
import {
  ProviderDriverKind,
  type ChatAttachment,
  type ModelSelection,
  type OrchestrationV2ExecutionNode,
  type OrchestrationV2ProviderCapabilities,
  type OrchestrationV2ProviderFailure,
  type OrchestrationV2ProviderRef,
  type OrchestrationV2ProviderRetry,
  type OrchestrationV2ProviderSession,
  type OrchestrationV2ProviderThread,
  type OrchestrationV2ProviderTurn,
  type OrchestrationV2RuntimeRequest,
  type OrchestrationV2Subagent,
  type OrchestrationV2TurnItem,
  type OrchestrationV2UserInputQuestion,
  type ProviderApprovalDecision,
  type ProviderInstanceId,
  type MessageId,
  type OrchestrationV2ProviderTurnTokenUsage,
} from "@t3tools/contracts";
import { PiSettings } from "../settings.ts";
import * as Cause from "effect/Cause";
import * as DateTime from "effect/DateTime";
import * as Deferred from "effect/Deferred";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Exit from "effect/Exit";
import * as Scope from "effect/Scope";
import * as Fiber from "effect/Fiber";
import * as Queue from "effect/Queue";
import * as Schema from "effect/Schema";
import * as Semaphore from "effect/Semaphore";
import * as Stream from "effect/Stream";
import * as ChildProcessSpawner from "effect/process/ChildProcessSpawner";

import * as ProviderHost from "@t3tools/provider-core/server/ProviderHost";
import { providerMessageTextWithAttachmentPaths } from "@t3tools/provider-core/server/attachmentPrompt";
import { mcpToolPresentation } from "@t3tools/provider-core/server/mcpToolPresentation";
import * as McpProviderSessions from "@t3tools/provider-core/server/McpProviderSessions";
import { parsePiCompactCommand, type PiCompactCommand } from "./commands.ts";
import { mergeProviderInstanceEnvironment } from "@t3tools/provider-core/server/instanceEnvironment";
import * as IdAllocator from "@t3tools/provider-core/server/IdAllocator";
import * as ProviderAdapter from "@t3tools/provider-core/server/ProviderAdapter";
import * as ProviderContinuationRequests from "@t3tools/provider-core/server/ProviderContinuationRequests";
import {
  ProviderAdapterDriverCreateError,
  type ProviderAdapterDriver,
  type ProviderAdapterDriverCreateInput,
} from "@t3tools/provider-core/server/adapterDriver";
import {
  makeProviderFailure,
  makeProviderRetryTurnItem,
} from "@t3tools/provider-core/server/failure";
import { turnScopedSelectionTransition } from "@t3tools/provider-core/server/selectionTransition";
import {
  findReportedPiModel,
  makePiRpcConnection,
  resolvePiModelSlug,
  piRecordField as recordField,
  piRecordNumber as recordNumber,
  piRecordString as recordString,
  type PiRpcConnection,
  type PiRpcError,
  type PiRpcRecord,
} from "./rpc.ts";
import {
  buildPiRpcLaunch,
  materializePiT3McpExtension,
  resolvePiLaunchArgs,
} from "./mcpInjection.ts";
import { PI_FILE_CHANGE_TOOLS, PI_T3_SERVICE_TIER_COMMAND } from "./mcpExtensionSource.ts";
import { PI_STANDARD_SERVICE_TIER } from "./modelCapabilities.ts";
import { bindHandleSessionEvent } from "./adapter.handleSessionEvent.ts";
import { bindHandleExtensionUiRequest } from "./adapter.handleExtensionUiRequest.ts";
import { bindFinalizeTurn } from "./adapter.finalizeTurn.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindEmitToolItem = (ctx: any) =>
Effect.fnUntraced(function* (
        turn: ActivePiTurn,
        event: PiRpcRecord,
        phase: "start" | "update" | "end",
      ) {
    const {
      PI_PROVIDER,
      baseItemFields,
      completedAt,
      content,
      contentText,
      details,
      emit,
      emitCommandOutputDelta,
      emitItemNode,
      now,
      path,
      piToolOutput,
      result,
      start,
      updated
    } = pickScriptcBindCtx(ctx);

        const toolCallId = recordString(event, "toolCallId");
        const toolName = recordString(event, "toolName") ?? "tool";
        // Pi tags every phase of a call made through ctx.executeTool, such as from a codemode script.
        const parentToolCallId = recordString(event, "parentToolCallId");
        if (toolCallId === undefined) return;
        if (phase === "update" && (toolName === "bash" || toolName === "powershell")) {
          yield* emitCommandOutputDelta(turn, toolCallId, event["partialResult"]);
          return;
        }
        if (phase === "start") {
          turn.toolArgs.set(toolCallId, event["args"]);
        }
        const args = event["args"] ?? turn.toolArgs.get(toolCallId);
        const emittedAt = yield* DateTime.now;
        const startedAt = turn.toolStartedAt.get(toolCallId) ?? emittedAt;
        turn.toolStartedAt.set(toolCallId, startedAt);
        const completed = phase === "end";
        const isError = event["isError"] === true;
        const resultRecord = completed ? event["result"] : event["partialResult"];
        const outputText = contentText(recordField(resultRecord, "content"));
        const status = completed
          ? isError
            ? turn.interrupted
              ? "interrupted"
              : "failed"
            : "completed"
          : "running";
        const base = baseItemFields(turn, toolCallId, startedAt, emittedAt, parentToolCallId);
        yield* emitItemNode(
          turn,
          toolCallId,
          "tool_call",
          status,
          startedAt,
          completed ? emittedAt : null,
          parentToolCallId,
        );
        const shared = {
          ...base,
          status,
          completedAt: completed ? emittedAt : null,
        } as const;
        if (toolName === "bash" || toolName === "powershell") {
          const exitCode =
            recordNumber(recordField(resultRecord, "structuredContent"), "exit_code") ??
            recordNumber(recordField(resultRecord, "details"), "exitCode");
          yield* emit({
            type: "turn_item.updated",
            driver: PI_PROVIDER,
            turnItem: {
              ...shared,
              title: toolName,
              type: "command_execution",
              input: recordString(args, "command") ?? "",
              ...(outputText.length > 0 ? { output: outputText } : {}),
              ...(exitCode === undefined ? {} : { exitCode }),
            },
          });
          return;
        }
        if (toolName === "edit" || toolName === "write") {
          const fileName = recordString(args, "path") ?? recordString(args, "file_path");
          if (fileName !== undefined) {
            const diffStr =
              recordString(recordField(resultRecord, "details"), "patch") ??
              (isError && outputText.trim().length > 0 ? outputText : undefined);
            const newStr = toolName === "write" ? recordString(args, "content") : undefined;
            yield* emit({
              type: "turn_item.updated",
              driver: PI_PROVIDER,
              turnItem: {
                ...shared,
                title: toolName,
                type: "file_change",
                fileName,
                ...(diffStr === undefined ? {} : { diffStr }),
                ...(newStr === undefined ? {} : { newStr }),
              },
            });
            return;
          }
        }
        const output = piToolOutput(resultRecord, toolName);
        // Pi strips @ only at the start of the raw argument, before preview trimming.
        const readPath =
          toolName === "read"
            ? (recordString(args, "path") ?? recordString(args, "file_path"))
                ?.replace(/^@/, "")
                .trim()
            : undefined;
        const viewedImagePath =
          readPath &&
          readPath.length <= 4096 &&
          !/[\r\n]/.test(readPath) &&
          isWorkspaceImagePreviewPath(readPath)
            ? readPath
            : undefined;
        yield* emit({
          type: "turn_item.updated",
          driver: PI_PROVIDER,
          turnItem: {
            ...shared,
            title: toolName,
            type: "dynamic_tool",
            ...mcpToolPresentation({ toolName }),
            toolName,
            input: args ?? {},
            ...(output === undefined ? {} : { output }),
            ...(viewedImagePath === undefined ? {} : { viewedImagePath }),
          },
        });
        if (toolName === "subagent") {
          yield* emitSubagentTasks(turn, toolCallId, resultRecord, completed);
        }
      });
