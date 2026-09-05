import type { PlatformDefinition } from "@/types";

export const huggingface: PlatformDefinition = {
  "id": "huggingface",
  "name": "Hugging Face",
  "description": "Hugging Face platform integration contract.",
  "category": "ai-ml",
  "websiteUrl": "https://huggingface.co",
  "documentationUrl": "https://huggingface.co/docs/hub/api",
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
  "endpoints": [{ "operationId": "public-lookup", "name": "Public user lookup", "description": "Fetch public Hugging Face user metadata.", "method": "GET", "path": "/users/{username}", "authentication": "public", "responseType": "HuggingFaceUser", "documentationUrl": "https://huggingface.co/docs/hub/api" }],
  "requestExamples": [{ "language": "curl", "template": "curl https://huggingface.co/api/users/{username}" }],
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
