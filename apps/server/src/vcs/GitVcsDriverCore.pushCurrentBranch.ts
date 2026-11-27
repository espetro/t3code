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
export const bindPushCurrentBranch = (ctx: any) =>
  Effect.fn("pushCurrentBranch")(function* (cwd, fallbackBranch, options) {
    const {
      branchBaseConfigKey,
      executeGitWithStableDiagnostics,
      fetchRemoteTrackingBranch,
      gitCommandContext,
      pushesOnlyToFetchUrl,
      readBranchBase,
      readConfigValue,
      readStatusDetailsRemote,
      recordPushedUpstream,
      refreshStatusUpstream,
      remoteRefContainsHead,
      resolveBaseBranchForNoUpstream,
      resolvePublishBranchName,
      resolvePushDestination,
      status,
      writeConfigValue,
    } = ctx;

    // Refresh first so the branch, upstream and divergence reads below stay close together.
    yield* refreshStatusUpstream(cwd);
    const details = yield* readStatusDetailsRemote(cwd, false, false);
    const branch = details.branch ?? fallbackBranch;
    if (!branch) {
      return yield* new GitCommandError({
        ...gitCommandContext({
          operation: "GitVcsDriver.pushCurrentBranch",
          cwd,
          args: ["push"],
        }),
        detail: "Cannot push from detached HEAD.",
      });
    }

    const requestedRemoteName = options?.remoteName?.trim() || null;
    if (requestedRemoteName) {
      const publishBranch = resolvePublishBranchName(branch, requestedRemoteName);
      yield* executeGitWithStableDiagnostics(
        "GitVcsDriver.pushCurrentBranch.pushWithRequestedRemote",
        cwd,
        ["push", "--", requestedRemoteName, `HEAD:refs/heads/${publishBranch}`],
        { timeoutMs: null, pushes: true },
      );
      return {
        status: "pushed" as const,
        branch,
        upstreamBranch: `${requestedRemoteName}/${publishBranch}`,
        setUpstream: yield* recordPushedUpstream(cwd, branch, requestedRemoteName, publishBranch),
      };
    }

    const hasNoLocalDelta = details.aheadCount === 0 && details.behindCount === 0;
    const destination = yield* resolvePushDestination(cwd, branch, details.hasUpstream);
    if (hasNoLocalDelta && details.hasUpstream) {
      if (!destination?.pushRemote) {
        // A local upstream and a separate push URL both leave the publish destination unchecked.
        if (
          !destination ||
          (destination.upstream?.remoteName !== "." &&
            (yield* pushesOnlyToFetchUrl(cwd, destination.remoteName)))
        ) {
          return {
            status: "skipped_up_to_date" as const,
            branch,
            ...(details.upstreamRef ? { upstreamBranch: details.upstreamRef } : {}),
          };
        }
      } else {
        const { pushRemote, branchName } = destination;
        const pushRemoteRef = `${pushRemote}/${branchName}`;
        // The local ref can be stale when the branch was deleted or rewound elsewhere.
        const pushRemoteHasHead =
          (yield* pushesOnlyToFetchUrl(cwd, pushRemote)) &&
          (yield* fetchRemoteTrackingBranch({
            cwd,
            remoteName: pushRemote,
            remoteBranch: branchName,
          }).pipe(
            Effect.andThen(remoteRefContainsHead(cwd, pushRemoteRef)),
            Effect.orElseSucceed(() => false),
          ));
        if (pushRemoteHasHead) {
          return {
            status: "skipped_up_to_date" as const,
            branch,
            upstreamBranch: pushRemoteRef,
            pushRemote,
          };
        }
      }
    } else if (hasNoLocalDelta) {
      const comparableBaseBranch = yield* resolveBaseBranchForNoUpstream(cwd, branch).pipe(
        Effect.orElseSucceed(() => null),
      );
      if (comparableBaseBranch) {
        if (!destination) {
          return {
            status: "skipped_up_to_date" as const,
            branch,
          };
        }

        // The configured diff base can contain HEAD while the publish branch is still behind.
        if (
          (yield* remoteRefContainsHead(
            cwd,
            `${destination.remoteName}/${destination.branchName}`,
          )) &&
          (yield* pushesOnlyToFetchUrl(cwd, destination.remoteName))
        ) {
          return {
            status: "skipped_up_to_date" as const,
            branch,
          };
        }
      }
    }

    if (
      !destination &&
      (!details.hasUpstream || (yield* readConfigValue(cwd, `branch.${branch}.remote`)) === ".")
    ) {
      return yield* new GitCommandError({
        ...gitCommandContext({
          operation: "GitVcsDriver.pushCurrentBranch",
          cwd,
          args: ["push"],
        }),
        detail: "Cannot push because no git remote is configured for this repository.",
      });
    }

    if (destination?.publishes) {
      const { remoteName, branchName: publishBranch, upstream } = destination;
      // Publishing retargets the upstream, so preserve its comparison base first.
      if (upstream && (yield* readBranchBase(cwd, branch)) === null) {
        yield* writeConfigValue({
          cwd,
          key: branchBaseConfigKey(branch),
          value: upstream.branchName,
        });
        if (!(yield* readConfigValue(cwd, `branch.${branch}.t3-merge-base-ref`))) {
          yield* writeConfigValue({
            cwd,
            key: `branch.${branch}.t3-merge-base-ref`,
            value:
              upstream.remoteName === "."
                ? `refs/heads/${upstream.branchName}`
                : `refs/remotes/${upstream.upstreamRef}`,
          });
        }
      }
      yield* executeGitWithStableDiagnostics(
        upstream
          ? "GitVcsDriver.pushCurrentBranch.pushOwnBranch"
          : "GitVcsDriver.pushCurrentBranch.pushWithUpstream",
        cwd,
        ["push", "--", remoteName, `HEAD:refs/heads/${publishBranch}`],
        { timeoutMs: null, pushes: true },
      );
      return {
        status: "pushed" as const,
        branch,
        upstreamBranch: `${remoteName}/${publishBranch}`,
        setUpstream: yield* recordPushedUpstream(cwd, branch, remoteName, publishBranch),
      };
    }

    if (destination?.upstream) {
      yield* executeGitWithStableDiagnostics(
        "GitVcsDriver.pushCurrentBranch.pushUpstream",
        cwd,
        ["push", "--", destination.remoteName, `HEAD:refs/heads/${destination.branchName}`],
        { timeoutMs: null, pushes: true },
      );
      return {
        status: "pushed" as const,
        branch,
        ...(destination.pushRemote
          ? {
              upstreamBranch: `${destination.remoteName}/${destination.branchName}`,
              pushRemote: destination.pushRemote,
            }
          : { upstreamBranch: destination.upstream.upstreamRef }),
        setUpstream: false,
      };
    }

    yield* executeGitWithStableDiagnostics("GitVcsDriver.pushCurrentBranch.push", cwd, ["push"], {
      timeoutMs: null,
      pushes: true,
    });
    return {
      status: "pushed" as const,
      branch,
      ...(details.upstreamRef ? { upstreamBranch: details.upstreamRef } : {}),
      setUpstream: false,
    };
  });
