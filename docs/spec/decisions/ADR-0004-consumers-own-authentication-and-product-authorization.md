# ADR-0004 — Consumers Own Authentication And Product Authorization

## Status

Accepted.

## Context

ConnectFX must know which Subject a Connection belongs to, but it cannot determine whether the current caller is authenticated or allowed to manage that Subject. Products differ in membership, administrator roles, delegated authority, and approval policy.

## Decision

ConnectFX accepts already-authorized Subject values at its service boundary. Consumers authenticate callers, resolve tenancy, enforce product policy, and audit the host decision before invoking ConnectFX. ConnectFX stores Subject identity for isolation and audit but never reads host sessions or permissions.

## Consequences

- ConnectFX remains compatible with AuthFX and other authentication systems.
- Every mutating operation requires a Subject-scoped input.
- Product authorization mistakes cannot be hidden inside Provider kits.

## Rejected alternatives

- **ConnectFX middleware authenticates callers:** rejected because it would couple the framework to one session and tenancy model.
- **Raw ConnectionId is sufficient authority:** rejected because horizontal cross-subject access must be structurally prevented.

## Related docs

- `docs/spec/04-connections-and-subjects.md`
- `docs/spec/03-non-functional-requirements.md`
