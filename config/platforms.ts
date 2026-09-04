import type { PlatformDefinition } from "@/types";

export const platforms: PlatformDefinition[] = [
  {
    id: "github",
    name: "GitHub",
    description: "Explore repositories, languages, and public contribution activity.",
    category: "community",
    websiteUrl: "https://github.com",
    documentationUrl: "https://docs.github.com/en/rest",
    authentication: ["public", "oauth2"],
    capabilities: [
      { id: "repositories", label: "Repositories", description: "Public repository and language data.", requiresAuthentication: false },
      { id: "activity", label: "Activity", description: "Public contribution and event activity.", requiresAuthentication: false },
    ],
    supportsComparison: true,
    supportsHistoricalSnapshots: true,
    dataFreshness: "Depends on the source API",
  },
  {
    id: "leetcode",
    name: "LeetCode",
    description: "Understand solved problems, difficulty, topics, and contest history.",
    category: "code",
    websiteUrl: "https://leetcode.com",
    documentationUrl: "https://leetcode.com/",
    authentication: ["public"],
    capabilities: [
      { id: "problem-solving", label: "Problem solving", description: "Problem counts and difficulty distribution when available.", requiresAuthentication: false },
      { id: "contests", label: "Contests", description: "Contest performance and rating history when available.", requiresAuthentication: false },
    ],
    supportsComparison: true,
    supportsHistoricalSnapshots: true,
    dataFreshness: "Depends on the source API",
  },
  {
    id: "codeforces",
    name: "Codeforces",
    description: "Track ratings, contests, solved problems, tags, and performance trends.",
    category: "code",
    websiteUrl: "https://codeforces.com",
    documentationUrl: "https://codeforces.com/apiHelp",
    authentication: ["public"],
    capabilities: [
      { id: "rating", label: "Rating history", description: "Contest ratings and rank changes.", requiresAuthentication: false },
      { id: "submissions", label: "Submissions", description: "Public submission and problem metadata.", requiresAuthentication: false },
    ],
    supportsComparison: true,
    supportsHistoricalSnapshots: true,
    dataFreshness: "Depends on the source API",
  },
];

export function getPlatform(platformId: string) {
  return platforms.find((platform) => platform.id === platformId);
}
