import { describe, expect, it, vi } from "vitest";
import { getIntegration, getOperation } from "@/lib/integrations";
import { requestJson } from "@/lib/api/request";
import { getPlatform } from "@/config/platforms";

describe("integration registry", () => {
  it("builds only allowlisted public requests", () => {
    const operation = getOperation("github", "public-lookup");
    expect(operation?.buildRequest("octocat").url).toBe("https://api.github.com/users/octocat");
    expect(getOperation("does-not-exist", "public-lookup")).toBeUndefined();
    expect(getIntegration("github")?.baseUrl).toBe("https://api.github.com");
    expect(getPlatform("leetcode")?.integrationStatus).toBe("planned");
    expect(getOperation("leetcode", "public-lookup")).toBeUndefined();
    expect(getIntegration("codeforces")?.buildProfileRequests?.("tourist")?.[2].url).toContain("count=1000");
  });

  it("rejects invalid operation parameters", () => {
    expect(getOperation("stack-overflow", "public-lookup")?.validate("octocat")).toContain("numeric");
    expect(getOperation("cve", "public-lookup")?.validate("not-a-cve")).toContain("CVE");
  });
});

describe("shared API request layer", () => {
  it("returns parsed data and rate-limit metadata", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json", "x-ratelimit-remaining": "42" } }));
    const result = await requestJson({ url: "https://api.github.com/users/octocat", source: "github", fetchImpl });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data).toEqual({ ok: true });
    expect(result.metadata.rateLimit?.remaining).toBe(42);
  });

  it("maps HTTP failures and malformed JSON safely", async () => {
    const httpResult = await requestJson({ url: "https://api.github.com/users/missing", source: "github", fetchImpl: vi.fn(async () => new Response("{}", { status: 404, headers: { "content-type": "application/json" } })) });
    expect(httpResult.ok).toBe(false);
    if (!httpResult.ok) expect(httpResult.error.code).toBe("http");
    const malformedResult = await requestJson({ url: "https://api.github.com/users/broken", source: "github", fetchImpl: vi.fn(async () => new Response("not-json", { status: 200, headers: { "content-type": "application/json" } })) });
    expect(malformedResult.ok).toBe(false);
    if (!malformedResult.ok) expect(malformedResult.error.code).toBe("invalid-response");
  });

  it("captures retry-after metadata for rate limits", async () => {
    const result = await requestJson({ url: "https://api.github.com/users/rate-limited", source: "github", fetchImpl: vi.fn(async () => new Response("{}", { status: 429, headers: { "content-type": "application/json", "retry-after": "30" } })) });
    expect(result.ok).toBe(false);
    expect(result.metadata.rateLimit?.retryAfterSeconds).toBe(30);
  });

  it("aborts requests that exceed the timeout", async () => {
    const fetchImpl = vi.fn((_url: string | URL | Request, options?: RequestInit) => new Promise<Response>((_, reject) => options?.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")))));
    const result = await requestJson({ url: "https://api.github.com/slow", source: "github", timeoutMs: 1, fetchImpl });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error.code).toBe("timeout");
  });
});
