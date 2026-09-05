import type { PlatformDefinition } from "@/types";

export const readme: PlatformDefinition = {
  "id": "readme",
  "name": "ReadMe",
  "description": "ReadMe platform integration contract.",
  "category": "productivity-documentation",
  "websiteUrl": "https://readme.com",
  "documentationUrl": "",
  "authentication": [
    "public"
  ],
  "capabilities": [
    {
      "id": "catalog",
      "label": "Platform metadata",
      "description": "Platform is catalogued without an enabled APIVue request.",
      "requiresAuthentication": false
    }
  ],
  "supportsComparison": false,
  "supportsHistoricalSnapshots": false,
  "dataFreshness": "No live data is fetched.",
  "integrationStatus": "catalog-only",
  "apiAvailability": "unknown",
  "authenticationRequired": false,
  "publicAccess": false,
  "profileSupport": false,
  "analyticsSupport": false,
  "comparisonSupport": false,
  "activitySupport": false,
  "requestExampleSupport": false,
  "supportedOperations": [],
  "endpoints": [],
  "requestExamples": [],
  "extractableData": [
    "official platform metadata"
  ],
  "availableAnalytics": [],
  "comparableMetrics": [],
  "historySupported": false,
  "limitations": [
    "No verified APIVue adapter is enabled; APIVue does not fabricate endpoints or data."
  ],
  "notes": "Catalog-only until an official, verified machine-readable source is implemented."
};
