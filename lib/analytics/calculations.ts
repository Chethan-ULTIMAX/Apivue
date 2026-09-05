import type { AnalyticsAvailability } from "@/types";

export type DeltaDirection = "up" | "down" | "neutral" | "unavailable";
export interface MetricDelta { previous?: number; current?: number; absolute?: number; percentage?: number; direction: DeltaDirection; availability: AnalyticsAvailability; }

const finite = (value: number): number | undefined => Number.isFinite(value) ? value : undefined;
export const count = <T>(items: readonly T[]): number => items.length;
export const sum = (values: readonly number[]): number => values.reduce((total, value) => total + (finite(value) ?? 0), 0);
export const average = (values: readonly number[]): number | undefined => values.length ? finite(sum(values) / values.length) : undefined;
export const minimum = (values: readonly number[]): number | undefined => values.length ? finite(Math.min(...values)) : undefined;
export const maximum = (values: readonly number[]): number | undefined => values.length ? finite(Math.max(...values)) : undefined;
export const median = (values: readonly number[]): number | undefined => { if (!values.length) return undefined; const sorted = values.filter(Number.isFinite).slice().sort((a, b) => a - b); if (!sorted.length) return undefined; const middle = Math.floor(sorted.length / 2); return finite(sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2); };
export const percentage = (part: number, total: number): number | undefined => total === 0 ? undefined : finite((part / total) * 100);
export const ratio = (a: number, b: number): number | undefined => b === 0 ? undefined : finite(a / b);
export const delta = (current: number, previous: number): number | undefined => finite(current - previous);
export const percentageDelta = (current: number, previous: number): number | undefined => previous === 0 ? undefined : finite(((current - previous) / previous) * 100);

export function metricDelta(current?: number, previous?: number): MetricDelta {
  if (current === undefined || previous === undefined || !Number.isFinite(current) || !Number.isFinite(previous)) return { current, previous, direction: "unavailable", availability: "insufficient-data" };
  const absolute = delta(current, previous); const change = percentageDelta(current, previous);
  return { current, previous, absolute, percentage: change, direction: absolute === undefined ? "unavailable" : absolute > 0 ? "up" : absolute < 0 ? "down" : "neutral", availability: absolute === undefined ? "unavailable" : "available" };
}
