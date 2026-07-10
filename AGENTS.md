<!-- Generated: 2026-07-09 | Updated: 2026-07-09 -->

# ConnectFX

## Purpose

ConnectFX helps teams safely connect their product to external systems and keep those Connections working over time. It is embedded-first, Effect-native, and infrastructure-owning. The first evidence path is deliberately narrow: Microsoft credentials and Graph before broader provider infrastructure.

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
- ConnectFX owns convergence of one Connection or provider resource against provider facts. Relay owns cross-system product workflow sequencing and may wait on an opaque OperationId, but never mirrors ConnectFX steps.
- ConnectFX never imports AuthFX, Relay, BatonFX, FoldKit, or FoldCN.
- Provider clients, webhooks, credentials, and quirks are confined to Provider kits.
- Prefer capability-specific registrations and layers; do not grow a giant optional ProviderKit interface.
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
