// @effect-diagnostics nodeBuiltinImport:off
import * as NodeModule from "node:module";

import type * as FffNode from "@ff-labs/fff-node";

export type {
  DirItem,
  DirSearchResult,
  FileItem,
  FileFinder as FileFinderType,
  GrepCursor,
  GrepOptions,
  GrepResult,
  MixedItem,
  MixedSearchResult,
  Result,
  SearchResult,
} from "@ff-labs/fff-node";

type WorkspaceFileFinderBackend = Pick<typeof FffNode, "FileFinder">;

const requireForFff = NodeModule.createRequire(import.meta.url);

/** The only fff-node load. Swap this backend to `@cutils/ffi` or a libnode island. */
const fffNodeFileFinderBackend: WorkspaceFileFinderBackend = requireForFff(
  "@ff-labs/fff-node",
) as typeof import("@ff-labs/fff-node");

export const FileFinder = fffNodeFileFinderBackend.FileFinder;
