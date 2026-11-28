/** Read/write a factory scope bag without throwing on inner-only identifiers (scriptc tsc-ts splits). */
export const pickBindCtx = (ctx: object): any =>
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
        return false;
      }
    },
  });
