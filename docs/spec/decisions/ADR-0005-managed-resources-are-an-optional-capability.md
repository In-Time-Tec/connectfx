# ADR-0005 — Managed Resources Are An Optional Capability

## Status

Accepted.

## Context

Some Connections only need an API token. Microsoft organization integrations may need mailboxes, applications, bots, installations, permissions, and expiring subscriptions. Requiring a reconciliation engine for every Connection would make the simple case pay for the deepest provider.

## Decision

Managed resources and reconciliation are an optional capability layered over Connections. Core Connection lifecycle does not require desired-state resources. Provider kits register managed-resource definitions only when they support them.

## Consequences

- Simple OAuth and API-key Connections remain small.
- Deep providers can reuse one durable reconciliation runtime.
- Generic resource kinds are not introduced before cross-provider evidence exists.

## Rejected alternatives

- **Everything is a managed resource:** rejected because Credentials and Grants have different lifecycles and because simple Connections do not need planning.
- **Provisioning remains product workflow code:** rejected because idempotency, planning, drift, and administrator-action behavior are reusable.

## Related docs

- `docs/spec/10-managed-resources-and-reconciliation.md`
