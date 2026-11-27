import { CommandId, EventId, ProjectId, ProviderInstanceId, ThreadId } from "@t3tools/contracts";
import { assert, it } from "@effect/vitest";
import * as DateTime from "effect/DateTime";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";

import * as OrchestrationEventStore from "../persistence/OrchestrationEventStore.ts";
import * as Orchestrator from "../orchestration-v2/Orchestrator.ts";
import * as ProjectStore from "../orchestration-v2/ProjectStore.ts";
import { layerNativeTest } from "./orchestrationLayer.ts";

const layer = it.layer(layerNativeTest);

layer("native orchestration island", (it) => {
  it.effect("dispatch persists events through OrchestrationEventStore, not a no-op sequence", () =>
    Effect.gen(function* () {
      const projects = yield* ProjectStore.ProjectStoreV2;
      const orchestrator = yield* Orchestrator.OrchestratorV2;
      const store = yield* OrchestrationEventStore.OrchestrationEventStore;
      const createdAt = DateTime.formatIso(yield* DateTime.now);
      const projectId = ProjectId.make("proj_native_island");
      const threadId = ThreadId.make("thread:native-island");
      yield* projects.apply({
        sequence: 0,
        eventId: EventId.make("seed:proj_native_island"),
        aggregateKind: "project",
        aggregateId: projectId,
        occurredAt: createdAt,
        commandId: null,
        causationEventId: null,
        correlationId: null,
        metadata: {},
        type: "project.created",
        payload: {
          projectId,
          title: "Native",
          workspaceRoot: "/tmp/native-island",
          defaultModelSelection: null,
          scripts: [],
          createdAt,
          updatedAt: createdAt,
        },
      });
      const result = yield* orchestrator.dispatch({
        type: "thread.create",
        commandId: CommandId.make("command:native-create"),
        threadId,
        projectId,
        title: "Native thread",
        modelSelection: {
          instanceId: ProviderInstanceId.make("codex"),
          model: "gpt-5",
        },
        runtimeMode: "approval-required",
        interactionMode: "default",
        branch: null,
        worktreePath: null,
        createdBy: "user",
        creationSource: "web",
      });
      assert.isAbove(result.sequence, 0);
      assert.isAtLeast(result.storedEvents.length, 1);
      const replayed = yield* store
        .readAgentEvents({ threadId, afterSequence: 0 })
        .pipe(Stream.runCollect);
      assert.isAtLeast(replayed.length, 1);
      assert.equal(Array.from(replayed)[0]?.event.type, "thread.created");
    }),
  );
});
