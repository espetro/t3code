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
export const bindPrepareCommitContext = (ctx: any) =>
  Effect.fn("prepareCommitContext")(function* (cwd, filePaths, options) {
    const {
      PREPARED_COMMIT_PATCH_MAX_OUTPUT_BYTES,
      REVIEW_METADATA_MAX_OUTPUT_BYTES,
      fileSystem,
      path,
      privateObjectDirectoryEnv,
      runGit,
      runGitStdout,
      runGitStdoutWithOptions,
      stageCommitChanges,
    } = pickScriptcBindCtx(ctx);

    return yield* Effect.scoped(
      Effect.gen(function* () {
        const [indexValue = "", objectsValue = ""] = (yield* runGitStdout(
          "GitVcsDriver.prepareCommitContext.gitPaths",
          cwd,
          ["rev-parse", "--git-path", "index", "--git-path", "objects"],
        )).split("\n");
        // Git's relative paths use the physical cwd, even when the project uses a symlink.
        const physicalCwd = yield* fileSystem.realPath(cwd);
        const indexPath = path.resolve(physicalCwd, indexValue.trim());
        const directory = yield* fileSystem.makeTempDirectoryScoped({
          prefix: "t3code-commit-index-",
        });
        const tempIndexPath = path.join(directory, "index");
        // Staging writes blobs; put them in the temp directory so a draft leaves nothing behind.
        const objectDirectories = yield* runGitStdout(
          "GitVcsDriver.prepareCommitContext.alternates",
          cwd,
          ["count-objects", "-v"],
        );
        const tempObjectsPath = path.join(directory, "objects");
        yield* fileSystem.makeDirectory(tempObjectsPath);
        const env = {
          GIT_INDEX_FILE: tempIndexPath,
          ...privateObjectDirectoryEnv(
            tempObjectsPath,
            path.resolve(physicalCwd, objectsValue.trim()),
            objectDirectories,
          ),
        } satisfies NodeJS.ProcessEnv;
        const config = ["-c", "core.splitIndex=false", "-c", "splitIndex.sharedIndexExpire=never"];
        if (yield* fileSystem.exists(indexPath)) {
          const { mtime } = yield* fileSystem.stat(indexPath);
          yield* fileSystem.copyFile(indexPath, tempIndexPath);
          const indexTime = Option.isSome(mtime)
            ? Math.max(0, Math.floor(mtime.value.getTime() / 1000))
            : 0;
          yield* fileSystem.utimes(tempIndexPath, indexTime, indexTime);
          yield* runGit(
            "GitVcsDriver.prepareCommitContext.expandSplitIndex",
            cwd,
            [...config, "update-index", "--no-split-index"],
            { env },
          );
        } else {
          yield* runGit(
            "GitVcsDriver.prepareCommitContext.emptyIndex",
            cwd,
            [...config, "read-tree", "--empty"],
            { env },
          );
        }
        yield* stageCommitChanges(cwd, filePaths, env);

        const stagedSummary = yield* runGitStdoutWithOptions(
          "GitVcsDriver.prepareCommitContext.stagedSummary",
          cwd,
          // cwd can be a subdirectory; diff.relative would hide changes outside it.
          ["-c", "diff.relative=false", "diff", "--cached", "--name-status"],
          { env, maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES },
        ).pipe(Effect.map((stdout) => stdout.trim()));
        if (stagedSummary.length === 0) {
          // Like git commit, a merge resolved to HEAD's tree still records its merge commit.
          const mergeHeadPath = yield* runGitStdout(
            "GitVcsDriver.prepareCommitContext.mergeHead",
            cwd,
            ["rev-parse", "--git-path", "MERGE_HEAD"],
          );
          if (!(yield* fileSystem.exists(path.resolve(physicalCwd, mergeHeadPath.trim())))) {
            return null;
          }
        }

        // A user-supplied message needs change detection, but no patch for generation.
        if (options?.includePatch === false) return { stagedSummary, stagedPatch: "" };

        const stagedPatch = yield* runGitStdoutWithOptions(
          "GitVcsDriver.prepareCommitContext.stagedPatch",
          cwd,
          [
            "-c",
            "diff.relative=false",
            "diff",
            "--no-color",
            "--no-ext-diff",
            "--no-textconv",
            "--cached",
            "--patch",
            "--minimal",
          ],
          {
            env,
            maxOutputBytes: PREPARED_COMMIT_PATCH_MAX_OUTPUT_BYTES,
            appendTruncationMarker: true,
          },
        );

        return {
          stagedSummary,
          stagedPatch,
        };
      }),
    ).pipe(
      Effect.catchTags({
        PlatformError: (cause) =>
          new GitCommandError({
            operation: "GitVcsDriver.prepareCommitContext",
            command: "git",
            cwd,
            detail: "Failed to prepare the temporary commit index.",
            cause,
          }),
      }),
    );
  });
