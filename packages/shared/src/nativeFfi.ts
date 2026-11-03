/** Swap `loadFfiRs` / `requireFfiRs` to `@cutils/ffi` or a libnode island; do not import `ffi-rs` at call sites. */
export type NativeFfiDataType = (typeof import("ffi-rs"))["DataType"];
export type NativeFfiLoad = (typeof import("ffi-rs"))["load"];
export type NativeFfiOpen = (typeof import("ffi-rs"))["open"];

export interface NativeFfi {
  readonly DataType: NativeFfiDataType;
  readonly load: NativeFfiLoad;
  readonly open: NativeFfiOpen;
}

export const loadFfiRs = async (): Promise<NativeFfi> => import("ffi-rs");

export const requireFfiRs = (requireFn: NodeJS.Require): NativeFfi =>
  requireFn("ffi-rs") as NativeFfi;
