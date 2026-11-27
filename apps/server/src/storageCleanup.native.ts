import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Stream from "effect/Stream";

export class StorageCleanup extends Context.Service<
  StorageCleanup,
  {
    readonly runNow: Effect.Effect<never>;
    readonly latestReport: Effect.Effect<null>;
    readonly reports: Stream.Stream<null>;
    readonly drain: Effect.Effect<void>;
  }
>()("t3/storageCleanup") {}

export const layer = Layer.succeed(StorageCleanup, {
  runNow: Effect.die("StorageCleanup is not in the native server binary"),
  latestReport: Effect.succeed(null),
  reports: Stream.empty,
  drain: Effect.void,
});

export function storageCleanupThreadIdle(_thread: unknown): boolean {
  return false;
}

export function storageCleanupActivityAt(_thread: unknown): number {
  return 0;
}

export function storageCleanupPullRequestMerged(_thread: unknown): boolean {
  return false;
}
