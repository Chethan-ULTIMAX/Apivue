import type { AnalyticsMetric, AnalyticsResult, AnalyticsSnapshot, NormalizedProfile } from "@/types";
import { analyzeCodeforces } from "./adapters/codeforces";
import { analyzeGitHub } from "./adapters/github";
import { generateInsights } from "./insights";
import type { NormalizedCodeforcesData } from "@/lib/integrations/codeforces/normalizer";
import type { NormalizedGitHubData } from "@/lib/integrations/github/normalizer";

export function metricsFromProfile(profile: NormalizedProfile): AnalyticsMetric[] { return profile.metrics; }

export function snapshotFromProfile(profile: NormalizedProfile, capturedAt = new Date().toISOString()): AnalyticsSnapshot {
  return { id: `${profile.platformId}:${profile.externalId}:${capturedAt}`, platformId: profile.platformId, subjectId: profile.externalId, capturedAt, metrics: Object.fromEntries(profile.metrics.map(metric => [metric.id, metric.value])), timeSeries: profile.series };
}

export function analyzeProfile(profile: NormalizedProfile, fetchedAt?: string): AnalyticsResult {
  let result: AnalyticsResult;
  if (profile.platformId === "github") result = analyzeGitHub(profile as NormalizedProfile<NormalizedGitHubData>, fetchedAt);
  else if (profile.platformId === "codeforces") result = analyzeCodeforces(profile as NormalizedProfile<NormalizedCodeforcesData>, fetchedAt);
  else result = {
    platformId: profile.platformId,
    subjectId: profile.externalId,
    summary: { metrics: profile.metrics, availability: "not-supported" },
    metrics: profile.metrics,
    distributions: [], rankings: [],
    timeSeries: profile.series.map(series => ({ ...series, availability: series.points.length ? "available" : "insufficient-data" })),
    activity: [],
    warnings: [{ code: "UNSUPPORTED_METRIC", message: `Analytics are not supported for ${profile.platformId}.` }],
    metadata: { source: profile.platformId, generatedAt: new Date().toISOString(), freshness: "unknown", calculations: [], limitations: ["No platform analytics adapter is registered."] },
  };
  return { ...result, metadata: { ...result.metadata, calculations: [...result.metadata.calculations, "Reusable analytics insight rules are evaluated against available metrics, trends, and coverage warnings."] } };
}

export function enrichAnalytics(result: AnalyticsResult): AnalyticsResult & { insights: ReturnType<typeof generateInsights>; insightSummary: string } {
  const insights = generateInsights(result);
  return { ...result, insights, insightSummary: insights.length ? `${insights.length} source-backed insight${insights.length === 1 ? "" : "s"} available.` : "No additional source-backed insights can be derived from the available data." };
}

export function snapshotFromAnalytics(result: AnalyticsResult, capturedAt = new Date().toISOString()): AnalyticsSnapshot {
  return { id: `${result.platformId}:${result.subjectId}:${capturedAt}`, platformId: result.platformId, subjectId: result.subjectId, capturedAt, metrics: Object.fromEntries(result.metrics.map(metric => [metric.id, metric.value])), distributions: result.distributions, timeSeries: result.timeSeries, metadata: result.metadata };
}
