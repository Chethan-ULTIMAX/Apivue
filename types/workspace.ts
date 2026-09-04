export type WorkspaceRole = "owner" | "editor" | "viewer";

export interface WorkspaceMember {
  userId: string;
  role: WorkspaceRole;
}

export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  members: WorkspaceMember[];
  savedProfileIds: string[];
  comparisonIds: string[];
}
