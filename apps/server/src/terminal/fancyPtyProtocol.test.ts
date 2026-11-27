import { assert, describe, it } from "@effect/vitest";

import {
  FrameDecoder,
  HEADER_BYTES,
  Request,
  Response,
  clampDimension,
  encodeResize,
  encodeSpawn,
  frame,
} from "./fancyPtyProtocol.ts";

describe("fancyPtyProtocol", () => {
  it("frames a spawn request the helper can parse", () => {
    const payload = encodeSpawn({
      argv: ["/bin/sh", "-l"],
      cwd: "/tmp",
      env: { TERM: "xterm-256color", EMPTY: undefined },
      cols: 80,
      rows: 24,
    });
    const encoded = frame(Request.Spawn, payload);
    assert.equal(encoded[0], Request.Spawn);
    assert.equal(encoded.readUInt32LE(1), payload.length);
    assert.equal(payload.readUInt16LE(0), 80);
    assert.equal(payload.readUInt16LE(2), 24);
  });

  it("decodes split and coalesced helper frames", () => {
    const decoder = new FrameDecoder();
    const first = frame(Response.Pid, Buffer.from([1, 0, 0, 0]));
    const second = frame(Response.Data, Buffer.from("hi", "utf8"));
    assert.deepEqual(decoder.push(first.subarray(0, 3)), []);
    const rest = Buffer.concat([first.subarray(3), second]);
    const frames = decoder.push(rest);
    assert.equal(frames.length, 2);
    assert.equal(frames[0]?.kind, Response.Pid);
    assert.equal(frames[0]?.payload.readUInt32LE(0), 1);
    assert.equal(frames[1]?.kind, Response.Data);
    assert.equal(frames[1]?.payload.toString("utf8"), "hi");
    assert.equal(HEADER_BYTES, 5);
  });

  it("clamps a zero resize instead of refusing the pty", () => {
    assert.equal(clampDimension(0), 1);
    const payload = encodeResize(0, 99999);
    assert.equal(payload.readUInt16LE(0), 1);
    assert.equal(payload.readUInt16LE(2), 32767);
  });
});
