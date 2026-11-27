// @ts-nocheck scriptc#4381 extracted factory; types live at the bind call site.
/* oxlint-disable typescript/no-unused-vars -- parent import list copied for scriptc#4381 split */
// Split out of GitVcsDriverCore.ts so scriptc tsc-ts can compile the native server
// (scriptc#4381 per-file memcpy). Behavior is unchanged; the factory passes
// its scope as `ctx` and this module returns the original Effect.fn.
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
export const bindCommit = (ctx: any) =>
  Effect.fn("commit")(function* (cwd, subject, body, options?: GitVcsDriver.GitCommitOptions) {
    const {
      REVIEW_METADATA_MAX_OUTPUT_BYTES,
      executeGit,
      fileSystem,
      path,
      prepareCommitContext,
      runGit,
      runGitStdout,
      runGitStdoutWithOptions,
      stageCommitChanges,
      supportsPathspecFromFile,
    } = ctx;

    const diffCached = [
      "-c",
      "diff.relative=false",
      "diff",
      "--cached",
      "--no-ext-diff",
      "--no-textconv",
    ];
    if (options?.stage?.unverified) {
      const indexMatchesHead =
        (yield* executeGit("GitVcsDriver.commit.indexChanges", cwd, [...diffCached, "--quiet"], {
          allowNonZeroExit: true,
        })).exitCode === 0;
      // Staging an empty result would overwrite what is already staged, so check a scratch index.
      if (
        !indexMatchesHead &&
        (yield* prepareCommitContext(cwd, options.stage.filePaths, { includePatch: false })) ===
          null
      ) {
        return yield* new GitVcsDriver.GitNothingToCommitError({
          operation: "GitVcsDriver.commit",
          cwd,
          detail: "Staging found no changes.",
        });
      }
    }
    const partialCommitPaths =
      options?.stage !== undefined
        ? yield* stageCommitChanges(cwd, options.stage.filePaths)
        : undefined;
    // Preserved unselected conflicts always show as index changes, so only selected paths count.
    const selectedPaths = partialCommitPaths && new Set(options?.stage?.filePaths);
    const hasStagedChanges = selectedPaths
      ? (yield* runGitStdoutWithOptions(
          "GitVcsDriver.commit.stagedChanges",
          cwd,
          [...diffCached, "--no-renames", "--name-only", "-z"],
          { maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES },
        ))
          .split("\0")
          .some((file) => file.length > 0 && selectedPaths.has(file))
      : (yield* executeGit("GitVcsDriver.commit.stagedChanges", cwd, [...diffCached, "--quiet"], {
          allowNonZeroExit: true,
        })).exitCode !== 0;
    if (!hasStagedChanges) {
      // Like git commit, a merge resolved to HEAD's tree still records its merge commit.
      const mergeHeadPath = yield* runGitStdout("GitVcsDriver.commit.mergeHead", cwd, [
        "rev-parse",
        "--git-path",
        "MERGE_HEAD",
      ]);
      const merging = yield* fileSystem.realPath(cwd).pipe(
        Effect.orElseSucceed(() => cwd),
        Effect.flatMap((physicalCwd) =>
          fileSystem.exists(path.resolve(physicalCwd, mergeHeadPath.trim())),
        ),
        Effect.mapError(
          (cause) =>
            new GitCommandError({
              operation: "GitVcsDriver.commit.mergeHead",
              command: "git commit",
              cwd,
              detail: "Could not check whether a merge is in progress.",
              cause,
            }),
        ),
      );
      if (!merging) {
        return yield* new GitVcsDriver.GitNothingToCommitError({
          operation: "GitVcsDriver.commit",
          cwd,
          detail: "Staging found no changes.",
        });
      }
    }
    const args = ["commit", "-m", subject];
    const trimmedBody = body.trim();
    if (trimmedBody.length > 0) {
      args.push("-m", trimmedBody);
    }
    const onlyFromStdin = partialCommitPaths ? yield* supportsPathspecFromFile(cwd) : false;
    const onlyPathspecArgs = onlyFromStdin
      ? ["--pathspec-from-file=-", "--pathspec-file-nul"]
      : ["--", ...(partialCommitPaths ?? [])];
    const onlyPathspecStdin =
      partialCommitPaths && onlyFromStdin
        ? { stdin: partialCommitPaths.map((pathspec) => `${pathspec}\0`).join("") }
        : {};
    if (partialCommitPaths) {
      args.push("--only", ...onlyPathspecArgs);
    }
    const progress =
      options?.progress?.onOutputLine === undefined
        ? options?.progress
        : {
            ...options.progress,
            onStdoutLine: (line: string) =>
              options.progress?.onOutputLine?.({ stream: "stdout", text: line }) ?? Effect.void,
            onStderrLine: (line: string) =>
              options.progress?.onOutputLine?.({ stream: "stderr", text: line }) ?? Effect.void,
          };
    yield* executeGit("GitVcsDriver.commit.commit", cwd, args, {
      maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES,
      ...onlyPathspecStdin,
      ...(options?.timeoutMs !== undefined ? { timeoutMs: options.timeoutMs } : {}),
      ...(progress ? { progress } : {}),
    }).pipe(Effect.asVoid);
    if (partialCommitPaths) {
      // --only runs hooks on a temporary index, so a hook's `git add` never reaches the real one.
      yield* runGit(
        "GitVcsDriver.commit.syncSelectedIndex",
        cwd,
        ["reset", "--quiet", "HEAD", ...onlyPathspecArgs],
        onlyPathspecStdin,
      );
    }
    const commitSha = yield* runGitStdout("GitVcsDriver.commit.revParseHead", cwd, [
      "rev-parse",
      "HEAD",
    ]).pipe(Effect.map((stdout) => stdout.trim()));

    return { commitSha };
  });
