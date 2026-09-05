# APIVue

APIVue is a transparent developer-platform catalog and public API inspection tool. It includes a 150-platform registry, status-aware discovery, server-side allowlisted public API requests, JSON response inspection, profile analytics for selected platforms, and safe cURL/fetch/requests code examples.

## Architecture

- `config/platforms/`: category-separated registry definitions (150 entries), canonical queries, and health reporting
- `lib/integrations/registry.ts`: the allowlisted integration registry and request builders
- `lib/api/request.ts`: shared timeout, JSON parsing, HTTP error, response-size, and rate-limit handling
- `app/api/public/[platform]`: server-side registry-backed public lookups; no arbitrary proxying
- `app/api/profiles/[platform]`: registry-backed GitHub and Codeforces profile requests with raw-response preservation
- `components/api-explorer` and `components/json-viewer`: request and response UI
- `lib/requests`: secret-safe code generation; `lib/comparisons`: common metric calculation

The public explorer has verified allowlisted request definitions for GitHub, GitLab, Codeforces, npm, PyPI, Docker Hub, Hugging Face, Stack Exchange/Stack Overflow, NVD, and the CVE API. GitHub and Codeforces also have profile analytics adapters. The remaining catalog entries are not implied to be live: they retain truthful statuses such as authenticated, planned, or catalog-only. Authentication-required integrations intentionally have no browser credential flow.

## Adding a platform

Add its definition to the appropriate `config/platforms` category file, set its truthful integration status, add a known operation and URL builder to `lib/integrations/registry.ts`, validate the response before normalization, then add focused tests. Do not add keys, tokens, cookies, or authorization headers to client code or examples. Routes must never accept a client-provided URL.

APIVue turns developer-platform APIs into understandable, interactive analytics. It is designed around the flow `Connect -> Fetch -> Understand -> Visualize -> Compare -> Learn`.

## Development

```bash
npm install
npm run dev
```

The application is currently a public foundation. No API credentials are required for the current routes.

## Architecture

- `config/platforms.ts` contains declarative platform capabilities and source documentation links.
- `types/` contains contracts for requests, responses, authentication, normalized profiles, analytics, comparisons, snapshots, users, and workspaces.
- `lib/integrations/` owns the registry, operation contract, allowlisted URL builders, and platform-specific normalizers.
- `lib/analytics/` consumes normalized profiles and creates analytics snapshots; it does not fetch APIs.
- `lib/api/` contains request visibility policy and the shared server-side request client. Public request details may be shown; protected credentials are never displayable.
- `config/navigation.ts` is the shared route map for public, application, and settings navigation.

The implemented request and data flow is:

`Platform registry -> allowlisted operation -> bounded request -> validated raw response -> platform normalizer -> analytics -> visualization`

## Analytics

`lib/analytics/` consumes normalized profiles only. Generic calculations cover averages, medians, deltas, distributions, rankings, and time-series sorting/aggregation. Platform adapters in `lib/analytics/adapters/` produce the shared `AnalyticsResult` shape for GitHub and Codeforces; they do not call external APIs. Metrics identify whether values are source, calculated, derived, estimated, or unavailable, and every result carries freshness metadata, limitations, and machine-readable warnings.

Missing data is not converted to zero when the source did not provide it. Results use `available`, `unavailable`, `insufficient-data`, `not-supported`, or `requires-authentication` states. Analytics results can be serialized with `snapshotFromAnalytics` for future persisted snapshots, but APIVue does not currently store or fabricate historical records.

## Integration behavior

The public request route only resolves operations from the integration registry. It does not fetch arbitrary URLs, forward arbitrary headers, or accept an endpoint from the browser. Requests use a finite timeout, parse JSON explicitly, preserve response metadata, and map network, timeout, HTTP, rate-limit, content-type, and malformed-response failures into safe application errors.

The catalog and live integrations are separate concepts. A platform can be discoverable without having a live adapter. Only platforms with an explicit registry operation are requestable, and profile analytics are enabled only for adapters that have a dedicated profile request set and normalizer.

The catalog is organized into ten category definition files and every one of its 150 entries has explicit metadata for website, API availability, authentication, capabilities, extractable data, analytics, comparison, history, operations, and limitations. The registry can query all platforms, category, capability, status, and search views, and `platformHealth` exposes a completeness/implementation report. A definition file is not treated as a live integration merely because it exists; live requests remain allowlisted in `lib/integrations/registry.ts`.

## Authentication and security

Authentication uses Auth.js with a server-side GitHub OAuth boundary. It is enabled only when `NEXTAUTH_SECRET`, `GITHUB_ID`, and `GITHUB_SECRET` are configured; without them, public APIVue routes remain anonymous and `/api/auth/status` reports `configured: false`. Sessions use Auth.js JWT cookies and expose only safe identity metadata. No passwords or provider tokens are stored by APIVue.

The current environment does not include a database. The stable session identity is therefore namespaced from the configured provider account and is suitable for authorization checks, but durable APIVue user records, workspaces, and connections require a persistence adapter in a later step. Connection metadata and credential references are modeled separately; raw credentials must be supplied by a server-only secret store and are never returned to clients.

## Adding a platform

1. Add a `PlatformDefinition` to `config/platforms.ts`.
2. Add a `PlatformIntegration` implementation under `lib/integrations/`.
3. Normalize the source response into `NormalizedProfile` and platform-specific analytics.
4. Add focused tests for request visibility, normalization, and unavailable metrics.

Historical snapshots are not fabricated. API responses are not treated as historical data merely because request results are cached for freshness.
