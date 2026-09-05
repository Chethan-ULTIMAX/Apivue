import type { AnalyticsMetric, ComparisonMetric } from "@/types";
export function compareMetrics(left: AnalyticsMetric[], right: AnalyticsMetric[]): ComparisonMetric[] {
  const rightById = new Map(right.map(metric => [metric.id, metric]));
  return left.map(metric => { const other = rightById.get(metric.id); const leftValue = metric.value; const rightValue = other?.value; const comparable = typeof leftValue === "number" && typeof rightValue === "number" && Number.isFinite(leftValue) && Number.isFinite(rightValue); return { id: metric.id, label: metric.label, left: metric, right: other, delta: comparable ? rightValue - leftValue : undefined }; });
}
