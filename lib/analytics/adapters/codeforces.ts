import type { AnalyticsMetric, AnalyticsResult, NormalizedProfile } from "@/types";
import { average, maximum, metricDelta } from "../calculations";
import { distribution, ranking } from "../collections";
import { normalizeSeries } from "../time-series";
import type { NormalizedCodeforcesData } from "@/lib/integrations/codeforces/normalizer";

export function analyzeCodeforces(profile: NormalizedProfile<NormalizedCodeforcesData>, fetchedAt?: string): AnalyticsResult {
  const data = profile.platformData; const submissions = data?.submissions ?? []; const ratings = data?.rating ?? [];
  const verdicts = distribution("verdicts", "Submission verdicts", submissions.flatMap(item => item.verdict ? [item.verdict] : []));
  const languages = distribution("languages", "Submission languages", submissions.flatMap(item => item.programmingLanguage ? [item.programmingLanguage] : []));
  const solved = submissions.filter(item => item.verdict === "OK");
  const difficulties = solved.flatMap(item => typeof item.problem?.rating === "number" ? [String(item.problem.rating)] : []);
  const tags = solved.flatMap(item => item.problem?.tags ?? []);
  const ratingPoints = ratings.flatMap(item => typeof item.ratingUpdateTimeSeconds === "number" && typeof item.newRating === "number" ? [{ timestamp: new Date(item.ratingUpdateTimeSeconds * 1000).toISOString(), value: item.newRating }] : []);
  const previousRating = ratings.length > 1 ? ratings[ratings.length - 2]?.newRating : undefined;
  const currentRating = data?.user.rating;
  const ratingChange = metricDelta(currentRating, previousRating);
  const metrics: AnalyticsMetric[] = [
    { id: "rating", label: "Current rating", value: currentRating ?? "Unavailable", category: "rating", calculation: "source", comparable: true, availability: currentRating === undefined ? "unavailable" : "available" },
    { id: "max-rating", label: "Maximum rating", value: data?.user.maxRating ?? "Unavailable", category: "rating", calculation: "source", comparable: true, availability: data?.user.maxRating === undefined ? "unavailable" : "available" },
    { id: "rating-delta", label: "Latest rating change", value: ratingChange.absolute ?? "Unavailable", category: "rating", calculation: "calculated", comparable: true, availability: ratingChange.availability },
    { id: "submissions", label: "Fetched submissions", value: submissions.length, category: "submissions", calculation: "calculated", comparable: true, availability: submissions.length ? "available" : "insufficient-data" },
    { id: "accepted-submissions", label: "Accepted submissions", value: solved.length, category: "submissions", calculation: "calculated", comparable: true, availability: submissions.length ? "available" : "insufficient-data" },
    { id: "average-difficulty", label: "Average accepted difficulty", value: average(solved.flatMap(item => typeof item.problem?.rating === "number" ? [item.problem.rating] : [])) ?? "Unavailable", category: "difficulty", calculation: "calculated", comparable: true, availability: difficulties.length ? "available" : "insufficient-data" },
    { id: "highest-difficulty", label: "Highest accepted difficulty", value: maximum(solved.flatMap(item => typeof item.problem?.rating === "number" ? [item.problem.rating] : [])) ?? "Unavailable", category: "difficulty", calculation: "calculated", comparable: true, availability: difficulties.length ? "available" : "insufficient-data" },
  ];
  return { platformId: "codeforces", subjectId: profile.externalId, summary: { metrics, availability: "available" }, metrics, distributions: [verdicts, languages, distribution("difficulty", "Accepted problem difficulty", difficulties), distribution("tags", "Accepted problem tags", tags, { top: 12 })], rankings: [], timeSeries: [normalizeSeries(ratingPoints, "rating-history", "Rating history")], activity: [{ id: "submissions", label: "Submission activity", points: submissions.flatMap(item => typeof item.creationTimeSeconds === "number" ? [{ timestamp: new Date(item.creationTimeSeconds * 1000).toISOString(), count: 1 }] : []), availability: submissions.length ? "available" : "insufficient-data" }], warnings: ratings.length < 2 ? [{ code: "INSUFFICIENT_HISTORY", message: "Rating change requires at least two contest ratings." }] : [], metadata: { source: "Codeforces API", fetchedAt, generatedAt: new Date().toISOString(), freshness: "recent", calculations: ["Accepted, difficulty, tag, verdict, language, and activity analytics are calculated from fetched submissions."], limitations: ["Submission and rating analytics are bounded by the source request limits."] } };
}
