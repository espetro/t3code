/**
 * Wire protocol of `@particle-academy/fancy-pty` (MIT): `[type: u8][len: u32 LE][payload]`.
 * Kept as a copy so the native server can talk to that helper without depending on the npm package.
 */

export const enum Request {
  Spawn = 0x00,
  Data = 0x01,
  Resize = 0x02,
  Kill = 0x03,
}

export const enum Response {
  Data = 0x81,
  Exit = 0x82,
  Error = 0x83,
  Pid = 0x84,
  Killed = 0x85,
}

export const HEADER_BYTES = 5;
const MAX_FRAME_BYTES = 64 * 1024 * 1024;
const SPAWN_FLAG_WINDOWS_VERBATIM = 1;

export interface SpawnRequest {
  argv: string[];
  cwd?: string;
  env?: Record<string, string | undefined>;
  cols?: number;
  rows?: number;
  windowsVerbatimArguments?: boolean;
}

export interface DecodedFrame {
  kind: number;
  payload: Buffer;
}

function u32(value: number): Buffer {
  const buffer = Buffer.allocUnsafe(4);
  buffer.writeUInt32LE(value, 0);
  return buffer;
}

function lengthPrefixed(value: string): Buffer {
  const body = Buffer.from(value, "utf8");
  return Buffer.concat([u32(body.length), body]);
}

export function clampDimension(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.min(32767, Math.max(1, Math.trunc(n)));
}

export function encodeResize(cols: number, rows: number): Buffer {
  const buffer = Buffer.allocUnsafe(4);
  buffer.writeUInt16LE(clampDimension(cols), 0);
  buffer.writeUInt16LE(clampDimension(rows), 2);
  return buffer;
}

export function encodeKill(graceMs?: number): Buffer {
  if (graceMs === undefined || Number.isNaN(graceMs) || graceMs <= 0) return Buffer.alloc(0);
  const buffer = Buffer.allocUnsafe(4);
  buffer.writeUInt32LE(Math.min(0xffff_ffff, Math.ceil(graceMs)), 0);
  return buffer;
}

export function encodeSpawn(req: SpawnRequest): Buffer {
  if (!Array.isArray(req.argv) || req.argv.length === 0) {
    throw new TypeError("fancy-pty: argv must be a non-empty array");
  }
  const size = Buffer.allocUnsafe(4);
  size.writeUInt16LE(clampDimension(req.cols ?? 80), 0);
  size.writeUInt16LE(clampDimension(req.rows ?? 24), 2);
  const parts: Buffer[] = [size, lengthPrefixed(req.cwd ?? "")];
  parts.push(u32(req.argv.length));
  for (const arg of req.argv) parts.push(lengthPrefixed(arg));
  const entries = Object.entries(req.env ?? {}).filter(
    (entry): entry is [string, string] => entry[1] !== undefined,
  );
  parts.push(u32(entries.length));
  for (const [key, value] of entries) parts.push(lengthPrefixed(key), lengthPrefixed(value));
  if (req.windowsVerbatimArguments === true) parts.push(u32(SPAWN_FLAG_WINDOWS_VERBATIM));
  return Buffer.concat(parts);
}

export function frame(kind: Request, payload: Buffer): Buffer {
  const head = Buffer.allocUnsafe(HEADER_BYTES);
  head[0] = kind;
  head.writeUInt32LE(payload.length, 1);
  return Buffer.concat([head, payload]);
}

export class FrameDecoder {
  private pending: Buffer = Buffer.alloc(0);

  push(chunk: Buffer): DecodedFrame[] {
    this.pending = this.pending.length === 0 ? chunk : Buffer.concat([this.pending, chunk]);
    const frames: DecodedFrame[] = [];
    for (;;) {
      if (this.pending.length < HEADER_BYTES) break;
      const kind = this.pending[0]!;
      const len = this.pending.readUInt32LE(1);
      if (len > MAX_FRAME_BYTES) {
        throw new Error(`fancy-pty: frame length ${len} over cap`);
      }
      if (this.pending.length < HEADER_BYTES + len) break;
      frames.push({
        kind,
        payload: Buffer.from(this.pending.subarray(HEADER_BYTES, HEADER_BYTES + len)),
      });
      this.pending = this.pending.subarray(HEADER_BYTES + len);
    }
    return frames;
  }

  get buffered(): number {
    return this.pending.length;
  }
}
