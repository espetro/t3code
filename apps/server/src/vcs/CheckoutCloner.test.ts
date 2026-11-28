import * as NodeServices from "@effect/platform-node/NodeServices";
import { assert, describe, it } from "@effect/vitest";
import * as HostProcess from "@t3tools/shared/HostProcess";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";

import * as CheckoutCloner from "./CheckoutCloner.ts";

const provide = (
  platform: NodeJS.Platform,
  isExecutable: boolean,
  loader:
    | (() => (
        source: string,
        destination: string,
      ) => Promise<number | { readonly value: number; readonly errnoCode: number }>)
    | undefined,
) =>
  CheckoutCloner.layer.pipe(
    Layer.provide(
      Layer.mergeAll(
        NodeServices.layer,
        Layer.succeed(HostProcess.Platform, platform),
        Layer.succeed(HostProcess.IsExecutable, isExecutable),
        Layer.succeed(CheckoutCloner.ClonefileLoaderRef, loader),
      ),
    ),
  );

describe("CheckoutCloner", () => {
  it.effect("is undefined off macOS", () =>
    Effect.gen(function* () {
      const cloner = yield* CheckoutCloner.CheckoutCloner;
      assert.isUndefined(cloner);
    }).pipe(Effect.provide(provide("linux", false, undefined))),
  );

  it.effect("skips clonefile on a native executable that cannot load ffi-rs", () =>
    Effect.gen(function* () {
      const cloner = yield* CheckoutCloner.CheckoutCloner;
      assert.isUndefined(cloner);
    }).pipe(
      Effect.provide(
        provide("darwin", true, () => {
          throw new Error("ffi-rs must not load under scriptc");
        }),
      ),
    ),
  );

  it.effect("is undefined when the ffi-rs loader is missing", () =>
    Effect.gen(function* () {
      const cloner = yield* CheckoutCloner.CheckoutCloner;
      assert.isUndefined(cloner);
    }).pipe(Effect.provide(provide("darwin", false, undefined))),
  );

  it.effect("clones through a loaded clonefile binding", () => {
    const calls: Array<[string, string]> = [];
    return Effect.gen(function* () {
      const cloner = yield* CheckoutCloner.CheckoutCloner;
      assert.isDefined(cloner);
      yield* cloner!("/src", "/dest");
      assert.deepEqual(calls, [["/src", "/dest"]]);
    }).pipe(
      Effect.provide(
        provide("darwin", false, () => (source, destination) => {
          calls.push([source, destination]);
          return Promise.resolve({ value: 0, errnoCode: 0 });
        }),
      ),
    );
  });
});
