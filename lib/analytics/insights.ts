import type { AnalyticsMetric, AnalyticsResult } from "@/types";

export type InsightKind = "strength" | "growth" | "attention" | "trend" | "coverage";
export type InsightPriority = "high" | "medium" | "low";

export interface AnalyticsInsight {
  id: string;
  kind: InsightKind;
  priority: InsightPriority;
  title: string;
  message: string;
  metricIds: string[];
}

const numeric = (metric: AnalyticsMetric | undefined): number | undefined => {
  if (!metric || typeof metric.value !== "number" || !Number.isFinite(metric.value)) return undefined;
  return metric.value;
};

export function generateInsights(result: Pick<AnalyticsResult, "metrics" | "timeSeries" | "activity" | "warnings">): AnalyticsInsight[] {
  const insights: AnalyticsInsight[] = [];
  const metric = (id: string) => result.metrics.find(item => item.id === id);
  const add = (insight: AnalyticsInsight) => insights.push(insight);

  for (const item of result.metrics) {
    const value = numeric(item);
    if (value === undefined || item.availability === "unavailable" || item.availability === "insufficient-data") continue;
    if (item.comparable && value > 0 && (item.id.includes("max") || item.id.includes("rating") || item.id.includes("stars"))) {
      add({ id: `strength:${item.id}`, kind: "strength", priority: "low", title: `${item.label} is measurable`, message: `${item.label} currently has a source-backed value of ${value}.`, metricIds: [item.id] });
    }
  }

  const rating = numeric(metric("rating"));
  const maxRating = numeric(metric("max-rating"));
  if (rating !== undefined && maxRating !== undefined && maxRating > 0) {
    const gap = maxRating - rating;
    if (gap > 0) add({ id: "rating-gap", kind: "growth", priority: gap >= maxRating * 0.15 ? "medium" : "low", title: "Room below peak rating", message: `Current rating is ${gap} points below the recorded maximum.`, metricIds: ["rating", "max-rating"] });
    else if (gap === 0) add({ id: "rating-peak", kind: "strength", priority: "medium", title: "At recorded peak rating", message: "The current rating matches the recorded maximum rating.", metricIds: ["rating", "max-rating"] });
  }

  const ratingDelta = numeric(metric("rating-delta"));
  if (ratingDelta !== undefined && ratingDelta !== 0) {
    add({ id: "latest-rating-change", kind: ratingDelta > 0 ? "growth" : "attention", priority: "medium", title: ratingDelta > 0 ? "Latest rating moved up" : "Latest rating moved down", message: `The latest recorded rating change is ${ratingDelta > 0 ? "+" : ""}${ratingDelta}.`, metricIds: ["rating-delta"] });
  }

  const avgStars = numeric(metric("average-stars"));
  if (avgStars !== undefined && avgStars > 0) add({ id: "repository-engagement", kind: "strength", priority: "low", title: "Repositories have measurable engagement", message: `Fetched repositories average ${avgStars.toFixed(1)} stars.`, metricIds: ["average-stars"] });

  const seriesWithData = result.timeSeries.filter(series => series.points.length >= 2);
  for (const series of seriesWithData) {
    const first = series.points[0]?.value;
    const last = series.points[series.points.length - 1]?.value;
    if (first === undefined || last === undefined || first === last) continue;
    const direction = last > first ? "increased" : "decreased";
    add({ id: `trend:${series.id}`, kind: "trend", priority: "low", title: `${series.label} ${direction}`, message: `${series.label} changed from ${first} to ${last} across the available series.`, metricIds: [] });
  }

  for (const warning of result.warnings) {
    if (warning.code === "PARTIAL_DATA" || warning.code === "INSUFFICIENT_HISTORY") {
      add({ id: `coverage:${warning.code}`, kind: "coverage", priority: "medium", title: "Analytics coverage is limited", message: warning.message, metricIds: warning.metricId ? [warning.metricId] : [] });
    }
  }

  return insights.slice(0, 20);
}

export function insightSummary(insights: readonly AnalyticsInsight[]): string {
  if (!insights.length) return "No additional source-backed insights can be derived from the available data.";
  const high = insights.filter(item => item.priority === "high").length;
  return high ? `${high} high-priority insight${high === 1 ? "" : "s"} detected.` : `${insights.length} source-backed insight${insights.length === 1 ? "" : "s"} available.`;
}
