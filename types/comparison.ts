import type { AnalyticsMetric, AnalyticsSeries } from "./analytics";
import type { PlatformId } from "./platform";

export type ComparisonSubjectKind = "profile" | "snapshot";

export interface ComparisonSubject {
  id: string;
  label: string;
  kind: ComparisonSubjectKind;
  platformId: PlatformId;
}

export interface ComparisonMetric {
  id: string;
  label: string;
  left?: AnalyticsMetric;
  right?: AnalyticsMetric;
  delta?: number;
}

export interface ComparisonResult {
  platformId: PlatformId;
  subjects: ComparisonSubject[];
  metrics: ComparisonMetric[];
  series: AnalyticsSeries[];
}
