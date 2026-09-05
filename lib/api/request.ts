import type { ApiFailure, ApiRequestMetadata, ApiResult, ApiSuccess, RateLimitInfo } from "@/types";

const DEFAULT_TIMEOUT_MS = 10_000;

type RequestOptions = {
  url: string;
  source: string;
  documentationUrl?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
};

function parseRateLimit(headers: Headers): RateLimitInfo | undefined {
  const limit = headers.get("x-ratelimit-limit");
  const remaining = headers.get("x-ratelimit-remaining");
  const reset = headers.get("x-ratelimit-reset");
  const retryAfter = headers.get("retry-after");
  if (!limit && !remaining && !reset && !retryAfter) return undefined;
  return {
    ...(limit && Number.isFinite(Number(limit)) ? { limit: Number(limit) } : {}),
    ...(remaining && Number.isFinite(Number(remaining)) ? { remaining: Number(remaining) } : {}),
    ...(reset && Number.isFinite(Number(reset)) ? { resetAt: new Date(Number(reset) * 1000).toISOString() } : {}),
    ...(retryAfter && Number.isFinite(Number(retryAfter)) ? { retryAfterSeconds: Number(retryAfter) } : {}),
  };
}

function metadata(options: RequestOptions, startedAt: string, durationMs: number, responseSize?: number, rateLimit?: RateLimitInfo): ApiRequestMetadata {
  return { source: options.source, documentationUrl: options.documentationUrl, startedAt, durationMs, responseSize, rateLimit };
}

export async function requestJson<TRaw = unknown>(options: RequestOptions): Promise<ApiResult<TRaw>> {
  const started = Date.now();
  const startedAt = new Date(started).toISOString();
  const fetchImpl = options.fetchImpl ?? fetch;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetchImpl(options.url, {
      signal: controller.signal,
      headers: { Accept: "application/json", "User-Agent": "APIVue/0.3 public explorer" },
    });
    const text = await response.text();
    const rateLimit = parseRateLimit(response.headers);
    const requestMetadata = metadata(options, startedAt, Date.now() - started, new TextEncoder().encode(text).byteLength, rateLimit);
    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: { code: "http", message: response.status === 429 ? "The source is rate limited. Try again later." : `The source returned HTTP ${response.status}.` },
        metadata: requestMetadata,
      } satisfies ApiFailure;
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("json")) {
      return { ok: false, status: response.status, error: { code: "invalid-response", message: "The source returned an unexpected content type." }, metadata: requestMetadata } satisfies ApiFailure;
    }
    let data: TRaw;
    try { data = JSON.parse(text) as TRaw; } catch { return { ok: false, status: response.status, error: { code: "invalid-response", message: "The source returned malformed JSON." }, metadata: requestMetadata } satisfies ApiFailure; }
    return { ok: true, status: response.status, data, metadata: requestMetadata } satisfies ApiSuccess<TRaw>;
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "AbortError";
    return { ok: false, error: { code: timedOut ? "timeout" : "network", message: timedOut ? "The source request timed out." : "The source could not be reached." }, metadata: metadata(options, startedAt, Date.now() - started) } satisfies ApiFailure;
  } finally {
    clearTimeout(timeout);
  }
}
