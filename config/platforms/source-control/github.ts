import type { PlatformDefinition } from "@/types";

export const github: PlatformDefinition = {
  "id": "github",
  "name": "GitHub",
  "description": "GitHub platform integration contract.",
  "category": "source-control",
  "websiteUrl": "https://github.com",
  "documentationUrl": "https://docs.github.com/en/rest",
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
  "endpoints": [{ "operationId": "public-lookup", "name": "Public user lookup", "description": "Fetch a public GitHub user profile.", "method": "GET", "path": "/users/{username}", "authentication": "public", "responseType": "GitHubUser", "documentationUrl": "https://docs.github.com/en/rest/users/users#get-a-user" }],
  "requestExamples": [{ "language": "curl", "template": "curl https://api.github.com/users/{username}" }],
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
