import type { PlatformId } from "./platform";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type RequestVisibility = "public" | "authenticated";
export type ApiErrorCode = "invalid-parameters" | "unsupported-operation" | "timeout" | "network" | "http" | "invalid-response";

export interface RateLimitInfo {
  limit?: number;
  remaining?: number;
  resetAt?: string;
  retryAfterSeconds?: number;
}

export interface ApiRequestMetadata {
  source: string;
  documentationUrl?: string;
  startedAt: string;
  durationMs: number;
  responseSize?: number;
  rateLimit?: RateLimitInfo;
}

export interface ApiRequest<TParams = Record<string, unknown>> {
  platformId: PlatformId;
  operationId?: string;
  endpointId: string;
  method: HttpMethod;
  url: string;
  params?: TParams;
  headers?: Record<string, string>;
  visibility: RequestVisibility;
}

export interface ApiResponse<TData = unknown> {
  status: number;
  headers: Record<string, string>;
  data: TData;
  receivedAt: string;
}

export interface RequestDisplayPolicy {
  showEndpoint: boolean;
  showParameters: boolean;
  showSafeHeaders: boolean;
  showCredentials: false;
  explainProtectedCredentials: boolean;
}

export interface RequestExample {
  language: "curl" | "javascript" | "python";
  code: string;
  visibility: RequestVisibility;
}

export interface IntegrationResult<TRaw = unknown> {
  request: ApiRequest;
  response?: ApiResponse<TRaw>;
  metadata?: ApiRequestMetadata;
  error?: { code: ApiErrorCode; message: string; status?: number; retryAfterSeconds?: number };
}

export interface ApiSuccess<TRaw = unknown> {
  ok: true;
  status: number;
  data: TRaw;
  metadata: ApiRequestMetadata;
}

export interface ApiFailure {
  ok: false;
  status?: number;
  error: { code: ApiErrorCode; message: string };
  metadata: ApiRequestMetadata;
}

export type ApiResult<TRaw = unknown> = ApiSuccess<TRaw> | ApiFailure;
