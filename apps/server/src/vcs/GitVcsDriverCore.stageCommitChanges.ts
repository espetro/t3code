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
export const bindStageCommitChanges = (ctx: any) =>
  Effect.fnUntraced(function* (
    cwd: string,
    filePaths?: readonly string[],
    env?: NodeJS.ProcessEnv,
  ) {
    const {
      REVIEW_METADATA_MAX_OUTPUT_BYTES,
      executeGit,
      fileSystem,
      path,
      readEmptyTreeHash,
      runGit,
      runGitStdout,
      runGitStdoutWithOptions,
      supportsPathspecFromFile,
    } = ctx;

    const config = env
      ? ["-c", "core.splitIndex=false", "-c", "splitIndex.sharedIndexExpire=never"]
      : [];
    let preserveUnselectedConflicts = false;
    if (filePaths && filePaths.length > 0) {
      if (env) {
        const head = yield* executeGit(
          "GitVcsDriver.prepareCommitContext.head",
          cwd,
          ["rev-parse", "--verify", "--quiet", "HEAD"],
          { allowNonZeroExit: true },
        );
        // Even with GIT_INDEX_FILE, reset clears the repository's merge state.
        yield* runGit(
          "GitVcsDriver.prepareCommitContext.readTree",
          cwd,
          [...config, "read-tree", ...(head.exitCode === 0 ? ["HEAD"] : ["--empty"])],
          { env },
        );
      } else {
        const inProgressHeads = [
          { head: "MERGE_HEAD", operation: "merge" },
          { head: "CHERRY_PICK_HEAD", operation: "cherry-pick" },
          { head: "REVERT_HEAD", operation: "revert" },
          // A conflicted multi-commit `cherry-pick --no-commit` writes only the sequencer; reset
          // would clear its unmerged entries, so `--continue` would walk past the conflict.
          { head: "sequencer", operation: "cherry-pick or revert" },
        ] as const;
        const headPaths = yield* runGitStdout("GitVcsDriver.commit.mergeHead", cwd, [
          "rev-parse",
          ...inProgressHeads.flatMap(({ head }) => ["--git-path", head]),
        ]);
        const resolvedHeadPaths = headPaths.trim().split("\n");
        // Reftable keeps CHERRY_PICK_HEAD and REVERT_HEAD as refs with no file under .git. A
        // same-named branch resolves to its full name; an ambiguity warning would blank stdout.
        const operationRefs = new Set<string>(["CHERRY_PICK_HEAD", "REVERT_HEAD"]);
        const isOperationRef = (head: string) =>
          runGitStdout(
            "GitVcsDriver.commit.operationRef",
            cwd,
            [
              "-c",
              "core.warnAmbiguousRefs=false",
              "rev-parse",
              "--verify",
              "--quiet",
              "--symbolic-full-name",
              head,
            ],
            true,
          ).pipe(Effect.map((ref) => ref.trim() === head));
        const inProgress = yield* Effect.findFirst(inProgressHeads, ({ head }, index) =>
          fileSystem.exists(path.resolve(cwd, resolvedHeadPaths[index] ?? "")).pipe(
            Effect.filterOrElse(
              (exists) => exists || !operationRefs.has(head),
              () => isOperationRef(head),
            ),
          ),
        ).pipe(
          Effect.mapError(
            (cause) =>
              new GitCommandError({
                operation: "GitVcsDriver.commit.mergeHead",
                command: "git commit",
                cwd,
                detail: "Could not check whether a merge, cherry-pick or revert is in progress.",
                cause,
              }),
          ),
        );
        // Like git commit --only, reject partial commits before reset can discard their state.
        if (Option.isSome(inProgress)) {
          const { operation } = inProgress.value;
          return yield* new GitCommandError({
            operation: "GitVcsDriver.commit",
            command: "git commit",
            cwd,
            detail: `Cannot commit selected files during a ${operation}. Commit all files to finish the ${operation}.`,
          });
        }
        const selectedFiles = new Set(filePaths);
        const unmergedPaths = yield* runGitStdoutWithOptions(
          "GitVcsDriver.commit.unmergedPaths",
          cwd,
          ["-c", "diff.relative=false", "diff", "--cached", "--name-only", "--diff-filter=U", "-z"],
          { maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES },
        );
        // Reset drops every conflict stage, so keep the index while unselected files are conflicted.
        preserveUnselectedConflicts = unmergedPaths
          .split("\0")
          .some((file) => file.length > 0 && !selectedFiles.has(file));
        if (!preserveUnselectedConflicts) {
          yield* runGit("GitVcsDriver.commit.reset", cwd, ["reset", "--quiet"]);
        }
      }
      // Status paths are repository-relative, while cwd can be a subdirectory.
      const pathspecs = filePaths.map((file) => `:(top,literal)${file}`);
      const fromStdin = yield* supportsPathspecFromFile(cwd);
      yield* runGit(
        "GitVcsDriver.commit.addSelected",
        cwd,
        fromStdin
          ? [...config, "add", "-A", "--pathspec-from-file=-", "--pathspec-file-nul"]
          : [...config, "add", "-A", "--", ...pathspecs],
        {
          ...(env ? { env } : {}),
          ...(fromStdin ? { stdin: pathspecs.map((pathspec) => `${pathspec}\0`).join("") } : {}),
        },
      );
    } else {
      // add -A marks unmerged paths resolved, so refuse while one still has conflict markers.
      const unmergedPaths = (yield* runGitStdoutWithOptions(
        "GitVcsDriver.commit.unmergedPaths",
        cwd,
        ["-c", "diff.relative=false", "diff", "--name-only", "--diff-filter=U", "-z"],
        env ? { env } : {},
      ))
        .split("\0")
        .filter((file) => file.length > 0);
      if (unmergedPaths.length > 0) {
        const check = yield* executeGit(
          "GitVcsDriver.commit.conflictMarkers",
          cwd,
          [
            "-c",
            "diff.relative=false",
            "diff",
            "--check",
            "--no-color",
            "--",
            ...unmergedPaths.map((file) => `:(top,literal)${file}`),
          ],
          {
            ...(env ? { env } : {}),
            allowNonZeroExit: true,
            maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES,
            appendTruncationMarker: true,
          },
        );
        const reports = check.stdout.split("\n");
        const conflicted: string[] = [];
        let emptyTree: string | undefined;
        for (const file of unmergedPaths) {
          const markerLines = new Set(
            reports.flatMap((line) => {
              const match = line.startsWith(`${file}:`)
                ? /^(\d+): leftover conflict marker$/.exec(line.slice(file.length + 1))
                : null;
              return match ? [Number(match[1]) - 1] : [];
            }),
          );
          if (markerLines.size === 0) continue;
          emptyTree ??= yield* readEmptyTreeHash(cwd);
          // --check numbers lines after working-tree-encoding and clean filters; a diff from the
          // empty tree prints that view. Read it in full so large resolved files can still commit.
          const fileDiff = yield* runGitStdoutWithOptions(
            "GitVcsDriver.commit.conflictMarkers",
            cwd,
            [
              "-c",
              "diff.relative=false",
              "diff",
              "--no-color",
              "--no-ext-diff",
              "--no-textconv",
              "--text",
              emptyTree,
              "--",
              `:(top,literal)${file}`,
            ],
            { ...(env ? { env } : {}), maxOutputBytes: Number.POSITIVE_INFINITY },
          ).pipe(
            Effect.mapError(
              (cause) =>
                new GitCommandError({
                  operation: "GitVcsDriver.commit.conflictMarkers",
                  command: "git commit",
                  cwd,
                  detail: `Could not check ${file} for conflict markers.`,
                  cause,
                }),
            ),
          );
          const diffLines = fileDiff.split("\n");
          const lines = diffLines
            .slice(diffLines.findIndex((line) => line.startsWith("@@")) + 1)
            .filter((line) => line.startsWith("+"))
            .map((line) => line.slice(1));
          // Git also reports a lone "=======", which is valid content such as a heading underline.
          const reported = (marker: string) =>
            lines.some((line, index) => markerLines.has(index) && line.startsWith(marker));
          if (reported("<") && reported(">")) conflicted.push(file);
        }
        if (conflicted.length > 0) {
          return yield* new GitCommandError({
            operation: "GitVcsDriver.commit",
            command: "git commit",
            cwd,
            detail: `Cannot commit with unresolved merge conflicts in ${conflicted.join(", ")}. Resolve them, then commit.`,
          });
        }
      }
      yield* runGit(
        "GitVcsDriver.commit.addAll",
        cwd,
        [...config, "add", "-A"],
        env ? { env } : {},
      );
    }
    return preserveUnselectedConflicts && filePaths
      ? filePaths.map((file) => `:(top,literal)${file}`)
      : undefined;
  });
