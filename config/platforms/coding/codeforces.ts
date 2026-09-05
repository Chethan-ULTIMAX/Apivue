import type { PlatformDefinition } from "@/types";

export const codeforces: PlatformDefinition = {
  "id": "codeforces",
  "name": "Codeforces",
  "description": "Codeforces platform integration contract.",
  "category": "coding",
  "websiteUrl": "https://codeforces.com",
  "documentationUrl": "https://codeforces.com/apiHelp",
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
  "endpoints": [{ "operationId": "public-lookup", "name": "User info", "description": "Fetch public Codeforces user information.", "method": "GET", "path": "/user.info?handles={handle}", "authentication": "public", "responseType": "CodeforcesUser", "documentationUrl": "https://codeforces.com/apiHelp/methods#user.info" }],
  "requestExamples": [{ "language": "curl", "template": "curl https://codeforces.com/api/user.info?handles={handle}" }],
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
