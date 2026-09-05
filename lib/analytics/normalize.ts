import type { AnalyticsMetric, AnalyticsResult, NormalizedProfile } from "@/types";

export interface CanonicalMetric {
  id: string;
  label: string;
  value?: number;
  unit?: string;
  category?: string;
  availability: "available" | "unavailable" | "insufficient-data" | "not-supported" | "requires-authentication";
  sourcePlatform: string;
}

export interface CanonicalAnalytics {
  platformId: string;
  subjectId: string;
  metrics: CanonicalMetric[];
  series: AnalyticsResult["timeSeries"];
  distributions: AnalyticsResult["distributions"];
  rankings: AnalyticsResult["rankings"];
  activity: AnalyticsResult["activity"];
  warnings: AnalyticsResult["warnings"];
}

export function normalizeMetric(metric: AnalyticsMetric, platformId: string): CanonicalMetric {
  return {
    id: metric.id,
    label: metric.label,
    value: typeof metric.value === "number" && Number.isFinite(metric.value) ? metric.value : undefined,
    unit: metric.unit,
    category: metric.category,
    availability: metric.availability ?? "available",
    sourcePlatform: platformId,
  };
}

export function normalizeAnalytics(result: AnalyticsResult): CanonicalAnalytics {
  return {
    platformId: result.platformId,
    subjectId: result.subjectId,
    metrics: result.metrics.map(metric => normalizeMetric(metric, result.platformId)),
    series: result.timeSeries,
    distributions: result.distributions,
    rankings: result.rankings,
    activity: result.activity,
    warnings: result.warnings,
  };
}

export function normalizeProfiles(profiles: readonly NormalizedProfile[]): Map<string, NormalizedProfile[]> {
  const grouped = new Map<string, NormalizedProfile[]>();
  for (const profile of profiles) grouped.set(profile.platformId, [...(grouped.get(profile.platformId) ?? []), profile]);
  return grouped;
}
