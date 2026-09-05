import { describe, expect, it } from "vitest";
import { compareMetrics } from "@/lib/comparisons";
import { generateRequestExamples } from "@/lib/requests/code-generation";
describe("safe requests and comparisons", () => {
  it("never turns string metrics into numeric deltas", () => { const result=compareMetrics([{id:"name",label:"Name",value:"12"}],[{id:"name",label:"Name",value:"24"}]); expect(result[0].delta).toBeUndefined(); });
  it("creates numeric deltas only for numeric metrics", () => { expect(compareMetrics([{id:"stars",label:"Stars",value:2}],[{id:"stars",label:"Stars",value:5}])[0].delta).toBe(3); });
  it("redacts sensitive headers and query values in generated examples", () => { const code=generateRequestExamples({platformId:"github",endpointId:"user",method:"GET",url:"https://api.github.com/users/a?token=unsafe",headers:{Authorization:"secret",Accept:"application/json"},visibility:"public"}).map(example=>example.code).join("\n"); expect(code).not.toContain("secret"); expect(code).not.toContain("unsafe"); expect(code).toContain("REDACTED"); });
});
