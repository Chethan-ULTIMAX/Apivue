import type { IntegrationStatus, PlatformDefinition } from "@/types";

export interface PlatformHealthRow {
  id: string;
  name: string;
  category: string;
  status: IntegrationStatus;
  profile: boolean;
  analytics: boolean;
  activity: boolean;
  authentication: string[];
  limitations: string[];
}

export function platformHealth(platforms: PlatformDefinition[]): PlatformHealthRow[] {
  return platforms.map(platform => ({ id: platform.id, name: platform.name, category: platform.category, status: platform.integrationStatus ?? "catalog-only", profile: Boolean(platform.profileSupport), analytics: Boolean(platform.analyticsSupport), activity: Boolean(platform.activitySupport), authentication: platform.authentication, limitations: platform.limitations ?? [] }));
}

export function statusCounts(platforms: PlatformDefinition[]): Record<IntegrationStatus, number> {
  const counts: Record<IntegrationStatus, number> = { "fully-integrated": 0, "partially-integrated": 0, "public-api": 0, authenticated: 0, "catalog-only": 0, planned: 0, unsupported: 0 };
  for (const platform of platforms) counts[platform.integrationStatus ?? "catalog-only"] += 1;
  return counts;
}
