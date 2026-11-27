import { assert, it } from "@effect/vitest";
import * as Effect from "effect/Effect";

import { bindRecoverDelegatedTasks } from "./Orchestrator.recoverDelegatedTasks.ts";

it.effect("recoverDelegatedTasks bind is a zero-arg Effect.fn the factory can yield*", () =>
  Effect.gen(function* () {
    const recover = bindRecoverDelegatedTasks({
      delegatedTaskTerminalStatus: () => null,
      finalizeAppOwnedSubagent: () => Effect.void,
      finalizeDelegatedCompletionDelivery: () => Effect.void,
      offerDelegatedCompletionDelivery: () => Effect.void,
      projectionStore: {
        getRecoveryThreadIds: () => Effect.succeed([]),
      },
      requeueUnreadSteers: () => Effect.void,
      threadDispatch: {
        withLock: (_threadId: unknown, effect: Effect.Effect<unknown>) => effect,
      },
    });
    assert.equal(typeof recover, "function");
    yield* recover() as Effect.Effect<void>;
  }),
);
