// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of GitVcsDriverCore.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
import { pickScriptcBindCtx } from "../orchestration-v2/scriptcBindScope.ts";
import * as Cache from "effect/Cache";
import * as Cause from "effect/Cause";
import * as Clock from "effect/Clock";
import * as Data from "effect/Data";
import * as Deferred from "effect/Deferred";
import * as Digest from "effect/crypto/Digest";
import * as SecureRandom from "effect/crypto/SecureRandom";
import * as DateTime from "effect/DateTime";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Hex from "effect/encoding/Hex";
import * as Exit from "effect/Exit";
import * as Fiber from "effect/Fiber";
import * as FileSystem from "effect/FileSystem";
import * as Option from "effect/Option";
import * as Path from "effect/Path";
import * as PlatformError from "effect/PlatformError";
import * as Ref from "effect/Ref";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";
import * as Schedule from "effect/Schedule";
import * as Scope from "effect/Scope";
import * as Semaphore from "effect/Semaphore";
import * as Stream from "effect/Stream";
import { ChildProcess, ChildProcessSpawner } from "effect/process";

import {
  GitCommandError,
  type GitCommandFailureReason,
  T3_PROJECT_FILE_NAME,
  type ReviewBranchCommitsInput,
  type ReviewDiffChangeType,
  type ReviewDiffFileContentsInput,
  type ReviewDiffPreviewInput,
  type ReviewDiffFileStat,
  type ReviewDiffPreviewSource,
  trimAsciiWhitespace,
  type VcsRef,
} from "@t3tools/contracts";
import { splitsSurrogatePair } from "@t3tools/shared/assistantCitations";
import { dedupeRemoteBranchesWithLocalMatches } from "@t3tools/shared/git";
import * as HostProcess from "@t3tools/shared/HostProcess";
import { compactTraceAttributes } from "@t3tools/shared/observability";
import { decodeJsonResult } from "@t3tools/shared/schemaJson";
import { resolveSpawnCommand, runsGitWithoutConsole } from "@t3tools/shared/shell";
import { parseT3ProjectFile } from "@t3tools/shared/t3ProjectFile";
import { resolveProjectFileBackedSetting } from "@t3tools/shared/projectSettings";
import { gitCommandDuration, gitCommandsTotal, withMetrics } from "../observability/Metrics.ts";
import * as GitVcsDriver from "./GitVcsDriver.ts";
import { removeEmptyDirectory, type RemoveEmptyDirectoryError } from "./removeEmptyDirectory.ts";
import { VcsAutomaticFetchInterval } from "./VcsAutomaticFetchInterval.ts";
import { gitConfigEnv, serverGitConfigEnv, unsetInheritedRepositoryEnv } from "./VcsProcess.ts";
import { makeWorktreeCheckoutCache } from "./worktreeCheckoutCache.ts";
import { removeLinkedWorktree } from "./worktreeRemoval.ts";
import { resolveWorktreesDirectory } from "../worktreesDirectory.ts";
import {
  parseRemoteNames,
  parseRemoteNamesInGitOrder,
  parseRemoteRefWithRemoteNames,
} from "../git/remoteRefs.ts";
import { makeIsServerInternalPath } from "../auth/serverInternalPaths.ts";
import * as ServerConfig from "../config.ts";
import { sourceControlDefinitions } from "../sourceControl/sourceControlDefinitions.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindFetchRemoteForStatus = (ctx: any) =>
  Effect.fn("GitVcsDriver.fetchRemoteForStatus.wait")(function* (
    gitCommonDir: string,
    remoteName: string,
  ) {
    const {
      STATUS_UPSTREAM_FETCH_TIMEOUT,
      STATUS_UPSTREAM_REFRESH_ENV,
      STATUS_UPSTREAM_REFRESH_TIMEOUT,
      adoptPrivateObjects,
      bumpListRefsGeneration,
      executeGit,
      fileSystem,
      path,
      privateObjectDirectoryEnv,
      recordStatusRemoteRefreshFailure,
      runGitStdout,
      serviceScope,
      statusFetchProcesses,
      statusFetches,
      statusRemoteRefreshFailures,
    } = pickScriptcBindCtx(ctx);

    const fetchCwd =
      path.basename(gitCommonDir) === ".git" ? path.dirname(gitCommonDir) : gitCommonDir;
    const fetchArgs = (mode: "--dry-run" | "--quiet") => [
      "--git-dir",
      gitCommonDir,
      "fetch",
      mode,
      "--no-tags",
      // FETCH_HEAD is written without a lock; overlapping a user's `git pull` makes that pull fail.
      "--no-write-fetch-head",
      "--",
      remoteName,
    ];
    const objectsPath = path.join(gitCommonDir, "objects");
    const fetchOptions = {
      fallbackErrorDetail: "Background Git fetch exited with a non-zero status.",
      timeoutMs: Duration.toMillis(STATUS_UPSTREAM_FETCH_TIMEOUT),
    };
    // A failed or killed fetch leaves its partial `tmp_pack_*` behind, and nothing tells it apart
    // from another Git process's. So the download goes to a directory only this fetch writes to,
    // named like Git's own quarantine so `git gc` prunes one a crash left. A dry run downloads
    // without moving refs, which must not point at objects the repository does not hold yet.
    const isolatedFetch = Effect.acquireUseRelease(
      fileSystem.makeTempDirectory({ directory: objectsPath, prefix: "tmp_objdir-t3code-" }),
      Effect.fnUntraced(function* (privateObjects) {
        const objectDirectories = yield* runGitStdout(
          "GitVcsDriver.fetchRemoteForStatus.alternates",
          fetchCwd,
          ["--git-dir", gitCommonDir, "count-objects", "-v"],
        );
        const options = (writableObjects: string) => ({
          ...fetchOptions,
          env: {
            ...STATUS_UPSTREAM_REFRESH_ENV,
            ...privateObjectDirectoryEnv(writableObjects, objectsPath, objectDirectories),
          },
        });
        const { stderr } = yield* executeGit(
          "GitVcsDriver.fetchRemoteForStatus.download",
          fetchCwd,
          fetchArgs("--dry-run"),
          options(privateObjects),
        );
        yield* adoptPrivateObjects(privateObjects, objectsPath);
        // A dry run names each ref it would move on stderr and is silent when none would.
        if (stderr.trim() === "") return;
        // This fetch may only move refs to objects the repository now holds. If the remote moved
        // on since the dry run it would download, so it gets an object directory where `pack` is
        // a file and every transfer is a pack: it then fails, moves nothing, and the next poll
        // downloads. Git reports the unreadable `pack` on stderr and carries on.
        const sealedObjects = path.join(privateObjects, "sealed");
        yield* fileSystem.makeDirectory(sealedObjects);
        yield* fileSystem.writeFileString(path.join(sealedObjects, "pack"), "");
        yield* executeGit(
          "GitVcsDriver.fetchRemoteForStatus",
          fetchCwd,
          ["-c", "fetch.unpackLimit=1", ...fetchArgs("--quiet")],
          options(sealedObjects),
        ).pipe(
          Effect.ensuring(
            Effect.sync(() => {
              // A fetch may have moved some refs before returning an error.
              bumpListRefsGeneration(gitCommonDir);
            }),
          ),
        );
      }),
      (privateObjects) =>
        fileSystem
          .remove(privateObjects, { recursive: true, force: true })
          .pipe(
            Effect.catchCause((cause) =>
              Effect.logWarning(
                "Could not remove a background Git fetch's object directory",
                cause,
              ),
            ),
          ),
    ).pipe(
      Effect.mapError((error) =>
        error._tag === "GitCommandError"
          ? error
          : new GitCommandError({
              operation: "GitVcsDriver.fetchRemoteForStatus",
              command: "git fetch",
              cwd: fetchCwd,
              detail: "Background Git fetch could not use its object directory.",
              cause: error,
            }),
      ),
    );
    const key = `${gitCommonDir}\0${remoteName}`;
    const failure = statusRemoteRefreshFailures.get(key);
    if (failure && (yield* Clock.currentTimeMillis) < failure.retryAt) return;
    const fiber = yield* Effect.uninterruptible(
      Effect.gen(function* () {
        const pending = statusFetches.get(key);
        if (pending) return pending.fiber;
        const claimed = yield* Deferred.make<void>();
        const finished = yield* Deferred.make<boolean>();
        const state: StatusFetchState = { phase: "queued", claimed, finished };
        // Frequent poll deadlines and disconnected clients must not interrupt a
        // healthy writer. A separate safety limit prevents a hung transport from
        // occupying its worker slot indefinitely.
        const fetch = isolatedFetch.pipe(
          Effect.tap(() =>
            Effect.sync(() => {
              statusRemoteRefreshFailures.delete(key);
            }),
          ),
          Effect.tapError(() => recordStatusRemoteRefreshFailure(key)),
          Effect.tapCause((cause) => Effect.logWarning("Background Git fetch failed", cause)),
        );
        const started = yield* Effect.raceFirst(
          Effect.uninterruptibleMask((restore) =>
            Effect.gen(function* () {
              if (state.phase !== "queued") return false;
              state.phase = "running";
              yield* restore(fetch);
              return true;
            }),
          ).pipe(statusFetchProcesses.withPermits(1)),
          Deferred.await(claimed).pipe(Effect.as(false)),
        ).pipe(
          Effect.flatMap((completed) =>
            completed
              ? Effect.void
              : Deferred.await(finished).pipe(
                  Effect.flatMap((succeeded) =>
                    succeeded ? Effect.void : fetch.pipe(statusFetchProcesses.withPermits(1)),
                  ),
                ),
          ),
          Effect.onExit(() =>
            Effect.sync(() => {
              if (statusFetches.get(key)?.state === state) statusFetches.delete(key);
            }),
          ),
          Effect.forkIn(serviceScope, { startImmediately: false, uninterruptible: false }),
        );
        statusFetches.set(key, { state, fiber: started });
        return started;
      }),
    );
    yield* Effect.annotateCurrentSpan("statusFetch.joining", true);
    const result = yield* Fiber.join(fiber).pipe(
      Effect.timeoutOption(STATUS_UPSTREAM_REFRESH_TIMEOUT),
    );
    if (Option.isNone(result)) {
      yield* Effect.logDebug(
        "Background Git fetch is still running; using the last fetched references.",
      );
    }
  });
