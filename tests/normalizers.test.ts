import { describe, expect, it } from "vitest";
import { normalizeGitHub } from "@/lib/integrations/github/normalizer";
import { normalizeCodeforces } from "@/lib/integrations/codeforces/normalizer";
describe("profile normalizers", () => {
  it("normalizes GitHub repository aggregates", () => { const profile=normalizeGitHub({login:"octo",html_url:"https://github.com/octo",public_repos:2,followers:3,following:4},[{language:"TypeScript",stargazers_count:5,forks_count:2},{language:"TypeScript",stargazers_count:1,forks_count:0}],[]); expect(profile.metrics.find(m=>m.id==="stars")?.value).toBe(6); expect(profile.metrics.find(m=>m.id==="forks")?.value).toBe(2); });
  it("handles Codeforces submissions without rating or problem metadata", () => { const profile=normalizeCodeforces({handle:"user"},[],[{verdict:"OK",problem:{}},{verdict:"WRONG_ANSWER",problem:{}}]); expect(profile.metrics.find(m=>m.id==="solved")?.value).toBe(1); expect(profile.series[0].points).toEqual([]); });
});
