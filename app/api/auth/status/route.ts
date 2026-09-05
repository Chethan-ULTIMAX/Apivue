import { NextResponse } from "next/server";
import { authEnabled } from "@/lib/auth/options";
import { getCurrentSession } from "@/lib/auth/session";

export async function GET() {
  const session = await getCurrentSession();
  return NextResponse.json({
    configured: authEnabled,
    status: session.status,
    user: session.user ? { userId: session.user.userId, displayName: session.user.displayName, image: session.user.image, provider: session.user.provider } : undefined,
  });
}
