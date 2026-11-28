import * as Effect from "effect/Effect";

/** Read a factory scope bag without throwing on inner-only identifiers (scriptc#4381 splits). */
export const pickScriptcBindCtx = (ctx: object) =>
  new Proxy(ctx, {
    get(target, prop, receiver) {
      try {
        return Reflect.get(target, prop, receiver);
      } catch {
        return undefined;
      }
    },
    set(target, prop, value, receiver) {
      try {
        return Reflect.set(target, prop, value, receiver);
      } catch {
        return true;
      }
    },
  });

/**
 * Yield a split factory Effect. Bind inference leaves `R`/`E` as unknown; this
 * helper is the typed stand-in for the old per-call `as Effect.Effect<any, never, never>`.
 */
export function yieldNativeSplit(effect: any): Effect.Effect<any> {
  const run: Effect.Effect<any> = Effect.flatMap(effect, (value: any) => Effect.succeed(value));
  return run;
}
