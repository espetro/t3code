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

import type { GitRefsSnapshot } from "./GitVcsDriverCore.ts";

// oxlint-disable-next-line typescript/no-explicit-any -- scriptc#4381: factory scope bag
export const bindReadGitRefsSnapshot = (ctx: any) =>
  Effect.fn("readGitRefsSnapshot")(function* (gitCommonDir: string) {
    const {
      executeGit,
      executeGitWithStableDiagnostics,
      parseDefaultBranchFromRemoteHeadRef,
      path,
      resolveDefaultBranchName,
      worktreeBranchPathsCache,
    } = ctx;

    const fetchCwd =
      path.basename(gitCommonDir) === ".git" ? path.dirname(gitCommonDir) : gitCommonDir;
    const gitDirArgs = ["--git-dir", gitCommonDir] as const;
    // Read occupancy first so a concurrent worktree addition changes the cached stamp.
    const worktrees = yield* Cache.get(worktreeBranchPathsCache, gitCommonDir);
    const [refsResult, defaultRefResult, remoteNamesResult] = yield* Effect.all(
      [
        executeGitWithStableDiagnostics(
          "GitVcsDriver.listRefs.snapshotRefs",
          fetchCwd,
          [
            ...gitDirArgs,
            "for-each-ref",
            "--format=%(refname)%09%(committerdate:unix)%09%(symref)%09%(upstream)",
            "refs/heads",
            "refs/remotes",
          ],
          {
            timeoutMs: 30_000,
            maxOutputBytes: 16 * 1024 * 1024,
            fallbackErrorDetail: "Git ref snapshot enumeration failed.",
          },
        ),
        executeGit(
          "GitVcsDriver.listRefs.defaultRef",
          fetchCwd,
          [
            ...gitDirArgs,
            "rev-parse",
            "--verify",
            "--quiet",
            "--symbolic-full-name",
            "refs/remotes/origin/HEAD",
          ],
          {
            timeoutMs: 5_000,
            allowNonZeroExit: true,
          },
        ),
        executeGit("GitVcsDriver.listRefs.remoteNames", fetchCwd, [...gitDirArgs, "remote"], {
          timeoutMs: 5_000,
          allowNonZeroExit: true,
        }),
      ],
      { concurrency: 2 },
    );

    const remoteNamesInGitOrder =
      remoteNamesResult.exitCode === 0 ? parseRemoteNamesInGitOrder(remoteNamesResult.stdout) : [];
    const remoteNames =
      remoteNamesResult.exitCode === 0 ? parseRemoteNames(remoteNamesResult.stdout) : [];
    if (remoteNamesResult.exitCode !== 0 && remoteNamesResult.stderr.trim().length > 0) {
      yield* Effect.logWarning(
        `GitVcsDriver.listRefs: remote name lookup returned code ${remoteNamesResult.exitCode} for ${gitCommonDir}: ${remoteNamesResult.stderr.trim()}. Falling back to an empty remote name list.`,
      );
    }
    const originDefaultBranch =
      defaultRefResult.exitCode === 0
        ? parseDefaultBranchFromRemoteHeadRef(defaultRefResult.stdout, "origin")
        : null;
    // Same fallback as resolvePrimaryDefaultBranchName: without an origin, the first remote is primary.
    const [firstRemoteName] = remoteNamesInGitOrder;
    const fallbackRemoteName =
      originDefaultBranch === null &&
      firstRemoteName !== undefined &&
      !remoteNamesInGitOrder.includes("origin")
        ? firstRemoteName
        : null;
    const defaultBranch =
      fallbackRemoteName === null
        ? originDefaultBranch
        : yield* resolveDefaultBranchName(fetchCwd, fallbackRemoteName, gitDirArgs);
    const defaultRemoteName = fallbackRemoteName ?? "origin";
    const localBranches: Array<{ readonly ref: VcsRef; readonly lastCommit: number }> = [];
    const remoteBranches: Array<{ readonly ref: VcsRef; readonly lastCommit: number }> = [];

    for (const line of refsResult.stdout.split("\n")) {
      if (line.length === 0) continue;
      const [fullRefName, lastCommitRaw, symbolicTarget, upstreamRef] = line.split("\t");
      if (!fullRefName || symbolicTarget) continue;
      const parsedLastCommit = Number.parseInt(lastCommitRaw ?? "0", 10);
      const lastCommit = Number.isFinite(parsedLastCommit) ? parsedLastCommit : 0;

      if (fullRefName.startsWith("refs/heads/")) {
        const name = fullRefName.slice("refs/heads/".length);
        localBranches.push({
          ref: {
            name,
            current: false,
            isRemote: false,
            isDefault: name === defaultBranch,
            worktreePath: worktrees?.paths.get(name) ?? null,
            ...(upstreamRef ? { upstreamRef } : {}),
          },
          lastCommit,
        });
        continue;
      }
      if (!fullRefName.startsWith("refs/remotes/")) continue;

      const name = fullRefName.slice("refs/remotes/".length);
      const parsedRemoteRef = parseRemoteRefWithRemoteNames(name, remoteNames);
      const remoteBranch: VcsRef = {
        name,
        current: false,
        isRemote: true,
        isDefault:
          defaultBranch !== null &&
          parsedRemoteRef?.remoteName === defaultRemoteName &&
          parsedRemoteRef.branchName === defaultBranch,
        worktreePath: null,
        ...(parsedRemoteRef ? { remoteName: parsedRemoteRef.remoteName } : {}),
      };
      remoteBranches.push({ ref: remoteBranch, lastCommit });
    }

    const byRecencyThenName = (
      left: { readonly ref: VcsRef; readonly lastCommit: number },
      right: { readonly ref: VcsRef; readonly lastCommit: number },
    ) =>
      left.lastCommit !== right.lastCommit
        ? right.lastCommit - left.lastCommit
        : left.ref.name.localeCompare(right.ref.name);

    return {
      defaultBranch,
      localBranches: localBranches.toSorted(byRecencyThenName).map(({ ref }) => ref),
      remoteBranches: remoteBranches.toSorted(byRecencyThenName).map(({ ref }) => ref),
      hasPrimaryRemote: remoteNames.length > 0,
      worktreeStamp: worktrees?.stamp ?? null,
    } satisfies GitRefsSnapshot;
  });
