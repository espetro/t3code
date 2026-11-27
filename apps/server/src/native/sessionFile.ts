import * as NodeFS from "node:fs";
import * as NodePath from "node:path";
import * as NodeCrypto from "node:crypto";

export type NativeSession = {
  readonly token: string;
};

const sessionPath = (baseDir: string) => NodePath.join(baseDir, "userdata", "native-sessions.json");

const readSessions = (baseDir: string): Array<NativeSession> => {
  try {
    const parsed: unknown = JSON.parse(NodeFS.readFileSync(sessionPath(baseDir), "utf8"));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (row): row is NativeSession =>
        typeof row === "object" && row !== null && typeof (row as NativeSession).token === "string",
    );
  } catch {
    return [];
  }
};

export const issueNativeSession = (baseDir: string): string => {
  NodeFS.mkdirSync(NodePath.join(baseDir, "userdata"), { recursive: true });
  const token = NodeCrypto.randomBytes(24).toString("base64url");
  const next = [...readSessions(baseDir), { token }];
  NodeFS.writeFileSync(sessionPath(baseDir), `${JSON.stringify(next)}\n`);
  return token;
};

export const hasNativeSession = (baseDir: string, token: string): boolean =>
  readSessions(baseDir).some((row) => row.token === token);

export const sqlitePath = (baseDir: string) => NodePath.join(baseDir, "userdata", "statev2.sqlite");
