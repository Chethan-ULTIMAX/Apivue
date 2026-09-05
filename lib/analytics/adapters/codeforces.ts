import type { AnalyticsMetric, AnalyticsResult, NormalizedProfile } from "@/types";
import { average, maximum, metricDelta } from "../calculations";
import { distribution } from "../collections";
import { aggregateSeries, normalizeSeries } from "../time-series";
import type { NormalizedCodeforcesData } from "@/lib/integrations/codeforces/normalizer";

export function analyzeCodeforces(profile: NormalizedProfile<NormalizedCodeforcesData>, fetchedAt?: string): AnalyticsResult {
  const data = profile.platformData; const submissions = data?.submissions ?? []; const ratings = data?.rating ?? [];
  const solved = submissions.filter(item => item.verdict === "OK");
  const solvedRatings = solved.flatMap(item => typeof item.problem?.rating === "number" ? [item.problem.rating] : []);
  const verdicts = distribution("verdicts", "Submission verdicts", submissions.flatMap(item => item.verdict ? [item.verdict] : []));
  const languages = distribution("languages", "Submission languages", submissions.flatMap(item => item.programmingLanguage ? [item.programmingLanguage] : []));
  const difficulties = distribution("difficulty", "Accepted problem difficulty", solvedRatings.map(String));
  const tags = distribution("tags", "Accepted problem tags", solved.flatMap(item => item.problem?.tags ?? []), { top: 12 });
  const ratingPoints = ratings.flatMap(item => typeof item.ratingUpdateTimeSeconds === "number" && typeof item.newRating === "number" ? [{ timestamp: new Date(item.ratingUpdateTimeSeconds * 1000).toISOString(), value: item.newRating }] : []);
  const activityPoints = submissions.flatMap(item => typeof item.creationTimeSeconds === "number" ? [{ timestamp: new Date(item.creationTimeSeconds * 1000).toISOString(), value: 1 }] : []);
  const previousRating = ratings.length > 1 ? ratings[ratings.length - 2]?.newRating : undefined;
  const currentRating = data?.user.rating;
  const ratingChange = metricDelta(currentRating, previousRating);
  const metrics: AnalyticsMetric[] = [
    { id: "rating", label: "Current rating", value: currentRating ?? "Unavailable", category: "rating", calculation: "source", comparable: true, availability: currentRating === undefined ? "unavailable" : "available" },
    { id: "max-rating", label: "Maximum rating", value: data?.user.maxRating ?? "Unavailable", category: "rating", calculation: "source", comparable: true, availability: data?.user.maxRating === undefined ? "unavailable" : "available" },
    { id: "rating-delta", label: "Latest rating change", value: ratingChange.absolute ?? "Unavailable", category: "rating", calculation: "calculated", comparable: true, availability: ratingChange.availability },
    { id: "submissions", label: "Fetched submissions", value: submissions.length, category: "submissions", calculation: "calculated", comparable: true, availability: submissions.length ? "available" : "insufficient-data" },
    { id: "accepted-submissions", label: "Accepted submissions", value: solved.length, category: "submissions", calculation: "calculated", comparable: true, availability: submissions.length ? "available" : "insufficient-data" },
    { id: "acceptance-rate", label: "Acceptance rate", value: submissions.length ? (solved.length / submissions.length) * 100 : "Unavailable", unit: "%", category: "submissions", calculation: "calculated", comparable: true, availability: submissions.length ? "available" : "insufficient-data" },
    { id: "average-difficulty", label: "Average accepted difficulty", value: average(solvedRatings) ?? "Unavailable", category: "difficulty", calculation: "calculated", comparable: true, availability: solvedRatings.length ? "available" : "insufficient-data" },
    { id: "highest-difficulty", label: "Highest accepted difficulty", value: maximum(solvedRatings) ?? "Unavailable", category: "difficulty", calculation: "calculated", comparable: true, availability: solvedRatings.length ? "available" : "insufficient-data" },
  ];
  const activitySeries = aggregateSeries(activityPoints, "daily-submissions", "Daily submissions", "day");
  return { platformId: "codeforces", subjectId: profile.externalId, summary: { metrics, availability: "available" }, metrics, distributions: [verdicts, languages, difficulties, tags], rankings: [], timeSeries: [normalizeSeries(ratingPoints, "rating-history", "Rating history")], activity: [{ id: "submissions", label: "Daily submission activity", points: activitySeries.points.map(point => ({ timestamp: point.timestamp, count: point.value })), availability: activitySeries.availability ?? "insufficient-data" }], warnings: ratings.length < 2 ? [{ code: "INSUFFICIENT_HISTORY", message: "Rating change requires at least two contest ratings." }] : [], metadata: { source: "Codeforces API", fetchedAt, generatedAt: new Date().toISOString(), freshness: "recent", calculations: ["Acceptance rate, difficulty, tag, verdict, language, rating change, and activity analytics are calculated from fetched submissions and ratings."], limitations: ["Submission and rating analytics are bounded by the source request limits."] } };
}
