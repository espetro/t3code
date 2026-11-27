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
export const bindSwitchRef = (ctx: any) =>
  Effect.fn("switchRef")(function* (input) {
    const {
      checkoutFailureDetail,
      classifyGitFailure,
      deriveLocalBranchNameFromRemoteRef,
      executeGit,
      executeGitWithStableDiagnostics,
      gitCommandContext,
      parseTrackingBranchByUpstreamRef,
      refuseOptionLikeRefName,
      retryWhileConfigLocked,
      runGitStdout,
    } = ctx;

    const [localInputExists, remoteExists] = yield* Effect.all(
      [
        executeGit(
          "GitVcsDriver.switchRef.localInputExists",
          input.cwd,
          ["show-ref", "--verify", "--quiet", `refs/heads/${input.refName}`],
          {
            timeoutMs: 5_000,
            allowNonZeroExit: true,
          },
        ).pipe(Effect.map((result) => result.exitCode === 0)),
        executeGit(
          "GitVcsDriver.switchRef.remoteExists",
          input.cwd,
          ["show-ref", "--verify", "--quiet", `refs/remotes/${input.refName}`],
          {
            timeoutMs: 5_000,
            allowNonZeroExit: true,
          },
        ).pipe(Effect.map((result) => result.exitCode === 0)),
      ],
      { concurrency: "unbounded" },
    );

    const localTrackingBranch =
      remoteExists && !localInputExists
        ? yield* executeGit(
            "GitVcsDriver.switchRef.localTrackingBranch",
            input.cwd,
            // `:short` prefixes a name a tag shares with `heads/`, so names are unambiguous here.
            ["for-each-ref", "--format=%(refname:lstrip=2)\t%(upstream)", "refs/heads"],
            {
              timeoutMs: 5_000,
              allowNonZeroExit: true,
            },
          ).pipe(
            Effect.map((result) =>
              result.exitCode === 0
                ? parseTrackingBranchByUpstreamRef(result.stdout, `refs/remotes/${input.refName}`)
                : null,
            ),
          )
        : null;

    const localTrackedBranchCandidate =
      remoteExists && !localInputExists && !localTrackingBranch
        ? yield* executeGit("GitVcsDriver.switchRef.remoteNames", input.cwd, ["remote"], {
            timeoutMs: 5_000,
            allowNonZeroExit: true,
          }).pipe(
            Effect.map((result) => {
              const remoteNames = result.exitCode === 0 ? parseRemoteNames(result.stdout) : [];
              return (
                parseRemoteRefWithRemoteNames(input.refName, remoteNames)?.branchName ??
                deriveLocalBranchNameFromRemoteRef(input.refName)
              );
            }),
          )
        : null;
    const localTrackedBranchTargetExists =
      localTrackedBranchCandidate !== null
        ? yield* executeGit(
            "GitVcsDriver.switchRef.localTrackedBranchTargetExists",
            input.cwd,
            ["show-ref", "--verify", "--quiet", `refs/heads/${localTrackedBranchCandidate}`],
            {
              timeoutMs: 5_000,
              allowNonZeroExit: true,
            },
          ).pipe(Effect.map((result) => result.exitCode === 0))
        : false;

    const newTrackingBranch =
      localTrackedBranchCandidate !== null && !localTrackedBranchTargetExists
        ? localTrackedBranchCandidate
        : null;

    const checkoutArgs = localInputExists
      ? ["checkout", input.refName]
      : newTrackingBranch
        ? ["checkout", newTrackingBranch]
        : remoteExists && !localTrackingBranch
          ? localTrackedBranchCandidate
            ? [
                "checkout",
                "--track",
                "-b",
                localTrackedBranchCandidate,
                `refs/remotes/${input.refName}`,
              ]
            : ["checkout", "--track", input.refName]
          : remoteExists && localTrackingBranch
            ? ["checkout", localTrackingBranch]
            : ["checkout", input.refName];

    yield* refuseOptionLikeRefName("GitVcsDriver.switchRef", input.cwd, checkoutArgs.at(-1));

    // Created before the checkout so the shared-config lock is not held while files are written.
    // Not rolled back on failure: Git may already have switched HEAD to it (post-checkout hooks).
    if (newTrackingBranch) {
      const startRef = `refs/remotes/${input.refName}`;
      yield* executeGitWithStableDiagnostics(
        "GitVcsDriver.switchRef.createTrackingBranch",
        input.cwd,
        ["branch", "--no-track", "--", newTrackingBranch, startRef],
        { fallbackErrorDetail: "git branch create failed" },
      );
      // An untracked branch of this name would make every later switch to the remote detach.
      yield* executeGitWithStableDiagnostics(
        "GitVcsDriver.switchRef.trackRemote",
        input.cwd,
        ["branch", `--set-upstream-to=${startRef}`, "--", newTrackingBranch],
        { writesSharedConfig: true },
      ).pipe(
        retryWhileConfigLocked,
        Effect.tapError(() =>
          executeGit(
            "GitVcsDriver.switchRef.removeUntrackedBranch",
            input.cwd,
            ["update-ref", "-d", `refs/heads/${newTrackingBranch}`, startRef],
            { allowNonZeroExit: true },
          ),
        ),
      );
    }

    // A stale ref must not turn into a path checkout that discards local edits.
    const checkoutResult = yield* executeGitWithStableDiagnostics(
      "GitVcsDriver.switchRef.checkout",
      input.cwd,
      [...checkoutArgs, "--"],
      {
        // Killing a checkout midway (large or LFS repos) leaves a half-updated working tree.
        timeoutMs: null,
        allowNonZeroExit: true,
        // Creating a branch writes its upstream; Git also guesses a remote branch for a missing name.
        writesSharedConfig: checkoutArgs[1] === "--track" || (!localInputExists && !remoteExists),
      },
    );
    if (checkoutResult.exitCode !== 0) {
      const reason = classifyGitFailure(checkoutResult.stderr);
      return yield* new GitCommandError({
        ...gitCommandContext({
          operation: "GitVcsDriver.switchRef.checkout",
          cwd: input.cwd,
          args: [...checkoutArgs, "--"],
        }),
        ...(reason === null ? {} : { reason }),
        detail: checkoutFailureDetail(checkoutResult.stderr),
        ...(checkoutResult.exitCode === null ? {} : { exitCode: checkoutResult.exitCode }),
        stdoutLength: checkoutResult.stdout.length,
        stderrLength: checkoutResult.stderr.length,
      });
    }

    const refName = yield* runGitStdout("GitVcsDriver.switchRef.currentBranch", input.cwd, [
      "branch",
      "--show-current",
    ]).pipe(Effect.map((stdout) => trimAsciiWhitespace(stdout) || null));

    return { refName };
  });
