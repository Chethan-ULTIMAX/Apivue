import type { AuthenticationType } from "./platform";

export interface AuthProviderConfig {
  platformId: string;
  type: AuthenticationType;
  clientId?: string;
  authorizationUrl?: string;
  scopes?: string[];
}

export interface ProtectedCredentialReference {
  id: string;
  userId: string;
  platformId: string;
  provider: AuthenticationType;
  createdAt: string;
  expiresAt?: string;
}

export interface AuthenticatedRequestNotice {
  visibility: "authenticated";
  message: "Protected credentials are never displayed in the request inspector.";
}
