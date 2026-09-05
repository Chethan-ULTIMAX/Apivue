"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadStore, ensureDefaultWorkspace, removeComparison, removeProfile } from "@/lib/client-store";
import type { WorkspaceStore } from "@/types";

export function Dashboard() {
  const [store, setStore] = useState<WorkspaceStore>({ workspaces: [], profiles: [], comparisons: [], snapshots: [] });
  useEffect(() => setStore(ensureDefaultWorkspace(loadStore())), []);
  const workspace = store.workspaces.find(w => w.id === store.activeWorkspaceId) ?? store.workspaces[0];
  return <div className="dashboard-grid">
    <section className="detail-grid"><article className="notice"><span className="section-label">Workspace</span><h2>{workspace?.name || "Personal Workspace"}</h2><p>{workspace?.savedProfileIds.length || 0} saved profiles · {workspace?.comparisonIds.length || 0} saved comparisons</p><Link className="text-link" href="/workspaces">Manage workspaces →</Link></article><article className="notice"><span className="section-label">Snapshots</span><h2>{store.snapshots.length}</h2><p>Explicitly saved profile captures available for self-comparison.</p><Link className="text-link" href="/history">Open history →</Link></article></section>
    <section><div className="section-heading"><div><p className="eyebrow">Saved profiles</p><h2>Profiles you chose to keep</h2></div><Link className="button button-primary" href="/profiles">Analyze</Link></div>{store.profiles.length ? <div className="platform-grid">{store.profiles.slice(0, 12).map(profile => <article className="platform-tile" key={profile.id}><span className="tile-kicker">{profile.platformId}</span><h3>{profile.subjectId}</h3><p>Saved {new Date(profile.savedAt).toLocaleString()}</p><button className="text-link" onClick={() => setStore(removeProfile(profile.id))}>Remove</button></article>)}</div> : <div className="empty-state"><p>No saved profiles yet.</p><Link className="button button-primary" href="/profiles">Analyze a profile</Link></div>}</section>
    <section><div className="section-heading"><div><p className="eyebrow">Saved comparisons</p><h2>Reusable comparison pairs</h2></div><Link className="button button-quiet" href="/compare">Compare</Link></div>{store.comparisons.length ? <div className="platform-grid">{store.comparisons.slice(0, 8).map(item => <article className="platform-tile" key={item.id}><span className="tile-kicker">{item.platformId}</span><h3>{item.leftSubjectId} vs {item.rightSubjectId}</h3><p>{new Date(item.savedAt).toLocaleString()}</p><button className="text-link" onClick={() => setStore(removeComparison(item.id))}>Remove</button></article>)}</div> : <div className="empty-state"><p>No saved comparisons yet.</p><Link className="button button-primary" href="/compare">Create comparison</Link></div>}</section>
  </div>;
}
