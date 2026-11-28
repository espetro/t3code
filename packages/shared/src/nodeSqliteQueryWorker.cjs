
const { parentPort, workerData } = require("node:worker_threads");
const { DatabaseSync } = require("node:sqlite");
const describe = (error) => ({
  message: String(error && error.message ? error.message : error),
  code: error && error.code,
  errcode: error && error.errcode,
  errstr: error && error.errstr,
});
let db;
try {
  // A read-only open cannot be undone by SQL, unlike PRAGMA query_only.
  const next = new DatabaseSync(workerData.filename, {
    readOnly: workerData.readOnly,
    allowExtension: workerData.allowExtension,
  });
  next.exec("PRAGMA busy_timeout = 5000;");
  // Reads the header, so a file that is not a database fails here rather than on first use.
  const mode = String(next.prepare("PRAGMA journal_mode").get().journal_mode).toLowerCase();
  // Without WAL a reader's shared lock blocks the writer's commits, so refuse.
  if (workerData.requireWal && mode !== "wal") {
    throw Object.assign(new Error("database uses journal_mode " + mode + ", not wal"), { code: "ERR_SQLITE_NOT_WAL" });
  }
  db = next;
  parentPort.postMessage({ type: "ready" });
} catch (error) {
  parentPort.postMessage({ type: "unavailable", ...describe(error) });
}
const statements = new Map();
const prepare = (sql, cached) => {
  if (!cached) return db.prepare(sql);
  let statement = statements.get(sql);
  if (statement === undefined) {
    statement = db.prepare(sql);
    if (statements.size >= workerData.prepareCacheSize) statements.delete(statements.keys().next().value);
  } else {
    statements.delete(sql);
  }
  statements.set(sql, statement);
  return statement;
};
parentPort.on("message", (request) => {
  if (request.type === "close") {
    // Closing lets SQLite checkpoint and remove the WAL, which terminating would skip.
    try {
      if (db !== undefined) db.close();
    } catch {}
    parentPort.close();
    return;
  }
  const { id, sql, params, cached, values, raw, safeIntegers, received, savepoints } = request;
  let operation = "open";
  let iterator;
  try {
    if (db === undefined) throw new Error("database connection is unavailable");
    operation = "execute";
    for (const savepoint of savepoints) db.exec(savepoint);
    operation = "prepare";
    const statement = prepare(sql, cached);
    operation = "execute";
    statement.setReadBigInts(safeIntegers);
    if (statement.columns().length > 0) {
      statement.setReturnArrays(values);
      let rows = [];
      let bytes = 0;
      let pendingBatch = false;
      iterator = statement.iterate(...params);
      for (const row of iterator) {
        let rowBytes = 0;
        for (const key in row) {
          const value = row[key];
          rowBytes += typeof value === "string" ? value.length * 2
            : ArrayBuffer.isView(value) ? value.byteLength : 8;
        }
        if (rows.length > 0 && (rows.length >= 16384 || bytes + rowBytes > 8 * 1024 * 1024)) {
          // Build the next batch during receipt, but allow only one unacknowledged message.
          if (pendingBatch) Atomics.wait(received, 0, 0);
          Atomics.store(received, 0, 0);
          parentPort.postMessage({ id, rows, more: true });
          rows = [];
          bytes = 0;
          pendingBatch = true;
        }
        rows.push(row);
        bytes += rowBytes;
      }
      if (pendingBatch) Atomics.wait(received, 0, 0);
      parentPort.postMessage({ id, rows });
    } else {
      // A discarded result is read as BigInt: see the same line in the in-process client.
      if (!raw) statement.setReadBigInts(true);
      const result = statement.run(...params);
      parentPort.postMessage({ id, rows: raw ? result : [] });
    }
  } catch (error) {
    // A step that throws leaves its statement active; an active write blocks every later COMMIT.
    try {
      iterator?.return();
    } catch {}
    // A failed iterator can report its previous SQLite error when the statement is reused.
    statements.delete(sql);
    parentPort.postMessage({ id, error: { operation, ...describe(error) } });
  }
});
