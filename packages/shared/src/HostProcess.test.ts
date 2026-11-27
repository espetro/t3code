import { describe, expect, it } from "@effect/vitest";
import * as Effect from "effect/Effect";

import * as HostProcess from "./HostProcess.ts";

describe("IsExecutable", () => {
  it.effect("defaults to false without node:sea", () =>
    Effect.gen(function* () {
      expect(yield* HostProcess.IsExecutable).toBe(false);
    }),
  );

  it.effect("provided values still override the default", () =>
    Effect.gen(function* () {
      expect(
        yield* HostProcess.IsExecutable.pipe(
          Effect.provideService(HostProcess.IsExecutable, false),
        ),
      ).toBe(false);
      expect(
        yield* HostProcess.IsExecutable.pipe(Effect.provideService(HostProcess.IsExecutable, true)),
      ).toBe(true);
    }),
  );
});
