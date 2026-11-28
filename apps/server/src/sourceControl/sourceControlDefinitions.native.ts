/** Native `scriptc` graph: skip GitHub/GitLab/… driver modules (scriptc#4381 RSS). */

export const BUILT_IN_SOURCE_CONTROL_DRIVER_LIST: ReadonlyArray<never> = [];

export const sourceControlDefinitions: any = {
  definitions: [] as ReadonlyArray<any>,
  repositoryKeyFromRemote: (remote: string) => remote,
  canonicalRepositoryKey: (key: string) => key,
  parseChangeRequestUrl: () => undefined,
  recognizeRemote: () => null,
  repositorySelector: () => null,
  changeRequestHost: (_identity: unknown, fallback: string) => fallback,
  findByRepositoryKey: () => undefined,
  findByPublicHost: () => undefined,
  get: () => ({
    changeRequest: undefined,
    changeRequestHeadRef: undefined,
    settings: undefined,
    kind: "unknown",
  }),
};
