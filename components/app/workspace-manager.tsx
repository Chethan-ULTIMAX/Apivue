"use client";
import { useEffect, useState } from "react";
import { createWorkspace, ensureDefaultWorkspace, loadStore, selectWorkspace } from "@/lib/client-store";
import type { WorkspaceStore } from "@/types";

export function WorkspaceManager() {
  const [store, setStore] = useState<WorkspaceStore>({ workspaces: [], profiles: [], comparisons: [], snapshots: [] });
  const [name, setName] = useState("");
  useEffect(() => setStore(ensureDefaultWorkspace(loadStore())), []);
  return <section className="workspace-manager"><form className="directory-controls" onSubmit={e => { e.preventDefault(); if (!name.trim()) return; setStore(createWorkspace(name)); setName(""); }}><input value={name} onChange={e => setName(e.target.value)} placeholder="New workspace name" maxLength={60} required /><button className="button button-primary">Create workspace</button></form><div className="platform-grid">{store.workspaces.map(workspace => <button className={`platform-tile ${workspace.id === store.activeWorkspaceId ? "is-selected" : ""}`} key={workspace.id} onClick={() => setStore(selectWorkspace(workspace.id))}><span className="tile-kicker">{workspace.id === store.activeWorkspaceId ? "ACTIVE" : "WORKSPACE"}</span><h2>{workspace.name}</h2><p>{workspace.savedProfileIds.length} profiles · {workspace.comparisonIds.length} comparisons</p><small>Created {new Date(workspace.createdAt).toLocaleDateString()}</small></button>)}</div><div className="notice"><strong>Storage boundary</strong><p>Part 3 stores explicit workspace data in browser storage. No provider tokens, cookies, or secrets are stored here. Server-backed multi-device workspaces require a database adapter.</p></div></section>;
}
