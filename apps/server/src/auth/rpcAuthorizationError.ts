import {
  EnvironmentAuthorizationError,
  authScopeRequiredResponse,
  type AuthEnvironmentScope,
} from "@t3tools/contracts/auth";

export const rpcAuthorizationError = (requiredScope: AuthEnvironmentScope) =>
  new EnvironmentAuthorizationError({
    message: `The authenticated token is missing required scope: ${requiredScope}.`,
    ...authScopeRequiredResponse(requiredScope),
  });
