import { describe, expect, it } from "vitest";
import { assertWorkspaceAccess, hasWorkspaceRole, ownsResource } from "@/lib/auth/authorization";
import type { UserIdentity, Workspace } from "@/types";

const owner: UserIdentity = { userId: "apivue:github:owner" };
const member: UserIdentity = { userId: "apivue:github:member" };
const other: UserIdentity = { userId: "apivue:github:other" };
const workspace: Workspace = {
  id: "workspace-1",
  name: "Personal",
  ownerId: owner.userId,
  members: [{ userId: owner.userId, role: "owner" }, { userId: member.userId, role: "member" }],
  savedProfileIds: [],
  comparisonIds: [],
};

describe("authentication authorization boundary", () => {
  it("keeps resource ownership identity-based", () => {
    expect(ownsResource(owner, owner.userId)).toBe(true);
    expect(ownsResource(other, owner.userId)).toBe(false);
  });

  it("enforces workspace membership and roles", () => {
    expect(hasWorkspaceRole(owner, workspace, "admin")).toBe(true);
    expect(hasWorkspaceRole(member, workspace, "admin")).toBe(false);
    expect(() => assertWorkspaceAccess(member, workspace)).not.toThrow();
    expect(() => assertWorkspaceAccess(other, workspace)).toThrow("ACCESS_DENIED");
    expect(() => assertWorkspaceAccess(member, workspace, "admin")).toThrow("ACCESS_DENIED");
  });
});
