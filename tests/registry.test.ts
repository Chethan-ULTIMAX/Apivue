import { describe, expect, it } from "vitest";
import { getPlatform, platforms } from "@/config/platforms";
describe("platform registry", () => {
  it("contains the complete unique catalog with required source metadata", () => {
    expect(platforms).toHaveLength(150);
    expect(new Set(platforms.map(platform => platform.id)).size).toBe(150);
    expect(new Set(platforms.map(platform => platform.name)).size).toBe(150);
    for (const platform of platforms) { expect(platform.category).toBeTruthy(); expect(platform.integrationStatus).toBeTruthy(); expect(() => new URL(platform.websiteUrl)).not.toThrow(); if (platform.documentationUrl) expect(() => new URL(platform.documentationUrl)).not.toThrow(); }
  });
  it("looks up known and unknown platforms safely", () => { expect(getPlatform("github")?.name).toBe("GitHub"); expect(getPlatform("does-not-exist")).toBeUndefined(); });
});
