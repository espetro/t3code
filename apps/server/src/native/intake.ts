/**
 * Native dispatch wrapper: Orchestrator.commit without the Effect RPC barrel.
 * Attachment claim and guest share stay Node (or this pass-through).
 */
import {
  AuthProvidersManageScope,
  EnvironmentAuthorizationError,
  authScopeRequiredResponse,
} from "@t3tools/contracts/auth";
import type { OrchestrationV2Command } from "@t3tools/contracts/orchestrationV2";
import * as Effect from "effect/Effect";

import { isProviderSignOutPrompt } from "../orchestration-v2/CommandPolicy.ts";
import * as Orchestrator from "../orchestration-v2/Orchestrator.ts";

export const dispatchCommand = Effect.fn("native.intake.dispatchCommand")(function* (
  incoming: OrchestrationV2Command,
  sender: { readonly managesProviders: boolean },
) {
  if (
    incoming.type === "queued-run.edit" &&
    !sender.managesProviders &&
    incoming.attachments === undefined &&
    isProviderSignOutPrompt({ text: incoming.text, attachments: [] })
  ) {
    return yield* new EnvironmentAuthorizationError({
      message: `The authenticated token is missing required scope: ${AuthProvidersManageScope}.`,
      ...authScopeRequiredResponse(AuthProvidersManageScope),
    });
  }
  const orchestrator = yield* Orchestrator.OrchestratorV2;
  return yield* orchestrator.dispatch(incoming);
});
