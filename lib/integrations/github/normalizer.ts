import type { NormalizedProfile } from "@/types";
export function normalizeGitHub(user: any, repositories: any[], events: any[] = []): NormalizedProfile {
  const languages: Record<string, number> = {}; repositories.forEach(repo => { if (repo.language) languages[repo.language] = (languages[repo.language] || 0) + 1; });
  const stars = repositories.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0); const forks = repositories.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
  return { platformId: "github", externalId: user.login, displayName: user.name || user.login, profileUrl: user.html_url, sourceUpdatedAt: user.updated_at, metrics: [
    { id:"repositories",label:"Public repositories",value:user.public_repos || repositories.length }, { id:"followers",label:"Followers",value:user.followers || 0 }, { id:"following",label:"Following",value:user.following || 0 }, { id:"stars",label:"Repository stars",value:stars }, { id:"forks",label:"Repository forks",value:forks }, { id:"recent-events",label:"Recent public events",value:events.length }
  ], series: [] };
}
