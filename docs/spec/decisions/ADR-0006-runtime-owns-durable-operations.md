# ADR-0006 — Runtime Owns Durable Operations

## Status

Accepted.

## Context

Authorization, refresh, revocation, subscription renewal, rollout, and reconciliation can span retries, provider replication delays, administrator intervention, and process restarts. If every Provider kit owns private orchestration state, operation semantics and recovery will diverge.

## Decision

ConnectFX runtime owns the durable Operation model, canonical rows, progress, retries, waits, cancellation boundaries, and repair. Effect Workflow coordinates execution over that truth. Provider kits contribute idempotent activities and provider-specific inspection and mutation behavior.

## Consequences

- Operations have one observable lifecycle across providers.
- Provider packages must declare idempotency and ambiguous-outcome handling.
- Consumers may run API and workers separately over shared state without operating a separate ConnectFX service.

## Rejected alternatives

- **Provider-local workflow engines:** rejected because durability and repair behavior would fragment.
- **In-memory queues and SDK retries:** rejected because accepted work would be lost on process failure.

## Related docs

- `docs/spec/11-durable-operations.md`
