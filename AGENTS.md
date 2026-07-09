<!-- Generated: 2026-07-09 | Updated: 2026-07-09 -->

# ConnectFX

## Purpose

ConnectFX is an embedded-first, Effect-native framework for durable external-system Connections. The first provider is Microsoft, with an initial extraction path through credentials, health, Graph subscriptions, shared mailboxes, organization consent, and Teams application infrastructure.

## Repository Layout

| Directory            | Purpose                                                                                  |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `packages/`          | Reusable deep-module packages. `packages/core` is currently the only scaffolded package. |
| `docs/spec/`         | Canonical feature contracts and ADRs.                                                    |
| `ast-grep/rules/`    | Structural lint rules.                                                                   |
| `.github/workflows/` | CI gates.                                                                                |

## Current Standards

- Read `CONTEXT.md`, `SPEC.md`, and the owning feature document before changing public behavior.
- Do not implement a public contract, service, table, route, workflow, or runtime invariant not described in the spec tree.
- ConnectFX is Effect-native: public operations return `Effect` or `Stream`; services compose through `Layer`; boundary values use Effect Schema; durable orchestration uses Effect Workflow where specified.
- Core is provider-neutral and host-neutral. Microsoft and other provider implementations live in optional packages.
- ConnectFX does not authenticate callers. Consumers authorize a Subject before invoking connection operations.
- ConnectFX does not own Relay communication, Baton agent execution, or product authority.
- Provider clients, webhooks, credentials, and quirks are confined to Provider kits.
- Every behavior-bearing service exposes a test or memory layer and provider kits satisfy conformance tests.
- No code comments. Architectural rationale belongs in specs and ADRs.
- Use Bun, Turbo, Vitest with `@effect/vitest`, plain oxlint, ast-grep, and Prettier.

## For AI Agents

- Treat the repository as specification-first and pre-implementation.
- Stop and update docs before introducing any durable concept not already specified.
- Inspect installed Effect and provider library source before using APIs.
- Do not copy Plus-One `TenantId`, `AgentId`, `AuthorityContext`, profile, owner, or product onboarding vocabulary into core.
- Do not make Microsoft resource types generic unless a second real provider proves the shared abstraction.

## Commands

```bash
bun install
bun run format:check
bun run lint
bun run typecheck
bun run test
bun run test:coverage
bun run build
```

<!-- MANUAL: Add human-maintained notes below this line. -->
