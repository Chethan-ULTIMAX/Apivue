import type { PlatformDefinition } from "@/types";

export const stackOverflow: PlatformDefinition = {
  "id": "stack-overflow",
  "name": "Stack Overflow",
  "description": "Stack Overflow platform integration contract.",
  "category": "developer-community",
  "websiteUrl": "https://stackoverflow.com",
  "documentationUrl": "https://api.stackexchange.com/docs",
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
  "endpoints": [{ "operationId": "public-lookup", "name": "Public user lookup", "description": "Fetch a public Stack Overflow user profile.", "method": "GET", "path": "/users/{userId}?site=stackoverflow", "authentication": "public", "responseType": "StackExchangeUser", "documentationUrl": "https://api.stackexchange.com/docs/users-by-ids" }],
  "requestExamples": [{ "language": "curl", "template": "curl 'https://api.stackexchange.com/2.3/users/{userId}?site=stackoverflow'" }],
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
