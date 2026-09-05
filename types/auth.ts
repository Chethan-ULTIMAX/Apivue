import type { AuthenticationType } from "./platform";

export type AuthProvider = "github" | "gitlab" | "credentials";
export type SessionStatus = "anonymous" | "authenticated";

export interface AuthProviderConfig {
  platformId: string;
  type: AuthenticationType;
  clientId?: string;
  authorizationUrl?: string;
  scopes?: string[];
}

export interface UserIdentity {
  userId: string;
  displayName?: string;
  email?: string;
  image?: string;
  provider?: AuthProvider;
  providerAccountId?: string;
}

export interface SessionIdentity {
  status: SessionStatus;
  user?: UserIdentity;
  expiresAt?: string;
}

export interface ProtectedCredentialReference {
  id: string;
  userId: string;
  platformId: string;
  provider: AuthenticationType;
  createdAt: string;
  expiresAt?: string;
}

export type ConnectionStatus = "active" | "expired" | "revoked" | "error";

export interface PlatformConnection {
  id: string;
  ownerId: string;
  workspaceId?: string;
  platformId: string;
  authenticationType: AuthenticationType;
  providerAccountId?: string;
  label?: string;
  status: ConnectionStatus;
  createdAt: string;
  updatedAt: string;
  lastVerifiedAt?: string;
  credentialReferenceId: string;
}

export interface CredentialStore {
  get(reference: ProtectedCredentialReference): Promise<Record<string, string> | undefined>;
  revoke(reference: ProtectedCredentialReference): Promise<void>;
}

export interface AuthenticatedRequestNotice {
  visibility: "authenticated";
  message: "Protected credentials are never displayed in the request inspector.";
}
