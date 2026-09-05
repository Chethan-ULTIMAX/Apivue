import type { ApiFailure, ApiRequestMetadata, ApiResult, ApiSuccess, RateLimitInfo } from "@/types";

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_MAX_RESPONSE_BYTES = 2_000_000;
const DEFAULT_RETRIES = 2;
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

type RequestOptions = {
  url: string;
  source: string;
  documentationUrl?: string;
  timeoutMs?: number;
  maxResponseBytes?: number;
  retries?: number;
  fetchImpl?: typeof fetch;
};

function parseRetryAfter(value: string | null): number | undefined {
  if (!value) return undefined;
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds;
  const timestamp = Date.parse(value);
  if (!Number.isNaN(timestamp)) return Math.max(0, Math.ceil((timestamp - Date.now()) / 1000));
  return undefined;
}

function parseRateLimit(headers: Headers): RateLimitInfo | undefined {
  const limit = headers.get("x-ratelimit-limit");
  const remaining = headers.get("x-ratelimit-remaining");
  const reset = headers.get("x-ratelimit-reset");
  const retryAfter = parseRetryAfter(headers.get("retry-after"));
  if (!limit && !remaining && !reset && retryAfter === undefined) return undefined;
  return {
    ...(limit && Number.isFinite(Number(limit)) ? { limit: Number(limit) } : {}),
    ...(remaining && Number.isFinite(Number(remaining)) ? { remaining: Number(remaining) } : {}),
    ...(reset && Number.isFinite(Number(reset)) ? { resetAt: new Date(Number(reset) * 1000).toISOString() } : {}),
    ...(retryAfter !== undefined ? { retryAfterSeconds: retryAfter } : {}),
  };
}

function metadata(options: RequestOptions, startedAt: string, durationMs: number, responseSize?: number, rateLimit?: RateLimitInfo): ApiRequestMetadata {
  return { source: options.source, documentationUrl: options.documentationUrl, startedAt, durationMs, responseSize, rateLimit };
}

const wait = (seconds: number) => new Promise(resolve => setTimeout(resolve, Math.min(seconds, 10) * 1000));

export async function requestJson<TRaw = unknown>(options: RequestOptions): Promise<ApiResult<TRaw>> {
  const started = Date.now();
  const startedAt = new Date(started).toISOString();
  const fetchImpl = options.fetchImpl ?? fetch;
  const maxResponseBytes = options.maxResponseBytes ?? DEFAULT_MAX_RESPONSE_BYTES;
  const retries = Math.max(0, options.retries ?? DEFAULT_RETRIES);
  let lastRateLimit: RateLimitInfo | undefined;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);
    try {
      const response = await fetchImpl(options.url, {
        signal: controller.signal,
        headers: { Accept: "application/json", "User-Agent": "APIVue/0.4 public explorer" },
      });
      const text = await response.text();
      const responseSize = new TextEncoder().encode(text).byteLength;
      const rateLimit = parseRateLimit(response.headers);
      lastRateLimit = rateLimit;
      const requestMetadata = metadata(options, startedAt, Date.now() - started, responseSize, rateLimit);

      if (!response.ok) {
        const retryAfterSeconds = rateLimit?.retryAfterSeconds;
        if (RETRYABLE_STATUS.has(response.status) && attempt < retries) {
          await wait(retryAfterSeconds ?? 2 ** attempt);
          continue;
        }
        return {
          ok: false,
          status: response.status,
          error: {
            code: "http",
            message: response.status === 429 ? "The source is rate limited. Try again later." : `The source returned HTTP ${response.status}.`,
            ...(retryAfterSeconds !== undefined ? { retryAfterSeconds } : {}),
          },
          metadata: requestMetadata,
        } satisfies ApiFailure;
      }

      if (responseSize > maxResponseBytes) {
        return {
          ok: false,
          status: response.status,
          error: { code: "invalid-response", message: `The source response exceeds the ${Math.round(maxResponseBytes / 1_000_000)} MB safety limit.` },
          metadata: requestMetadata,
        } satisfies ApiFailure;
      }

      const contentType = response.headers.get("content-type") ?? "";
      if (!contentType.includes("json")) {
        return { ok: false, status: response.status, error: { code: "invalid-response", message: "The source returned an unexpected content type." }, metadata: requestMetadata } satisfies ApiFailure;
      }
      let data: TRaw;
      try {
        data = JSON.parse(text) as TRaw;
      } catch {
        return { ok: false, status: response.status, error: { code: "invalid-response", message: "The source returned malformed JSON." }, metadata: requestMetadata } satisfies ApiFailure;
      }
      return { ok: true, status: response.status, data, metadata: requestMetadata } satisfies ApiSuccess<TRaw>;
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === "AbortError";
      if (!timedOut && attempt < retries) {
        await wait(2 ** attempt);
        continue;
      }
      return {
        ok: false,
        error: { code: timedOut ? "timeout" : "network", message: timedOut ? "The source request timed out." : "The source could not be reached." },
        metadata: metadata(options, startedAt, Date.now() - started, undefined, lastRateLimit),
      } satisfies ApiFailure;
    } finally {
      clearTimeout(timeout);
    }
  }

  return { ok: false, error: { code: "network", message: "The source could not be reached." }, metadata: metadata(options, startedAt, Date.now() - started, undefined, lastRateLimit) } satisfies ApiFailure;
}
