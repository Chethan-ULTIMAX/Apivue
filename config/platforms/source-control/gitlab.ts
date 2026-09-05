import type { PlatformDefinition } from "@/types";

export const gitlab: PlatformDefinition = {
  "id": "gitlab",
  "name": "GitLab",
  "description": "GitLab platform integration contract.",
  "category": "source-control",
  "websiteUrl": "https://gitlab.com",
  "documentationUrl": "https://docs.gitlab.com/ee/api/",
  "authentication": [
    "public"
  ],
  "capabilities": [
    {
      "id": "apiExplorer",
      "label": "Allowlisted public API",
      "description": "Verified public operation is available through the APIVue request layer.",
      "requiresAuthentication": false
    }
  ],
  "supportsComparison": false,
  "supportsHistoricalSnapshots": false,
  "dataFreshness": "Fetched from the documented source when requested.",
  "integrationStatus": "public-api",
  "apiAvailability": "public",
  "authenticationRequired": false,
  "publicAccess": true,
  "profileSupport": false,
  "analyticsSupport": false,
  "comparisonSupport": false,
  "activitySupport": false,
  "requestExampleSupport": true,
  "supportedOperations": [
    "public-lookup"
  ],
  "endpoints": [{ "operationId": "public-lookup", "name": "Public user lookup", "description": "Find a public GitLab user by username.", "method": "GET", "path": "/users?username={username}", "authentication": "public", "responseType": "GitLabUser[]", "documentationUrl": "https://docs.gitlab.com/ee/api/users.html#list-users" }],
  "requestExamples": [{ "language": "curl", "template": "curl https://gitlab.com/api/v4/users?username={username}" }],
  "extractableData": [
    "documented public response fields"
  ],
  "availableAnalytics": [],
  "comparableMetrics": [],
  "historySupported": false,
  "limitations": [
    "Only operations explicitly registered in lib/integrations/registry.ts are enabled."
  ]
};
