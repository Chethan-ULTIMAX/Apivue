import type { AnalyticsSnapshot } from "./analytics";

export type WorkspaceRole = "owner" | "admin" | "member";
export interface WorkspaceMember { userId: string; role: WorkspaceRole; }
export interface SavedProfileRef { id: string; platformId: string; subjectId: string; displayName: string; profileUrl?: string; savedAt: string; snapshotId?: string; }
export interface SavedComparisonRef { id: string; platformId: string; leftSubjectId: string; rightSubjectId: string; leftDisplayName: string; rightDisplayName: string; savedAt: string; }
export interface Workspace { id: string; name: string; ownerId: string; members: WorkspaceMember[]; savedProfileIds: string[]; comparisonIds: string[]; createdAt: string; updatedAt: string; }
export interface WorkspaceStore { workspaces: Workspace[]; profiles: SavedProfileRef[]; comparisons: SavedComparisonRef[]; snapshots: AnalyticsSnapshot[]; activeWorkspaceId?: string; }
