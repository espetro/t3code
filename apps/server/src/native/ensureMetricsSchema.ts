import * as NodeSqlite from "node:sqlite";

import { sqlitePath } from "./sessionFile.ts";

export const ensureMetricsSchema = (baseDir: string): void => {
  const db = new NodeSqlite.DatabaseSync(sqlitePath(baseDir));
  db.exec(`
    CREATE TABLE IF NOT EXISTS orchestration_v2_projection_threads (
      thread_id TEXT PRIMARY KEY,
      project_id TEXT,
      title TEXT,
      default_provider TEXT,
      runtime_mode TEXT,
      interaction_mode TEXT,
      created_at TEXT,
      updated_at TEXT,
      payload_json TEXT
    );
    CREATE TABLE IF NOT EXISTS orchestration_events (
      event_id TEXT PRIMARY KEY,
      aggregate_kind TEXT,
      stream_id TEXT,
      stream_version INTEGER,
      event_type TEXT,
      occurred_at TEXT,
      actor_kind TEXT,
      payload_json TEXT,
      metadata_json TEXT,
      application_event_version INTEGER
    );
    CREATE TABLE IF NOT EXISTS orchestration_v2_projection_turn_items (
      turn_item_id TEXT PRIMARY KEY,
      thread_id TEXT,
      run_id TEXT,
      ordinal INTEGER,
      type TEXT,
      status TEXT,
      updated_at TEXT,
      payload_json TEXT
    );
  `);
  db.close();
};
