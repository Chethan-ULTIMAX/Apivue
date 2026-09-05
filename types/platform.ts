export type PlatformId = string;
export type PlatformCategory = string;
export type AuthenticationType = string;
export type IntegrationStatus = "fully-integrated" | "partially-integrated" | "public-api" | "authenticated" | "catalog-only" | "planned" | "unsupported";
export type ApiAvailability = "public" | "authenticated" | "limited" | "none" | "unknown";

export type PlatformCapabilityId = "profile" | "analytics" | "activity" | "repositories" | "packages" | "submissions" | "ratings" | "courses" | "posts" | "questions" | "answers" | "security" | "datasets" | "models" | "deployments" | "projects" | "comparison" | "history" | "apiExplorer" | "catalog";

export interface PlatformEndpoint {
  operationId: string;
  name: string;
  description: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
  authentication: AuthenticationType;
  responseType?: string;
  documentationUrl?: string;
}

export interface PlatformRequestExample {
  language: "curl" | "javascript" | "python";
  template: string;
}

export interface PlatformCapability {
  id: PlatformCapabilityId | string;
  label: string;
  description: string;
  requiresAuthentication: boolean;
}

export interface PlatformDefinition {
  id: PlatformId;
  name: string;
  description: string;
  category: PlatformCategory;
  websiteUrl: string;
  documentationUrl: string;
  authentication: AuthenticationType[];
  capabilities: PlatformCapability[];
  supportsComparison: boolean;
  supportsHistoricalSnapshots: boolean;
  dataFreshness: string;
  // Additional fields from PHASE2.md
  integrationStatus?: IntegrationStatus;
  apiAvailability?: ApiAvailability;
  authenticationRequired?: boolean;
  supportedOperations?: string[];
  endpoints?: PlatformEndpoint[];
  requestExamples?: PlatformRequestExample[];
  extractableData?: string[];
  availableAnalytics?: string[];
  comparableMetrics?: string[];
  historySupported?: boolean;
  limitations?: string[];
  publicAccess?: boolean;
  profileSupport?: boolean;
  analyticsSupport?: boolean;
  comparisonSupport?: boolean;
  activitySupport?: boolean;
  requestExampleSupport?: boolean;
  notes?: string;
}
