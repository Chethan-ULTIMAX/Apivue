export type PlatformId = "github" | "leetcode" | "codeforces";
export type PlatformCategory = "code" | "community" | "career";
export type AuthenticationType = "public" | "oauth2" | "api-key";

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
}
