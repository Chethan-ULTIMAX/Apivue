import type { ApiRequest, IntegrationResult, NormalizedProfile, PlatformId } from "@/types";

export interface PlatformIntegration<TRaw = unknown> {
  platformId: PlatformId;
  fetchProfile(request: ApiRequest): Promise<IntegrationResult<TRaw>>;
  normalize(response: IntegrationResult<TRaw>): NormalizedProfile | undefined;
}
