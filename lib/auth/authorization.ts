import type { UserIdentity } from "@/types";
import type { Workspace, WorkspaceRole } from "@/types";

const roleRank: Record<WorkspaceRole, number> = { member: 1, admin: 2, owner: 3 };

export function ownsResource(identity: UserIdentity, ownerId: string): boolean {
  return identity.userId === ownerId;
}

export function isWorkspaceMember(identity: UserIdentity, workspace: Workspace): boolean {
  return workspace.members.some(member => member.userId === identity.userId);
}

export function hasWorkspaceRole(identity: UserIdentity, workspace: Workspace, minimumRole: WorkspaceRole): boolean {
  const membership = workspace.members.find(member => member.userId === identity.userId);
  return Boolean(membership && roleRank[membership.role] >= roleRank[minimumRole]);
}

export function assertWorkspaceAccess(identity: UserIdentity, workspace: Workspace, minimumRole: WorkspaceRole = "member"): void {
  if (!hasWorkspaceRole(identity, workspace, minimumRole)) throw new Error("ACCESS_DENIED");
}
