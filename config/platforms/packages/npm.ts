import type { PlatformDefinition } from "@/types";

export const npm: PlatformDefinition = {
  "id": "npm",
  "name": "npm",
  "description": "npm platform integration contract.",
  "category": "packages",
  "websiteUrl": "https://www.npmjs.com",
  "documentationUrl": "https://github.com/npm/registry",
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
  "endpoints": [{ "operationId": "public-lookup", "name": "Package metadata", "description": "Fetch public npm package metadata.", "method": "GET", "path": "/{package}", "authentication": "public", "responseType": "NpmPackage", "documentationUrl": "https://github.com/npm/registry" }],
  "requestExamples": [{ "language": "curl", "template": "curl https://registry.npmjs.org/{package}" }],
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
