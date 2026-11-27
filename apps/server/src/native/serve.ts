import * as NodeCrypto from "node:crypto";
import * as NodeHttp from "node:http";
import type * as NodeNet from "node:net";
import * as NodeSqlite from "node:sqlite";

import * as Effect from "effect/Effect";

import { ensureMetricsSchema } from "./ensureMetricsSchema.ts";
import { hasNativeSession, issueNativeSession, sqlitePath } from "./sessionFile.ts";

const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

const bearerToken = (header: string | undefined): string => {
  const value = header === undefined ? "" : header;
  const match = /^Bearer\s+(\S+)/i.exec(value);
  if (match === null) return "";
  return String(match[1]);
};

const replayItems = (
  baseDir: string,
  threadId: string,
  afterSequence: number,
  requestCompletionMarker: boolean,
): Array<unknown> => {
  const db = new NodeSqlite.DatabaseSync(sqlitePath(baseDir), { readOnly: true });
  const items: Array<unknown> = [];
  try {
    const rows = db
      .prepare(
        `SELECT event_id, stream_id, stream_version, event_type, occurred_at, payload_json
         FROM orchestration_events
         WHERE stream_id = ? AND stream_version > ?
         ORDER BY stream_version ASC`,
      )
      .all(threadId, afterSequence);
    for (const row of rows) {
      const record = row as Record<string, unknown>;
      items.push({
        kind: "event",
        sequence: Number(record.stream_version),
        event: {
          id: String(record.event_id),
          threadId: String(record.stream_id),
          type: String(record.event_type),
          occurredAt: String(record.occurred_at),
          payload: JSON.parse(String(record.payload_json)),
        },
      });
    }
  } finally {
    db.close();
  }
  if (requestCompletionMarker) {
    items.push({ kind: "synchronized" });
  }
  return items;
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

const handleRpcMessage = (socket: NodeNet.Socket, baseDir: string, message: unknown) => {
  if (typeof message !== "object" || message === null) return;
  const row = message as Record<string, unknown>;
  if (row._tag === "Ping") {
    sendRpc(socket, { _tag: "Pong" });
    return;
  }
  if (row._tag !== "Request") return;
  const requestId = row.id;
  const method = String(row.tag === undefined ? "" : row.tag);
  const payload =
    typeof row.payload === "object" && row.payload !== null
      ? (row.payload as Record<string, unknown>)
      : {};
  if (method === "orchestration.subscribeThread") {
    const items = replayItems(
      baseDir,
      String(payload.threadId === undefined ? "" : payload.threadId),
      Number(payload.afterSequence === undefined ? 0 : payload.afterSequence),
      payload.requestCompletionMarker === true,
    );
    let index = 0;
    while (index < items.length) {
      const values = items.slice(index, index + 64);
      index = index + 64;
      if (values.length > 0) {
        sendRpc(socket, { _tag: "Chunk", requestId, values });
      }
    }
    sendRpc(socket, { _tag: "Exit", requestId, exit: { _tag: "Success", value: undefined } });
    return;
  }
  if (method === "orchestration.dispatchCommand") {
    sendRpc(socket, {
      _tag: "Exit",
      requestId,
      exit: { _tag: "Success", value: { sequence: 0 } },
    });
    return;
  }
  sendRpc(socket, {
    _tag: "Exit",
    requestId,
    exit: {
      _tag: "Failure",
      cause: [{ _tag: "Fail", error: { message: `unsupported ${method}` } }],
    },
  });
};

const attachWebSocket = (socket: NodeNet.Socket, baseDir: string) => {
  let buffer = Buffer.alloc(0);
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
      const decoded: unknown = JSON.parse(body.toString("utf8"));
      const messages = Array.isArray(decoded) ? decoded : [decoded];
      for (const item of messages) {
        handleRpcMessage(socket, baseDir, item);
      }
    }
  });
};

const listenNative = (options: {
  readonly baseDir: string;
  readonly host: string;
  readonly port: number;
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
      attachWebSocket(socket, options.baseDir);
    },
  );
  server.listen(options.port, options.host);
};

export const runNativeServe = (options: {
  readonly baseDir: string;
  readonly host: string;
  readonly port: number;
}) =>
  Effect.sync(() => {
    ensureMetricsSchema(options.baseDir);
    const pairingToken = issueNativeSession(options.baseDir);
    const originHost = options.host === "0.0.0.0" ? "127.0.0.1" : options.host;
    listenNative(options);
    process.stdout.write(
      `pairingUrl: http://${originHost}:${String(options.port)}/pair#token=${pairingToken}\n`,
    );
    setInterval(() => undefined, 1 << 30);
  });
