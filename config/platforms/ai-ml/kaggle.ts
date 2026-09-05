import type { PlatformDefinition } from "@/types";

export const kaggle: PlatformDefinition = {
  "id": "kaggle",
  "name": "Kaggle",
  "description": "Kaggle platform integration contract.",
  "category": "ai-ml",
  "websiteUrl": "https://kaggle.com",
  "documentationUrl": "",
  "authentication": [
    "oauth2"
  ],
  "capabilities": [
    {
      "id": "catalog",
      "label": "Platform metadata",
      "description": "Documented API exists but requires an authorized server-side connection.",
      "requiresAuthentication": true
    }
  ],
  "supportsComparison": false,
  "supportsHistoricalSnapshots": false,
  "dataFreshness": "No live data is fetched.",
  "integrationStatus": "authenticated",
  "apiAvailability": "authenticated",
  "authenticationRequired": true,
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
    "authorized account and resource metadata"
  ],
  "availableAnalytics": [],
  "comparableMetrics": [],
  "historySupported": false,
  "limitations": [
    "No anonymous request is enabled; credentials and scopes must be configured server-side."
  ],
  "notes": "Authenticated operation boundary only; no credentials are stored in this module."
};
