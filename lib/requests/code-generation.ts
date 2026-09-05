import type { ApiRequest, RequestExample } from "@/types";
const safeUrl = (request: ApiRequest) => { const url = new URL(request.url); for (const key of Array.from(url.searchParams.keys())) if (/authorization|cookie|token|secret|key|password/i.test(key)) url.searchParams.set(key, "REDACTED"); return url.toString(); };
export function generateRequestExamples(request: ApiRequest): RequestExample[] {
  const url = safeUrl(request); const headers = Object.entries(request.headers ?? {}).filter(([key]) => !/authorization|cookie|token|secret|key/i.test(key));
  const headerArgs = headers.map(([key, value]) => ` -H '${key}: ${value.replace(/'/g, "\\'")}'`).join("");
  const body = request.params && request.method !== "GET" ? ` --data '${JSON.stringify(request.params)}'` : "";
  const auth = request.visibility === "authenticated" ? "# Authorization required; configure it server-side.\n" : "";
  return [
    { language: "curl", visibility: request.visibility, code: `${auth}curl -X ${request.method}${headerArgs}${body} '${url}'` },
    { language: "javascript", visibility: request.visibility, code: `${auth}fetch(${JSON.stringify(url)}, { method: ${JSON.stringify(request.method)}, headers: ${JSON.stringify(Object.fromEntries(headers))} })\n  .then(response => response.json())\n  .then(console.log);` },
    { language: "python", visibility: request.visibility, code: `${auth}import requests\nresponse = requests.request(${JSON.stringify(request.method)}, ${JSON.stringify(url)}, headers=${JSON.stringify(Object.fromEntries(headers))})\nprint(response.json())` },
  ];
}
