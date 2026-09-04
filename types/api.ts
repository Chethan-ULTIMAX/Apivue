import type { PlatformId } from "./platform";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type RequestVisibility = "public" | "authenticated";

export interface ApiRequest<TParams = Record<string, unknown>> {
  platformId: PlatformId;
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
  error?: { code: string; message: string };
}
