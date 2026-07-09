# ADR-0007 — Microsoft Is The First Deep Provider

## Status

Accepted.

## Context

Plus-One contains production-proven Microsoft integration depth across delegated and application credentials, Graph, Exchange, Teams, Azure Bot Service, administrative consent, subscriptions, and organization rollout. This provides real extraction evidence while other provider implementations are shallower.

## Decision

The first Provider kit is Microsoft. Extraction proceeds through credential runtime, Graph subscriptions, shared mailbox reconciliation, organization consent, and Teams infrastructure. Microsoft-specific concepts remain inside the package and do not define core.

## Consequences

- Plus-One is the first consumer and acceptance environment.
- Provider abstractions remain provisional until a second real kit validates them.
- Microsoft resource definitions may be richer than core without forcing false generic equivalents.

## Rejected alternatives

- **Start with several shallow OAuth providers:** rejected because it would validate authorization URLs but not the difficult lifecycle ConnectFX exists to own.
- **Build a Microsoft-only framework:** rejected because Connection, Credential, Grant, health, and event-subscription lifecycles are provider-neutral when bounded correctly.

## Related docs

- `docs/spec/12-microsoft-provider.md`
- `docs/spec/15-plusone-migration.md`
