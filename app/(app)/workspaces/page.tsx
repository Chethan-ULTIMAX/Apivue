import { WorkspaceManager } from "@/components/app/workspace-manager";

export default function WorkspacesPage() {
  return <main className="page-shell"><p className="eyebrow">Workspaces / saved context</p><h1>Keep different investigations separate.</h1><p className="lede">Create local workspaces for the profiles, snapshots, and comparisons you want to keep together.</p><WorkspaceManager /></main>;
}
