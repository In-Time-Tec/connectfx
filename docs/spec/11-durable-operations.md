# Durable Operations

Long-running authorization, refresh, revocation, subscription, rollout, and reconciliation work is represented by a durable Operation.

Operations have stable ids, idempotency keys, type, Connection id, Subject, projected status and result, requested cancellation, Administrator response, progress events, and timestamps.

Effect Workflow is authoritative for execution attempts, timers, activity replay, retries, and wakeups. ConnectFX Operation storage is authoritative for admission and idempotency, requested cancellation and Administrator response, and the observable status/result projection. ConnectFX does not duplicate Workflow's retry or step state machine. Provider kits do not persist private workflow state.

Every activity declares idempotency and an ambiguous-outcome strategy. A process may die after any provider mutation; replay must inspect before repeating the mutation.

Operations expose get, stream progress, request cancellation at declared boundaries, submit an Administrator response, and repair terminal failure. Relay may wait on an OperationId as a black box but does not mirror internal activities.
