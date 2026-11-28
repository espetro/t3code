
const { parentPort, workerData } = require("node:worker_threads");
const { DatabaseSync } = require("node:sqlite");
let db;
let frames;
let passive;
let idle;
const check = (force) => {
  if (db === undefined) {
    db = new DatabaseSync(workerData.filename);
    db.exec("PRAGMA busy_timeout = 5000;");
    // macOS requires F_FULLFSYNC to flush the drive cache.
    db.exec("PRAGMA checkpoint_fullfsync = ON;");
    frames = db.prepare("PRAGMA wal_checkpoint(NOOP)");
    passive = db.prepare("PRAGMA wal_checkpoint(PASSIVE)");
  }
  const before = frames.get();
  let state = before;
  if (state.log - state.checkpointed >= workerData.frames || (force && state.log > state.checkpointed)) {
    passive.get();
    state = frames.get();
  }
  // The WAL restarts only once every frame is checkpointed, so catch up when writes pause.
  // A reader pinning the WAL stops progress; the next write retries instead of a timer loop.
  const progressed = !force || state.checkpointed > before.checkpointed;
  if (state.log > state.checkpointed && progressed) {
    idle = setTimeout(() => run(true), workerData.idleMs);
  }
  parentPort.postMessage({ type: "checked", log: state.log, checkpointed: state.checkpointed });
};
const run = (force) => {
  clearTimeout(idle);
  try {
    check(force);
  } catch (error) {
    parentPort.postMessage({ type: "failed", message: String(error && error.message ? error.message : error) });
  }
};
parentPort.on("message", () => run(false));
