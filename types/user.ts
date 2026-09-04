export type AccountStatus = "anonymous" | "authenticated";

export interface UserAccount {
  id: string;
  displayName: string;
  email: string;
  status: AccountStatus;
  connectedPlatforms: string[];
}

export interface AuthSession {
  userId: string;
  expiresAt: string;
}
