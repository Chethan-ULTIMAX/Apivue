import type { PlatformId } from "./platform";

export type MetricValue = number | string;

export interface AnalyticsMetric {
  id: string;
  label: string;
  value: MetricValue;
  unit?: string;
  description?: string;
}

export interface TimeSeriesPoint {
  timestamp: string;
  value: number;
}

export interface AnalyticsSeries {
  id: string;
  label: string;
  points: TimeSeriesPoint[];
}

export interface NormalizedProfile {
  platformId: PlatformId;
  externalId: string;
  displayName: string;
  profileUrl: string;
  metrics: AnalyticsMetric[];
  series: AnalyticsSeries[];
  sourceUpdatedAt?: string;
}

export interface AnalyticsSnapshot {
  id: string;
  platformId: PlatformId;
  subjectId: string;
  capturedAt: string;
  metrics: Record<string, MetricValue>;
}
