"use client";

import { signIn, signOut } from "next-auth/react";
import { Github, LogOut } from "lucide-react";
import { useState } from "react";

export function GitHubSignIn({ callbackUrl = "/account" }: { callbackUrl?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    setError(false);
    try {
      await signIn("github", { callbackUrl });
    } catch {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="auth-action-stack">
      <button className="button button-primary auth-provider-button" type="button" onClick={handleSignIn} disabled={loading}>
        <Github size={17} aria-hidden="true" />
        {loading ? "Connecting to GitHub..." : "Continue with GitHub"}
      </button>
      {error ? <p className="auth-error" role="alert">GitHub sign-in could not start. Check the provider configuration and try again.</p> : null}
    </div>
  );
}

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await signOut({ callbackUrl: "/login?loggedOut=1" });
  }

  return (
    <button className="button button-quiet" type="button" onClick={handleLogout} disabled={loading}>
      <LogOut size={16} aria-hidden="true" />
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
