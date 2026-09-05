import type { NormalizedProfile } from "@/types";
export interface GitHubUser { [key: string]: unknown; login: string; name?: string | null; html_url?: string; updated_at?: string; public_repos?: number; followers?: number; following?: number; public_gists?: number; }
export interface GitHubRepository { [key: string]: unknown; id?: number; name?: string; language?: string | null; stargazers_count?: number; forks_count?: number; updated_at?: string; }
export interface GitHubEvent { [key: string]: unknown; type?: string; created_at?: string; repo?: { name?: string }; }
export interface NormalizedGitHubData { user: GitHubUser; repositories: GitHubRepository[]; events: GitHubEvent[]; }

export function normalizeGitHub(user: GitHubUser, repositories: GitHubRepository[], events: GitHubEvent[] = []): NormalizedProfile {
  const stars = repositories.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0); const forks = repositories.reduce((sum, repo) => sum + (repo.forks_count ?? 0), 0);
  return { platformId: "github", externalId: user.login, displayName: user.name || user.login, profileUrl: user.html_url || `https://github.com/${encodeURIComponent(user.login)}`, sourceUpdatedAt: user.updated_at, platformData: { user, repositories, events }, metrics: [
    { id:"repositories",label:"Public repositories",value:user.public_repos ?? repositories.length }, { id:"followers",label:"Followers",value:user.followers ?? 0 }, { id:"following",label:"Following",value:user.following ?? 0 }, { id:"stars",label:"Repository stars",value:stars }, { id:"forks",label:"Repository forks",value:forks }, { id:"recent-events",label:"Recent public events",value:events.length }
  ], series: [] };
}
