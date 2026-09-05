import type { ApiRequest, IntegrationResult, NormalizedProfile, PlatformId } from "@/types";
import type { IntegrationOperation } from "./registry";

export interface PlatformIntegration<TRaw = unknown> {
  platformId: PlatformId;
  supportedOperations: readonly IntegrationOperation[];
  createRequest(operation: IntegrationOperation, value: string): ApiRequest;
  fetch(request: ApiRequest): Promise<IntegrationResult<TRaw>>;
  normalize(response: IntegrationResult<TRaw>): NormalizedProfile | undefined;
}
