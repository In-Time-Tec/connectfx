# ADR-0001 — ConnectFX Is An Embedded Effect-Native Connection Framework

## Status

Accepted.

## Context

Applications need durable external-system connections, but hosted integration platforms move credentials, runtime, and control-plane state outside the application, while ad hoc provider code scatters token and lifecycle behavior across product packages.

## Decision

ConnectFX is a standalone, embedded-first Effect-native connection framework. Consumers compose it into their own application, persistence, authorization boundary, and deployment. Public operations remain Effect-native.

## Consequences

- Consumers retain credential custody and data ownership.
- ConnectFX must provide explicit persistence, operation, and provider seams.
- Hosted operation may be built by consumers, but ConnectFX is not defined as a hosted service.

## Rejected alternatives

- **Hosted integration platform as the primary architecture:** rejected because provider calls, credentials, and product policy belong in consumer infrastructure.
- **Keep connection behavior inside Plus-One:** rejected because the lifecycle and provider mechanisms are reusable and should not import product vocabulary.
- **Promise-first SDK around provider clients:** rejected because retries, resources, streams, scopes, and durable operations should remain explicit Effect contracts.

## Related docs

- `docs/spec/01-product-intent.md`
- `docs/spec/13-sdk-and-layer-composition.md`
