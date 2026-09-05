import type { AnalyticsMetric, AnalyticsResult, NormalizedProfile } from "@/types";
import { average, maximum } from "../calculations";
import { distribution, ranking } from "../collections";
import { aggregateSeries, normalizeSeries } from "../time-series";
import type { NormalizedGitHubData } from "@/lib/integrations/github/normalizer";

export function analyzeGitHub(profile: NormalizedProfile<NormalizedGitHubData>, fetchedAt?: string): AnalyticsResult {
  const data = profile.platformData;
  const repositories = data?.repositories ?? [];
  const events = data?.events ?? [];
  const sourceMetric = (id: string, label: string, value: number | undefined, category: string): AnalyticsMetric => ({ id, label, value: value ?? "Unavailable", category, calculation: "source", comparable: true, availability: value === undefined ? "unavailable" : "available" });
  const stars = repositories.map(repo => repo.stargazers_count ?? 0); const forks = repositories.map(repo => repo.forks_count ?? 0);
  const metrics: AnalyticsMetric[] = [
    sourceMetric("followers", "Followers", data?.user.followers ?? 0, "profile"),
    sourceMetric("following", "Following", data?.user.following ?? 0, "profile"),
    sourceMetric("repositories", "Public repositories", data?.user.public_repos ?? repositories.length, "profile"),
    sourceMetric("gists", "Public gists", data?.user.public_gists ?? 0, "profile"),
    { id: "average-stars", label: "Average repository stars", value: average(stars) ?? "Unavailable", category: "repositories", calculation: "calculated", comparable: true, availability: repositories.length ? "available" : "insufficient-data" },
    { id: "average-forks", label: "Average repository forks", value: average(forks) ?? "Unavailable", category: "repositories", calculation: "calculated", comparable: true, availability: repositories.length ? "available" : "insufficient-data" },
  ];
  const languages = repositories.flatMap(repo => repo.language ? [repo.language] : []);
  const activityPoints = events.flatMap(event => event.created_at ? [{ timestamp: event.created_at, value: 1 }] : []);
  const activitySeries = aggregateSeries(activityPoints, "daily-activity", "Daily public activity", "day");
  const activityTypes = distribution("event-types", "Activity by event type", events.flatMap(event => event.type ? [event.type] : []));
  const warnings = repositories.length < (data?.user.public_repos ?? 0) ? [{ code: "PARTIAL_DATA" as const, message: "Repository analytics use the bounded repository response returned by the source." }] : [];
  return { platformId: "github", subjectId: profile.externalId, summary: { metrics, availability: "available" }, metrics, distributions: [distribution("languages", "Languages", languages), activityTypes], rankings: [ranking("repositories", "Top repositories", repositories.map(repo => ({ id: repo.name ?? "unknown", label: repo.name ?? "Unnamed repository", value: repo.stargazers_count ?? 0, metadata: { forks: repo.forks_count, language: repo.language ?? undefined, updated: repo.updated_at } })), { top: 8 })], timeSeries: [normalizeSeries(activityPoints, "activity-events", "Public activity events")], activity: [{ id: "daily-activity", label: "Daily public activity", points: activitySeries.points.map(point => ({ timestamp: point.timestamp, count: point.value })), availability: activitySeries.availability ?? "insufficient-data" }], warnings, metadata: { source: "GitHub REST API", fetchedAt, generatedAt: new Date().toISOString(), freshness: "recent", calculations: ["Average repository stars and forks are calculated from fetched repositories.", "Language and activity distributions are calculated from fetched source records."], limitations: ["Repository and activity analytics are bounded by the source request limits."] } };
}
