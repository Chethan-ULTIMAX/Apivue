import type { PlatformDefinition } from "@/types";
import { codingPlatforms } from "./coding";
import { cloudPlatforms } from "./cloud";
import { gitPlatforms } from "./git";
import { aiPlatforms } from "./ai";
import { securityPlatforms } from "./security";
import { educationPlatforms } from "./education";
import { communityPlatforms } from "./community";
import { productivityPlatforms } from "./productivity";
import { otherPlatforms } from "./other";
import { packagePlatforms } from "./packages";

const registry: PlatformDefinition[] = [
  ...gitPlatforms,
  ...codingPlatforms,
  ...communityPlatforms,
  ...educationPlatforms,
  ...productivityPlatforms,
  ...cloudPlatforms,
  ...aiPlatforms,
  ...securityPlatforms,
  ...otherPlatforms,
  ...packagePlatforms,
];
const implemented = new Set(["github", "gitlab", "codeforces", "npm", "pypi", "docker-hub", "huggingface", "stack-exchange", "stack-overflow", "nvd"]);
const corrected = new Map<string, Partial<PlatformDefinition>>([
  ["leetcode", { integrationStatus: "planned", requestExampleSupport: false, notes: "No official public profile API is used. APIVue does not scrape undocumented endpoints." }],
  ["replit", { integrationStatus: "catalog-only", analyticsSupport: false, profileSupport: false, comparisonSupport: false, activitySupport: false, requestExampleSupport: false }],
  ["atcoder", { integrationStatus: "catalog-only", notes: "No supported official public profile API is enabled." }],
  ["kattis", { integrationStatus: "catalog-only", notes: "No supported official public profile API is enabled." }],
  ["codewars", { integrationStatus: "catalog-only", notes: "No supported official API integration is enabled." }],
]);
export const platforms = registry.map(platform => ({ ...platform, integrationStatus: platform.integrationStatus ?? "catalog-only" as const, ...(implemented.has(platform.id) ? { integrationStatus: "public-api" as const, publicAccess: true, profileSupport: true, analyticsSupport: true, comparisonSupport: ["github", "codeforces"].includes(platform.id), activitySupport: ["github", "codeforces"].includes(platform.id), requestExampleSupport: true } : {}), ...corrected.get(platform.id) }));

export function getPlatform(platformId: string) {
  return platforms.find((platform) => platform.id === platformId);
}
