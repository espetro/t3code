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
export const bindPrepareReviewIndex = (ctx: any) =>
  Effect.fn("prepareReviewIndex")(function* (
    cwd: string,
    untrackedPaths: ReadonlyArray<string>,
    allowPartial: boolean,
    knownIndexPath: string | undefined,
    isolated: boolean,
  ) {
    const {
      REVIEW_METADATA_MAX_OUTPUT_BYTES,
      REVIEW_UNTRACKED_MAX_BYTES,
      executeGit,
      fileSystem,
      path,
      runGitStdout,
      runGitStdoutWithOptions,
    } = pickScriptcBindCtx(ctx);

    const [stagedDeletionsStdout, indexValue] = yield* Effect.all(
      [
        isolated
          ? Effect.succeed("")
          : runGitStdoutWithOptions(
              "GitVcsDriver.readUnifiedWorkingTreeReviewDiff.stagedDeletions",
              cwd,
              [
                "diff",
                "--cached",
                "--no-renames",
                "--name-only",
                "--diff-filter=D",
                "-z",
                "HEAD",
                "--",
              ],
              { allowNonZeroExit: true, maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES },
            ),
        isolated || knownIndexPath !== undefined
          ? Effect.succeed(knownIndexPath ?? "")
          : runGitStdout("GitVcsDriver.readUnifiedWorkingTreeReviewDiff.indexPath", cwd, [
              "rev-parse",
              "--git-path",
              "index",
            ]),
      ],
      { concurrency: 2 },
    );
    const stagedDeletions = new Set(stagedDeletionsStdout.split("\0").filter(Boolean));
    // Staged deletions never enter the index, so their worktree copies must not spend the budget.
    // A nested repository (listed with a trailing slash) with no commits cannot be indexed:
    // Git before 2.53 fails the add, and later versions accept it and then fail every diff.
    const candidates = yield* Effect.filter(
      untrackedPaths.filter((relativePath) => !stagedDeletions.has(relativePath)),
      (relativePath) =>
        relativePath.endsWith("/")
          ? executeGit(
              "GitVcsDriver.readUnifiedWorkingTreeReviewDiff.nestedRepositoryHead",
              path.resolve(cwd, relativePath),
              ["rev-parse", "--verify", "--quiet", "HEAD"],
              { allowNonZeroExit: true },
            ).pipe(Effect.map((result) => result.exitCode !== 1))
          : Effect.succeed(true),
      { concurrency: 16 },
    );
    const sizes = yield* Effect.forEach(
      candidates,
      (relativePath) =>
        fileSystem.lstat(path.resolve(cwd, relativePath)).pipe(
          Effect.map((info) => (info.type === "File" ? Number(info.size) : 0)),
          Effect.orElseSucceed(() => 0),
          Effect.map((size) => ({ relativePath, size })),
        ),
      { concurrency: 16 },
    );
    // Smallest first, so which files fit does not depend on how their names sort.
    const pathsToAdd: string[] = [];
    let bytes = 0;
    for (const { relativePath, size } of sizes.toSorted((left, right) => left.size - right.size)) {
      bytes += size;
      if (bytes > REVIEW_UNTRACKED_MAX_BYTES) break;
      pathsToAdd.push(relativePath);
    }
    const omitted = pathsToAdd.length < candidates.length;
    if (pathsToAdd.length === 0 || (omitted && !allowPartial)) return { env: undefined, omitted };

    const prefix = `t3code-review-index-${process.pid}-`;
    // The pathspec excludes every other entry, so an index holding only the added paths diffs
    // the same as a copy of the real one. Git reads the missing file as an empty index.
    const tempIndexPath = isolated
      ? path.join(yield* fileSystem.makeTempDirectoryScoped({ prefix }), "index")
      : yield* fileSystem.makeTempFileScoped({ prefix });
    const env = { GIT_INDEX_FILE: tempIndexPath } satisfies NodeJS.ProcessEnv;
    const tempIndexConfig = [
      "-c",
      "core.splitIndex=false",
      "-c",
      "splitIndex.sharedIndexExpire=never",
    ];
    if (!isolated) {
      const indexPath = knownIndexPath ?? path.resolve(cwd, indexValue.replace(/\n$/, ""));
      const indexExists = yield* fileSystem.exists(indexPath);
      if (indexExists) {
        const { mtime } = yield* fileSystem.stat(indexPath);
        yield* fileSystem.copyFile(indexPath, tempIndexPath);
        // stat truncates bigint times to ms; floor seconds to avoid making preceding-second files racy.
        const indexTime = Option.isSome(mtime)
          ? Math.max(0, Math.floor(mtime.value.getTime() / 1000))
          : 0;
        yield* fileSystem.utimes(tempIndexPath, indexTime, indexTime);
      } else {
        yield* executeGit("GitVcsDriver.review.emptyIndex", cwd, ["read-tree", "--empty"], {
          env,
        });
      }
      yield* executeGit(
        "GitVcsDriver.readUnifiedWorkingTreeReviewDiff.expandSplitIndex",
        cwd,
        [...tempIndexConfig, "update-index", "--no-split-index"],
        { env },
      );
    }
    yield* executeGit(
      "GitVcsDriver.readUnifiedWorkingTreeReviewDiff.addUntracked",
      cwd,
      [
        ...tempIndexConfig,
        // Avoid redundant tracked-entry pathspec matching in this disposable index.
        "-c",
        "core.preloadIndex=false",
        // Sparse checkout refuses to add untracked files outside the cone, failing the whole review.
        "-c",
        "core.sparseCheckout=false",
        "--literal-pathspecs",
        "add",
        "--intent-to-add",
        "--pathspec-from-file=-",
        "--pathspec-file-nul",
      ],
      { env, stdin: `${pathsToAdd.join("\0")}\0` },
    );
    return { env, omitted };
  });
