import { NextRequest, NextResponse } from "next/server";
import { getIntegration } from "@/lib/integrations";
import { requestJson } from "@/lib/api/request";
import { normalizeCodeforces, type CodeforcesRating, type CodeforcesSubmission, type CodeforcesUser } from "@/lib/integrations/codeforces/normalizer";
import { normalizeGitHub, type GitHubEvent, type GitHubRepository, type GitHubUser } from "@/lib/integrations/github/normalizer";
import { analyzeProfile } from "@/lib/analytics";

type RecordValue = Record<string, unknown>;
const isRecord = (value: unknown): value is RecordValue => typeof value === "object" && value !== null;
const isArray = (value: unknown): value is unknown[] => Array.isArray(value);

function failureResponse(result: Awaited<ReturnType<typeof requestJson>>, start: number) {
  if (result.ok) return undefined;
  return NextResponse.json({ error: result.error.message, code: result.error.code, metadata: result.metadata }, { status: result.status ?? 503, headers: { "x-apivue-duration-ms": String(Date.now() - start) } });
}

export async function GET(request: NextRequest, { params }: { params: { platform: string } }) {
  const username = request.nextUrl.searchParams.get("username")?.trim() ?? "";
  if (!username || username.length > 80) return NextResponse.json({ error: "Enter a valid public username." }, { status: 400 });
  const integration = getIntegration(params.platform);
  if (!integration?.buildProfileRequests) return NextResponse.json({ error: "A dedicated public profile integration is not enabled for this platform." }, { status: 501 });

  const started = Date.now();
  const requests = integration.buildProfileRequests(username);
  const results = await Promise.all(requests.map(profileRequest => requestJson({ url: profileRequest.url, source: params.platform, documentationUrl: integration.documentationUrl })));
  const failed = results.find(result => !result.ok);
  if (failed) return failureResponse(failed, started);
  const data = results.map(result => result.ok ? result.data : undefined);

  try {
    if (params.platform === "github") {
      const [user, repositories, events] = data;
      if (!isRecord(user) || !isArray(repositories) || !isArray(events) || typeof user.login !== "string") throw new Error("The GitHub response did not match the expected public profile shape.");
      const profile = normalizeGitHub(user as GitHubUser, repositories as GitHubRepository[], events as GitHubEvent[]);
      const fetchedAt = new Date().toISOString();
      return NextResponse.json({ profile, raw: { user, repositories, events }, analytics: analyzeProfile(profile, fetchedAt), source: "GitHub REST API", documentation: integration.documentationUrl, limitations: "Repository-derived aggregates use the latest 100 public repositories returned by GitHub.", fetchedAt, durationMs: Date.now() - started });
    }
    if (params.platform === "codeforces") {
      const [info, rating, submissions] = data;
      if (!isRecord(info) || !isRecord(rating) || !isRecord(submissions) || !isArray(info.result) || !isArray(rating.result) || !isArray(submissions.result) || !isRecord(info.result[0])) throw new Error("The Codeforces response did not match the expected public profile shape.");
      const profile = normalizeCodeforces(info.result[0] as CodeforcesUser, rating.result as CodeforcesRating[], submissions.result as CodeforcesSubmission[]);
      const fetchedAt = new Date().toISOString();
      return NextResponse.json({ profile, raw: { user: info.result[0], rating: rating.result, submissions: submissions.result }, analytics: analyzeProfile(profile, fetchedAt), source: "Codeforces API", documentation: integration.documentationUrl, limitations: "Submission-derived metrics use the latest 1,000 public submissions returned by Codeforces.", fetchedAt, durationMs: Date.now() - started });
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "The source returned an invalid response.", code: "invalid-response" }, { status: 502 });
  }
  return NextResponse.json({ error: "A dedicated public profile integration is not enabled for this platform." }, { status: 501 });
}
