export type WorkspaceRole = "owner" | "admin" | "member";

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
  createdAt?: string;
  updatedAt?: string;
}
