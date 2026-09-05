import { describe, expect, it } from "vitest";
import { average, median, metricDelta, percentage, percentageDelta, ratio } from "@/lib/analytics/calculations";
import { distribution, ranking } from "@/lib/analytics/collections";
import { aggregateSeries, normalizeSeries } from "@/lib/analytics/time-series";
import { analyzeCodeforces } from "@/lib/analytics/adapters/codeforces";
import { analyzeGitHub } from "@/lib/analytics/adapters/github";

describe("generic analytics calculations", () => {
  it("handles normal values and edge cases without invalid numbers", () => {
    expect(average([2, 4, 6])).toBe(4);
    expect(median([7, 1, 5, 3])).toBe(4);
    expect(percentage(2, 4)).toBe(50);
    expect(percentage(1, 0)).toBeUndefined();
    expect(ratio(1, 0)).toBeUndefined();
    expect(percentageDelta(10, 0)).toBeUndefined();
    expect(metricDelta(125, 100)).toMatchObject({ absolute: 25, percentage: 25, direction: "up" });
    expect(metricDelta(undefined, 100).availability).toBe("insufficient-data");
    expect([average([]), median([]), percentage(1, 0), ratio(1, 0)].every(value => value === undefined || Number.isFinite(value))).toBe(true);
  });
});

describe("time series, distributions, and rankings", () => {
  it("sorts, deduplicates, and aggregates time series", () => {
    const series = normalizeSeries([{ timestamp: "2026-01-02T00:00:00Z", value: 2 }, { timestamp: "2026-01-01T00:00:00Z", value: 1 }, { timestamp: "2026-01-02T00:00:00Z", value: 3 }], "activity", "Activity");
    expect(series.points.map(point => point.value)).toEqual([1, 3]);
    expect(aggregateSeries(series.points, "daily", "Daily", "day").points).toHaveLength(2);
  });

  it("calculates stable distributions and preserves ranking ties", () => {
    const languageEntry = distribution("languages", "Languages", ["TypeScript", "JavaScript", "TypeScript"]).entries[0];
    expect(languageEntry).toMatchObject({ label: "TypeScript", count: 2 });
    expect(languageEntry.percentage).toBeCloseTo(66.66666666666667, 10);
    const result = ranking("repos", "Repositories", [{ id: "a", label: "A", value: 3 }, { id: "b", label: "B", value: 3 }]);
    expect(result.entries.map(entry => entry.label)).toEqual(["A", "B"]);
    expect(distribution("empty", "Empty", []).availability).toBe("insufficient-data");
  });
});

describe("platform analytics adapters", () => {
  it("calculates GitHub repository and language analytics from normalized data", () => {
    const result = analyzeGitHub({ platformId: "github", externalId: "octo", displayName: "octo", profileUrl: "https://github.com/octo", metrics: [], series: [], platformData: { user: { login: "octo", followers: 4, following: 2, public_repos: 2 }, repositories: [{ name: "one", language: "TypeScript", stargazers_count: 5, forks_count: 2 }, { name: "two", language: "TypeScript", stargazers_count: 1, forks_count: 0 }], events: [{ type: "PushEvent", created_at: "2026-01-01T00:00:00Z" }] } });
    expect(result.metrics.find(metric => metric.id === "average-stars")?.value).toBe(3);
    expect(result.distributions.find(item => item.id === "languages")?.entries[0].count).toBe(2);
    expect(result.rankings[0].entries[0].label).toBe("one");
  });

  it("calculates Codeforces submission analytics without inventing rating history", () => {
    const result = analyzeCodeforces({ platformId: "codeforces", externalId: "tourist", displayName: "tourist", profileUrl: "https://codeforces.com/profile/tourist", metrics: [], series: [], platformData: { user: { handle: "tourist", rating: 2000 }, rating: [{ ratingUpdateTimeSeconds: 1, newRating: 2000 }], submissions: [{ verdict: "OK", programmingLanguage: "GNU C++", creationTimeSeconds: 1, problem: { rating: 1200, tags: ["math"] } }, { verdict: "WRONG_ANSWER", programmingLanguage: "GNU C++", problem: { rating: 1200, tags: ["math"] } }] } });
    expect(result.metrics.find(metric => metric.id === "accepted-submissions")?.value).toBe(1);
    expect(result.distributions.find(item => item.id === "difficulty")?.entries[0].label).toBe("1200");
    expect(result.warnings[0].code).toBe("INSUFFICIENT_HISTORY");
  });
});
