import type { PlatformDefinition } from "@/types";

export const nvd: PlatformDefinition = {
  "id": "nvd",
  "name": "NVD",
  "description": "NVD platform integration contract.",
  "category": "security",
  "websiteUrl": "https://nvd.nist.gov",
  "documentationUrl": "https://nvd.nist.gov/developers/vulnerabilities",
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
  "endpoints": [{ "operationId": "public-lookup", "name": "CVE keyword search", "description": "Search public NVD CVE records by keyword.", "method": "GET", "path": "/cves/2.0?keywordSearch={query}", "authentication": "public", "responseType": "NvdCveResponse", "documentationUrl": "https://nvd.nist.gov/developers/vulnerabilities" }],
  "requestExamples": [{ "language": "curl", "template": "curl 'https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch={query}'" }],
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
