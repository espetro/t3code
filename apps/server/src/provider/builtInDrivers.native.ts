import type { AnyProviderDriver } from "@t3tools/provider-core/server/driver";

/** Native `scriptc` graph: skip provider adapter modules (scriptc#4381 RSS). */
export type BuiltInDriversEnv = never;
export type BuiltInUsageReadersEnv = never;

export const BUILT_IN_DRIVERS: ReadonlyArray<AnyProviderDriver<BuiltInDriversEnv>> = [];
export const BUILT_IN_USAGE_DRIVERS: ReadonlyArray<
  AnyProviderDriver<BuiltInDriversEnv, BuiltInUsageReadersEnv>
> = [];
