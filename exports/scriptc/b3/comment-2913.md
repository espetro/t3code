cursor[bot] cannot push to this repo (403) or open a fork, so this is the proposed fix as a `git am` patch until a PR can land.

- Branch: `cursor/http-server-meta-4eae`
- Commit: `5c01e3cb7651a084fc18e97b8f5b2902c3d4e5f6` (`fix(http): lower Server off, listeners, and newListener`)
- Extra C is behind `SCR_HTTP_SERVER_META` when `processExtras` is on, so programs that never inspect or remove HTTP listeners keep the default `scr_http.c` object.
- Tests: `packages/compiler/test/http-server-meta.test.ts`; corpus `tests/corpus/http-server-meta.ts` (Node stdout matches the handoff)

Apply on `main`:

```sh
git am 0001-fix-http-lower-Server-off-listeners-and-newListener.patch
```

Repro that should compile with no diagnostics after the patch:

```ts
import * as http from "node:http";
const server = http.createServer();
const rejectRequest = (_req: http.IncomingMessage, res: http.ServerResponse) => {
  res.writeHead(503).end();
};
server.on("request", rejectRequest);
server.on("newListener", function onNewListener(event) {
  if (event === "request") server.off("request", rejectRequest);
  if (!server.listeners("request").includes(rejectRequest)) {
    server.off("newListener", onNewListener);
  }
});
```

Still out of scope: `res.on("error")` (fork-side). `listeners()` covers HTTP events only (`request` / `upgrade` / `connect` / `checkContinue` / `checkExpectation` / `clientError` / `newListener`), not net `error`/`close`/`connection`.

A PR will follow when write access exists.

```patch
From 5c01e3cb7651a084fc18e97b8f5b2902c3d4e5f6 Mon Sep 17 00:00:00 2001
From: Cursor Agent <cursoragent@cursor.com>
Date: Tue, 3 Nov 2026 07:34:07 +0000
Subject: [PATCH] fix(http): lower Server off, listeners, and newListener

HTTP Server is a net handle, not EventEmitter, so off/listeners/newListener
on request/upgrade and the other HTTP events had no lowering. Register the
meta APIs in the processExtras build of scr_http.c (SCR_HTTP_SERVER_META)
so programs that never inspect or remove HTTP listeners keep the default
object. newListener fires before each add, matching Node, which unblocks
the httpResponseErrorGuard handoff pattern.

Fixes #2913
---
 .../compiler/ambient/node-fallback/net.d.ts   |  36 +++-
 .../compiler/src/backend/llvm/lib-network.ts  |  14 ++
 .../compiler/src/backend/llvm/lib-shared.ts   |   2 +
 .../src/backend/native-link-info-core.ts      |   7 +-
 .../compiler/src/backend/native/contracts.ts  |   5 +-
 .../compiler/src/backend/native/executable.ts |   8 +-
 .../lowering/containers/array-methods.ts      |  18 ++
 .../src/frontend/lowering/lower-server.ts     | 115 ++++++++++---
 .../compiler/src/ir/builtin-signatures.ts     |   9 +
 packages/compiler/src/ir/runtime-features.ts  |  10 +-
 packages/compiler/src/ir/validate.ts          |  18 ++
 .../compiler/test/http-server-meta.test.ts    |  45 +++++
 .../tests/corpus/http-server-meta.ts.json     |   6 +
 .../runtime-pack-matrix.mjs                   |  10 ++
 packages/runtime/src/scr_http.c               | 157 ++++++++++++++++++
 packages/runtime/src/scr_http.h               |  20 +++
 packages/runtime/src/scr_net.c                |  22 ++-
 packages/runtime/src/scr_net.h                |   3 +
 tests/corpus/http-server-meta.ts              |  65 ++++++++
 .../corpus-costs/http-server-meta.ts.json     |   1 +
 20 files changed, 528 insertions(+), 43 deletions(-)
 create mode 100644 packages/compiler/test/http-server-meta.test.ts
 create mode 100644 packages/compiler/test/ts7/baselines/order-parity/tests/corpus/http-server-meta.ts.json
 create mode 100644 tests/corpus/http-server-meta.ts
 create mode 100644 tests/harness/corpus-costs/http-server-meta.ts.json

diff --git a/packages/compiler/ambient/node-fallback/net.d.ts b/packages/compiler/ambient/node-fallback/net.d.ts
index 4aefdf64e..cc302e629 100644
--- a/packages/compiler/ambient/node-fallback/net.d.ts
+++ b/packages/compiler/ambient/node-fallback/net.d.ts
@@ -224,6 +224,8 @@ declare module "net" {
       event: "request" | "checkContinue" | "checkExpectation",
       listener: (req: import("http").IncomingMessage, res: import("http").ServerResponse) => void,
     ): void;
+    /* Fires BEFORE each later listener add, with the event name. */
+    on(event: "newListener", listener: (event: string) => void): void;
     /* addListener IS on (Node aliases them) — the suite spells both. */
     addListener(event: "connection" | "secureConnection", listener: (socket: Socket) => void): void;
     /* tls and https servers: a handshake that failed */
@@ -245,6 +247,7 @@ declare module "net" {
       event: "request" | "checkContinue" | "checkExpectation",
       listener: (req: import("http").IncomingMessage, res: import("http").ServerResponse) => void,
     ): void;
+    addListener(event: "newListener", listener: (event: string) => void): void;
     once(event: "connection" | "secureConnection", listener: (socket: Socket) => void): void;
     /* tls and https servers: a handshake that failed */
     once(
@@ -265,15 +268,24 @@ declare module "net" {
       event: "request" | "checkContinue" | "checkExpectation",
       listener: (req: import("http").IncomingMessage, res: import("http").ServerResponse) => void,
     ): void;
+    once(event: "newListener", listener: (event: string) => void): void;
     /* off / removeListener: the LAST listener standing for the same
-     * function leaves that event's list (Node's EventEmitter order). The
-     * server registries that keep a removable list: error, close,
-     * listening, connection/secureConnection, timeout, and drop. */
+     * function leaves that event's list (Node's EventEmitter order). */
     off(event: "error", listener: (err: Error) => void): void;
     off(event: "close" | "listening", listener: () => void): void;
     off(event: "connection" | "secureConnection", listener: (socket: Socket) => void): void;
     off(event: "timeout", listener: (socket: Socket) => void): void;
     off(event: "drop", listener: (data?: DropArgument) => void): void;
+    off(
+      event: "request" | "checkContinue" | "checkExpectation",
+      listener: (req: import("http").IncomingMessage, res: import("http").ServerResponse) => void,
+    ): void;
+    off(
+      event: "upgrade" | "connect",
+      listener: (req: import("http").IncomingMessage, socket: Socket, head: Buffer) => void,
+    ): void;
+    off(event: "clientError", listener: (err: Error, socket: Socket) => void): void;
+    off(event: "newListener", listener: (event: string) => void): void;
     removeListener(event: "error", listener: (err: Error) => void): void;
     removeListener(event: "close" | "listening", listener: () => void): void;
     removeListener(
@@ -282,6 +294,24 @@ declare module "net" {
     ): void;
     removeListener(event: "timeout", listener: (socket: Socket) => void): void;
     removeListener(event: "drop", listener: (data?: DropArgument) => void): void;
+    removeListener(
+      event: "request" | "checkContinue" | "checkExpectation",
+      listener: (req: import("http").IncomingMessage, res: import("http").ServerResponse) => void,
+    ): void;
+    removeListener(
+      event: "upgrade" | "connect",
+      listener: (req: import("http").IncomingMessage, socket: Socket, head: Buffer) => void,
+    ): void;
+    removeListener(event: "clientError", listener: (err: Error, socket: Socket) => void): void;
+    removeListener(event: "newListener", listener: (event: string) => void): void;
+    listeners(
+      event: "request" | "checkContinue" | "checkExpectation",
+    ): Array<(req: import("http").IncomingMessage, res: import("http").ServerResponse) => void>;
+    listeners(
+      event: "upgrade" | "connect",
+    ): Array<(req: import("http").IncomingMessage, socket: Socket, head: Buffer) => void>;
+    listeners(event: "clientError"): Array<(err: Error, socket: Socket) => void>;
+    listeners(event: "newListener"): Array<(event: string) => void>;
   }
   /* The 'drop' payload: the turned-away connection's addresses. */
   export interface DropArgument {
diff --git a/packages/compiler/src/backend/llvm/lib-network.ts b/packages/compiler/src/backend/llvm/lib-network.ts
index 9f65ac70a..4b618f52c 100644
--- a/packages/compiler/src/backend/llvm/lib-network.ts
+++ b/packages/compiler/src/backend/llvm/lib-network.ts
@@ -624,6 +624,20 @@ export function emitNetworkHttpLibCall(host: LlvmEmitterContext, e: LibCallExpr)
     B.line(`${t} = call ptr @scr_http_create_server(ptr ${cb}, ptr ${adapter})`);
     return host.own({ name: t, type: e.type });
   }
+  if (e.fn === "http.serverOnNewListener") {
+    const cbT = e.args[1]!.type;
+    if (cbT.kind !== "func")
+      throw new InternalCompilerError("llvm emitter bug: http.serverOnNewListener listener not a func");
+    const args = e.args.map((a) => host.emitExpr(a));
+    host.toHeap(args[1]!);
+    const adapter = `scr_http_new_listener_thunk${Math.min(cbT.params.length, 2)}`;
+    host.declare(`declare void @${adapter}(ptr, ptr, ptr)`);
+    host.declare(`declare void @scr_http_server_on_new_listener(ptr, ptr, ptr, i1 zeroext)`);
+    B.line(
+      `call void @scr_http_server_on_new_listener(ptr ${args[0]!.name}, ptr ${args[1]!.name}, ptr @${adapter}, i1 ${args[2]!.name})`,
+    );
+    return { name: "", type: e.type };
+  }
   if (e.fn === "http.serverOnRequest" || e.fn === "http.serverOnCheck") {
     const cbT = e.args[1]!.type;
     if (cbT.kind !== "func")
diff --git a/packages/compiler/src/backend/llvm/lib-shared.ts b/packages/compiler/src/backend/llvm/lib-shared.ts
index 278246758..9616d9d74 100644
--- a/packages/compiler/src/backend/llvm/lib-shared.ts
+++ b/packages/compiler/src/backend/llvm/lib-shared.ts
@@ -1559,6 +1559,8 @@ export const LIB_FN_SYMS: Record<string, string> = {
   "net.sockSetRef": "scr_net_sock_set_ref",
   "net.serverSetRef": "scr_net_server_set_ref",
   "net.serverOff": "scr_net_server_off",
+  "http.serverOff": "scr_http_server_off",
+  "http.serverListeners": "scr_http_server_listeners",
   "net.sockWrite": "scr_net_sock_write_str",
   "net.sockWriteBytes": "scr_net_sock_write_bytes",
   "net.sockEnd": "scr_net_sock_end",
diff --git a/packages/compiler/src/backend/native-link-info-core.ts b/packages/compiler/src/backend/native-link-info-core.ts
index d7bb32b22..c0f500cda 100644
--- a/packages/compiler/src/backend/native-link-info-core.ts
+++ b/packages/compiler/src/backend/native-link-info-core.ts
@@ -54,9 +54,10 @@ export interface NativeLinkFeatures {
   fsFlags?: boolean;
   /** string_decoder's checked-dynamic chunk forms: scr_bytes_strdec_dyn.c. */
   strdecDyn?: boolean;
-  /** process.prependListener, stdin.isRaw or server.off: the
-   * SCR_PROCESS_EXTRAS builds of scr_events.c and scr_async_dyn.c and the
-   * SCR_NET_SERVER_OFF build of scr_net.c. */
+  /** process.prependListener, stdin.isRaw, server.off, or HTTP Server
+   * listeners()/newListener: the SCR_PROCESS_EXTRAS builds of
+   * scr_events.c and scr_async_dyn.c, the SCR_NET_SERVER_OFF build of
+   * scr_net.c, and the SCR_HTTP_SERVER_META build of scr_http.c. */
   processExtras?: boolean;
   /** A write completion callback takes the error argument: links the
    * SCR_STREAM_WRITE_ERRORS build of the stream unit. */
diff --git a/packages/compiler/src/backend/native/contracts.ts b/packages/compiler/src/backend/native/contracts.ts
index b71892356..729d7e376 100644
--- a/packages/compiler/src/backend/native/contracts.ts
+++ b/packages/compiler/src/backend/native/contracts.ts
@@ -225,8 +225,9 @@ export interface CcOptions {
   /** string_decoder's checked-dynamic chunk forms: compiles
    * scr_bytes_strdec_dyn.c. */
   strdecDyn?: boolean;
-  /** SCR_PROCESS_EXTRAS / SCR_NET_SERVER_OFF: process.prependListener,
-   * stdin.isRaw and server.off. */
+  /** SCR_PROCESS_EXTRAS / SCR_NET_SERVER_OFF / SCR_HTTP_SERVER_META:
+   * process.prependListener, stdin.isRaw, server.off, and HTTP Server
+   * listeners()/newListener. */
   processExtras?: boolean;
   /** SCR_STREAM_WRITE_ERRORS: the stream unit publishes the error each
    * write completion callback receives (error-taking write callbacks). */
diff --git a/packages/compiler/src/backend/native/executable.ts b/packages/compiler/src/backend/native/executable.ts
index f2cddbafc..40f28e72d 100644
--- a/packages/compiler/src/backend/native/executable.ts
+++ b/packages/compiler/src/backend/native/executable.ts
@@ -502,11 +502,13 @@ const RUNTIME_DEFINES: readonly {
   { define: "SCR_JS_OBJECT_MODEL", when: (opts) => opts.jsObjectModel },
   { define: "SCR_STDIO_EXTENDED", when: (opts) => opts.stdioExtended },
   // The wave's prepend registrations and stdin.isRaw (scr_events.c,
-  // scr_async_dyn.c), server.off (scr_net.c) and copyFile's mode form
-  // (scr_fs_cp.c). The source build compiles these units from source, so the
-  // defines must name the same builds runtime-pack-matrix.mjs selects.
+  // scr_async_dyn.c), server.off (scr_net.c), HTTP Server meta
+  // (scr_http.c) and copyFile's mode form (scr_fs_cp.c). The source
+  // build compiles these units from source, so the defines must name
+  // the same builds runtime-pack-matrix.mjs selects.
   { define: "SCR_PROCESS_EXTRAS", when: (opts) => opts.processExtras },
   { define: "SCR_NET_SERVER_OFF", when: (opts) => opts.processExtras },
+  { define: "SCR_HTTP_SERVER_META", when: (opts) => opts.processExtras },
   { define: "SCR_FS_FLAGS", when: (opts) => opts.fsFlags },
   // scr_child.c's spawnSync and exec/execFile-callback `cwd`/`input`/`shell`
   // entries.
diff --git a/packages/compiler/src/frontend/lowering/containers/array-methods.ts b/packages/compiler/src/frontend/lowering/containers/array-methods.ts
index cd9c3106f..1ec719fd6 100644
--- a/packages/compiler/src/frontend/lowering/containers/array-methods.ts
+++ b/packages/compiler/src/frontend/lowering/containers/array-methods.ts
@@ -1710,6 +1710,24 @@ function lowerArraySearchValues(
 
   // Preserve the existing fast path for an ordinary, non-union needle. Its
   // runtime implementation already has exact primitive/reference equality.
+  // Functions compare by identity regardless of parameter width (Node's
+  // Function ===), so listeners().includes(fn) works when the array is
+  // typed at the event's canonical arity and `fn` is a shorter prefix.
+  if (
+    method !== "lastIndexOf" &&
+    call.arguments.nodes.length === 1 &&
+    elem.kind === "func" &&
+    needle.type.kind === "func"
+  ) {
+    return {
+      kind: "arrIntrinsic",
+      method,
+      receiver,
+      args: [needle],
+      type: method === "includes" ? BOOL : F64,
+      loc,
+    };
+  }
   if (
     method !== "lastIndexOf" &&
     call.arguments.nodes.length === 1 &&
diff --git a/packages/compiler/src/frontend/lowering/lower-server.ts b/packages/compiler/src/frontend/lowering/lower-server.ts
index 79e6eec02..c7a74b814 100644
--- a/packages/compiler/src/frontend/lowering/lower-server.ts
+++ b/packages/compiler/src/frontend/lowering/lower-server.ts
@@ -376,6 +376,56 @@ function coerceToHandle(lowerer: Lowerer, node: ts.Expression, want: IrType): Ir
   return recv;
 }
 
+/** server.off / listeners kind: 1–6 are net.Server lists; 7–13 are the
+ * HTTP parser lists (SCR_HTTP_OFF_*). Null when the literal is unknown. */
+function serverListenerKind(event: string | null): number | null {
+  switch (event) {
+    case "error":
+      return 1;
+    case "close":
+      return 2;
+    case "listening":
+      return 3;
+    case "connection":
+    case "secureConnection":
+      return 4;
+    case "timeout":
+      return 5;
+    case "drop":
+      return 6;
+    case "request":
+      return 7;
+    case "upgrade":
+      return 8;
+    case "connect":
+      return 9;
+    case "checkContinue":
+      return 10;
+    case "checkExpectation":
+      return 11;
+    case "clientError":
+      return 12;
+    case "newListener":
+      return 13;
+    default:
+      return null;
+  }
+}
+
+function httpListenerArrayElem(kind: number): IrType {
+  switch (kind) {
+    case 8:
+    case 9:
+      return funcOf([HTTPREQ_T, NETSOCKET_T, BYTES_U8], VOID);
+    case 12:
+      return funcOf([{ kind: "object", className: "%Error" }, NETSOCKET_T], VOID);
+    case 13:
+      return funcOf([STRING], VOID);
+    default:
+      return funcOf([HTTPREQ_T, HTTPRES_T], VOID);
+  }
+}
+
 /** Statements that build a header record `out` (a pre-declared local of
  * the pure-index record `shapeId`) from a flat [name, value, ...] pairs
  * local: every value wraps at the slot's string arm, and — when
@@ -2298,6 +2348,25 @@ function lowerNetServerMethodCall(
         loc,
       };
     }
+    if (event === "newListener") {
+      // Fires BEFORE each later HTTP listener add, with the event name.
+      const { cb } = lowerCallbackArg(
+        lowerer,
+        args[1]!,
+        "newListener listeners",
+        2,
+        (p, i) => (i === 0 ? p.kind === "string" : p.kind === "func"),
+        "use (event) or (event, listener)",
+        [STRING],
+      );
+      return {
+        kind: "libCall",
+        fn: "http.serverOnNewListener",
+        args: [receiver, cb, once],
+        type: VOID,
+        loc,
+      };
+    }
     if (event === "sessionError") {
       const cb = lowerer.lowerExpr(args[1]!);
       if (cb.type.kind !== "func" || cb.type.ret.kind !== "void" || cb.type.params.length > 2) {
@@ -2329,7 +2398,7 @@ function lowerNetServerMethodCall(
     lowerer.noLowering(
       `server.${name}(${event === null ? "non-literal event" : `"${event}"`}, ...)`,
       args[0]!,
-      '"connection", "request", "checkContinue", "checkExpectation", "clientError", "drop", "stream", "session", "upgrade", "connect", "error", "close", "listening", and "sessionError" are the supported server events (as literals)',
+      '"connection", "request", "checkContinue", "checkExpectation", "clientError", "drop", "stream", "session", "upgrade", "connect", "error", "close", "listening", "sessionError", and "newListener" are the supported server events (as literals)',
     );
   }
   if ((name === "off" || name === "removeListener") && args.length === 2) {
@@ -2340,27 +2409,12 @@ function lowerNetServerMethodCall(
     requireStatementPosition(lowerer, call, `server.${name}(...)`);
     const evT = lowerer.typeOf(args[0]!);
     const event = evT.isStringLiteralType() ? evT.value : null;
-    const kind =
-      event === null
-        ? null
-        : event === "error"
-          ? 1
-          : event === "close"
-            ? 2
-            : event === "listening"
-              ? 3
-              : event === "connection" || event === "secureConnection"
-                ? 4
-                : event === "timeout"
-                  ? 5
-                  : event === "drop"
-                    ? 6
-                    : null;
+    const kind = serverListenerKind(event);
     if (kind === null) {
       lowerer.noLowering(
         `server.${name}(${event === null ? "non-literal event" : `"${event}"`}, ...)`,
         args[0]!,
-        '"error", "close", "listening", "connection", "secureConnection", "timeout", and "drop" are the events off/removeListener removes (as literals)',
+        '"error", "close", "listening", "connection", "secureConnection", "timeout", "drop", "request", "upgrade", "connect", "checkContinue", "checkExpectation", "clientError", and "newListener" are the events off/removeListener removes (as literals)',
       );
     }
     const receiver = coerceToHandle(lowerer, access.expression, NETSERVER_T);
@@ -2374,12 +2428,33 @@ function lowerNetServerMethodCall(
     }
     return {
       kind: "libCall",
-      fn: "net.serverOff",
+      fn: kind >= 7 ? "http.serverOff" : "net.serverOff",
       args: [receiver, listener, numLit(kind, loc)],
       type: VOID,
       loc,
     };
   }
+  if (name === "listeners" && args.length === 1) {
+    const evT = lowerer.typeOf(args[0]!);
+    const event = evT.isStringLiteralType() ? evT.value : null;
+    const kind = serverListenerKind(event);
+    if (kind === null || kind < 7) {
+      lowerer.noLowering(
+        `server.listeners(${event === null ? "non-literal event" : `"${event}"`})`,
+        args[0]!,
+        '"request", "upgrade", "connect", "checkContinue", "checkExpectation", "clientError", and "newListener" are the events listeners() reports (as literals)',
+      );
+    }
+    const receiver = coerceToHandle(lowerer, access.expression, NETSERVER_T);
+    const elem = httpListenerArrayElem(kind);
+    return {
+      kind: "libCall",
+      fn: "http.serverListeners",
+      args: [receiver, numLit(kind, loc)],
+      type: arrayOf(elem),
+      loc,
+    };
+  }
   if (name === "emit") {
     // The demux route: emit("connection", socket) hands an accepted
     // socket to ANOTHER server (portless's first-byte TLS peek). Only
@@ -2546,7 +2621,7 @@ function lowerNetServerMethodCall(
   lowerer.noLowering(
     `Server.${name}`,
     call,
-    'listen, close, address().port, emit("connection", socket), and on/once of connection/request/upgrade/error/close/listening/sessionError are the supported Server members',
+    'listen, close, address().port, emit("connection", socket), off/removeListener/listeners of the supported events, and on/once of connection/request/upgrade/error/close/listening/sessionError/newListener are the supported Server members',
     lowerer.checker.getSymbolAtLocation(access.name),
   );
 }
diff --git a/packages/compiler/src/ir/builtin-signatures.ts b/packages/compiler/src/ir/builtin-signatures.ts
index ffe115395..27e5d859a 100644
--- a/packages/compiler/src/ir/builtin-signatures.ts
+++ b/packages/compiler/src/ir/builtin-signatures.ts
@@ -1836,6 +1836,15 @@ function buildLibFnSignatures() {
      * 6 drop — the scr_net.h SCR_NET_OFF_* values); Node removes the most
      * recently added matching listener. Never throws. */
     "net.serverOff": { argTypes: [NETSERVER_T, null, F64], result: VOID },
+    /** server.off of HTTP events (kinds 7–13): request, upgrade, connect,
+     * checkContinue, checkExpectation, clientError, newListener. */
+    "http.serverOff": { argTypes: [NETSERVER_T, null, F64], result: VOID },
+    /** server.listeners(event) for those HTTP event lists: +1 closure array
+     * in registration order (the IR type is the event's listener array). */
+    "http.serverListeners": { argTypes: [NETSERVER_T, F64], result: VOID },
+    /** server.on("newListener", cb): fires BEFORE each later HTTP listener
+     * add, with the event name (and optionally the listener). */
+    "http.serverOnNewListener": { argTypes: [NETSERVER_T, null, BOOL], result: VOID },
     /** 'secureConnection' — the TLS server's deferred 'connection' list
      * (handshake-completion timing); on a server without deferred
      * connections (a plain net server) the registration never fires,
diff --git a/packages/compiler/src/ir/runtime-features.ts b/packages/compiler/src/ir/runtime-features.ts
index 49edb8a65..160f0e128 100644
--- a/packages/compiler/src/ir/runtime-features.ts
+++ b/packages/compiler/src/ir/runtime-features.ts
@@ -1603,12 +1603,16 @@ const RUNTIME_FEATURE_RULES = {
    * scr_bytes_strdec_dyn.c. */
   strdecDyn: rule({ fns: ["strdec.nextDyn", "strdec.writeDyn"] }),
   /** The process and stream event registries' extras — prependListener for
-   * signals, 'exit' and uncaught exceptions, stdin.isRaw, and server.off:
-   * the SCR_PROCESS_EXTRAS builds of scr_events.c and scr_async_dyn.c and
-   * the SCR_NET_SERVER_OFF build of scr_net.c. */
+   * signals, 'exit' and uncaught exceptions, stdin.isRaw, server.off, and
+   * HTTP Server meta (off/listeners/newListener): the SCR_PROCESS_EXTRAS
+   * builds of scr_events.c and scr_async_dyn.c, the SCR_NET_SERVER_OFF
+   * build of scr_net.c, and the SCR_HTTP_SERVER_META build of scr_http.c. */
   processExtras: rule({
     fns: [
       "net.serverOff",
+      "http.serverOff",
+      "http.serverListeners",
+      "http.serverOnNewListener",
       "process.prependExit",
       "process.prependSignal",
       "process.prependUncaughtException",
diff --git a/packages/compiler/src/ir/validate.ts b/packages/compiler/src/ir/validate.ts
index a3c55a0aa..52ffae3a4 100644
--- a/packages/compiler/src/ir/validate.ts
+++ b/packages/compiler/src/ir/validate.ts
@@ -4595,6 +4595,24 @@ function validateFunction(
       }
       return true;
     }
+    if (e.fn === "http.serverOnNewListener") {
+      const cbT = e.args[1]?.type;
+      let ok = cbT?.kind === "func" && cbT.ret.kind === "void" && cbT.params.length <= 2;
+      if (ok && cbT?.kind === "func") {
+        const [p0, p1] = cbT.params;
+        if (p0 !== undefined && p0.kind !== "string") ok = false;
+        if (p1 !== undefined && p1.kind !== "func") ok = false;
+      }
+      if (!ok) {
+        err(`libCall http.serverOnNewListener handler shape (frontend must fence)`, e.loc);
+      }
+      return true;
+    }
+    if (e.fn === "http.serverListeners") {
+      const ok = e.type.kind === "array" && e.type.elem.kind === "func";
+      if (!ok) err(`libCall http.serverListeners must return a func array`, e.loc);
+      return true;
+    }
     if (e.fn === "http.serverOnRequest" || e.fn === "http.serverOnCheck") {
       // The 'request' listener: the same shape as http.createServer's
       // handler — void, at most (req, res) in order.
diff --git a/packages/compiler/test/http-server-meta.test.ts b/packages/compiler/test/http-server-meta.test.ts
new file mode 100644
index 000000000..8f6e51682
--- /dev/null
+++ b/packages/compiler/test/http-server-meta.test.ts
@@ -0,0 +1,45 @@
+import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
+import { tmpdir } from "node:os";
+import { join } from "node:path";
+import { expect, test } from "vitest";
+import { analyze } from "../src/index.js";
+
+test("HTTP Server off, listeners, and newListener lower without diagnostics", () => {
+  const dir = mkdtempSync(join(tmpdir(), "scriptc-http-server-meta-"));
+  try {
+    const entry = join(dir, "main.ts");
+    writeFileSync(
+      entry,
+      `
+      import * as http from "node:http";
+      const server = http.createServer();
+      const rejectRequest = (_req: http.IncomingMessage, res: http.ServerResponse) => {
+        res.end("reject");
+      };
+      const rejectUpgrade = (_req: http.IncomingMessage, socket: import("net").Socket) => {
+        socket.end();
+      };
+      server.on("request", rejectRequest);
+      server.on("upgrade", rejectUpgrade);
+      server.on("newListener", function onNewListener(event) {
+        if (event === "request") server.off("request", rejectRequest);
+        if (event === "upgrade") server.off("upgrade", rejectUpgrade);
+        if (
+          !server.listeners("request").includes(rejectRequest) &&
+          !server.listeners("upgrade").includes(rejectUpgrade)
+        ) {
+          server.off("newListener", onNewListener);
+        }
+      });
+      server.on("request", (_req, res) => {
+        res.end("ok");
+      });
+      `,
+    );
+    const { coverage } = analyze(entry, {});
+    expect(coverage.preflightFailed).toBe(false);
+    expect(coverage.diagnostics).toEqual([]);
+  } finally {
+    rmSync(dir, { recursive: true, force: true });
+  }
+});
diff --git a/packages/compiler/test/ts7/baselines/order-parity/tests/corpus/http-server-meta.ts.json b/packages/compiler/test/ts7/baselines/order-parity/tests/corpus/http-server-meta.ts.json
new file mode 100644
index 000000000..2fcc42771
--- /dev/null
+++ b/packages/compiler/test/ts7/baselines/order-parity/tests/corpus/http-server-meta.ts.json
@@ -0,0 +1,6 @@
+{
+ "order": [
+  "<repo>/tests/corpus/http-server-meta.ts"
+ ],
+ "diags": []
+}
diff --git a/packages/runtime-pack-common/runtime-pack-matrix.mjs b/packages/runtime-pack-common/runtime-pack-matrix.mjs
index eeb109a69..bffa1e8c3 100644
--- a/packages/runtime-pack-common/runtime-pack-matrix.mjs
+++ b/packages/runtime-pack-common/runtime-pack-matrix.mjs
@@ -403,6 +403,16 @@ export function variantsFor(source) {
       defines: ["SCR_NET_SERVER_OFF"],
     });
   }
+  // HTTP Server off/listeners/newListener: a build of its own so a
+  // program that never inspects or removes HTTP listeners keeps the
+  // default object, byte for byte.
+  if (source === "scr_http.c") {
+    variants.push({
+      id: "server-meta",
+      when: { processExtras: true },
+      defines: ["SCR_HTTP_SERVER_META"],
+    });
+  }
   // Programs with web streams link the promise unit with native promise
   // reactions, the builtin-class unit whose instanceof knows their classes,
   // and the fetch unit that takes their streams as bodies; every other
diff --git a/packages/runtime/src/scr_http.c b/packages/runtime/src/scr_http.c
index a0922ac75..ef2e7ab5a 100644
--- a/packages/runtime/src/scr_http.c
+++ b/packages/runtime/src/scr_http.c
@@ -3177,11 +3177,19 @@ typedef struct ScrHttpSrvCtx {
   ScrNetLs upgrade_ls;
   ScrNetLs connect_ls; /* HTTP CONNECT — the upgrade machinery's twin */
   ScrNetLs client_error_ls; /* 'clientError' (err, socket) */
+#ifdef SCR_HTTP_SERVER_META
+  ScrNetLs new_listener_ls; /* 'newListener' (name, listener) — fires BEFORE add */
+#endif
   bool join_dup; /* createServer({ joinDuplicateHeaders: true }) */
   size_t max_header_size; /* createServer({ maxHeaderSize }); 0 = the default */
   bool require_host_header; /* HTTP/1.1 Host is required by default */
 } ScrHttpSrvCtx;
 
+#ifdef SCR_HTTP_SERVER_META
+static bool scr_http_prepare_add(ScrHttpSrvCtx *ctx, const char *event, size_t n,
+                                 ScrClosure *cb /*borrowed*/);
+#endif
+
 static ScrHttpSrvCtx *scr_http_srv_ctx_retain(ScrHttpSrvCtx *ctx) {
   ctx->rc++;
   return ctx;
@@ -3195,6 +3203,9 @@ static void scr_http_srv_ctx_release(ScrHttpSrvCtx *ctx) {
   scr_net_ls_drop(&ctx->upgrade_ls);
   scr_net_ls_drop(&ctx->connect_ls);
   scr_net_ls_drop(&ctx->client_error_ls);
+#ifdef SCR_HTTP_SERVER_META
+  scr_net_ls_drop(&ctx->new_listener_ls);
+#endif
   free(ctx);
 }
 
@@ -3213,6 +3224,9 @@ static void scr_http_srv_ctx_settle(void *p) {
   scr_net_ls_drop(&ctx->upgrade_ls);
   scr_net_ls_drop(&ctx->connect_ls);
   scr_net_ls_drop(&ctx->client_error_ls);
+#ifdef SCR_HTTP_SERVER_META
+  scr_net_ls_drop(&ctx->new_listener_ls);
+#endif
 }
 
 /* Combined HTTP/2 allowHTTP1 servers retain the HTTP/1 parser ctx behind
@@ -3226,6 +3240,13 @@ void scr_http1_ctx_on_request(void *p, ScrClosure *cb /*moves*/, ScrHttpReqFn fn
     scr_net_once_release(shared_once);
     return;
   }
+#ifdef SCR_HTTP_SERVER_META
+  if (!scr_http_prepare_add(ctx, "request", 7, cb)) {
+    scr_closure_release(cb);
+    scr_net_once_release(shared_once);
+    return;
+  }
+#endif
   if (shared_once != NULL) {
     scr_net_ls_add_shared_once(&ctx->request_ls, cb, (void *)fn, shared_once);
   } else {
@@ -3241,6 +3262,13 @@ void scr_http1_ctx_on_connect(void *p, ScrClosure *cb /*moves*/, ScrHttpUpgradeF
     scr_net_once_release(shared_once);
     return;
   }
+#ifdef SCR_HTTP_SERVER_META
+  if (!scr_http_prepare_add(ctx, "connect", 7, cb)) {
+    scr_closure_release(cb);
+    scr_net_once_release(shared_once);
+    return;
+  }
+#endif
   if (shared_once != NULL) {
     scr_net_ls_add_shared_once(&ctx->connect_ls, cb, (void *)fn, shared_once);
   } else {
@@ -3254,6 +3282,12 @@ void scr_http1_ctx_on_upgrade(void *p, ScrClosure *cb /*moves*/, ScrHttpUpgradeF
     scr_closure_release(cb);
     return;
   }
+#ifdef SCR_HTTP_SERVER_META
+  if (!scr_http_prepare_add(ctx, "upgrade", 7, cb)) {
+    scr_closure_release(cb);
+    return;
+  }
+#endif
   scr_net_ls_add(&ctx->upgrade_ls, cb, (void *)fn, once);
 }
 
@@ -4355,6 +4389,98 @@ void scr_http_server_allow_missing_host_header(ScrNetServer *s) {
   if (ctx != NULL && ctx->proto == SCR_NET_PROTO_HTTP1) ctx->require_host_header = false;
 }
 
+#ifdef SCR_HTTP_SERVER_META
+/* Node emits 'newListener' BEFORE the listener is added. Snapshot so a
+ * handler that offs itself (the httpResponseErrorGuard handoff) cannot
+ * skip later entries. */
+static void scr_http_fire_new_listener(ScrHttpSrvCtx *ctx, const char *event, size_t n,
+                                       ScrClosure *listener /*borrowed*/) {
+  if (ctx->new_listener_ls.n == 0) return;
+  ScrStr *name = scr_str_new(event, n);
+  ScrNetL *snap;
+  size_t nsnap = scr_net_ls_snapshot(&ctx->new_listener_ls, &snap);
+  for (size_t i = 0; i < nsnap; i++) {
+    if (!scr_exc_pending()) {
+      typedef void (*Fn)(ScrClosure *, ScrStr *, ScrClosure *);
+      scr_str_retain(name);
+      scr_closure_retain(listener);
+      ((Fn)snap[i].fn)(snap[i].cb, name, listener);
+    }
+    scr_closure_release(snap[i].cb);
+  }
+  free(snap);
+  scr_str_release(name);
+}
+
+static bool scr_http_prepare_add(ScrHttpSrvCtx *ctx, const char *event, size_t n,
+                                 ScrClosure *cb /*borrowed*/) {
+  scr_http_fire_new_listener(ctx, event, n, cb);
+  return !scr_exc_pending();
+}
+
+static ScrNetLs *scr_http_ls_for_kind(ScrHttpSrvCtx *ctx, double kind) {
+  if (kind == SCR_HTTP_OFF_REQUEST) return &ctx->request_ls;
+  if (kind == SCR_HTTP_OFF_UPGRADE) return &ctx->upgrade_ls;
+  if (kind == SCR_HTTP_OFF_CONNECT) return &ctx->connect_ls;
+  if (kind == SCR_HTTP_OFF_CHECK_CONTINUE) return &ctx->check_continue_ls;
+  if (kind == SCR_HTTP_OFF_CHECK_EXPECTATION) return &ctx->check_expectation_ls;
+  if (kind == SCR_HTTP_OFF_CLIENT_ERROR) return &ctx->client_error_ls;
+  if (kind == SCR_HTTP_OFF_NEW_LISTENER) return &ctx->new_listener_ls;
+  return NULL;
+}
+
+static ScrArrOps scr_http_closure_arr_ops = { &scr_closure_retain_v, &scr_closure_release_v,
+                                              &scr_closure_trace_v };
+
+void scr_http_new_listener_thunk2(ScrClosure *cb, ScrStr *name, ScrClosure *listener) {
+  ((void (*)(ScrClosure *, ScrStr *, ScrClosure *))cb->fn)(cb, name, listener);
+}
+void scr_http_new_listener_thunk1(ScrClosure *cb, ScrStr *name, ScrClosure *listener) {
+  scr_closure_release(listener);
+  ((void (*)(ScrClosure *, ScrStr *))cb->fn)(cb, name);
+}
+void scr_http_new_listener_thunk0(ScrClosure *cb, ScrStr *name, ScrClosure *listener) {
+  scr_str_release(name);
+  scr_closure_release(listener);
+  ((void (*)(ScrClosure *))cb->fn)(cb);
+}
+
+void scr_http_server_on_new_listener(ScrNetServer *s, ScrClosure *cb /*moves*/, void *fn,
+                                     bool once) {
+  ScrHttpSrvCtx *ctx = (ScrHttpSrvCtx *)scr_net_server_get_http_ctx(s);
+  if (ctx == NULL || ctx->proto != SCR_NET_PROTO_HTTP1 || scr_net_server_settled(s)) {
+    scr_closure_release(cb);
+    return;
+  }
+  if (!scr_http_prepare_add(ctx, "newListener", 11, cb)) {
+    scr_closure_release(cb);
+    return;
+  }
+  scr_net_ls_add(&ctx->new_listener_ls, cb, fn, once);
+}
+
+void scr_http_server_off(ScrNetServer *s, ScrClosure *cb /*borrowed*/, double kind) {
+  ScrHttpSrvCtx *ctx = (ScrHttpSrvCtx *)scr_net_server_get_http_ctx(s);
+  if (ctx == NULL || ctx->proto != SCR_NET_PROTO_HTTP1) return;
+  ScrNetLs *l = scr_http_ls_for_kind(ctx, kind);
+  if (l != NULL) scr_net_ls_off(l, cb);
+}
+
+ScrArr *scr_http_server_listeners(ScrNetServer *s, double kind) {
+  ScrArr *out = scr_arr_new_ops(&scr_http_closure_arr_ops, 0);
+  ScrHttpSrvCtx *ctx = (ScrHttpSrvCtx *)scr_net_server_get_http_ctx(s);
+  if (ctx == NULL || ctx->proto != SCR_NET_PROTO_HTTP1) return out;
+  ScrNetLs *l = scr_http_ls_for_kind(ctx, kind);
+  if (l == NULL) return out;
+  for (size_t i = 0; i < l->n; i++) {
+    ScrClosure *c = l->ls[i].cb;
+    ScrClosure *root = c->identity ? c->identity : c;
+    scr_arr_push_ref(out, scr_closure_retain(root));
+  }
+  return out;
+}
+#endif
+
 /* Late 'request' listener installs (server.on/once("request", ...)): the
  * http2 allowHTTP1 server's handler route, and http.Server's 'request'
  * event. On a server with no HTTP parser the closure releases
@@ -4377,6 +4503,12 @@ void scr_http_server_on_request(ScrNetServer *s, ScrClosure *cb /*moves*/, ScrHt
     scr_closure_release(cb);
     return;
   }
+#ifdef SCR_HTTP_SERVER_META
+  if (!scr_http_prepare_add(ctx, "request", 7, cb)) {
+    scr_closure_release(cb);
+    return;
+  }
+#endif
   scr_net_ls_add(&ctx->request_ls, cb, (void *)fn, once);
 }
 
@@ -4388,6 +4520,13 @@ void scr_http_server_on_check(ScrNetServer *s, ScrClosure *cb /*moves*/, ScrHttp
     scr_closure_release(cb);
     return;
   }
+#ifdef SCR_HTTP_SERVER_META
+  if (!scr_http_prepare_add(ctx, expectation ? "checkExpectation" : "checkContinue",
+                            expectation ? 16 : 13, cb)) {
+    scr_closure_release(cb);
+    return;
+  }
+#endif
   scr_net_ls_add(expectation ? &ctx->check_expectation_ls : &ctx->check_continue_ls, cb, (void *)fn,
                  once);
 }
@@ -4538,6 +4677,12 @@ void scr_http_server_on_connect(ScrNetServer *s, ScrClosure *cb /*moves*/,
     scr_closure_release(cb);
     return;
   }
+#ifdef SCR_HTTP_SERVER_META
+  if (!scr_http_prepare_add(ctx, "connect", 7, cb)) {
+    scr_closure_release(cb);
+    return;
+  }
+#endif
   scr_net_ls_add(&ctx->connect_ls, cb, (void *)h1_fn, once);
 }
 
@@ -4549,6 +4694,12 @@ void scr_http_server_on_client_error(ScrNetServer *s, ScrClosure *cb /*moves*/,
     scr_closure_release(cb);
     return;
   }
+#ifdef SCR_HTTP_SERVER_META
+  if (!scr_http_prepare_add(ctx, "clientError", 11, cb)) {
+    scr_closure_release(cb);
+    return;
+  }
+#endif
   scr_net_ls_add(&ctx->client_error_ls, cb, (void *)fn, once);
 }
 
@@ -4581,6 +4732,12 @@ void scr_http_server_on_upgrade(ScrNetServer *s, ScrClosure *cb /*moves*/, ScrHt
     scr_closure_release(cb);
     return;
   }
+#ifdef SCR_HTTP_SERVER_META
+  if (!scr_http_prepare_add(ctx, "upgrade", 7, cb)) {
+    scr_closure_release(cb);
+    return;
+  }
+#endif
   scr_net_ls_add(&ctx->upgrade_ls, cb, (void *)fn, once);
 }
 
diff --git a/packages/runtime/src/scr_http.h b/packages/runtime/src/scr_http.h
index 7a0cf48a7..a62f9fd6c 100644
--- a/packages/runtime/src/scr_http.h
+++ b/packages/runtime/src/scr_http.h
@@ -104,6 +104,26 @@ void scr_http2_stream_undef_call(ScrStr *member);
  * server) the closure releases unregistered: 'request' never fires
  * there, like Node. */
 void scr_http_server_on_request(ScrNetServer *s, ScrClosure *cb /*moves*/, ScrHttpReqFn fn, bool once);
+/* HTTP Server EventEmitter meta: off, listeners, and newListener for the
+ * HTTP event lists (request, upgrade, connect, checkContinue,
+ * checkExpectation, clientError, newListener). Defined in the
+ * SCR_HTTP_SERVER_META build (processExtras). Kinds 7-13 match the
+ * compiler's http.serverOff / http.serverListeners numbers. */
+enum {
+  SCR_HTTP_OFF_REQUEST = 7,
+  SCR_HTTP_OFF_UPGRADE = 8,
+  SCR_HTTP_OFF_CONNECT = 9,
+  SCR_HTTP_OFF_CHECK_CONTINUE = 10,
+  SCR_HTTP_OFF_CHECK_EXPECTATION = 11,
+  SCR_HTTP_OFF_CLIENT_ERROR = 12,
+  SCR_HTTP_OFF_NEW_LISTENER = 13,
+};
+void scr_http_server_off(ScrNetServer *s, ScrClosure *cb /*borrowed*/, double kind);
+ScrArr *scr_http_server_listeners(ScrNetServer *s, double kind); /* +1 closures */
+void scr_http_server_on_new_listener(ScrNetServer *s, ScrClosure *cb /*moves*/, void *fn, bool once);
+void scr_http_new_listener_thunk2(ScrClosure *cb, ScrStr *name, ScrClosure *listener);
+void scr_http_new_listener_thunk1(ScrClosure *cb, ScrStr *name, ScrClosure *listener);
+void scr_http_new_listener_thunk0(ScrClosure *cb, ScrStr *name, ScrClosure *listener);
 void scr_http1_ctx_on_request(void *ctx, ScrClosure *cb /*moves*/, ScrHttpReqFn fn, bool once,
                               ScrNetOnce *shared_once /*moves, nullable*/);
 void scr_http1_ctx_on_connect(void *ctx, ScrClosure *cb /*moves*/, ScrHttpUpgradeFn fn, bool once,
diff --git a/packages/runtime/src/scr_net.c b/packages/runtime/src/scr_net.c
index 658e4c0d3..364c296fc 100644
--- a/packages/runtime/src/scr_net.c
+++ b/packages/runtime/src/scr_net.c
@@ -2631,15 +2631,7 @@ void scr_net_server_on_close(ScrNetServer *s, ScrClosure *cb /*moves*/, bool onc
  * the most recently added match, so the scan runs back to front. The
  * SCR_NET_SERVER_OFF build of the unit carries it, so a program that never
  * removes a listener keeps the default object byte for byte. */
-void scr_net_server_off(ScrNetServer *s, ScrClosure *cb /*borrowed*/, double kind) {
-  ScrNetLs *l = kind == SCR_NET_OFF_ERROR      ? &s->err_ls
-                : kind == SCR_NET_OFF_CLOSE    ? &s->close_ls
-                : kind == SCR_NET_OFF_LISTENING ? &s->listening_cbs
-                : kind == SCR_NET_OFF_CONNECTION ? &s->conn_ls
-                : kind == SCR_NET_OFF_TIMEOUT  ? &s->timeout_ls
-                : kind == SCR_NET_OFF_DROP     ? &s->drop_ls
-                                               : NULL;
-  if (l == NULL) return;
+void scr_net_ls_off(ScrNetLs *l, ScrClosure *cb /*borrowed*/) {
   ScrClosure *root = cb->identity ? cb->identity : cb;
   for (size_t left = l->n; left > 0; left--) {
     size_t i = left - 1;
@@ -2651,6 +2643,18 @@ void scr_net_server_off(ScrNetServer *s, ScrClosure *cb /*borrowed*/, double kin
     return;
   }
 }
+
+void scr_net_server_off(ScrNetServer *s, ScrClosure *cb /*borrowed*/, double kind) {
+  ScrNetLs *l = kind == SCR_NET_OFF_ERROR      ? &s->err_ls
+                : kind == SCR_NET_OFF_CLOSE    ? &s->close_ls
+                : kind == SCR_NET_OFF_LISTENING ? &s->listening_cbs
+                : kind == SCR_NET_OFF_CONNECTION ? &s->conn_ls
+                : kind == SCR_NET_OFF_TIMEOUT  ? &s->timeout_ls
+                : kind == SCR_NET_OFF_DROP     ? &s->drop_ls
+                                               : NULL;
+  if (l == NULL) return;
+  scr_net_ls_off(l, cb);
+}
 #endif
 
 /* server.on('listening', cb): joins the deferred 'listening' list the
diff --git a/packages/runtime/src/scr_net.h b/packages/runtime/src/scr_net.h
index f088f6c35..7126583d3 100644
--- a/packages/runtime/src/scr_net.h
+++ b/packages/runtime/src/scr_net.h
@@ -211,6 +211,9 @@ enum {
   SCR_NET_OFF_DROP = 6,
 };
 void scr_net_server_off(ScrNetServer *s, ScrClosure *cb /*borrowed*/, double kind);
+/* Last matching listener leaves `l` (Node's removeListener order). The
+ * SCR_NET_SERVER_OFF build defines it; http server meta reuses it. */
+void scr_net_ls_off(ScrNetLs *l, ScrClosure *cb /*borrowed*/);
 void scr_net_server_on_connection(ScrNetServer *s, ScrClosure *cb /*moves*/, ScrNetConnFn fn, bool once);
 /* 'secureConnection' — the deferred-connection list (TLS handshake
  * timing); released unread on a server without deferral (a plain net
diff --git a/tests/corpus/http-server-meta.ts b/tests/corpus/http-server-meta.ts
new file mode 100644
index 000000000..d18562cfa
--- /dev/null
+++ b/tests/corpus/http-server-meta.ts
@@ -0,0 +1,65 @@
+// HTTP Server EventEmitter meta: newListener fires BEFORE the add,
+// off/removeListener drop the last matching HTTP listener, and
+// listeners() answers those functions by identity — the
+// httpResponseErrorGuard handoff (minus res.on("error")).
+import * as http from "node:http";
+
+const server = http.createServer();
+const rejectRequest = (_req: http.IncomingMessage, res: http.ServerResponse) => {
+  res.writeHead(503, { connection: "close" }).end("reject");
+};
+const rejectUpgrade = (_req: http.IncomingMessage, socket: import("net").Socket) => {
+  socket.end("upgrade-reject");
+};
+const serveRequest = (_req: http.IncomingMessage, res: http.ServerResponse) => {
+  res.end("ok");
+};
+
+server.on("request", rejectRequest);
+server.on("upgrade", rejectUpgrade);
+console.log(
+  "before",
+  server.listeners("request").includes(rejectRequest),
+  server.listeners("upgrade").includes(rejectUpgrade),
+  server.listeners("request").length,
+);
+
+server.on("newListener", function onNewListener(event) {
+  console.log("new", event, server.listeners("request").includes(rejectRequest));
+  if (event === "request") server.off("request", rejectRequest);
+  if (event === "upgrade") server.off("upgrade", rejectUpgrade);
+  if (
+    !server.listeners("request").includes(rejectRequest) &&
+    !server.listeners("upgrade").includes(rejectUpgrade)
+  ) {
+    server.off("newListener", onNewListener);
+    console.log("handoff");
+  }
+});
+
+server.on("request", serveRequest);
+console.log(
+  "after request",
+  server.listeners("request").includes(rejectRequest),
+  server.listeners("request").includes(serveRequest),
+  server.listeners("upgrade").includes(rejectUpgrade),
+);
+
+server.on("upgrade", (_req: http.IncomingMessage, socket: import("net").Socket) => {
+  socket.end("upgrade-ok");
+});
+console.log(
+  "after upgrade",
+  server.listeners("upgrade").includes(rejectUpgrade),
+  server.listeners("newListener").length,
+);
+
+server.listen(0, "127.0.0.1", () => {
+  const port = server.address().port;
+  const req = http.request({ host: "127.0.0.1", port, path: "/" }, (incoming) => {
+    console.log("status", incoming.statusCode);
+    incoming.on("data", (chunk: Buffer) => console.log("body", chunk.toString()));
+    incoming.on("end", () => server.close());
+  });
+  req.end();
+});
diff --git a/tests/harness/corpus-costs/http-server-meta.ts.json b/tests/harness/corpus-costs/http-server-meta.ts.json
new file mode 100644
index 000000000..da248bbc3
--- /dev/null
+++ b/tests/harness/corpus-costs/http-server-meta.ts.json
@@ -0,0 +1 @@
+{ "plain": 2800, "san": 6500 }
-- 
2.43.0

```
