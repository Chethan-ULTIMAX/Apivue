/** Public endpoints that APIVue currently proxies through its allowlisted explorer. */
export const publicExplorerPlatformIds = new Set([
  "github", "gitlab", "codeforces", "npm", "pypi", "docker-hub", "huggingface",
  "stack-exchange", "stack-overflow", "nvd", "cve",
]);
export function isPublicExplorerSupported(platformId: string) { return publicExplorerPlatformIds.has(platformId); }
