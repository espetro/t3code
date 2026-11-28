import * as NodeFS from "node:fs";
import * as NodePath from "node:path";

/** Served at `/pair` when `vp pack` runs without a web build. Same layout as `dist/client`. */
export const PACKED_CLIENT_INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>T3 Code</title>
  </head>
  <body>
    <p>T3 Code</p>
  </body>
</html>
`;

export type PackedClientSource = "existing" | "web" | "pairing-shell";

/** Product layout: `apps/server/dist/client/index.html` next to packed `bin.mjs`. */
export function emitPackedClient(options: {
  readonly distDir: string;
  readonly webDist: string;
}): PackedClientSource {
  const clientDir = NodePath.join(options.distDir, "client");
  const index = NodePath.join(clientDir, "index.html");
  if (NodeFS.existsSync(index)) return "existing";
  NodeFS.mkdirSync(clientDir, { recursive: true });
  if (NodeFS.existsSync(NodePath.join(options.webDist, "index.html"))) {
    NodeFS.cpSync(options.webDist, clientDir, { recursive: true });
    return "web";
  }
  NodeFS.writeFileSync(index, PACKED_CLIENT_INDEX_HTML);
  return "pairing-shell";
}
