import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";

import { ORCHESTRATION_V2_WS_METHODS } from "@t3tools/contracts/orchestrationV2";
import { assert, it } from "@effect/vitest";
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";

import { startNativeServe } from "./serve.ts";

const waitMessage = (socket: WebSocket) =>
  Effect.callback<unknown>((resume) => {
    const onMessage = (event: MessageEvent) => {
      socket.removeEventListener("message", onMessage);
      resume(Effect.succeed(JSON.parse(String(event.data))));
    };
    socket.addEventListener("message", onMessage);
  });

it.live("native serve pairs, tickets, and dispatches through Orchestrator", () =>
  Effect.gen(function* () {
    const baseDir = yield* Effect.sync(() =>
      NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-native-serve-")),
    );
    const started = yield* startNativeServe({
      baseDir,
      host: "127.0.0.1",
      port: 0,
    });
    const pair = yield* Effect.promise(() =>
      fetch(`http://127.0.0.1:${String(started.port)}/pair`).then((response) => response.status),
    );
    assert.equal(pair, 200);
    const denied = yield* Effect.promise(() =>
      fetch(`http://127.0.0.1:${String(started.port)}/api/auth/websocket-ticket`, {
        method: "POST",
        headers: { authorization: "Bearer no" },
      }).then((response) => response.status),
    );
    assert.equal(denied, 401);
    const ticket = yield* Effect.promise(() =>
      fetch(`http://127.0.0.1:${String(started.port)}/api/auth/websocket-ticket`, {
        method: "POST",
        headers: { authorization: `Bearer ${started.pairingToken}` },
      }).then((response) => response.json() as Promise<{ ticket: string }>),
    );
    assert.equal(ticket.ticket, started.pairingToken);
    const opened = yield* Deferred.make<WebSocket>();
    const socket = new WebSocket(
      `ws://127.0.0.1:${String(started.port)}/ws?wsTicket=${encodeURIComponent(started.pairingToken)}`,
    );
    socket.addEventListener("open", () => {
      Deferred.doneUnsafe(opened, Effect.succeed(socket));
    });
    yield* Deferred.await(opened);
    socket.send(
      JSON.stringify({
        _tag: "Request",
        id: "1",
        tag: ORCHESTRATION_V2_WS_METHODS.dispatchCommand,
        payload: { type: "not-a-command" },
      }),
    );
    const dispatch = (yield* waitMessage(socket)) as {
      _tag: string;
      exit: { _tag: string };
    };
    assert.equal(dispatch._tag, "Exit");
    assert.equal(dispatch.exit._tag, "Failure");
    socket.send(
      JSON.stringify({
        _tag: "Request",
        id: "2",
        tag: ORCHESTRATION_V2_WS_METHODS.subscribeThread,
        payload: {
          threadId: "thread:missing",
          afterSequence: 0,
          requestCompletionMarker: true,
        },
      }),
    );
    const subscribe = (yield* waitMessage(socket)) as { _tag: string };
    assert.notEqual(subscribe._tag, "Exit");
    socket.close();
  }).pipe(Effect.scoped),
);
