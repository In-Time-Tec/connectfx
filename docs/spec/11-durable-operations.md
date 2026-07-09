# Durable Operations

Long-running authorization, refresh, revocation, subscription, rollout, and reconciliation work is represented by a durable Operation.

Operations have stable ids, idempotency keys, type, Connection id, Subject, status, current step, attempts, retry schedule, Administrator action, progress events, timestamps, and terminal error.

Effect Workflow owns sleeps, activities, replay, and resume. Canonical rows remain the operational source of truth. Provider kits do not persist private workflow state.

Every activity declares idempotency and an ambiguous-outcome strategy. A process may die after any provider mutation; replay must inspect before repeating the mutation.

Operations expose get, stream progress, cancel at declared boundaries, resume after Administrator action, and repair terminal failure.
