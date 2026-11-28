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
export const bindExecuteRaw = (ctx: any) =>
  Effect.fnUntraced(function* (input) {
    const {
      DEFAULT_MAX_OUTPUT_BYTES,
      DEFAULT_TIMEOUT_MS,
      classifyGitFailure,
      collectOutput,
      commandSpawner,
      createTrace2Monitor,
      fileSystem,
      gitCommandContext,
      gitFailureDetail,
      hookLimits,
      hostPlatform,
      path,
      windowsLongPathConfigEnv,
    } = pickScriptcBindCtx(ctx);

    const commandInput = {
      ...input,
      args: [...input.args],
    } as const;
    const timeoutMs = input.timeoutMs === undefined ? DEFAULT_TIMEOUT_MS : input.timeoutMs;
    const maxOutputBytes = input.maxOutputBytes ?? DEFAULT_MAX_OUTPUT_BYTES;
    const appendTruncationMarker = input.appendTruncationMarker ?? false;

    const runGitCommand = Effect.fn("runGitCommand")(function* () {
      const trace2Monitor = yield* createTrace2Monitor(commandInput, input.progress).pipe(
        Effect.provideService(Path.Path, path),
        Effect.provideService(FileSystem.FileSystem, fileSystem),
        Effect.mapError(
          (cause) =>
            new GitCommandError({
              ...gitCommandContext(commandInput),
              detail: "Failed to create Git trace monitor.",
              cause,
            }),
        ),
      );
      const hostEnv = yield* HostProcess.Environment;
      const baseEnv = {
        ...hostEnv,
        ...unsetInheritedRepositoryEnv(hostEnv, hostPlatform),
        // Concurrent status polls must not take index.lock to save refreshed indexes.
        GIT_OPTIONAL_LOCKS: "0",
        ...input.env,
        ...trace2Monitor.env,
      };
      const serverEnv = { ...baseEnv, ...serverGitConfigEnv(baseEnv, hostPlatform) };
      const limits = yield* hookLimits(input);
      // Git reads these from the environment since 2.31, well before it had configured hooks.
      const env = { ...serverEnv };
      for (const name of limits?.off ?? []) {
        Object.assign(env, gitConfigEnv(env, `hook.${name}.enabled`, "false", hostPlatform));
      }
      // On the command line, which every Git reads and which wins over all other configuration.
      const spawnArgs =
        limits === undefined
          ? commandInput.args
          : ["-c", `core.hooksPath=${limits.hooksPath}`, ...commandInput.args];
      const spawnEnv = { ...env, ...windowsLongPathConfigEnv(hostPlatform, env) };
      const resolved = yield* resolveSpawnCommand("git", [], { env: spawnEnv });
      const spawnError = (cause: unknown) =>
        new GitCommandError({
          ...gitCommandContext(commandInput),
          detail: "Failed to spawn Git process.",
          cause,
        });
      // cmd wrappers truncate multiline commits; leave git.cmd handling to Node lookup.
      const executable = resolved.shell ? "git" : resolved.command;
      const child = yield* commandSpawner
        .spawn(
          ChildProcess.make(executable, spawnArgs, {
            cwd: commandInput.cwd,
            env: spawnEnv,
            // SIGTERM first lets git remove its lock files; SIGKILL ends one that ignores it.
            forceKillAfter: "1 second",
            ...(runsGitWithoutConsole(hostPlatform, executable, commandInput.args)
              ? { detached: true, windowsHide: true }
              : {}),
          }),
        )
        .pipe(
          Effect.mapError(spawnError),
          // Synchronous spawn throws (such as E2BIG) arrive as defects.
          Effect.catchDefect((cause) => Effect.fail(spawnError(cause))),
        );

      const [stdout, stderr, exitCode] = yield* Effect.all(
        [
          collectOutput(
            commandInput,
            child.stdout,
            maxOutputBytes,
            appendTruncationMarker,
            input.progress?.onStdoutLine,
            input.keepLineCallbacksAfterTruncation,
          ),
          collectOutput(
            commandInput,
            child.stderr,
            maxOutputBytes,
            appendTruncationMarker,
            input.progress?.onStderrLine,
            input.keepLineCallbacksAfterTruncation,
          ),
          child.exitCode.pipe(
            Effect.mapError(
              (cause) =>
                new GitCommandError({
                  ...gitCommandContext(commandInput),
                  detail: "Failed to read Git process exit code.",
                  cause,
                }),
            ),
          ),
          input.stdin === undefined
            ? Effect.void
            : Stream.run(Stream.encodeText(Stream.make(input.stdin)), child.stdin).pipe(
                Effect.mapError(
                  (cause) =>
                    new GitCommandError({
                      ...gitCommandContext(commandInput),
                      detail: "Failed to write Git process input.",
                      cause,
                    }),
                ),
              ),
        ],
        { concurrency: "unbounded" },
      ).pipe(Effect.map(([stdout, stderr, exitCode]) => [stdout, stderr, exitCode] as const));
      yield* trace2Monitor.flush;

      if (!input.allowNonZeroExit && exitCode !== 0) {
        const reason = classifyGitFailure(stderr.text);
        return yield* new GitCommandError({
          ...gitCommandContext(commandInput),
          ...(reason === null ? {} : { reason }),
          detail: gitFailureDetail(reason),
          exitCode,
          stdoutLength: stdout.text.length,
          stderrLength: stderr.text.length,
        });
      }

      return {
        exitCode,
        stdout: stdout.text,
        stderr: stderr.text,
        stdoutTruncated: stdout.truncated,
        stderrTruncated: stderr.truncated,
      } satisfies GitVcsDriver.ExecuteGitResult;
    });

    const execution = runGitCommand().pipe(Effect.scoped);
    if (timeoutMs === null) {
      return yield* execution;
    }

    return yield* execution.pipe(
      Effect.timeoutOption(timeoutMs),
      Effect.flatMap((result) =>
        Effect.fromOption(
          result,
          () =>
            new GitCommandError({
              ...gitCommandContext(commandInput),
              detail: "Git command timed out.",
            }),
        ),
      ),
    );
  });
