import type { AnalyticsMetric, AnalyticsResult } from "@/types";
import { metricDelta } from "./calculations";

export interface MetricComparison {
  id: string;
  label: string;
  left?: number;
  right?: number;
  winner: "left" | "right" | "tie" | "unavailable";
  difference?: number;
  availability: "available" | "insufficient-data";
}

export interface AnalyticsComparison {
  left: { platformId: string; subjectId: string };
  right: { platformId: string; subjectId: string };
  metrics: MetricComparison[];
  insights: string[];
}

const numberValue = (metric: AnalyticsMetric | undefined): number | undefined => typeof metric?.value === "number" && Number.isFinite(metric.value) ? metric.value : undefined;

export function compareAnalytics(left: AnalyticsResult, right: AnalyticsResult): AnalyticsComparison {
  const rightById = new Map(right.metrics.map(metric => [metric.id, metric]));
  const metrics: MetricComparison[] = [];
  for (const leftMetric of left.metrics) {
    if (leftMetric.comparable === false) continue;
    const rightMetric = rightById.get(leftMetric.id);
    if (!rightMetric || rightMetric.comparable === false) continue;
    const a = numberValue(leftMetric);
    const b = numberValue(rightMetric);
    if (a === undefined || b === undefined) {
      metrics.push({ id: leftMetric.id, label: leftMetric.label, left: a, right: b, winner: "unavailable", availability: "insufficient-data" });
      continue;
    }
    const change = metricDelta(a, b);
    metrics.push({ id: leftMetric.id, label: leftMetric.label, left: a, right: b, winner: a > b ? "left" : a < b ? "right" : "tie", difference: change.absolute, availability: "available" });
  }
  const insights = metrics.filter(item => item.winner !== "unavailable").map(item => item.winner === "tie" ? `${item.label} is tied at ${item.left}.` : `${item.label}: ${item.winner === "left" ? "left" : "right"} leads by ${Math.abs(item.difference ?? 0)}.`).slice(0, 20);
  return { left: { platformId: left.platformId, subjectId: left.subjectId }, right: { platformId: right.platformId, subjectId: right.subjectId }, metrics, insights };
}
