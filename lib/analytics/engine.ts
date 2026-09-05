import type { AnalyticsMetric, AnalyticsResult, AnalyticsSnapshot, NormalizedProfile } from "@/types";
import { analyzeCodeforces } from "./adapters/codeforces";
import { analyzeGitHub } from "./adapters/github";
import type { NormalizedCodeforcesData } from "@/lib/integrations/codeforces/normalizer";
import type { NormalizedGitHubData } from "@/lib/integrations/github/normalizer";

export function metricsFromProfile(profile: NormalizedProfile): AnalyticsMetric[] {
  return profile.metrics;
}

export function snapshotFromProfile(profile: NormalizedProfile, capturedAt = new Date().toISOString()): AnalyticsSnapshot {
  return {
    id: `${profile.platformId}:${profile.externalId}:${capturedAt}`,
    platformId: profile.platformId,
    subjectId: profile.externalId,
    capturedAt,
    metrics: Object.fromEntries(profile.metrics.map((metric) => [metric.id, metric.value])),
  };
}

export function analyzeProfile(profile: NormalizedProfile, fetchedAt?: string): AnalyticsResult {
  if (profile.platformId === "github") return analyzeGitHub(profile as NormalizedProfile<NormalizedGitHubData>, fetchedAt);
  if (profile.platformId === "codeforces") return analyzeCodeforces(profile as NormalizedProfile<NormalizedCodeforcesData>, fetchedAt);
  return { platformId: profile.platformId, subjectId: profile.externalId, summary: { metrics: profile.metrics, availability: "not-supported" }, metrics: profile.metrics, distributions: [], rankings: [], timeSeries: profile.series.map(series => ({ ...series, availability: series.points.length ? "available" : "insufficient-data" })), activity: [], warnings: [{ code: "UNSUPPORTED_METRIC", message: `Analytics are not supported for ${profile.platformId}.` }], metadata: { source: profile.platformId, generatedAt: new Date().toISOString(), freshness: "unknown", calculations: [], limitations: ["No platform analytics adapter is registered."] } };
}

export function snapshotFromAnalytics(result: AnalyticsResult, capturedAt = new Date().toISOString()): AnalyticsSnapshot {
  return { id: `${result.platformId}:${result.subjectId}:${capturedAt}`, platformId: result.platformId, subjectId: result.subjectId, capturedAt, metrics: Object.fromEntries(result.metrics.map(metric => [metric.id, metric.value])), distributions: result.distributions, timeSeries: result.timeSeries, metadata: result.metadata };
}
