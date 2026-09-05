import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { getAllPlatforms, getPlatform, getPlatformCompletenessReport, getPlatformsByCapability, getPlatformsByCategory, getPlatformsByIntegrationStatus, platformHealth, searchPlatforms, statusCounts, platforms } from "@/config/platforms";
describe("platform registry", () => {
  it("contains the complete unique catalog with required source metadata", () => {
    expect(platforms).toHaveLength(150);
    expect(new Set(platforms.map(platform => platform.id)).size).toBe(150);
    expect(new Set(platforms.map(platform => platform.name)).size).toBe(150);
    for (const platform of platforms) { expect(platform.category).toBeTruthy(); expect(platform.integrationStatus).toBeTruthy(); expect(() => new URL(platform.websiteUrl)).not.toThrow(); if (platform.documentationUrl) expect(() => new URL(platform.documentationUrl)).not.toThrow(); }
  });
  it("looks up known and unknown platforms safely", () => { expect(getPlatform("github")?.name).toBe("GitHub"); expect(getPlatform("does-not-exist")).toBeUndefined(); });
  it("provides complete metadata and queryable registry views", () => {
    const report = getPlatformCompletenessReport();
    expect(report).toEqual({ total: 150, duplicateIds: [], missingCategories: [], missingWebsites: [], missingStatuses: [], missingCapabilities: [], missingAuthentication: [] });
    expect(getAllPlatforms()).toHaveLength(150);
    expect(getPlatformsByCategory("Packages").length).toBeGreaterThan(0);
    expect(getPlatformsByCapability("catalog").length).toBeGreaterThan(0);
    expect(getPlatformsByIntegrationStatus("public-api").map(platform => platform.id)).toContain("github");
    expect(searchPlatforms("GitHub").map(platform => platform.id)).toContain("github");
    for (const platform of platforms) {
      expect(platform.apiAvailability).toBeTruthy();
      expect(platform.extractableData?.length).toBeGreaterThan(0);
      expect(platform.limitations?.length).toBeGreaterThan(0);
      expect(platform.supportedOperations).toBeDefined();
    }
    expect(platformHealth(platforms)).toHaveLength(150);
    expect(Object.values(statusCounts(platforms)).reduce((total, count) => total + count, 0)).toBe(150);
  });

  it("has exactly 150 individual registered platform modules", () => {
    const categoryRoot = path.resolve(process.cwd(), "config/platforms");
    const moduleFiles = readdirSync(categoryRoot, { withFileTypes: true }).flatMap(category => category.isDirectory() ? readdirSync(path.join(categoryRoot, category.name)).filter(file => file.endsWith(".ts") && file !== "index.ts").map(file => path.join(category.name, file)) : []);
    expect(moduleFiles).toHaveLength(150);
    const moduleIds = moduleFiles.map(file => readFileSync(path.join(categoryRoot, file), "utf8").match(/"id": "([^"]+)"/)?.[1]).filter((id): id is string => Boolean(id));
    expect(new Set(moduleIds).size).toBe(150);
    expect(new Set(platforms.map(platform => platform.id))).toEqual(new Set(moduleIds));
  });
});
