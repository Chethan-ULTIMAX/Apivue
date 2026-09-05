import type { PlatformDefinition } from "@/types";

export const pypi: PlatformDefinition = {
  "id": "pypi",
  "name": "PyPI",
  "description": "PyPI platform integration contract.",
  "category": "packages",
  "websiteUrl": "https://pypi.org",
  "documentationUrl": "https://warehouse.pypa.io/api-reference/",
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
  "endpoints": [{ "operationId": "public-lookup", "name": "Package metadata", "description": "Fetch public PyPI release metadata.", "method": "GET", "path": "/pypi/{package}/json", "authentication": "public", "responseType": "PyPiPackage", "documentationUrl": "https://warehouse.pypa.io/api-reference/json/" }],
  "requestExamples": [{ "language": "curl", "template": "curl https://pypi.org/pypi/{package}/json" }],
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
