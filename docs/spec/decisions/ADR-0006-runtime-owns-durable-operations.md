# ADR-0006 — Runtime Owns Durable Operations

## Status

Accepted.

## Context

Authorization, refresh, revocation, subscription renewal, rollout, and reconciliation can span retries, provider replication delays, administrator intervention, and process restarts. If every Provider kit owns private orchestration state, operation semantics and recovery will diverge.

## Decision

Effect Workflow is authoritative for execution attempts, timers, activity replay, retries, and wakeups. ConnectFX Operation storage is authoritative for admission and idempotency, requested cancellation and Administrator response, and observable status/result projection. It does not duplicate Workflow retry or step state. Provider kits contribute idempotent activities and provider-specific inspection and mutation behavior.

## Consequences

- Operations have one observable lifecycle across providers.
- Provider packages must declare idempotency and ambiguous-outcome handling.
- Consumers may run API and workers separately over shared state without operating a separate ConnectFX service.
- Provider mutations inspect before repeat after ambiguous outcomes.

## Rejected alternatives

- **Provider-local workflow engines:** rejected because durability and repair behavior would fragment.
- **In-memory queues and SDK retries:** rejected because accepted work would be lost on process failure.
- **A second retry and step state machine in Operation rows:** rejected because two authorities would diverge during replay and repair.

## Related docs

- `docs/spec/11-durable-operations.md`
