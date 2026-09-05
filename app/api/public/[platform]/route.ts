import { NextRequest, NextResponse } from "next/server";
const endpoints: Record<string, (user: string) => string> = {
  github: user => `https://api.github.com/users/${encodeURIComponent(user)}`,
  gitlab: user => `https://gitlab.com/api/v4/users?username=${encodeURIComponent(user)}`,
  codeforces: user => `https://codeforces.com/api/user.info?handles=${encodeURIComponent(user)}`,
  npm: user => `https://registry.npmjs.org/${encodeURIComponent(user)}`,
  pypi: user => `https://pypi.org/pypi/${encodeURIComponent(user)}/json`,
  "docker-hub": user => `https://hub.docker.com/v2/repositories/${encodeURIComponent(user)}`,
  huggingface: user => `https://huggingface.co/api/users/${encodeURIComponent(user)}`,
  "stack-exchange": user => `https://api.stackexchange.com/2.3/users/${encodeURIComponent(user)}?site=stackoverflow`,
  "stack-overflow": user => `https://api.stackexchange.com/2.3/users/${encodeURIComponent(user)}?site=stackoverflow`,
  nvd: user => `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${encodeURIComponent(user)}`,
  cve: user => `https://cveawg.mitre.org/api/cve/${encodeURIComponent(user)}`,
};
export async function GET(request: NextRequest, { params }: { params: { platform: string } }) {
  const user = request.nextUrl.searchParams.get("q")?.trim(); const build = endpoints[params.platform];
  if (!build) return NextResponse.json({ error: "This platform has no enabled public endpoint. Its catalog status is shown instead." }, { status: 501 });
  if (!user || user.length > 100) return NextResponse.json({ error: "Enter a valid public username, package, repository path, or search term." }, { status: 400 });
  if ((params.platform === "stack-exchange" || params.platform === "stack-overflow") && !/^\d+$/.test(user)) return NextResponse.json({ error: "Stack Exchange requires a numeric public user ID." }, { status: 400 });
  if (params.platform === "cve" && !/^CVE-\d{4}-\d{4,}$/i.test(user)) return NextResponse.json({ error: "Enter a CVE identifier such as CVE-2024-1234." }, { status: 400 });
  const started = Date.now();
  try { const upstream = await fetch(build(user), { headers: { Accept: "application/json", "User-Agent": "APIVue/0.2 public explorer" }, next: { revalidate: 60 } }); const body = await upstream.text();
    return new NextResponse(body, { status: upstream.status, headers: { "content-type": upstream.headers.get("content-type") || "application/json", "x-apivue-source": params.platform, "x-apivue-duration-ms": String(Date.now() - started), "x-apivue-upstream-url": build(user), "x-apivue-response-size": String(Buffer.byteLength(body)), ...(upstream.headers.get("retry-after") ? { "retry-after": upstream.headers.get("retry-after")! } : {}) } });
  } catch { return NextResponse.json({ error: `${params.platform} could not be reached right now. Check your connection or try again.` }, { status: 503 }); }
}
