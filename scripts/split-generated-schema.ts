#!/usr/bin/env node
/**
 * tsc-ts SIGSEGVs on a single 600KB+ generated Schema file (scriptc#4381).
 * Split at `export type` boundaries and re-export from a barrel.
 */
import * as NodeFS from "node:fs";
import * as NodePath from "node:path";

const MAX_PART_BYTES = 100_000;

const exportNamesOf = (chunk: string) =>
  new Set(
    [...chunk.matchAll(/^export (?:type|const) ([A-Za-z_][A-Za-z0-9_]*)/gm)].map(
      (match) => match[1] ?? "",
    ),
  );

export const splitGeneratedSchemaFile = (filePath: string) => {
  const path = NodePath.resolve(filePath);
  const text = NodeFS.readFileSync(path, "utf8");
  if (!text.includes("\nexport type ")) return;

  const dir = NodePath.dirname(path);
  const stem = NodePath.basename(path, ".ts");
  for (const existing of NodeFS.readdirSync(dir)) {
    if (existing.startsWith(`${stem}.part`) && existing.endsWith(".ts")) {
      NodeFS.unlinkSync(NodePath.join(dir, existing));
    }
  }

  const pieces = text.split(/(?=\nexport type )/);
  const prelude = pieces[0] ?? "";
  const blocks = pieces.slice(1);
  const groups: string[] = [];
  let current = prelude;
  for (const block of blocks) {
    if (current === prelude) {
      current = prelude + block;
      continue;
    }
    if (current.length + block.length > MAX_PART_BYTES && current.length > prelude.length + 1000) {
      groups.push(current);
      current = 'import * as Schema from "effect/Schema";\n' + block;
    } else {
      current += block;
    }
  }
  if (current.trim().length > 0) groups.push(current);

  const namesSoFar = new Set<string>();
  const written: { name: string; names: Set<string> }[] = [];
  for (const [index, group] of groups.entries()) {
    const needed = [...new Set(group.match(/\b[A-Za-z_][A-Za-z0-9_]*\b/g) ?? [])]
      .filter((name) => namesSoFar.has(name))
      .toSorted();
    const importChunks: string[] = [];
    for (const prev of written) {
      const hit = needed.filter((name) => prev.names.has(name));
      if (hit.length === 0) continue;
      importChunks.push(`import {\n  ${hit.join(",\n  ")},\n} from "./${prev.name}";\n`);
    }
    let body = "/* oxlint-disable eslint(no-unused-vars) -- scriptc#4381 part imports */\n" + group;
    if (importChunks.length > 0) {
      if (body.startsWith("import ")) {
        const newline = body.indexOf("\n");
        body = `${body.slice(0, newline + 1)}${importChunks.join("")}${body.slice(newline + 1)}`;
      } else {
        body = `${importChunks.join("")}${body}`;
      }
    }
    if (!body.endsWith("\n")) body += "\n";
    const partName = `${stem}.part${index}.ts`;
    NodeFS.writeFileSync(NodePath.join(dir, partName), body);
    const names = exportNamesOf(body);
    for (const name of names) namesSoFar.add(name);
    written.push({ name: partName, names });
  }

  NodeFS.writeFileSync(path, written.map((part) => `export * from "./${part.name}";\n`).join(""));
};

const cliTarget = process.argv[1]?.includes("split-generated-schema") ? process.argv[2] : undefined;
if (cliTarget !== undefined) splitGeneratedSchemaFile(cliTarget);
