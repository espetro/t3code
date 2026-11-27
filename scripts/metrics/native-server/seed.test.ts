import * as NodeFS from "node:fs";
import * as NodeOS from "node:os";
import * as NodePath from "node:path";

import { describe, expect, it } from "vite-plus/test";

import {
  emitPackedClient,
  PACKED_CLIENT_INDEX_HTML,
} from "../../../apps/server/scripts/packClient.ts";
import {
  encodeSubscribeThreadItem,
  emptyThreadProjection,
  NATIVE_SERVER_BENCH_THREAD_ID,
  nativeServerBenchSubscribeEvent,
  nativeServerBenchThreadJson,
  nativeServerBenchTurnItemJson,
} from "./seed.ts";

describe("native-server bench seed", () => {
  it("encodes a seeded turn-item event on subscribeThread", () => {
    const encoded = encodeSubscribeThreadItem(
      nativeServerBenchSubscribeEvent(NATIVE_SERVER_BENCH_THREAD_ID, 0, 1),
    );
    expect(encoded).toMatchObject({
      kind: "event",
      sequence: 1,
      event: {
        type: "turn-item.updated",
        payload: { type: "command_execution", input: "ok" },
      },
    });
    expect(JSON.stringify(encoded)).toContain("command_execution");
  });

  it("encodes a snapshot built from the seeded thread and turn item", () => {
    const encoded = encodeSubscribeThreadItem({
      kind: "snapshot",
      snapshotSequence: 3000,
      projection: emptyThreadProjection(NATIVE_SERVER_BENCH_THREAD_ID),
    });
    expect(encoded).toMatchObject({
      kind: "snapshot",
      snapshotSequence: 3000,
    });
    expect(JSON.stringify(encoded)).toContain(NATIVE_SERVER_BENCH_THREAD_ID);
  });

  it("stores JSON that round-trips the thread and turn-item payloads", () => {
    JSON.parse(nativeServerBenchThreadJson(NATIVE_SERVER_BENCH_THREAD_ID));
    JSON.parse(nativeServerBenchTurnItemJson(NATIVE_SERVER_BENCH_THREAD_ID, 0));
  });
});

describe("emitPackedClient", () => {
  it("writes a pairing shell when the web dist is missing", () => {
    const root = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-pack-client-"));
    const distDir = NodePath.join(root, "dist");
    const source = emitPackedClient({
      distDir,
      webDist: NodePath.join(root, "web-missing"),
    });
    expect(source).toBe("pairing-shell");
    expect(NodeFS.readFileSync(NodePath.join(distDir, "client", "index.html"), "utf8")).toBe(
      PACKED_CLIENT_INDEX_HTML,
    );
  });

  it("copies an existing web dist into dist/client", () => {
    const root = NodeFS.mkdtempSync(NodePath.join(NodeOS.tmpdir(), "t3-pack-client-"));
    const distDir = NodePath.join(root, "dist");
    const webDist = NodePath.join(root, "web");
    NodeFS.mkdirSync(webDist, { recursive: true });
    NodeFS.writeFileSync(NodePath.join(webDist, "index.html"), "<html>web</html>");
    expect(emitPackedClient({ distDir, webDist })).toBe("web");
    expect(NodeFS.readFileSync(NodePath.join(distDir, "client", "index.html"), "utf8")).toBe(
      "<html>web</html>",
    );
  });
});
