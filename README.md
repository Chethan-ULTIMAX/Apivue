# APIVue

APIVue is a transparent developer-platform catalog and public API inspection tool. Phase 2 adds a 150-platform registry, status-aware discovery, a server-side allowlisted public API explorer, JSON response inspection, and safe cURL/fetch/requests code examples.

## Architecture

- `config/platforms/`: category-separated registry definitions (150 entries)
- `app/api/public/[platform]`: strict server-side allowlist for public lookups; no arbitrary proxying
- `components/api-explorer` and `components/json-viewer`: request and response UI
- `lib/requests`: secret-safe code generation; `lib/comparisons`: common metric calculation

Implemented public explorer adapters: GitHub, GitLab, Codeforces, npm, PyPI, Docker Hub, Hugging Face, Stack Exchange/Stack Overflow, and NVD. Other entries are labelled public API, authenticated, planned, or catalog-only based on the safe UI capability currently enabled. Authentication-required integrations intentionally have no browser credential flow.

## Adding a platform

Add its definition to the appropriate `config/platforms` category file, set its truthful integration status, create a narrowly scoped server adapter under `lib/integrations`/API route, normalize only documented public fields, then expose it through the playground and add tests. Do not add keys, tokens, cookies, or authorization headers to client code or examples.

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
- `lib/integrations/` owns platform fetcher interfaces and will contain real integrations in later phases.
- `lib/analytics/` consumes normalized profiles and creates analytics snapshots; it does not fetch APIs.
- `lib/api/` contains request visibility policy. Public request details may be shown; protected credentials are never displayable.
- `config/navigation.ts` is the shared route map for public, application, and settings navigation.

The intended data flow is:

`Platform API -> Integration -> Raw response -> Normalizer -> Analytics -> Visualization`

## Authentication and security

Authentication is not implemented yet. The type contracts distinguish anonymous and authenticated users, OAuth/API-key providers, and protected credential references so a real provider can be added without storing passwords or exposing tokens. Never commit `.env` files, credentials, cookies, authorization headers, or API keys.

## Adding a platform

1. Add a `PlatformDefinition` to `config/platforms.ts`.
2. Add a `PlatformIntegration` implementation under `lib/integrations/`.
3. Normalize the source response into `NormalizedProfile` and platform-specific analytics.
4. Add focused tests for request visibility, normalization, and unavailable metrics.

Phase 1 intentionally does not claim that any platform integration or historical data retrieval is live.
