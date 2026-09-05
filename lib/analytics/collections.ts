import { percentage } from "./calculations";
import type { AnalyticsAvailability, AnalyticsDistribution, AnalyticsRanking, DistributionEntry, AnalyticsRankingEntry } from "@/types";

export function distribution(id: string, label: string, values: readonly string[], options: { top?: number; otherLabel?: string } = {}): AnalyticsDistribution {
  if (!values.length) return { id, label, entries: [], availability: "insufficient-data" };
  const counts = new Map<string, number>(); values.forEach(value => counts.set(value, (counts.get(value) ?? 0) + 1));
  let entries = Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  if (options.top && entries.length > options.top) { const kept = entries.slice(0, options.top); const other = entries.slice(options.top).reduce((total, [, count]) => total + count, 0); entries = [...kept, [options.otherLabel ?? "Other", other]]; }
  const total = values.length; const result: DistributionEntry[] = entries.map(([entryLabel, count]) => ({ label: entryLabel, count, percentage: percentage(count, total) ?? 0 }));
  return { id, label, entries: result, availability: "available" };
}

export function ranking(id: string, label: string, values: readonly { id: string; label: string; value: number; metadata?: Record<string, string | number | undefined> }[], options: { direction?: "asc" | "desc"; top?: number } = {}): AnalyticsRanking {
  if (!values.length) return { id, label, entries: [], availability: "insufficient-data" };
  const direction = options.direction ?? "desc";
  const sorted = values.map((value, index) => ({ value, index })).sort((a, b) => { const difference = direction === "desc" ? b.value.value - a.value.value : a.value.value - b.value.value; return difference || a.index - b.index; });
  const limited = options.top ? sorted.slice(0, options.top) : sorted;
  const entries: AnalyticsRankingEntry[] = limited.map((item, index) => ({ ...item.value, rank: index + 1 }));
  return { id, label, entries, availability: "available" };
}

export const unavailable = (id: string, label: string, availability: AnalyticsAvailability = "not-supported"): AnalyticsDistribution => ({ id, label, entries: [], availability });
