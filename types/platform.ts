export type PlatformId = string;
export type PlatformCategory = string;
export type AuthenticationType = string;

export interface PlatformCapability {
  id: string;
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
  integrationStatus?: "public-api" | "authenticated" | "catalog-only" | "planned";
  publicAccess?: boolean;
  profileSupport?: boolean;
  analyticsSupport?: boolean;
  comparisonSupport?: boolean;
  activitySupport?: boolean;
  requestExampleSupport?: boolean;
  notes?: string;
}
