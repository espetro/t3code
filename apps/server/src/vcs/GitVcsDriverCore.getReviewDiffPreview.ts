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
export const bindGetReviewDiffPreview = (ctx: any) =>
  Effect.fn("getReviewDiffPreview")(function* (input: ReviewDiffPreviewInput) {
    const {
      REVIEW_DIFF_ARGS,
      REVIEW_DIFF_FILE_MAX_OUTPUT_BYTES,
      REVIEW_DIFF_PATCH_MAX_OUTPUT_BYTES,
      REVIEW_METADATA_MAX_OUTPUT_BYTES,
      REVIEW_TRACKED_PREVIEW_CAPACITY,
      REVIEW_TRACKED_PREVIEW_TTL_MS,
      digest,
      executeGit,
      isMissingGitCwdError,
      isUnbornHeadStderr,
      parseReviewNumstat,
      path,
      prepareUntrackedReviewIndex,
      random,
      readEmptyTreeHash,
      readReviewCommitMessage,
      resolveReviewCommit,
      resolveReviewMergeBase,
      resolveReviewRepository,
      reviewCommitError,
      runGitStdoutWithOptions,
      takeTrackedReviewPreview,
      trackedReviewPreviewKey,
      trackedReviewPreviews,
    } = pickScriptcBindCtx(ctx);

    const pathArgs = input.file
      ? [input.file.path, ...(input.file.previousPath ? [input.file.previousPath] : [])].map(
          (path) => `:(top,literal)${path}`,
        )
      : [];
    const patchLimit = input.file
      ? REVIEW_DIFF_FILE_MAX_OUTPUT_BYTES
      : REVIEW_DIFF_PATCH_MAX_OUTPUT_BYTES;
    if (
      input.sourceKind !== undefined &&
      input.file &&
      input.file.sourceKind !== input.sourceKind
    ) {
      return yield* new GitCommandError({
        operation: "GitVcsDriver.getReviewDiffPreview",
        command: "git diff",
        cwd: input.cwd,
        detail: "Review source selectors must agree.",
      });
    }
    const sourceKind = input.file?.sourceKind ?? input.sourceKind;
    const previewMergeBase =
      input.file?.sourceKind === "branch-range" ? input.mergeBase : undefined;
    const needsCurrentBranch =
      input.commitSha === undefined &&
      input.file?.sourceKind !== "commit" &&
      sourceKind !== "working-tree" &&
      previewMergeBase === undefined;
    const reusesTracked = input.file === undefined && input.commitSha === undefined;
    const tracked = reusesTracked ? yield* takeTrackedReviewPreview(input) : undefined;
    const repository =
      tracked?.repository ??
      (yield* resolveReviewRepository(input.cwd, needsCurrentBranch).pipe(
        Effect.catchTags({
          GitCommandError: (error) =>
            isMissingGitCwdError(error) ? Effect.succeed(null) : Effect.fail(error),
        }),
      ));
    if (!repository?.worktreeRoot) {
      return {
        cwd: input.cwd,
        generatedAt: yield* DateTime.now,
        sources: [],
      };
    }

    const cwd = repository.worktreeRoot;
    const hashDiff = (diff: string, files: ReadonlyArray<ReviewDiffFileStat>) =>
      digest.digest(Digest.sha256, new TextEncoder().encode(JSON.stringify([diff, files]))).pipe(
        Effect.map(Hex.encode),
        Effect.mapError(
          (cause) =>
            new GitCommandError({
              operation: "GitVcsDriver.getReviewDiffPreview.hash",
              command: "crypto.digest SHA-256",
              cwd,
              detail: "Failed to hash review diff.",
              cause,
            }),
        ),
      );
    if (input.commitSha !== undefined || input.file?.sourceKind === "commit") {
      if (!input.commitSha || (input.file && input.file.sourceKind !== "commit")) {
        return yield* reviewCommitError(cwd, "Selected commit request is invalid.");
      }
      const commit = yield* resolveReviewCommit(cwd, input.commitSha);
      const { subject } = yield* readReviewCommitMessage(cwd, commit.sha);
      const diffArgs = [
        ...REVIEW_DIFF_ARGS,
        ...(input.ignoreWhitespace ? ["--ignore-all-space"] : []),
      ];
      const stat = yield* executeGit(
        "GitVcsDriver.getReviewDiffPreview.commitStat",
        cwd,
        [...diffArgs, "--raw", "--numstat", "-z", commit.parent, commit.sha, "--", ...pathArgs],
        { maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES },
      );
      const files = parseReviewNumstat(stat.stdout);
      const patch =
        input.metadataOnly && !input.file
          ? { stdout: "", stdoutTruncated: false }
          : yield* executeGit(
              "GitVcsDriver.getReviewDiffPreview.commitPatch",
              cwd,
              [...diffArgs, "--patch", commit.parent, commit.sha, "--", ...pathArgs],
              { maxOutputBytes: patchLimit, appendTruncationMarker: true },
            );
      const diffHash = yield* hashDiff(patch.stdout, files);
      return {
        cwd: input.cwd,
        generatedAt: yield* DateTime.now,
        sources: [
          {
            id: commit.sha,
            kind: "commit" as const,
            title: `Commit ${commit.sha.slice(0, 7)}`,
            ...(subject.trim() ? { commitSubject: subject.trim() } : {}),
            baseRef: commit.parent,
            headRef: commit.sha,
            diff: patch.stdout,
            files,
            diffHash,
            truncated: patch.stdoutTruncated,
            ...(input.metadataOnly && !input.file ? { patchesDeferred: true } : {}),
          },
        ],
      };
    }

    const dirtyRef = sourceKind === "branch-range" ? null : "HEAD";
    const review =
      tracked?.review ??
      (sourceKind === "working-tree"
        ? { baseRef: input.baseRef ?? null, mergeBase: null }
        : previewMergeBase !== undefined
          ? { baseRef: input.baseRef ?? null, mergeBase: previewMergeBase }
          : yield* resolveReviewMergeBase(cwd, repository.currentBranch, input.baseRef));

    const diffArgs = [
      ...REVIEW_DIFF_ARGS,
      ...(input.ignoreWhitespace ? ["--ignore-all-space"] : []),
    ];
    const readStats = Effect.fn("GitVcsDriver.getReviewDiffPreview.stat")(function* (
      ref: string,
      env?: NodeJS.ProcessEnv,
    ) {
      const args = [...diffArgs, "--raw", "--numstat", "-z"];
      const result = yield* executeGit(
        "GitVcsDriver.getReviewDiffPreview.stat",
        cwd,
        [...args, ref, "--", ...pathArgs],
        { allowNonZeroExit: true, maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES, env },
      );
      if (result.exitCode === 0) return { ref, files: parseReviewNumstat(result.stdout) };
      if (ref === "HEAD" && isUnbornHeadStderr(result.stderr)) {
        const emptyTree = yield* readEmptyTreeHash(cwd);
        const stdout = yield* runGitStdoutWithOptions(
          "GitVcsDriver.getReviewDiffPreview.unbornStat",
          cwd,
          [...args, emptyTree, "--", ...pathArgs],
          { maxOutputBytes: REVIEW_METADATA_MAX_OUTPUT_BYTES, env },
        );
        return { ref: emptyTree, files: parseReviewNumstat(stdout) };
      }
      return yield* new GitCommandError({
        operation: "GitVcsDriver.getReviewDiffPreview.stat",
        cwd,
        command: "git diff --numstat",
        detail: "Could not read complete diff statistics.",
        exitCode: result.exitCode,
      });
    });
    // A file the preview did not list as new is stat-ed against the real index first. `git diff`
    // lists an indexed path as anything but deleted, and `ls-files --others` never lists one.
    const indexedRef =
      input.file && !input.trackedOnly && input.file.changeType && input.file.changeType !== "new"
        ? (dirtyRef ?? review.mergeBase)
        : null;
    const indexedStat = indexedRef === null ? undefined : yield* readStats(indexedRef);
    const indexed =
      indexedStat?.files.some(
        (file) =>
          file.path === input.file?.path &&
          file.changeType !== undefined &&
          file.changeType !== "deleted",
      ) === true;
    const readTrackedDiff = Effect.fn("GitVcsDriver.getReviewDiffPreview.tracked")(function* (
      ref: string | null,
      env?: NodeJS.ProcessEnv,
      metadataOnly = false,
    ) {
      if (ref === null) return { stdout: "", stdoutTruncated: false, files: [] };
      const stat =
        env === undefined && ref === indexedRef && indexedStat !== undefined
          ? indexedStat
          : yield* readStats(ref, env);
      if (metadataOnly || stat.files.length === 0) {
        return { stdout: "", stdoutTruncated: false, files: stat.files };
      }
      const patch = yield* executeGit(
        "GitVcsDriver.getReviewDiffPreview.patch",
        cwd,
        [...diffArgs, "--patch", stat.ref, "--", ...pathArgs],
        { maxOutputBytes: patchLimit, appendTruncationMarker: true, env },
      );
      return { ...patch, files: stat.files };
    });
    const [dirtyTrackedResult, baseResult] = yield* Effect.gen(function* () {
      const untracked =
        input.trackedOnly || indexed
          ? { env: undefined, omitted: false }
          : yield* prepareUntrackedReviewIndex(cwd, pathArgs, input.file?.path);
      // Untracked files left out make the file list partial, so the bounded patch is sent instead.
      const complete = untracked !== null && !untracked.omitted;
      // With no untracked files to add, the tracked read already is the complete diff.
      if (tracked !== undefined && complete && untracked.env === undefined) {
        return [tracked.dirty, tracked.base] as const;
      }
      const metadataOnly = input.metadataOnly === true && !input.file && complete;
      const [dirty, base] =
        review.mergeBase === dirtyRef
          ? yield* readTrackedDiff(dirtyRef, untracked?.env, metadataOnly).pipe(
              Effect.map((result) => [result, result] as const),
            )
          : yield* Effect.all(
              [
                readTrackedDiff(dirtyRef, untracked?.env, metadataOnly),
                readTrackedDiff(review.mergeBase, untracked?.env, metadataOnly),
              ],
              { concurrency: 2 },
            );
      if (complete) return [dirty, base] as const;
      const incomplete = (ref: string | null, result: typeof dirty) =>
        ref === null ? result : { ...result, files: undefined, stdoutTruncated: true };
      return [incomplete(dirtyRef, dirty), incomplete(review.mergeBase, base)] as const;
    }).pipe(Effect.scoped);
    let completionToken: string | undefined;
    if (input.trackedOnly && reusesTracked && dirtyTrackedResult.files && baseResult.files) {
      completionToken = yield* random.uuidV4();
      trackedReviewPreviews.set(completionToken, {
        key: trackedReviewPreviewKey(input),
        expiresAt: (yield* Clock.currentTimeMillis) + REVIEW_TRACKED_PREVIEW_TTL_MS,
        repository,
        review,
        dirty: { ...dirtyTrackedResult, files: dirtyTrackedResult.files },
        base: { ...baseResult, files: baseResult.files },
      });
      if (trackedReviewPreviews.size > REVIEW_TRACKED_PREVIEW_CAPACITY) {
        const oldestKey = trackedReviewPreviews.keys().next().value;
        if (oldestKey !== undefined) trackedReviewPreviews.delete(oldestKey);
      }
    }
    const dirtyFiles = dirtyTrackedResult.files;
    const baseFiles = baseResult.files;
    const dirtyDiff = dirtyTrackedResult.stdout;
    const baseDiff = baseResult.stdout;
    const [dirtyDiffHash, baseDiffHash] = yield* Effect.all([
      hashDiff(dirtyDiff, dirtyFiles ?? []),
      hashDiff(baseDiff, baseFiles ?? []),
    ]);

    const sources: ReviewDiffPreviewSource[] = [
      {
        id: "working-tree",
        kind: "working-tree",
        title: "Uncommitted",
        baseRef: "HEAD",
        headRef: null,
        diff: dirtyDiff,
        ...(dirtyFiles === undefined ? {} : { files: dirtyFiles }),
        diffHash: dirtyDiffHash,
        truncated: dirtyTrackedResult.stdoutTruncated,
        ...(input.metadataOnly && !input.file && dirtyFiles !== undefined
          ? { patchesDeferred: true }
          : {}),
      },
      {
        id: "branch-range",
        kind: "branch-range",
        title: review.baseRef ? `Changes vs ${review.baseRef}` : "Changes",
        baseRef: review.baseRef,
        headRef: repository.currentBranch ?? "HEAD",
        ...(review.mergeBase === null ? {} : { mergeBase: review.mergeBase }),
        diff: baseDiff,
        ...(baseFiles === undefined ? {} : { files: baseFiles }),
        diffHash: baseDiffHash,
        truncated: baseResult.stdoutTruncated,
        ...(input.metadataOnly && !input.file && baseFiles !== undefined
          ? { patchesDeferred: true }
          : {}),
      },
    ];

    return {
      cwd: input.cwd,
      generatedAt: yield* DateTime.now,
      sources: input.sourceKind
        ? sources.filter((source) => source.kind === input.sourceKind)
        : sources,
      ...(input.trackedOnly ? { incomplete: true } : {}),
      ...(completionToken === undefined ? {} : { completionToken }),
    };
  });
