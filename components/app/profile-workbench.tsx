"use client";
import { useState } from "react";
import type { AnalyticsResult } from "@/types";
import { persistAnalytics } from "@/lib/client-store";

export function ProfileWorkbench() {
  const [platform, setPlatform] = useState("github");
  const [identifier, setIdentifier] = useState("");
  const [result, setResult] = useState<{ profile: { displayName: string; profileUrl?: string }; analytics: AnalyticsResult } | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  async function run(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError(""); setSaved(false); setResult(null);
    try { const response = await fetch(`/api/profiles/${platform}?username=${encodeURIComponent(identifier.trim())}`); const body = await response.json(); if (!response.ok) throw new Error(body.error || "Profile could not be loaded."); setResult(body); }
    catch (e) { setError(e instanceof Error ? e.message : "Profile could not be loaded."); }
    finally { setBusy(false); }
  }
  function save() { if (!result) return; persistAnalytics(result.analytics); setSaved(true); }
  return <section className="workbench">
    <form className="directory-controls" onSubmit={run}>
      <select value={platform} onChange={e => setPlatform(e.target.value)} aria-label="Profile platform"><option value="github">GitHub</option><option value="codeforces">Codeforces</option></select>
      <input value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder={platform === "github" ? "GitHub username" : "Codeforces handle"} required maxLength={80} />
      <button className="button button-primary" disabled={busy}>{busy ? "Fetching…" : "Analyze profile"}</button>
    </form>
    {error && <div className="error-state" role="alert">{error}</div>}
    {result && <div className="profile-result">
      <header className="result-header"><div><p className="eyebrow">{platform} / live source</p><h2>{result.profile.displayName}</h2><p className="muted">{result.profile.profileUrl || "Public profile"}</p></div><button className="button button-primary" onClick={save}>{saved ? "Saved" : "Save snapshot"}</button></header>
      <div className="metric-grid">{result.analytics.metrics.map(metric => <article className="metric-card" key={metric.id}><span>{metric.label}</span><strong>{String(metric.value)}</strong>{metric.unit && <small>{metric.unit}</small>}</article>)}</div>
      {result.analytics.warnings.length > 0 && <div className="notice"><strong>Data notes</strong>{result.analytics.warnings.map(w => <p key={`${w.code}-${w.message}`}>{w.message}</p>)}</div>}
    </div>}
  </section>;
}
