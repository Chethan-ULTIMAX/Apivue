import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { LogoutButton } from "@/components/auth/auth-actions";
import { authEnabled } from "@/lib/auth/options";
import { getCurrentSession } from "@/lib/auth/session";

export default async function AccountPage() {
  const session = await getCurrentSession();
  if (session.status !== "authenticated" || !session.user) redirect("/login?callbackUrl=/account");
  const user = session.user;

  return (
    <main className="page-shell account-page">
      <p className="eyebrow">Account / identity</p>
      <div className="account-heading">
        <div><h1>Your APIVue account.</h1><p className="lede">Your identity is ready for connected platforms, private workspaces, and saved analysis.</p></div>
        <LogoutButton />
      </div>
      <section className="account-grid" aria-label="Account details">
        <article className="account-panel account-profile-panel">
          <div className="account-avatar">{user.image ? <Image src={user.image} alt="" width={64} height={64} /> : user.displayName?.charAt(0).toUpperCase() ?? "A"}</div>
          <div><p className="section-label">Signed in with {user.provider ?? "provider"}</p><h2>{user.displayName ?? "APIVue user"}</h2><p className="muted">{user.email ?? "Email provided by your authentication provider"}</p></div>
        </article>
        <article className="account-panel">
          <p className="section-label">Session</p><div className="account-status"><span className="status-dot" />Authenticated</div>
          <p className="muted">Your session is managed by Auth.js using secure server-side cookies. Tokens are not included in this page or sent to client components.</p>
          <p className="account-id">{user.userId}</p>
        </article>
      </section>
      <section className="account-next">
        <div><p className="section-label">Next connections</p><h2>Connect a platform when you are ready.</h2><p className="muted">No private platform connections are enabled yet. Public exploration remains available without changing your account.</p></div>
        <Link className="button button-quiet" href="/explore">Explore platforms <ArrowRight size={16} /></Link>
      </section>
      {!authEnabled ? <p className="auth-error">Authentication configuration is unavailable in this environment.</p> : <p className="auth-note"><ShieldCheck size={15} /> Identity controls are server-authorized.</p>}
    </main>
  );
}
