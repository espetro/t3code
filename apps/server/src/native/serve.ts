// @effect-diagnostics nodeBuiltinImport:off -- Native host binds node:http, not Effect HttpRouter.
import * as NodeCrypto from "node:crypto";
import * as NodeHttp from "node:http";
import type * as NodeNet from "node:net";

import { ThreadId } from "@t3tools/contracts/baseSchemas";
import {
  ORCHESTRATION_V2_WS_METHODS,
  OrchestrationV2Command,
} from "@t3tools/contracts/orchestrationV2";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Fiber from "effect/Fiber";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";
import * as Scope from "effect/Scope";
import * as Stream from "effect/Stream";

import * as EventSink from "../orchestration-v2/EventSink.ts";
import { dispatchCommand as intakeDispatch } from "./intake.ts";
import * as Orchestrator from "../orchestration-v2/Orchestrator.ts";
import {
  projectDomainEventForWire,
  threadStreamEventItem,
} from "../orchestration-v2/WireProjection.ts";
import { layerNativeServe } from "./orchestrationLayer.ts";
import { hasNativeSession, issueNativeSession } from "./sessionFile.ts";

const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const decodeCommand = Schema.decodeUnknownEffect(OrchestrationV2Command);

type NativeServices = Orchestrator.OrchestratorV2 | EventSink.EventSinkV2 | Scope.Scope;

const dispatchFailureMessage = (error: unknown): string => {
  const fallback = "Failed to dispatch orchestration command";
  if (typeof error !== "object" || error === null) return fallback;
  const message = Reflect.get(error, "message");
  if (message === undefined) return fallback;
  return String(message);
};

const bearerToken = (header: string | undefined): string => {
  const value = header === undefined ? "" : header;
  const match = /^Bearer\s+(\S+)/i.exec(value);
  if (match === null) return "";
  return String(match[1]);
};

const sendHttp = (
  response: NodeHttp.ServerResponse,
  status: number,
  body: string,
  contentType: string,
) => {
  response.writeHead(status, {
    "content-type": contentType,
    "content-length": String(Buffer.byteLength(body)),
  });
  response.end(body);
};

const sendWsText = (socket: NodeNet.Socket, text: string) => {
  const payload = Buffer.from(text);
  const length = payload.length;
  let header: Buffer;
  if (length < 126) {
    header = Buffer.alloc(2);
    header.writeUInt8(0x81, 0);
    header.writeUInt8(length, 1);
  } else if (length < 65536) {
    header = Buffer.alloc(4);
    header.writeUInt8(0x81, 0);
    header.writeUInt8(126, 1);
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.alloc(10);
    header.writeUInt8(0x81, 0);
    header.writeUInt8(127, 1);
    header.writeUInt32BE(0, 2);
    header.writeUInt32BE(length, 6);
  }
  socket.write(Buffer.concat([header, payload]));
};

const sendRpc = (socket: NodeNet.Socket, message: unknown) => {
  sendWsText(socket, JSON.stringify(message));
};

const unmask = (payload: Buffer, mask: Buffer): Buffer => {
  const out = Buffer.alloc(payload.length);
  for (let i = 0; i < payload.length; i++) {
    out.writeUInt8(payload.readUInt8(i) ^ mask.readUInt8(i % 4), i);
  }
  return out;
};

const sendFailure = (socket: NodeNet.Socket, requestId: unknown, message: string) => {
  sendRpc(socket, {
    _tag: "Exit",
    requestId,
    exit: {
      _tag: "Failure",
      cause: [{ _tag: "Fail", error: { message } }],
    },
  });
};

const sendSuccess = (socket: NodeNet.Socket, requestId: unknown, value: unknown) => {
  sendRpc(socket, {
    _tag: "Exit",
    requestId,
    exit: { _tag: "Success", value },
  });
};

const runInContext = <A, E>(
  context: Context.Context<NativeServices>,
  effect: Effect.Effect<A, E, NativeServices>,
) => Effect.runPromise(effect.pipe(Effect.provide(context)));

const handleSubscribe = (
  socket: NodeNet.Socket,
  context: Context.Context<NativeServices>,
  requestId: unknown,
  payload: Record<string, unknown>,
) => {
  const threadId = String(payload.threadId === undefined ? "" : payload.threadId);
  const afterSequence = Number(payload.afterSequence === undefined ? 0 : payload.afterSequence);
  const requestCompletionMarker = payload.requestCompletionMarker === true;
  const sink = Context.get(context, EventSink.EventSinkV2);
  if (requestCompletionMarker) {
    sendRpc(socket, {
      _tag: "Chunk",
      requestId,
      values: [{ kind: "synchronized" }],
    });
  }
  const fiber = Effect.runFork(
    sink
      .stream({
        threadId: ThreadId.make(threadId),
        afterSequence,
        bounded: true,
      })
      .pipe(
        Stream.map((stored) =>
          threadStreamEventItem({
            ...stored,
            event: projectDomainEventForWire(stored.event),
          }),
        ),
        Stream.runForEach((item) =>
          Effect.sync(() => {
            sendRpc(socket, { _tag: "Chunk", requestId, values: [item] });
          }),
        ),
        Effect.provide(context),
      ),
  );
  socket.once("close", () => {
    Effect.runFork(Fiber.interrupt(fiber));
  });
};

const handleDispatch = (
  socket: NodeNet.Socket,
  context: Context.Context<NativeServices>,
  requestId: unknown,
  payload: unknown,
) => {
  void runInContext(
    context,
    decodeCommand(payload).pipe(
      Effect.flatMap((command) => intakeDispatch(command, { managesProviders: true })),
      Effect.match({
        onFailure: (error) => {
          sendFailure(socket, requestId, dispatchFailureMessage(error));
        },
        onSuccess: (result) => {
          sendSuccess(socket, requestId, { sequence: result.sequence });
        },
      }),
    ),
  );
};

const handleRpcMessage = (
  socket: NodeNet.Socket,
  context: Context.Context<NativeServices>,
  message: unknown,
) => {
  if (typeof message !== "object" || message === null) return;
  const tag = Reflect.get(message, "_tag");
  if (tag === "Ping") {
    sendRpc(socket, { _tag: "Pong" });
    return;
  }
  if (tag !== "Request") return;
  const requestId = Reflect.get(message, "id");
  const method = String(Reflect.get(message, "tag") ?? "");
  const rawPayload = Reflect.get(message, "payload");
  const payload: Record<string, unknown> = {};
  if (typeof rawPayload === "object" && rawPayload !== null && !Array.isArray(rawPayload)) {
    for (const key of Object.keys(rawPayload)) {
      payload[key] = Reflect.get(rawPayload, key);
    }
  }
  if (method === ORCHESTRATION_V2_WS_METHODS.subscribeThread) {
    handleSubscribe(socket, context, requestId, payload);
    return;
  }
  if (method === ORCHESTRATION_V2_WS_METHODS.dispatchCommand) {
    handleDispatch(socket, context, requestId, payload);
    return;
  }
  sendFailure(socket, requestId, `unsupported ${method}`);
};

const attachWebSocket = (
  socket: NodeNet.Socket,
  context: Context.Context<NativeServices>,
  head: Buffer,
) => {
  let buffer = head.length === 0 ? Buffer.alloc(0) : Buffer.from(head);
  socket.on("data", (chunk: Buffer) => {
    buffer = Buffer.concat([buffer, chunk]);
    while (buffer.length >= 2) {
      const second = buffer.readUInt8(1);
      const masked = (second & 0x80) !== 0;
      let offset = 2;
      let length = second & 0x7f;
      if (length === 126) {
        if (buffer.length < 4) return;
        length = buffer.readUInt16BE(2);
        offset = 4;
      } else if (length === 127) {
        if (buffer.length < 10) return;
        length = Number(buffer.readBigUInt64BE(2));
        offset = 10;
      }
      const maskBytes = masked ? 4 : 0;
      if (buffer.length < offset + maskBytes + length) return;
      const opcode = buffer.readUInt8(0) & 0x0f;
      const mask = masked ? buffer.subarray(offset, offset + 4) : Buffer.alloc(4);
      const payload = buffer.subarray(offset + maskBytes, offset + maskBytes + length);
      buffer = buffer.subarray(offset + maskBytes + length);
      if (opcode === 8) {
        socket.end();
        return;
      }
      if (opcode === 9) {
        const pong = Buffer.alloc(2 + payload.length);
        pong.writeUInt8(0x8a, 0);
        pong.writeUInt8(payload.length, 1);
        payload.copy(pong, 2);
        socket.write(pong);
        continue;
      }
      if (opcode !== 1) continue;
      const body = masked ? unmask(payload, mask) : payload;
      let decoded: unknown;
      try {
        decoded = JSON.parse(body.toString("utf8"));
      } catch {
        continue;
      }
      const messages = Array.isArray(decoded) ? decoded : [decoded];
      for (const item of messages) {
        handleRpcMessage(socket, context, item);
      }
    }
  });
};

export const listenNative = (options: {
  readonly baseDir: string;
  readonly host: string;
  readonly port: number;
  readonly context: Context.Context<NativeServices>;
}) => {
  const server = NodeHttp.createServer((request, response) => {
    const path = request.url === undefined ? "/" : request.url;
    const url = new URL(path, "http://127.0.0.1");
    if (request.method === "GET" && url.pathname === "/pair") {
      sendHttp(response, 200, "<!doctype html><title>pair</title>", "text/html; charset=utf-8");
      return;
    }
    if (request.method === "POST" && url.pathname === "/api/auth/websocket-ticket") {
      const header = request.headers.authorization;
      const token = bearerToken(typeof header === "string" ? header : undefined);
      if (!hasNativeSession(options.baseDir, token)) {
        sendHttp(response, 401, "unauthorized", "text/plain; charset=utf-8");
        return;
      }
      sendHttp(response, 200, JSON.stringify({ ticket: token }), "application/json");
      return;
    }
    sendHttp(response, 404, "not found", "text/plain; charset=utf-8");
  });
  server.on(
    "upgrade",
    (request: NodeHttp.IncomingMessage, socket: NodeNet.Socket, _head: Buffer) => {
      const path = request.url === undefined ? "/" : request.url;
      const url = new URL(path, "http://127.0.0.1");
      const ticketHeader = url.searchParams.get("wsTicket");
      const ticket = ticketHeader === null ? "" : ticketHeader;
      const keyHeader = request.headers["sec-websocket-key"];
      const key = typeof keyHeader === "string" ? keyHeader : "";
      if (
        url.pathname !== "/ws" ||
        !hasNativeSession(options.baseDir, ticket) ||
        key.length === 0
      ) {
        socket.write("HTTP/1.1 401 Unauthorized\r\nConnection: close\r\n\r\n");
        socket.destroy();
        return;
      }
      const accept = NodeCrypto.createHash("sha1")
        .update(key + WS_GUID)
        .digest("base64");
      socket.write(
        `HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ${accept}\r\n\r\n`,
      );
      attachWebSocket(socket, options.context, _head);
    },
  );
  return server;
};

export const startNativeServe = Effect.fn("native.startServe")(function* (options: {
  readonly baseDir: string;
  readonly host: string;
  readonly port: number;
}) {
  const context = yield* Layer.build(layerNativeServe(options.baseDir));
  const pairingToken = issueNativeSession(options.baseDir);
  const server = listenNative({
    baseDir: options.baseDir,
    host: options.host,
    port: options.port,
    context: context as Context.Context<NativeServices>,
  });
  yield* Effect.callback<void>((resume) => {
    server.listen(options.port, options.host, () => {
      resume(Effect.void);
    });
  });
  const address = server.address();
  const port = typeof address === "object" && address !== null ? address.port : options.port;
  yield* Effect.addFinalizer(() =>
    Effect.callback<void>((resume) => {
      server.close(() => {
        resume(Effect.void);
      });
    }),
  );
  return { pairingToken, port, host: options.host };
});

export const runNativeServe = (options: {
  readonly baseDir: string;
  readonly host: string;
  readonly port: number;
}) =>
  Effect.scoped(
    Effect.gen(function* () {
      const started = yield* startNativeServe(options);
      const originHost = options.host === "0.0.0.0" ? "127.0.0.1" : options.host;
      process.stdout.write(
        `pairingUrl: http://${originHost}:${String(started.port)}/pair#token=${started.pairingToken}\n`,
      );
      yield* Effect.callback<void>((_resume) => {
        setInterval(() => undefined, 1 << 30);
      });
    }),
  );
