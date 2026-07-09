# Non-Functional Requirements

## Security

- Consumers authorize Subjects before invoking connection mutations.
- Credential material flows through `Redacted` and a vault boundary and never enters logs or client schemas.
- Tenant or Subject isolation is structural in every store operation.
- OAuth and administrator-consent transactions are expiring, single-use, and exact-redirect validated.
- Webhook ingress uses constant-time secret comparison where applicable and treats payloads as untrusted data.

## Reliability

- Provider mutations declare idempotency, retry classification, and eventual-consistency strategy.
- Canonical operation state survives process restarts.
- Background refresh and subscription renewal use bounded retries and observable terminal states.
- Reconciliation re-inspects provider state before side effects and after ambiguous failures.

## Testability

- Every service has a test or memory layer.
- Every Provider kit satisfies shared conformance tests.
- Time, randomness, rate limiting, and retries are controllable through Effect test services.
- Live provider tests are opt-in and never required for the default suite.

## Operations

- Every outbound provider call carries Connection identity for audit and rate-limit accounting.
- Connection health exposes remediation and Administrator actions.
- Provider request ids, retry counts, and operation progress are observable without secrets.
