# ADR-0003 — Provider Kits Own Provider Semantics

## Status

Accepted.

## Context

Providers differ in authorization, credential kinds, scope implication, installations, webhooks, rate limits, APIs, and resource models. A universal provider object model would either leak one provider's semantics into core or collapse meaningful differences.

## Decision

Core defines Connection lifecycle, provider registration, common error categories, and capability extension points. Each Provider kit owns authorization, credentials, clients, events, scopes, installations, resources, and provider-specific test fixtures.

## Consequences

- Provider packages are deep modules and may be large.
- Core stays small and provider-neutral.
- Shared abstractions are promoted only after two real provider implementations prove them.

## Rejected alternatives

- **One generic provider client interface for all API operations:** rejected because it hides provider capabilities behind untyped strings and payloads.
- **Provider branches in core:** rejected because every new provider would change the framework ontology.

## Related docs

- `docs/spec/05-providers-and-provider-kits.md`
- `docs/spec/12-microsoft-provider.md`
