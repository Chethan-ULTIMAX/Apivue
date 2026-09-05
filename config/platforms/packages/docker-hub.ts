import type { PlatformDefinition } from "@/types";

export const dockerHub: PlatformDefinition = {
  "id": "docker-hub",
  "name": "Docker Hub",
  "description": "Docker Hub platform integration contract.",
  "category": "packages",
  "websiteUrl": "https://hub.docker.com",
  "documentationUrl": "https://docs.docker.com/engine/reference/v2/",
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
  "endpoints": [{ "operationId": "public-lookup", "name": "Repository metadata", "description": "Fetch public Docker Hub repository metadata.", "method": "GET", "path": "/repositories/{namespace}", "authentication": "public", "responseType": "DockerRepository", "documentationUrl": "https://docs.docker.com/reference/api/hub/latest/" }],
  "requestExamples": [{ "language": "curl", "template": "curl https://hub.docker.com/v2/repositories/{namespace}" }],
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
