import * as NodeModule from "node:module";

import * as HostProcess from "@t3tools/shared/HostProcess";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";

export class CheckoutCloneError extends Schema.TaggedError<CheckoutCloneError>()(
  "CheckoutCloneError",
  {
    source: Schema.String,
    destination: Schema.String,
    errno: Schema.optional(Schema.Number),
    cause: Schema.optional(Schema.Defect()),
  },
) {
  override get message(): string {
    return `Could not clone ${this.source} to ${this.destination}${this.errno === undefined ? "" : ` (errno ${this.errno})`}.`;
  }
}

/**
 * Copies a file or a whole folder copy-on-write in one call, sharing data blocks until either
 * copy changes. The destination must not exist. Undefined where the platform has no such call.
 */
export const CheckoutCloner = Context.Reference<
  ((source: string, destination: string) => Effect.Effect<void, CheckoutCloneError>) | undefined
>("t3/vcs/CheckoutCloner", { defaultValue: () => undefined });

type ClonefileApi = (
  source: string,
  destination: string,
) => Promise<number | { readonly value: number; readonly errnoCode: number }>;

export const ClonefileLoaderRef = Context.Reference<(() => ClonefileApi) | undefined>(
  "t3/vcs/CheckoutCloner/ClonefileLoader",
  { defaultValue: () => loadClonefileApi },
);

// A single-executable server resolves packages on disk only through `require`.
const requireForFfi = NodeModule.createRequire(import.meta.url);

function loadClonefileApi(): ClonefileApi {
  // Built as two parts so scriptc does not treat ffi-rs as an eager native import.
  const ffiId = ["ffi", "rs"].join("-");
  const { DataType, load, open } = requireForFfi(ffiId) as {
    readonly DataType: { readonly I32: unknown; readonly String: unknown };
    readonly open: (input: { library: string; path: string }) => void;
    readonly load: (input: {
      library: string;
      funcName: string;
      retType: unknown;
      paramsType: ReadonlyArray<unknown>;
      paramsValue: ReadonlyArray<unknown>;
      errno: boolean;
      runInNewThread: boolean;
    }) => number | { readonly value: number; readonly errnoCode: number };
  };
  open({ library: "t3-libsystem", path: "/usr/lib/libSystem.B.dylib" });
  return (source: string, destination: string) =>
    Promise.resolve(
      load({
        library: "t3-libsystem",
        funcName: "clonefile",
        retType: DataType.I32,
        paramsType: [DataType.String, DataType.String, DataType.I32],
        // CLONE_NOFOLLOW: clone a symlink itself rather than its target.
        paramsValue: [source, destination, 0x0001],
        errno: true,
        // A large folder takes hundreds of milliseconds; keep it off the event loop.
        runInNewThread: true,
      }),
    );
}

/** macOS `clonefile(2)`, which clones a folder hierarchy in the kernel; elsewhere nothing. */
export const layer = Layer.effect(
  CheckoutCloner,
  Effect.gen(function* () {
    if ((yield* HostProcess.Platform) !== "darwin") return undefined;
    // scriptc has no N-API; skip rather than requiring ffi-rs into the native graph.
    if (yield* HostProcess.IsExecutable) return undefined;
    const load = yield* ClonefileLoaderRef;
    if (load === undefined) return undefined;
    const clonefile = yield* Effect.try({
      try: load,
      catch: () => new CheckoutCloneError({ source: "ffi-rs", destination: "clonefile" }),
    }).pipe(Effect.orElseSucceed(() => undefined));
    if (clonefile === undefined) return undefined;
    return Effect.fn("CheckoutCloner.clonefile")(function* (source: string, destination: string) {
      const result = yield* Effect.tryPromise({
        try: () => clonefile(source, destination),
        catch: (cause) => new CheckoutCloneError({ source, destination, cause }),
      });
      if (typeof result === "number" || result.value !== 0) {
        return yield* new CheckoutCloneError({
          source,
          destination,
          ...(typeof result === "number" ? {} : { errno: result.errnoCode }),
        });
      }
    });
  }),
);
