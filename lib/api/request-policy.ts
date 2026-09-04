import type { ApiRequest, RequestDisplayPolicy } from "@/types";

export function getRequestDisplayPolicy(request: ApiRequest): RequestDisplayPolicy {
  const isPublic = request.visibility === "public";
  return {
    showEndpoint: true,
    showParameters: true,
    showSafeHeaders: isPublic,
    showCredentials: false,
    explainProtectedCredentials: !isPublic,
  };
}
