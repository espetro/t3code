import {
  CommandId,
  EventId,
  ProjectId,
  ProviderInstanceId,
  RunId,
  ThreadId,
} from "@t3tools/contracts";
import { AuthProvidersManageScope } from "@t3tools/contracts/auth";
import { assert, it } from "@effect/vitest";
import * as DateTime from "effect/DateTime";
import * as Effect from "effect/Effect";
import * as Stream from "effect/Stream";

import * as OrchestrationEventStore from "../persistence/OrchestrationEventStore.ts";
import * as ProjectStore from "../orchestration-v2/ProjectStore.ts";
import { dispatchCommand } from "./intake.ts";
import { layerNativeTest } from "./orchestrationLayer.ts";

const layer = it.layer(layerNativeTest);

layer("native ThreadMessageIntake", (it) => {
  it.effect("dispatchCommand commits thread.create through Orchestrator", () =>
    Effect.gen(function* () {
      const projects = yield* ProjectStore.ProjectStoreV2;
      const store = yield* OrchestrationEventStore.OrchestrationEventStore;
      const createdAt = DateTime.formatIso(yield* DateTime.now);
      const projectId = ProjectId.make("proj_native_intake");
      const threadId = ThreadId.make("thread:native-intake");
      yield* projects.apply({
        sequence: 0,
        eventId: EventId.make("seed:proj_native_intake"),
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
          title: "Native intake",
          workspaceRoot: "/tmp/native-intake",
          defaultModelSelection: null,
          scripts: [],
          createdAt,
          updatedAt: createdAt,
        },
      });
      const result = yield* dispatchCommand(
        {
          type: "thread.create",
          commandId: CommandId.make("command:native-intake-create"),
          threadId,
          projectId,
          title: "Native intake thread",
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
        },
        { managesProviders: true },
      );
      assert.isAbove(result.sequence, 0);
      const replayed = yield* store
        .readAgentEvents({ threadId, afterSequence: 0 })
        .pipe(Stream.runCollect);
      assert.equal(Array.from(replayed)[0]?.event.type, "thread.created");
    }),
  );

  it.effect("refuses queued-run.edit sign-out without providers:manage", () =>
    Effect.gen(function* () {
      const error = yield* dispatchCommand(
        {
          type: "queued-run.edit",
          commandId: CommandId.make("command:native-intake-logout"),
          threadId: ThreadId.make("thread:native-intake-logout"),
          runId: RunId.make("run:native-intake-logout"),
          text: "/logout",
        },
        { managesProviders: false },
      ).pipe(Effect.flip);
      assert.equal(error._tag, "EnvironmentAuthorizationError");
      assert.equal(
        "requiredPermission" in error ? error.requiredPermission : undefined,
        AuthProvidersManageScope,
      );
    }),
  );
});
