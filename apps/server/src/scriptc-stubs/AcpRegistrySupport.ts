import * as Context from "effect/Context";
import * as Layer from "effect/Layer";

export class AcpRegistryCatalog extends Context.Service<
  AcpRegistryCatalog,
  Record<string, never>
>()("@t3tools/provider-acp-registry/server/AcpRegistrySupport/AcpRegistryCatalog") {}

export const layerFromHost = Layer.succeed(AcpRegistryCatalog, {});
