import * as NodeEvents from "node:events";
import * as NodeStream from "node:stream";

import * as NodeServices from "@effect/platform-node/NodeServices";
import { assert, describe, it } from "@effect/vitest";
import * as HostProcess from "@t3tools/shared/HostProcess";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import { vi } from "vite-plus/test";

import * as PtyAdapter from "@t3tools/shared/PtyAdapter";
import * as HelperPtyAdapter from "./HelperPtyAdapter.ts";
import * as NodePtyAdapter from "./NodePtyAdapter.ts";
import { FrameDecoder, Request, Response, frame } from "./fancyPtyProtocol.ts";

function fakeChild() {
  const stdinChunks: Buffer[] = [];
  const stdout = new NodeEvents.EventEmitter();
  const stdin = new NodeStream.PassThrough();
  stdin.on("data", (chunk: Buffer) => stdinChunks.push(Buffer.from(chunk)));
  return {
    pid: 7,
    stdin,
    stdout,
    stderr: new NodeEvents.EventEmitter(),
    kill: vi.fn(),
    on: (event: string, listener: (...args: Array<unknown>) => void) => {
      if (event === "close") stdout.on("child-close", listener);
    },
    emitStdout(buffer: Buffer) {
      stdout.emit("data", buffer);
    },
    stdinChunks,
  };
}

const spawnInput = { shell: "/bin/sh", cwd: "/tmp", cols: 80, rows: 24, env: {} };

const layerFor = (child: ReturnType<typeof fakeChild>, isExecutable = false) => {
  const helper = HelperPtyAdapter.layer.pipe(
    Layer.provide(
      Layer.mergeAll(
        NodeServices.layer,
        Layer.succeed(HelperPtyAdapter.HelperPtyHelperPathRef, "/tmp/fancy-pty-helper"),
        Layer.succeed(HelperPtyAdapter.HelperPtySpawnerRef, () => child as never),
      ),
    ),
  );
  return isExecutable
    ? NodePtyAdapter.layer.pipe(
        Layer.provide(
          Layer.mergeAll(
            NodeServices.layer,
            Layer.succeed(HostProcess.IsExecutable, true),
            Layer.succeed(HelperPtyAdapter.HelperPtyHelperPathRef, "/tmp/fancy-pty-helper"),
            Layer.succeed(HelperPtyAdapter.HelperPtySpawnerRef, () => child as never),
          ),
        ),
      )
    : helper;
};

describe("HelperPtyAdapter", () => {
  it.effect("speaks the fancy-pty spawn/data/exit frames", () => {
    const child = fakeChild();
    return Effect.gen(function* () {
      const adapter = yield* PtyAdapter.PtyAdapter;
      const process = yield* adapter.spawn(spawnInput);
      const decoder = new FrameDecoder();
      const sent = decoder.push(Buffer.concat(child.stdinChunks));
      assert.equal(sent[0]?.kind, Request.Spawn);

      const output: string[] = [];
      const exits: PtyAdapter.PtyExitEvent[] = [];
      process.onData((data) => output.push(data));
      process.onExit((event) => exits.push(event));
      child.emitStdout(frame(Response.Pid, Buffer.from([42, 0, 0, 0])));
      child.emitStdout(frame(Response.Data, Buffer.from("hello", "utf8")));
      child.emitStdout(frame(Response.Exit, Buffer.from([0, 0, 0, 0])));
      assert.equal(process.pid, 42);
      assert.deepEqual(output, ["hello"]);
      assert.deepEqual(exits, [{ exitCode: 0, signal: null }]);
    }).pipe(Effect.provide(layerFor(child)));
  });

  it.effect("selects the helper adapter when the host is a native executable", () => {
    const child = fakeChild();
    return Effect.gen(function* () {
      const adapter = yield* PtyAdapter.PtyAdapter;
      yield* adapter.spawn(spawnInput);
      const decoder = new FrameDecoder();
      const sent = decoder.push(Buffer.concat(child.stdinChunks));
      assert.equal(sent[0]?.kind, Request.Spawn);
    }).pipe(Effect.provide(layerFor(child, true)));
  });

  it("names helper binaries beside the native executable", () => {
    assert.deepEqual(
      HelperPtyAdapter.fancyPtyHelperCandidates({
        execPath: "/usr/local/bin/t3",
        platform: "linux",
        architecture: "x64",
        join: (...parts) => parts.join("/"),
        dirname: (filePath) => filePath.slice(0, filePath.lastIndexOf("/")),
      }),
      [
        "/usr/local/bin/fancy-pty-helper",
        "/usr/local/bin/bin/linux-x64/fancy-pty-helper",
        "/usr/local/bin/pty/fancy-pty-helper",
      ],
    );
    assert.equal(HelperPtyAdapter.fancyPtyHelperFileName("win32"), "fancy-pty-helper.exe");
  });
});
