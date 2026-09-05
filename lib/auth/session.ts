import { getServerSession } from "next-auth";
import { authOptions } from "./options";
import type { SessionIdentity, UserIdentity } from "@/types";

export async function getCurrentSession(): Promise<SessionIdentity> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return { status: "anonymous" };
  const user: UserIdentity = {
    userId: session.user.id,
    displayName: session.user.name ?? undefined,
    email: session.user.email ?? undefined,
    image: session.user.image ?? undefined,
    provider: session.user.provider === "github" ? "github" : undefined,
  };
  return { status: "authenticated", user, expiresAt: session.expires };
}

export async function requireAuthenticatedUser(): Promise<UserIdentity> {
  const identity = await getCurrentSession();
  if (identity.status !== "authenticated" || !identity.user) throw new Error("AUTHENTICATION_REQUIRED");
  return identity.user;
}
