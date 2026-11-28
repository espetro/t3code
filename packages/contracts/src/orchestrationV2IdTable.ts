import * as Schema from "effect/Schema";
import * as SchemaGetter from "effect/SchemaGetter";

/**
 * Opt-in wire form: on each record (top-level array element, top-level object, or `item`), values
 * under `id`, `*Id`, and `*Ids` index the response's `ids` table. Both peers must apply this exact
 * rule; changing it needs a new opt-in (`compactIds=2`, or a new `accept*` key over WS).
 */
type JsonObject = { [key: string]: unknown };

const asJsonObject = (value: unknown): JsonObject | undefined => {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return undefined;
  const out: JsonObject = {};
  for (const key of Object.keys(value)) {
    out[key] = Reflect.get(value, key);
  }
  return out;
};
const isIdKey = (key: string) => key === "id" || key.endsWith("Id");
const isIdListKey = (key: string) => key.endsWith("Ids");

function internRecordIds(container: JsonObject, ids: Array<string | number>): JsonObject {
  const index = new Map<string | number, number>();
  const ref = (value: unknown) => {
    if (typeof value !== "string" && typeof value !== "number") return value;
    let position = index.get(value);
    if (position === undefined) {
      position = ids.length;
      ids.push(value);
      index.set(value, position);
    }
    return position;
  };
  // Copies each record: unknown members can pass through encoding by reference.
  const internRecord = (record: JsonObject): JsonObject => {
    const out: JsonObject = {};
    for (const key in record) {
      const value = record[key];
      const item = asJsonObject(value);
      if (isIdKey(key)) {
        out[key] = ref(value);
      } else if (isIdListKey(key) && Array.isArray(value)) {
        out[key] = value.map(ref);
      } else if (key === "item" && item !== undefined) {
        out[key] = internRecord(item);
      } else {
        out[key] = value;
      }
    }
    return out;
  };
  const out: JsonObject = {};
  for (const key in container) {
    const value = container[key];
    if (Array.isArray(value)) {
      out[key] = value.map((record) => {
        const object = asJsonObject(record);
        return object === undefined ? record : internRecord(object);
      });
    } else {
      const object = asJsonObject(value);
      out[key] = object === undefined ? value : internRecord(object);
    }
  }
  return out;
}

// Mutates freshly parsed JSON in place; the client owns it and this avoids a copy.
function expandRecordIds(container: JsonObject, ids: ReadonlyArray<unknown>): void {
  const expandRecord = (record: JsonObject) => {
    for (const key in record) {
      const value = record[key];
      if (typeof value === "number") {
        if (isIdKey(key)) record[key] = ids[value];
      } else if (Array.isArray(value)) {
        if (isIdListKey(key)) {
          for (let i = 0; i < value.length; i++) {
            const entry = value[i];
            if (typeof entry === "number") value[i] = ids[entry];
          }
        }
      } else {
        const item = asJsonObject(value);
        if (key === "item" && item !== undefined) {
          expandRecord(item);
          record[key] = item;
        }
      }
    }
  };
  for (const key in container) {
    const value = container[key];
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const object = asJsonObject(value[i]);
        if (object !== undefined) {
          expandRecord(object);
          value[i] = object;
        }
      }
    } else {
      const object = asJsonObject(value);
      if (object !== undefined) {
        expandRecord(object);
        container[key] = object;
      }
    }
  }
}

// `toCodecJson` turns `Schema.Unknown` into a recursive JSON check of the whole
// tree. The input is parsed JSON and the inner codec validates it anyway.
const ParsedJson = Schema.declare((_: unknown): _ is unknown => true, {
  toCodecJson: () => undefined,
});

/**
 * Adds the optional ID table to a snapshot-shaped schema. `container` returns the
 * key whose value holds the records, `null` when records sit at the top level, or
 * `undefined` when the value has no records (other stream item kinds).
 */
export const withRecordIdTable = <S extends Schema.Top>(
  schema: S,
  container: (value: JsonObject) => string | null | undefined,
) => {
  const codec = Schema.toCodecJson(schema);
  type Encoded = typeof codec.Encoded;
  return ParsedJson.pipe(
    Schema.decodeTo(codec, {
      decode: SchemaGetter.transform((raw: unknown): Encoded => {
        const object = asJsonObject(raw);
        if (object === undefined || !Array.isArray(object.ids)) return raw as Encoded;
        // Consumed on the parsed object itself, so decoding it again is a no-op.
        const ids: ReadonlyArray<unknown> = object.ids;
        delete object.ids;
        const key = container(object);
        const target = key === null ? object : key === undefined ? undefined : object[key];
        const targetObject = asJsonObject(target);
        if (targetObject !== undefined) expandRecordIds(targetObject, ids);
        return object as Encoded;
      }),
      encode: SchemaGetter.transform((encoded: Encoded): unknown => {
        const object = asJsonObject(encoded);
        if (object === undefined || object.idTable !== true) return encoded;
        const { idTable: _idTable, ...rest } = object;
        const key = container(rest);
        const ids: Array<string | number> = [];
        if (key === null) return { ...internRecordIds(rest, ids), ids };
        const target = key === undefined ? undefined : rest[key];
        const targetObject = asJsonObject(target);
        if (key === undefined || targetObject === undefined) return rest;
        return { ...rest, [key]: internRecordIds(targetObject, ids), ids };
      }),
    }),
  );
};
