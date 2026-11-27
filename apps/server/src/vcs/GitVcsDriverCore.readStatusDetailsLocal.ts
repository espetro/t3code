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
export const bindReadStatusDetailsLocal = (ctx: any) =>
  Effect.fn("readStatusDetailsLocal")(function* (
    cwd: string,
    options?: GitVcsDriver.GitLocalStatusOptions,
  ) {
    const {
      NON_REPOSITORY_STATUS_DETAILS,
      REVIEW_METADATA_MAX_OUTPUT_BYTES,
      computeAheadCountAgainstBase,
      currentListRefsGeneration,
      defaultBranchCache,
      executeGitWithStableDiagnostics,
      fileSystem,
      gitCommandContext,
      isMissingGitCwdError,
      isNonRepositoryGitStderr,
      isUnbornHeadStderr,
      listRemoteNames,
      normalizeRepositoryPathsCacheKey,
      parseBranchAb,
      parsePorcelainPath,
      parseReviewNumstat,
      path,
      primaryRemoteExistsCache,
      readBranchChangeTotals,
      readConfigValue,
      readEmptyTreeHash,
      repositoryPathsCache,
      resolvePrimaryDefaultBranchName,
      resolveRepositoryPaths,
      untrackedFilesHiddenByConfig,
    } = ctx;

    const includeDivergence = options?.includeDivergence !== false;
    // Hidden untracked files could not be committed; `all` stays as configured.
    const untrackedFilesHidden = untrackedFilesHiddenByConfig(
      yield* readConfigValue(cwd, "status.showUntrackedFiles").pipe(
        Effect.orElseSucceed(() => null),
      ),
    );
    const statusArgs = [
      "status",
      "--porcelain=2",
      "--branch",
      "-z",
      ...(untrackedFilesHidden ? ["--untracked-files=normal"] : []),
      ...(includeDivergence ? [] : ["--no-ahead-behind"]),
    ];
    const readPaths = (...args: string[]) =>
      executeGitWithStableDiagnostics(
        "GitVcsDriver.statusDetails.indexPath",
        cwd,
        ["rev-parse", ...args],
        { allowNonZeroExit: true },
      ).pipe(
        Effect.catchTags({
          GitCommandError: (error) =>
            isMissingGitCwdError(error) ? Effect.succeed(null) : Effect.fail(error),
        }),
      );
    const paths = yield* readPaths(
      "--path-format=absolute",
      "--git-path",
      "index",
      "--git-common-dir",
      "--show-toplevel",
    );
    if (paths === null || (paths.exitCode !== 0 && isNonRepositoryGitStderr(paths.stderr))) {
      return NON_REPOSITORY_STATUS_DETAILS;
    }
    // Older Git may echo the flag. Newlines in paths also require the separate lookups.
    const fields = paths.stdout.replace(/\n$/, "").split("\n");
    const [index, commonDir, root] =
      paths.exitCode === 0 && fields.length === 3 && fields.every(path.isAbsolute) ? fields : [];
    const indexResult = index === undefined ? yield* readPaths("--git-path", "index") : undefined;
    if (indexResult === null) return NON_REPOSITORY_STATUS_DETAILS;
    const indexPath =
      index ?? (indexResult?.exitCode === 0 ? indexResult.stdout.replace(/\n$/, "") : undefined);
    if (indexPath) {
      const lockPath = `${path.resolve(cwd, indexPath)}.lock`;
      const lockError = new GitCommandError({
        operation: "GitVcsDriver.statusDetails.indexPath",
        command: "git",
        cwd,
        detail: "Git index is locked. Status will resume when the index lock is removed.",
      });
      // Status can succeed while locked, repeatedly running LFS clean filters without caching.
      if (
        yield* fileSystem.exists(lockPath).pipe(
          Effect.mapError(
            (cause) =>
              new GitCommandError({
                ...lockError,
                detail: "Failed to check the Git index lock.",
                cause,
              }),
          ),
        )
      ) {
        return yield* lockError;
      }
    }
    const repositoryPaths =
      commonDir && root
        ? {
            gitCommonDir: yield* fileSystem
              .realPath(commonDir)
              .pipe(Effect.orElseSucceed(() => path.normalize(commonDir))),
            worktreeRoot: path.normalize(root),
          }
        : yield* resolveRepositoryPaths(cwd).pipe(
            Effect.catchTags({ GitCommandError: () => Effect.succeed(null) }),
          );
    const statusCacheKey = repositoryPaths?.gitCommonDir;
    const refsGeneration =
      statusCacheKey === undefined ? undefined : currentListRefsGeneration(statusCacheKey);
    const readStatus = executeGitWithStableDiagnostics(
      "GitVcsDriver.statusDetails.status",
      cwd,
      statusArgs,
      {
        allowNonZeroExit: true,
        maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES,
      },
    ).pipe(
      Effect.catchTags({
        GitCommandError: (error) =>
          isMissingGitCwdError(error) ? Effect.succeed(null) : Effect.fail(error),
      }),
    );
    // Porcelain diff rewrites indexes despite GIT_OPTIONAL_LOCKS=0; plumbing with -M preserves rename detection.
    const readNumstat = (ref: string) =>
      executeGitWithStableDiagnostics(
        "GitVcsDriver.statusDetails.numstat",
        cwd,
        ["diff-index", "-M", "--numstat", "-z", ref, "--"],
        { allowNonZeroExit: true, maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES },
      );
    // diff-index does not read status output, so both spawn together; a non-repository discards it.
    const [statusResult, numstatResult, [hasPrimaryRemote, defaultBranch]] = yield* Effect.all(
      [
        readStatus,
        readNumstat("HEAD").pipe(
          Effect.filterOrElse(
            (result) => result.exitCode === 0 || !isUnbornHeadStderr(result.stderr),
            () => Effect.flatMap(readEmptyTreeHash(cwd), readNumstat),
          ),
          Effect.flatMap((result) => {
            if (result.exitCode === 0) return Effect.succeed(parseReviewNumstat(result.stdout));
            return Effect.fail(
              new GitCommandError({
                ...gitCommandContext({
                  operation: "GitVcsDriver.statusDetails.numstat",
                  cwd,
                  args: ["diff-index", "-M", "--numstat", "-z", "HEAD", "--"],
                }),
                detail: "git diff-index HEAD --numstat failed.",
                exitCode: result.exitCode,
                stdoutLength: result.stdout.length,
                stderrLength: result.stderr.length,
              }),
            );
          }),
          Effect.result,
        ),
        (statusCacheKey
          ? Cache.get(primaryRemoteExistsCache, statusCacheKey)
          : listRemoteNames(cwd).pipe(Effect.map((remoteNames) => remoteNames.length > 0))
        ).pipe(
          Effect.orElseSucceed(() => false),
          Effect.flatMap((hasRemote) =>
            (hasRemote
              ? statusCacheKey
                ? Cache.get(defaultBranchCache, statusCacheKey)
                : resolvePrimaryDefaultBranchName(cwd)
              : Effect.succeed(null)
            ).pipe(
              Effect.orElseSucceed(() => null),
              Effect.map((defaultBranch) => [hasRemote, defaultBranch] as const),
            ),
          ),
        ),
      ],
      { concurrency: "unbounded" },
    );
    if (statusResult === null) {
      return NON_REPOSITORY_STATUS_DETAILS;
    }

    if (statusResult.exitCode !== 0) {
      if (isNonRepositoryGitStderr(statusResult.stderr)) {
        return NON_REPOSITORY_STATUS_DETAILS;
      }
      return yield* new GitCommandError({
        ...gitCommandContext({
          operation: "GitVcsDriver.statusDetails.status",
          cwd,
          args: statusArgs,
        }),
        detail: "Git status failed.",
        exitCode: statusResult.exitCode,
        stdoutLength: statusResult.stdout.length,
        stderrLength: statusResult.stderr.length,
      });
    }

    const numstatEntries = yield* Effect.fromResult(numstatResult);
    const statusStdout = statusResult.stdout;

    let refName: string | null = null;
    let upstreamRef: string | null = null;
    // Git omits branch.ab when the upstream ref is gone, e.g. deleted after its PR merged,
    // and also for an unborn HEAD, which can still track a fetched upstream.
    let upstreamRefExists = false;
    let isUnbornHead = false;
    let headOid: string | null = null;
    let aheadCount = 0;
    let behindCount = 0;
    let aheadOfDefaultCount = 0;
    let hasWorkingTreeChanges = false;
    const changedFilesWithoutNumstat = new Set<string>();
    const untrackedRoots: string[] = [];

    const statusRecords = statusStdout.split("\0");
    for (let index = 0; index < statusRecords.length; index++) {
      const line = statusRecords[index]!;
      if (line === "# branch.oid (initial)") {
        isUnbornHead = true;
        continue;
      }
      if (line.startsWith("# branch.oid ")) {
        headOid = line.slice("# branch.oid ".length).trim();
        continue;
      }
      if (line.startsWith("# branch.head ")) {
        const value = trimAsciiWhitespace(line.slice("# branch.head ".length));
        // `(unknown)` is printed while HEAD names no resolvable branch, e.g. mid-`git clone`.
        refName = value === "(detached)" || value === "(unknown)" ? null : value;
        continue;
      }
      if (line.startsWith("# branch.upstream ")) {
        const value = trimAsciiWhitespace(line.slice("# branch.upstream ".length));
        upstreamRef = value.length > 0 ? value : null;
        continue;
      }
      if (line.startsWith("# branch.ab ")) {
        upstreamRefExists = true;
        if (includeDivergence) {
          const parsed = parseBranchAb(line.slice("# branch.ab ".length).trim());
          aheadCount = parsed.ahead;
          behindCount = parsed.behind;
        }
        continue;
      }
      if (line.length > 0 && !line.startsWith("#")) {
        hasWorkingTreeChanges = true;
        const pathValue = parsePorcelainPath(line);
        if (pathValue) {
          changedFilesWithoutNumstat.add(pathValue);
          if (line.startsWith("? ")) untrackedRoots.push(pathValue);
        }
        // A rename record is followed by its original path as a separate record. Listing it
        // keeps the deletion selectable when committing only some files.
        if (line.startsWith("2 ")) {
          const originalPath = statusRecords[++index];
          if (originalPath) changedFilesWithoutNumstat.add(originalPath);
        }
      }
    }

    if (commonDir && root && repositoryPaths?.worktreeRoot) {
      const { gitCommonDir, worktreeRoot } = repositoryPaths;
      const cacheKey = normalizeRepositoryPathsCacheKey(cwd);
      if (!(yield* Cache.has(repositoryPathsCache, cacheKey))) {
        const isAtRepositoryRoot = yield* fileSystem.realPath(cwd).pipe(
          Effect.map((physicalCwd) => path.relative(worktreeRoot, physicalCwd) === ""),
          Effect.orElseSucceed(() => undefined),
        );
        if (
          currentListRefsGeneration(gitCommonDir) === refsGeneration &&
          !(yield* Cache.has(repositoryPathsCache, cacheKey))
        ) {
          yield* Cache.set(repositoryPathsCache, cacheKey, {
            gitCommonDir,
            worktreeRoot,
            isAtRepositoryRoot,
          });
        }
      }
    }

    if (!upstreamRefExists && !isUnbornHead) upstreamRef = null;

    const isDefaultBranch =
      refName !== null &&
      (refName === defaultBranch ||
        (defaultBranch === null && (refName === "main" || refName === "master")));
    const needsFallbackAhead = includeDivergence && !upstreamRef && refName !== null;
    const needsAheadOfDefault = includeDivergence && refName !== null && !isDefaultBranch;
    const [baseAheadCount, branchChanges] = yield* Effect.all(
      [
        refName !== null && (needsFallbackAhead || needsAheadOfDefault)
          ? computeAheadCountAgainstBase(cwd, refName).pipe(Effect.orElseSucceed(() => 0))
          : Effect.succeed(0),
        options?.includeBranchChanges
          ? readBranchChangeTotals(repositoryPaths?.worktreeRoot ?? cwd, refName, {
              untrackedRoots,
              headOid,
              ...(index ? { indexPath: index } : {}),
            }).pipe(Effect.orElseSucceed(() => undefined))
          : Effect.undefined,
      ],
      { concurrency: "unbounded" },
    );

    if (needsFallbackAhead) {
      aheadCount = baseAheadCount;
      behindCount = 0;
    }
    if (needsAheadOfDefault) {
      aheadOfDefaultCount = baseAheadCount;
    }

    const fileStatMap = new Map<string, { insertions: number; deletions: number }>();
    for (const entry of numstatEntries) {
      const stat = fileStatMap.get(entry.path) ?? { insertions: 0, deletions: 0 };
      stat.insertions += entry.additions;
      stat.deletions += entry.deletions;
      fileStatMap.set(entry.path, stat);
    }

    let insertions = 0;
    let deletions = 0;
    const files = Array.from(fileStatMap.entries()).map(([filePath, stat]) => {
      insertions += stat.insertions;
      deletions += stat.deletions;
      return { path: filePath, insertions: stat.insertions, deletions: stat.deletions };
    });

    for (const filePath of changedFilesWithoutNumstat) {
      if (fileStatMap.has(filePath)) continue;
      files.push({ path: filePath, insertions: 0, deletions: 0 });
    }
    files.sort((a, b) => a.path.localeCompare(b.path));

    return {
      isRepo: true,
      hasOriginRemote: hasPrimaryRemote,
      isDefaultBranch,
      branch: refName,
      upstreamRef,
      hasWorkingTreeChanges,
      workingTree: {
        ...(repositoryPaths?.worktreeRoot ? { rootPath: repositoryPaths.worktreeRoot } : {}),
        files,
        insertions,
        deletions,
      },
      ...(branchChanges ? { branchChanges } : {}),
      hasUpstream: upstreamRef !== null,
      aheadCount,
      behindCount,
      aheadOfDefaultCount,
    };
  });
