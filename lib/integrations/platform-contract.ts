import type { PlatformDefinition, PlatformEndpoint, PlatformRequestExample } from "@/types";

export interface PlatformIntegrationContract {
  platform: PlatformDefinition;
  endpoints: PlatformEndpoint[];
  requestExamples: PlatformRequestExample[];
  normalize: string;
  analyticsAdapter?: string;
}

export function integrationContract(platform: PlatformDefinition): PlatformIntegrationContract {
  return {
    platform,
    endpoints: platform.endpoints ?? [],
    requestExamples: platform.requestExamples ?? [],
    normalize: platform.integrationStatus === "fully-integrated" || platform.integrationStatus === "partially-integrated" ? "platform-specific normalizer required" : "not-implemented",
    analyticsAdapter: platform.analyticsSupport ? `analytics/${platform.id}` : undefined,
  };
}
