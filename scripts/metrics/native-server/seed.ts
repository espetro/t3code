import * as Schema from "effect/Schema";
import {
  OrchestrationV2AppThreadJson,
  OrchestrationV2DomainEventJson,
  OrchestrationV2RpcSchemas,
  OrchestrationV2TurnItemJson,
} from "@t3tools/contracts";

export const NATIVE_SERVER_BENCH_THREAD_ID = "thread:native-server-bench";
export const NATIVE_SERVER_BENCH_NOW = "2026-01-01T00:00:00.000Z";
export const NATIVE_SERVER_BENCH_PROJECT_ID = "project:native-server-bench";

const decodeTurnItemJson = Schema.decodeUnknownSync(OrchestrationV2TurnItemJson);
const encodeTurnItemJson = Schema.encodeSync(OrchestrationV2TurnItemJson);
const decodeThreadJson = Schema.decodeUnknownSync(OrchestrationV2AppThreadJson);
const encodeThreadJson = Schema.encodeSync(OrchestrationV2AppThreadJson);
const decodeDomainEventJson = Schema.decodeUnknownSync(OrchestrationV2DomainEventJson);

export const encodeSubscribeThreadItem = Schema.encodeSync(
  Schema.toCodecJson(OrchestrationV2RpcSchemas.subscribeThread.output),
);

export function nativeServerBenchTurnItemPayload(threadId: string, index: number) {
  return {
    id: `item:bench-replay:${index}`,
    type: "command_execution" as const,
    threadId,
    runId: null,
    nodeId: null,
    providerThreadId: null,
    providerTurnId: null,
    nativeItemRef: null,
    parentItemId: null,
    ordinal: index + 1,
    title: "ok",
    status: "completed" as const,
    input: "ok",
    startedAt: NATIVE_SERVER_BENCH_NOW,
    completedAt: NATIVE_SERVER_BENCH_NOW,
    updatedAt: NATIVE_SERVER_BENCH_NOW,
  };
}

export function nativeServerBenchThreadPayload(threadId: string) {
  return {
    createdBy: "user" as const,
    creationSource: "web" as const,
    id: threadId,
    projectId: NATIVE_SERVER_BENCH_PROJECT_ID,
    title: "native-server-bench",
    providerInstanceId: "codex",
    modelSelection: { instanceId: "codex", model: "gpt-5.4" },
    runtimeMode: "full-access" as const,
    interactionMode: "default" as const,
    branch: null,
    worktreePath: null,
    activeProviderThreadId: null,
    lineage: {
      parentThreadId: null,
      relationshipToParent: null,
      rootThreadId: threadId,
    },
    forkedFrom: null,
    createdAt: NATIVE_SERVER_BENCH_NOW,
    updatedAt: NATIVE_SERVER_BENCH_NOW,
    archivedAt: null,
    settledOverride: null,
    settledAt: null,
    lastVisitedAt: null,
    deletedAt: null,
  };
}

export function nativeServerBenchTurnItemJson(threadId: string, index: number) {
  return JSON.stringify(
    encodeTurnItemJson(decodeTurnItemJson(nativeServerBenchTurnItemPayload(threadId, index))),
  );
}

export function nativeServerBenchThreadJson(threadId: string) {
  return JSON.stringify(
    encodeThreadJson(decodeThreadJson(nativeServerBenchThreadPayload(threadId))),
  );
}

export function nativeServerBenchTurnItemEvent(threadId: string, index: number) {
  return {
    id: `event:bench-replay:${index}`,
    threadId,
    type: "turn-item.updated" as const,
    occurredAt: NATIVE_SERVER_BENCH_NOW,
    payload: nativeServerBenchTurnItemPayload(threadId, index),
  };
}

export function nativeServerBenchSubscribeEvent(threadId: string, index: number, sequence: number) {
  return {
    kind: "event" as const,
    sequence,
    event: decodeDomainEventJson(nativeServerBenchTurnItemEvent(threadId, index)),
  };
}

export function emptyThreadProjection(threadId: string) {
  const thread = decodeThreadJson(nativeServerBenchThreadPayload(threadId));
  return {
    thread,
    runs: [],
    attempts: [],
    nodes: [],
    subagents: [],
    providerSessions: [],
    providerThreads: [],
    providerTurns: [],
    runtimeRequests: [],
    messages: [],
    plans: [],
    turnItems: [decodeTurnItemJson(nativeServerBenchTurnItemPayload(threadId, 0))],
    checkpointScopes: [],
    checkpoints: [],
    contextHandoffs: [],
    contextTransfers: [],
    visibleTurnItems: [],
    updatedAt: thread.updatedAt,
  };
}
