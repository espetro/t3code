/** Native `scriptc` graph: skip GitHub/GitLab/… driver modules (scriptc#4381 RSS). */

export const BUILT_IN_SOURCE_CONTROL_DRIVER_LIST: ReadonlyArray<never> = [];

export const sourceControlDefinitions: {
  readonly definitions: ReadonlyArray<{ readonly changeRequestCloseCommand?: RegExp }>;
  readonly repositoryKeyFromRemote: (remote: string) => string;
  readonly canonicalRepositoryKey: (key: string) => string;
  readonly parseChangeRequestUrl: (value: string) => undefined;
  readonly recognizeRemote: (remote: string) => null;
  readonly repositorySelector: (identity: unknown) => null;
  readonly changeRequestHost: (identity: unknown, fallback: string) => string;
  readonly findByRepositoryKey: (key: string) => undefined;
  readonly findByPublicHost: (host: string) => undefined;
  readonly get: (kind: string) => {
    readonly changeRequest: undefined;
    readonly changeRequestHeadRef: undefined;
  };
  readonly [key: string]: unknown;
} = {
  definitions: [],
  repositoryKeyFromRemote: (remote) => remote,
  canonicalRepositoryKey: (key) => key,
  parseChangeRequestUrl: () => undefined,
  recognizeRemote: () => null,
  repositorySelector: () => null,
  changeRequestHost: (_identity, fallback) => fallback,
  findByRepositoryKey: () => undefined,
  findByPublicHost: () => undefined,
  get: () => ({
    changeRequest: undefined,
    changeRequestHeadRef: undefined,
  }),
};
