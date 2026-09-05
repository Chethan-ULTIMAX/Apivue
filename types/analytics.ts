import type { PlatformId } from "./platform";

export type MetricValue = number | string;
export type AnalyticsCalculation = "source" | "calculated" | "derived" | "estimated" | "unavailable";
export type AnalyticsAvailability = "available" | "unavailable" | "insufficient-data" | "not-supported" | "requires-authentication";
export type Freshness = "fresh" | "recent" | "stale" | "unknown";
export type AnalyticsWarningCode = "RATE_LIMITED" | "PARTIAL_DATA" | "INSUFFICIENT_HISTORY" | "AUTH_REQUIRED" | "SOURCE_UNAVAILABLE" | "UNSUPPORTED_METRIC";

export interface AnalyticsWarning { code: AnalyticsWarningCode; message: string; metricId?: string; }

export interface AnalyticsMetric {
  id: string;
  label: string;
  value: MetricValue;
  description?: string;
  unit?: string;
  category?: string;
  calculation?: AnalyticsCalculation;
  comparable?: boolean;
  availability?: AnalyticsAvailability;
}

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
}

export interface AnalyticsSeries {
  id: string;
  label: string;
  points: TimeSeriesPoint[];
  availability?: AnalyticsAvailability;
}

export interface DistributionEntry { label: string; count: number; percentage: number; }
export interface AnalyticsDistribution { id: string; label: string; entries: DistributionEntry[]; availability: AnalyticsAvailability; }
export interface AnalyticsRankingEntry { id: string; label: string; rank: number; value: number; metadata?: Record<string, string | number | undefined>; }
export interface AnalyticsRanking { id: string; label: string; entries: AnalyticsRankingEntry[]; availability: AnalyticsAvailability; }
export interface ActivityPoint { timestamp: string; count: number; category?: string; }
export interface AnalyticsActivity { id: string; label: string; points: ActivityPoint[]; availability: AnalyticsAvailability; }
export interface AnalyticsMetadata { source: string; fetchedAt?: string; generatedAt: string; freshness: Freshness; calculations: string[]; limitations: string[]; }
export interface AnalyticsSummary { metrics: AnalyticsMetric[]; availability: AnalyticsAvailability; }
export interface AnalyticsResult { platformId: PlatformId; subjectId: string; summary: AnalyticsSummary; metrics: AnalyticsMetric[]; distributions: AnalyticsDistribution[]; rankings: AnalyticsRanking[]; timeSeries: AnalyticsSeries[]; activity: AnalyticsActivity[]; warnings: AnalyticsWarning[]; metadata: AnalyticsMetadata; }

export interface NormalizedProfile<TPlatformData = unknown> {
  platformId: PlatformId;
  externalId: string;
  displayName: string;
  profileUrl: string;
  metrics: AnalyticsMetric[];
  series: AnalyticsSeries[];
  sourceUpdatedAt?: string;
  platformData?: TPlatformData;
}

export interface AnalyticsSnapshot {
  id: string;
  platformId: PlatformId;
  subjectId: string;
  capturedAt: string;
  metrics: Record<string, MetricValue>;
  distributions?: AnalyticsDistribution[];
  timeSeries?: AnalyticsSeries[];
  metadata?: AnalyticsMetadata;
}
