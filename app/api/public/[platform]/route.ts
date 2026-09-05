import { NextRequest, NextResponse } from "next/server";
import { getIntegration, getOperation } from "@/lib/integrations";
import { requestJson } from "@/lib/api/request";

export async function GET(request: NextRequest, { params }: { params: { platform: string } }) {
  const value = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  const operation = getOperation(params.platform, "public-lookup");
  if (!operation) return NextResponse.json({ error: "This platform has no enabled public endpoint. Its catalog status is shown instead." }, { status: 501 });
  const validationError = operation.validate(value);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

  const apiRequest = operation.buildRequest(value);
  const integration = getIntegration(params.platform);
  const result = await requestJson({ url: apiRequest.url, source: params.platform, documentationUrl: integration?.documentationUrl });
  const headers = {
    "x-apivue-source": params.platform,
    "x-apivue-duration-ms": String(result.metadata.durationMs),
    ...(result.metadata.responseSize ? { "x-apivue-response-size": String(result.metadata.responseSize) } : {}),
    ...(result.metadata.rateLimit?.retryAfterSeconds ? { "retry-after": String(result.metadata.rateLimit.retryAfterSeconds) } : {}),
  };
  if (!result.ok) return NextResponse.json({ error: result.error.message, code: result.error.code, metadata: result.metadata }, { status: result.status ?? 503, headers });
  return NextResponse.json(result.data, { status: result.status, headers });
}
