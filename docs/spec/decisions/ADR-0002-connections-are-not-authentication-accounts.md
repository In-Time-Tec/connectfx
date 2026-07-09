# ADR-0002 — Connections Are Not Authentication Accounts

## Status

Accepted.

## Context

OAuth can authenticate a person into an application or authorize operational access to an external system. The resulting records have different subjects, lifecycles, credentials, and consequences. Provider installations may belong to organizations or applications and persist independently of one login session.

## Decision

A Connection is a durable operational relationship assigned to an opaque Subject. It is not a login account, Session, OAuth account row, or Credential. AuthFX owns host authentication; ConnectFX owns external-system access.

## Consequences

- Consumers explicitly bridge authenticated subjects into authorized Connection operations.
- Credentials may rotate without replacing the Connection.
- ConnectFX can support organization, application, and service Connections without inventing users.

## Rejected alternatives

- **Reuse authentication account records:** rejected because they are user-bound and do not model installations, grants, health, or managed resources.
- **Combine AuthFX and ConnectFX:** rejected because successful authentication must not imply external-system authority.

## Related docs

- `docs/spec/04-connections-and-subjects.md`
- `docs/spec/15-plusone-migration.md`
