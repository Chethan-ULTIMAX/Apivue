import type { AnalyticsMetric, AnalyticsSnapshot, NormalizedProfile } from "@/types";

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
