// These guards run on the raw Node HTTP server before Effect handles requests.
// @effect-diagnostics nodeBuiltinImport:off
import type * as NodeHttp from "node:http";
import type * as NodeStream from "node:stream";

export function guardHttpResponseWriteErrors<T extends NodeHttp.Server>(
  server: T,
  onError?: (error: unknown) => void,
): T {
  server.on("request", (_request, response) => {
    containWritableErrors(response, onError);
  });
  server.on("upgrade", (_request, socket) => {
    containWritableErrors(socket, onError);
  });
  return server;
}

/**
 * NodeHttpServer listens before serve() attaches its handlers, so requests in
 * between would hang. Install this after the write-error guards so only the
 * serving handlers trigger the handoff.
 */
export function rejectRequestsUntilServing<T extends NodeHttp.Server>(server: T): T {
  const rejectRequest = (_request: NodeHttp.IncomingMessage, response: NodeHttp.ServerResponse) => {
    response.writeHead(503, { "retry-after": "1", connection: "close" }).end();
  };
  const rejectUpgrade = (_request: NodeHttp.IncomingMessage, socket: NodeStream.Duplex) => {
    socket.end(
      "HTTP/1.1 503 Service Unavailable\r\nRetry-After: 1\r\nConnection: close\r\nContent-Length: 0\r\n\r\n",
    );
  };
  server.on("request", rejectRequest);
  server.on("upgrade", rejectUpgrade);
  // Node emits newListener before adding the handler, making the handoff synchronous.
  server.on("newListener", function onNewListener(event) {
    if (event === "request") server.off("request", rejectRequest);
    if (event === "upgrade") server.off("upgrade", rejectUpgrade);
    if (
      !server.listeners("request").includes(rejectRequest) &&
      !server.listeners("upgrade").includes(rejectUpgrade)
    ) {
      server.off("newListener", onNewListener);
    }
  });
  return server;
}

function containWritableErrors(
  writable: NodeStream.Writable,
  onError?: (error: unknown) => void,
): void {
  const write = writable.write;
  const end = writable.end;
  const closed = () => writable.destroyed || writable.writableEnded || writable.writableAborted;
  writable.write = function (this: NodeStream.Writable, ...args: unknown[]) {
    if (closed()) return false;
    try {
      return Reflect.apply(write, this, args);
    } catch (error) {
      onError?.(error);
      return false;
    }
  } as typeof writable.write;
  writable.end = function (this: NodeStream.Writable, ...args: unknown[]) {
    if (closed()) return this;
    try {
      return Reflect.apply(end, this, args);
    } catch (error) {
      onError?.(error);
      return this;
    }
  } as typeof writable.end;
  const emit = writable.emit;
  writable.emit = function (this: NodeStream.Writable, event: string | symbol, ...args: unknown[]) {
    if (event === "error") {
      onError?.(args[0]);
      return true;
    }
    return emit.apply(this, [event, ...args] as never);
  };
}
