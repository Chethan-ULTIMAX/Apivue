import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { GitHubSignIn } from "@/components/auth/auth-actions";
import { authEnabled } from "@/lib/auth/options";
import { getCurrentSession } from "@/lib/auth/session";

export default async function LoginPage({ searchParams }: { searchParams: { callbackUrl?: string; error?: string; loggedOut?: string } }) {
  const session = await getCurrentSession();
  if (session.status === "authenticated") redirect("/account");
  const callbackUrl = searchParams.callbackUrl?.startsWith("/") ? searchParams.callbackUrl : "/account";

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <Link className="auth-back-link" href="/"><ArrowLeft size={15} /> Back to APIVue</Link>
        <div className="auth-mark"><LockKeyhole size={19} /></div>
        <p className="eyebrow">APIVue account</p>
        <h1 id="login-title">Bring your sources together.</h1>
        <p className="lede">Sign in to keep your connected platforms, workspaces, and future analytics tied to your identity.</p>
        {searchParams.loggedOut ? <p className="auth-success" role="status">You have been signed out.</p> : null}
        {searchParams.error ? <p className="auth-error" role="alert">Authentication could not be completed. Please try again.</p> : null}
        {authEnabled ? <GitHubSignIn callbackUrl={callbackUrl} /> : <div className="auth-unavailable" role="status"><strong>Sign-in is not configured yet.</strong><p>GitHub OAuth becomes available when the server has its provider credentials. Public APIVue tools remain available without an account.</p></div>}
        <p className="auth-legal">APIVue never receives or displays your GitHub password. Provider credentials stay with GitHub and the server-side Auth.js session.</p>
      </section>
    </main>
  );
}
