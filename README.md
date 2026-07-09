# ConnectFX

The Effect-native framework for connecting applications to external systems.

ConnectFX manages durable Connections, Credentials, Grants, provider installations, health, event subscriptions, and optional managed-resource reconciliation. Its first provider kit is Microsoft, extracted from the organization onboarding and provisioning work proven in Plus-One.

## Status

ConnectFX is specification-first and pre-implementation. The repository currently defines its vocabulary, boundaries, architecture, and implementation roadmap.

## Principles

- Effect-native services, layers, schemas, streams, schedules, scopes, config, workflows, and typed errors.
- Embedded into the consumer's application and persistence rather than operated as a hosted integration platform.
- Connections are managed lifecycle objects, not loose tokens.
- Provider kits own authorization, credentials, clients, webhooks, and quirks.
- Managed resources are optional capabilities over a Connection.
- Host applications own authentication and product authorization.

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
