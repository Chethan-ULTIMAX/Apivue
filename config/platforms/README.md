# Platform registry

The ten category folders in this directory are the current source of truth for the 150-platform catalog:

- `source-control/`
- `coding/`
- `packages/`
- `cloud-infrastructure/`
- `ai-ml/`
- `security/`
- `developer-community/`
- `education/`
- `productivity-documentation/`
- `api-ecosystem/`

Every folder contains one explicit module per platform plus an `index.ts` barrel. The top-level `index.ts` is the canonical registry and exposes API availability, authentication requirements, extraction metadata, analytics/comparison/history support, operation declarations, and limitations. `health.ts` produces the machine-readable integration report.

A catalog entry is not a live adapter. Only the allowlisted operations in `lib/integrations/registry.ts` can make external requests. Adding a live operation requires a documented endpoint, response validation, normalization, tests, and a truthful status update. Catalog-only and authenticated entries intentionally do not fetch data anonymously.
