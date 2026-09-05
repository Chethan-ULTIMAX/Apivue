import type { ApiRequest, PlatformId } from "@/types";

export type IntegrationOperation = "public-lookup" | "profile";

export interface PublicOperationDefinition {
  id: IntegrationOperation;
  method: "GET";
  visibility: "public";
  buildRequest: (value: string) => ApiRequest;
  validate: (value: string) => string | undefined;
}

export interface RegisteredIntegration {
  platformId: PlatformId;
  baseUrl: string;
  documentationUrl: string;
  authentication: "public" | "oauth2" | "api-key";
  operations: Partial<Record<IntegrationOperation, PublicOperationDefinition>>;
  buildProfileRequests?: (value: string) => ApiRequest[];
}

const validValue = (value: string): string | undefined => value.length > 0 && value.length <= 100 ? undefined : "Enter a value between 1 and 100 characters.";
const request = (platformId: PlatformId, url: string, documentationUrl: string, operationId: IntegrationOperation): ApiRequest => ({ platformId, operationId, endpointId: operationId, method: "GET", url, visibility: "public" });

function integration(platformId: PlatformId, baseUrl: string, documentationUrl: string, buildUrl: (value: string) => string, validate = validValue): RegisteredIntegration {
  return { platformId, baseUrl, documentationUrl, authentication: "public", operations: { "public-lookup": { id: "public-lookup", method: "GET", visibility: "public", buildRequest: value => request(platformId, buildUrl(value), documentationUrl, "public-lookup"), validate } } };
}

export const integrations: Record<string, RegisteredIntegration> = {
  github: integration("github", "https://api.github.com", "https://docs.github.com/en/rest", value => `https://api.github.com/users/${encodeURIComponent(value)}`),
  gitlab: integration("gitlab", "https://gitlab.com/api/v4", "https://docs.gitlab.com/ee/api/", value => `https://gitlab.com/api/v4/users?username=${encodeURIComponent(value)}`),
  codeforces: integration("codeforces", "https://codeforces.com/api", "https://codeforces.com/apiHelp", value => `https://codeforces.com/api/user.info?handles=${encodeURIComponent(value)}`),
  npm: integration("npm", "https://registry.npmjs.org", "https://github.com/npm/registry", value => `https://registry.npmjs.org/${encodeURIComponent(value)}`),
  pypi: integration("pypi", "https://pypi.org/pypi", "https://warehouse.pypa.io/api-reference/", value => `https://pypi.org/pypi/${encodeURIComponent(value)}/json`),
  "docker-hub": integration("docker-hub", "https://hub.docker.com/v2", "https://docs.docker.com/engine/reference/v2/", value => `https://hub.docker.com/v2/repositories/${encodeURIComponent(value)}`),
  huggingface: integration("huggingface", "https://huggingface.co/api", "https://huggingface.co/docs/hub/api", value => `https://huggingface.co/api/users/${encodeURIComponent(value)}`),
  "stack-exchange": integration("stack-exchange", "https://api.stackexchange.com/2.3", "https://api.stackexchange.com/docs", value => `https://api.stackexchange.com/2.3/users/${encodeURIComponent(value)}?site=stackoverflow`, value => /^\d+$/.test(value) ? undefined : "Stack Exchange requires a numeric public user ID."),
  "stack-overflow": integration("stack-overflow", "https://api.stackexchange.com/2.3", "https://api.stackexchange.com/docs", value => `https://api.stackexchange.com/2.3/users/${encodeURIComponent(value)}?site=stackoverflow`, value => /^\d+$/.test(value) ? undefined : "Stack Exchange requires a numeric public user ID."),
  nvd: integration("nvd", "https://services.nvd.nist.gov/rest/json/cves/2.0", "https://nvd.nist.gov/developers/vulnerabilities", value => `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodeURIComponent(value)}`),
  cve: integration("cve", "https://cveawg.mitre.org/api", "https://cveawg.mitre.org/api/cve", value => `https://cveawg.mitre.org/api/cve/${encodeURIComponent(value)}`, value => /^CVE-\d{4}-\d{4,}$/i.test(value) ? undefined : "Enter a CVE identifier such as CVE-2024-1234."),
};

integrations.github.buildProfileRequests = value => [
  request("github", `https://api.github.com/users/${encodeURIComponent(value)}`, integrations.github.documentationUrl, "profile"),
  request("github", `https://api.github.com/users/${encodeURIComponent(value)}/repos?per_page=100&sort=updated`, integrations.github.documentationUrl, "profile"),
  request("github", `https://api.github.com/users/${encodeURIComponent(value)}/events/public?per_page=100`, integrations.github.documentationUrl, "profile"),
];
integrations.codeforces.buildProfileRequests = value => [
  request("codeforces", `https://codeforces.com/api/user.info?handles=${encodeURIComponent(value)}`, integrations.codeforces.documentationUrl, "profile"),
  request("codeforces", `https://codeforces.com/api/user.rating?handle=${encodeURIComponent(value)}`, integrations.codeforces.documentationUrl, "profile"),
  request("codeforces", `https://codeforces.com/api/user.status?handle=${encodeURIComponent(value)}&from=1&count=1000`, integrations.codeforces.documentationUrl, "profile"),
];

export function getIntegration(platformId: string): RegisteredIntegration | undefined { return integrations[platformId]; }
export function getOperation(platformId: string, operationId: string): PublicOperationDefinition | undefined { return getIntegration(platformId)?.operations[operationId as IntegrationOperation]; }
