## Registry Verdict & Spec APIs

### Get Verdicts
`GET /api/registry/verdicts`

Public read-only audit trail for ABI spec verification verdicts.

**Query Parameters:**
* `contractId` (optional): Return only the latest verdict for this contract. Omit to list the latest verdict for every contract.

**Responses:**
Wraps results in `{ meta: { schema_version }, data }` and sets `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`. Returns 404 when `contractId` is given but has no recorded verdict.

### List Specs
`GET /api/registry/specs`

Lists every registered contract spec, each annotated with its `latestVerdict`.

### Register a Spec
`POST /api/registry/specs`

Registers a new contract spec for verification. Body: `{ contractId, spec, publisher? }`.
