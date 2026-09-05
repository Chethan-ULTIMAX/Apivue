import type { PlatformDefinition } from "@/types";

export type Entry = readonly [string, string, string, ("public-api" | "authenticated" | "catalog-only" | "planned")?];
export function definePlatforms(category: string, entries: Entry[]): PlatformDefinition[] {
  return entries.map(([id, name, websiteUrl, status = "catalog-only"]) => {
    const publicApi = status === "public-api";
    const authenticated = status === "authenticated";
    return {
      id, name, category, websiteUrl, documentationUrl: "",
      description: `${name} developer platform and ecosystem source.`,
      authentication: authenticated ? ["api-key"] : publicApi ? ["public"] : ["public"],
      capabilities: [{ id: "catalog", label: "Platform catalog", description: "Availability and capability information.", requiresAuthentication: authenticated }],
      supportsComparison: publicApi, supportsHistoricalSnapshots: publicApi,
      integrationStatus: status, publicAccess: !authenticated,
      profileSupport: publicApi, analyticsSupport: publicApi, comparisonSupport: publicApi,
      activitySupport: publicApi, requestExampleSupport: publicApi,
      dataFreshness: publicApi ? "Fetched from the source when requested." : "No live data is fetched.",
      notes: authenticated ? "A documented API exists but requires server-side authentication; APIVue never asks for secrets in the browser." : status === "catalog-only" ? "Catalog entry only; no reliable supported public integration is enabled." : "Public integration available."
    };
  });
}
