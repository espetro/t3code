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
export const bindReadBranchChangeTotals = (ctx: any) =>
  Effect.fn("readBranchChangeTotals")(function* (
    cwd: string,
    branch: string | null,
    options?: {
      readonly untrackedRoots: ReadonlyArray<string>;
      readonly headOid: string | null;
      readonly indexPath?: string;
    },
  ) {
    const {
      REVIEW_METADATA_MAX_OUTPUT_BYTES,
      STATUS_UPSTREAM_REFRESH_CACHE_CAPACITY,
      UNTRACKED_TOTALS_RETRY_MAX_MS,
      UNTRACKED_TOTALS_RETRY_MIN_MS,
      branchExists,
      branchTotalsDiffFailures,
      executeGit,
      isUnbornHeadStderr,
      parseReviewNumstat,
      prepareUntrackedReviewIndexOrReason,
      readEmptyTreeHash,
      resolveReviewMergeBase,
      untrackedTotalsFailures,
    } = ctx;

    const resolved = yield* resolveReviewMergeBase(cwd, branch);
    // A rename after `git status` read HEAD moves the base config away, so the base was guessed.
    const { baseRef, mergeBase } =
      branch === null || (yield* branchExists(cwd, branch))
        ? resolved
        : { baseRef: null, mergeBase: "HEAD" };
    // A moved HEAD or merge base skips the backoff and diffs again.
    const diffKey = options?.headOid ? `${options.headOid}\0${mergeBase}` : null;
    const diffFailure = branchTotalsDiffFailures.get(cwd);
    if (
      diffFailure !== undefined &&
      diffFailure.key === diffKey &&
      (yield* Clock.currentTimeMillis) < diffFailure.retryAt
    ) {
      return yield* new GitCommandError({
        operation: "GitVcsDriver.readBranchChangeTotals",
        command: "git diff --numstat",
        cwd,
        detail: diffFailure.detail,
      });
    }
    const roots = options?.untrackedRoots ?? [];
    // Bound pathspec matching work and stay below Windows' command-line limit.
    const pathspecs =
      roots.length <= 128 && roots.reduce((length, root) => length + root.length + 16, 0) < 8_000
        ? roots.map((root) => `:(top,literal)${root}`)
        : [];
    // Changed untracked roots skip the backoff and scan again.
    const rootsKey = roots.join("\0");
    const remembered = untrackedTotalsFailures.get(cwd);
    if (
      remembered !== undefined &&
      remembered.roots === rootsKey &&
      (yield* Clock.currentTimeMillis) < remembered.retryAt
    ) {
      return yield* new GitCommandError({
        operation: "GitVcsDriver.readBranchChangeTotals",
        command: "git ls-files",
        cwd,
        detail: remembered.detail,
      });
    }
    // Status always lists untracked files, so no roots means there are none to scan.
    const untracked =
      roots.length === 0
        ? { env: undefined, omitted: false }
        : yield* prepareUntrackedReviewIndexOrReason(
            cwd,
            pathspecs,
            undefined,
            false,
            options?.indexPath,
          );
    if ("unavailable" in untracked) {
      const count = remembered?.roots === rootsKey ? remembered.count + 1 : 1;
      untrackedTotalsFailures.delete(cwd);
      untrackedTotalsFailures.set(cwd, {
        roots: rootsKey,
        count,
        retryAt:
          (yield* Clock.currentTimeMillis) +
          Math.min(UNTRACKED_TOTALS_RETRY_MIN_MS * 2 ** (count - 1), UNTRACKED_TOTALS_RETRY_MAX_MS),
        detail: untracked.unavailable,
      });
      if (untrackedTotalsFailures.size > STATUS_UPSTREAM_REFRESH_CACHE_CAPACITY) {
        const oldestKey = untrackedTotalsFailures.keys().next().value;
        if (oldestKey !== undefined) untrackedTotalsFailures.delete(oldestKey);
      }
      return yield* new GitCommandError({
        operation: "GitVcsDriver.readBranchChangeTotals",
        command: "git ls-files",
        cwd,
        detail: untracked.unavailable,
      });
    }
    untrackedTotalsFailures.delete(cwd);
    const readNumstat = (ref: string) =>
      executeGit(
        "GitVcsDriver.readBranchChangeTotals",
        cwd,
        // Plumbing: porcelain diff refreshes and rewrites the real index, taking index.lock.
        ["diff-index", "-M", "--numstat", "-z", ref, "--"],
        {
          allowNonZeroExit: true,
          maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES,
          env: untracked.env,
        },
      );
    let result = yield* readNumstat(mergeBase).pipe(
      Effect.tapError((error) =>
        Effect.gen(function* () {
          if (diffKey === null) return;
          const count = diffFailure?.key === diffKey ? diffFailure.count + 1 : 1;
          branchTotalsDiffFailures.delete(cwd);
          branchTotalsDiffFailures.set(cwd, {
            key: diffKey,
            count,
            retryAt:
              (yield* Clock.currentTimeMillis) +
              Math.min(
                UNTRACKED_TOTALS_RETRY_MIN_MS * 2 ** (count - 1),
                UNTRACKED_TOTALS_RETRY_MAX_MS,
              ),
            detail: error.detail,
          });
          if (branchTotalsDiffFailures.size > STATUS_UPSTREAM_REFRESH_CACHE_CAPACITY) {
            const oldestKey = branchTotalsDiffFailures.keys().next().value;
            if (oldestKey !== undefined) branchTotalsDiffFailures.delete(oldestKey);
          }
        }),
      ),
    );
    branchTotalsDiffFailures.delete(cwd);
    if (result.exitCode !== 0 && mergeBase === "HEAD" && isUnbornHeadStderr(result.stderr)) {
      result = yield* readNumstat(yield* readEmptyTreeHash(cwd));
    }
    if (result.exitCode !== 0) {
      return yield* new GitCommandError({
        operation: "GitVcsDriver.readBranchChangeTotals",
        command: "git diff --numstat",
        cwd,
        detail: "Could not read Changes totals.",
        exitCode: result.exitCode,
      });
    }
    let insertions = 0;
    let deletions = 0;
    for (const file of parseReviewNumstat(result.stdout)) {
      insertions += file.additions;
      deletions += file.deletions;
    }
    return { baseRef, insertions, deletions };
  }, Effect.scoped);
