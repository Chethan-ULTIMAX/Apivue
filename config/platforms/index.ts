import type { PlatformDefinition } from "@/types";
export { platformHealth, statusCounts } from "./health";
export type { PlatformHealthRow } from "./health";
import { sourceControlPlatforms } from "./source-control/index";
import { codingPlatforms } from "./coding/index";
import { packagesPlatforms } from "./packages/index";
import { cloudInfrastructurePlatforms } from "./cloud-infrastructure/index";
import { aiMlPlatforms } from "./ai-ml/index";
import { securityPlatforms } from "./security/index";
import { developerCommunityPlatforms } from "./developer-community/index";
import { educationPlatforms } from "./education/index";
import { productivityDocumentationPlatforms } from "./productivity-documentation/index";
import { apiEcosystemPlatforms } from "./api-ecosystem/index";

const registry: PlatformDefinition[] = [
  ...sourceControlPlatforms,
  ...codingPlatforms,
  ...packagesPlatforms,
  ...cloudInfrastructurePlatforms,
  ...aiMlPlatforms,
  ...securityPlatforms,
  ...developerCommunityPlatforms,
  ...educationPlatforms,
  ...productivityDocumentationPlatforms,
  ...apiEcosystemPlatforms,
];
const enrich = (platform: PlatformDefinition): PlatformDefinition => {
  return {
    ...platform,
    integrationStatus: platform.integrationStatus ?? "catalog-only",
    apiAvailability: platform.apiAvailability ?? "unknown",
    authenticationRequired: platform.authentication.some(authentication => authentication !== "public"),
    publicAccess: platform.publicAccess ?? !platform.authentication.some(authentication => authentication !== "public"),
    profileSupport: platform.profileSupport ?? false,
    analyticsSupport: platform.analyticsSupport ?? false,
    comparisonSupport: platform.comparisonSupport ?? false,
    activitySupport: platform.activitySupport ?? false,
    requestExampleSupport: platform.requestExampleSupport ?? false,
    supportedOperations: platform.supportedOperations ?? [],
    endpoints: platform.endpoints ?? [],
    requestExamples: platform.requestExamples ?? [],
    extractableData: platform.extractableData ?? platform.capabilities.map(capability => capability.label),
    availableAnalytics: platform.availableAnalytics ?? [],
    comparableMetrics: platform.comparableMetrics ?? [],
    historySupported: platform.historySupported ?? platform.supportsHistoricalSnapshots,
    limitations: platform.limitations ?? [platform.notes ?? "Capabilities require a verified platform adapter."],
  };
};

export const platforms = registry.map(enrich);

export function getPlatform(platformId: string) {
  return platforms.find((platform) => platform.id === platformId);
}

export function getAllPlatforms(): PlatformDefinition[] { return platforms; }
export function getPlatformsByCategory(category: string): PlatformDefinition[] { const normalize = (value: string) => value.toLowerCase().replace(/[\s_/-]+/g, ""); return platforms.filter(platform => normalize(platform.category) === normalize(category)); }
export function getPlatformsByCapability(capability: string): PlatformDefinition[] { return platforms.filter(platform => platform.capabilities.some(item => item.id === capability || item.label.toLowerCase() === capability.toLowerCase())); }
export function getPlatformsByIntegrationStatus(status: NonNullable<PlatformDefinition["integrationStatus"]>): PlatformDefinition[] { return platforms.filter(platform => platform.integrationStatus === status); }
export function searchPlatforms(query: string): PlatformDefinition[] { const normalized = query.trim().toLowerCase(); if (!normalized) return platforms; return platforms.filter(platform => [platform.id, platform.name, platform.description, platform.category].some(value => value.toLowerCase().includes(normalized))); }

export interface PlatformCompletenessReport { total: number; duplicateIds: string[]; missingCategories: string[]; missingWebsites: string[]; missingStatuses: string[]; missingCapabilities: string[]; missingAuthentication: string[]; }
export function getPlatformCompletenessReport(): PlatformCompletenessReport {
  const ids = platforms.map(platform => platform.id);
  return { total: platforms.length, duplicateIds: ids.filter((id, index) => ids.indexOf(id) !== index), missingCategories: platforms.filter(platform => !platform.category).map(platform => platform.id), missingWebsites: platforms.filter(platform => !platform.websiteUrl).map(platform => platform.id), missingStatuses: platforms.filter(platform => !platform.integrationStatus).map(platform => platform.id), missingCapabilities: platforms.filter(platform => !platform.capabilities.length).map(platform => platform.id), missingAuthentication: platforms.filter(platform => !platform.authentication.length).map(platform => platform.id) };
}
