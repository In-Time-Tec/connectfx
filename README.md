# ConnectFX

Safely connect your product to external systems and keep those Connections working over time.

ConnectFX manages durable Connections, Credentials, Grants, provider installations, health, event subscriptions, and optional managed-resource reconciliation. Its first provider kit is Microsoft, extracted from the organization onboarding and provisioning work proven in Plus-One.

Better Auth/AuthFX connects people to your product. ConnectFX starts after the host authenticates and authorizes: it assigns a durable Connection to an opaque Subject and manages provider access over time.

## Status

ConnectFX is specification-first and pre-implementation. The repository currently defines its vocabulary, boundaries, architecture, and implementation roadmap.

## Principles

- Effect-native services, layers, schemas, streams, schedules, scopes, config, workflows, and typed errors.
- Embedded into the consumer's application and persistence rather than operated as a hosted integration platform.
- Connections are managed lifecycle objects, not loose tokens.
- Provider kits own authorization, credentials, clients, webhooks, and quirks.
- Managed resources are optional capabilities over a Connection.
- Host applications own authentication and product authorization.
- Relay owns workflows that sequence intent across systems; ConnectFX owns provider-local convergence.

Use ConnectFX for persistent access with credentials, consent, installations, refresh, webhooks, subscriptions, health, or recovery—not for every HTTP API. It is not an ORM, ETL engine, general workflow engine, IaC system, or agent tool catalog.

## Commands

```bash
bun install
bun run format:check
bun run lint
bun run typecheck
bun run test
bun run build
```

Read `CONTEXT.md` for vocabulary and `SPEC.md` for the specification tree.
