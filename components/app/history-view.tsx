"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadStore, removeProfile } from "@/lib/client-store";
import type { AnalyticsSnapshot, WorkspaceStore } from "@/types";

function numeric(value: unknown): number | undefined { return typeof value === "number" && Number.isFinite(value) ? value : undefined; }
function delta(a: AnalyticsSnapshot, b: AnalyticsSnapshot) { const ids = new Set([...Object.keys(a.metrics), ...Object.keys(b.metrics)]); return [...ids].map(id => { const av = numeric(a.metrics[id]); const bv = numeric(b.metrics[id]); return { id, from: av, to: bv, change: av !== undefined && bv !== undefined ? bv - av : undefined }; }).filter(x => x.from !== undefined || x.to !== undefined); }

export function HistoryView() {
  const [store, setStore] = useState<WorkspaceStore>({ workspaces: [], profiles: [], comparisons: [], snapshots: [] });
  const [selected, setSelected] = useState<string>("");
  useEffect(() => setStore(loadStore()), []);
  const groups = useMemo(() => { const map = new Map<string, AnalyticsSnapshot[]>(); for (const s of store.snapshots) { const key = `${s.platformId}:${s.subjectId}`; map.set(key, [...(map.get(key) ?? []), s].sort((a,b) => a.capturedAt.localeCompare(b.capturedAt))); } return [...map.entries()]; }, [store.snapshots]);
  const pair = selected ? groups.find(([key]) => key === selected)?.[1] ?? [] : [];
  const changes = pair.length > 1 ? delta(pair[pair.length - 2], pair[pair.length - 1]) : [];
  return <section className="history-view"><div className="detail-grid"><article className="notice"><span className="section-label">Stored locally</span><h2>{store.snapshots.length} snapshots</h2><p>Snapshots are created only when you choose Save snapshot. Nothing here is claimed to be server-side history.</p></article><article className="notice"><span className="section-label">Tracked subjects</span><h2>{groups.length}</h2><p>Choose a subject to inspect its latest change.</p></article></div>
    {groups.length ? <div className="history-list">{groups.map(([key, snapshots]) => <button className={`history-item ${selected === key ? "is-selected" : ""}`} key={key} onClick={() => setSelected(key)}><span>{snapshots[0].platformId}</span><strong>{snapshots[0].subjectId}</strong><small>{snapshots.length} snapshot{snapshots.length === 1 ? "" : "s"} · latest {new Date(snapshots.at(-1)!.capturedAt).toLocaleString()}</small></button>)}</div> : <div className="empty-state"><p>No history yet.</p><Link className="button button-primary" href="/profiles">Create your first snapshot</Link></div>}
    {selected && <section className="comparison-table"><header><strong>Metric</strong><strong>Previous</strong><strong>Latest</strong><strong>Change</strong></header>{changes.map(c => <div key={c.id}><span>{c.id}</span><span>{c.from ?? "—"}</span><span>{c.to ?? "—"}</span><span>{c.change === undefined ? "—" : c.change > 0 ? `+${c.change}` : c.change}</span></div>)}</section>}
    {selected && pair.length > 0 && <button className="text-link" onClick={() => { const profile = store.profiles.find(p => p.platformId === pair[0].platformId && p.subjectId === pair[0].subjectId); if (profile) setStore(removeProfile(profile.id)); }}>Remove saved profile</button>}
  </section>;
}
