# ConnectFX Context

This file is the canonical vocabulary for ConnectFX. `SPEC.md` indexes the detailed contracts under `docs/spec/`.

## Positioning

ConnectFX is an embedded-first, Effect-native framework for durable external-system Connections. It begins with a Microsoft provider kit but keeps provider-specific identities, credentials, permissions, resources, and APIs outside core.

## Language

**Subject**:
An opaque host-application entity to which a Connection is assigned, such as a person, organization, application, or service.
_Avoid_: User, owner, tenant

**Provider**:
An external system ConnectFX can connect to through a Provider kit.
_Avoid_: Connector, integration, surface

**Provider tenant**:
An organization, workspace, account, or domain boundary inside a Provider.
_Avoid_: Host tenant, subject

**Connection**:
A durable, authorized operational relationship between a Subject and a Provider account or Provider tenant.
_Avoid_: OAuth account, token, installation row

**Provider kit**:
The deep provider package that owns authorization, credential acquisition, provider clients, webhook verification, errors, and quirks for one Provider.
_Avoid_: Plugin, adapter collection

**Credential**:
Secret or signed material used to exercise a Connection, including OAuth tokens, API keys, service accounts, application secrets, certificates, or installation tokens.
_Avoid_: Session token, connection

**Credential profile**:
The lifecycle record describing a Credential's kind, scopes, subject, expiration, rotation, vault reference, and Connection usage.
_Avoid_: Token row

**Grant**:
A provider or administrator authorization fact that permits capabilities through a Connection.
_Avoid_: Product permission, role

**Capability**:
A provider-defined operation, data source, surface, or managed-resource feature enabled through a Connection.
_Avoid_: Product feature, grant

**Installation**:
A Provider-side application or service presence associated with a Connection, such as a GitHub App installation or Slack workspace installation.
_Avoid_: Connection, managed resource

**Connection health**:
The observed ability of a Connection to acquire credentials and exercise its required capabilities.
_Avoid_: Token validity

**Event subscription**:
A Provider-side registration that asks the Provider to deliver changes to a consumer-owned ingress.
_Avoid_: Webhook event, listener

**Managed resource**:
A Provider-side object whose desired and observed state ConnectFX reconciles through a Connection.
_Avoid_: Connection, capability

**Reconciliation**:
The durable process of inspecting desired and observed Managed resource state, planning changes, applying them, and verifying convergence.
_Avoid_: Provision command, sync

**Administrator action**:
An explicit external step a Provider administrator must complete before an operation can continue.
_Avoid_: Failure, manual workaround

## Invariants

- Connections are managed lifecycle objects with durable identity, not aliases for Credentials.
- ConnectFX never authenticates callers or decides host product authorization.
- Core contains no provider-specific branches or host product vocabulary.
- Provider kits own provider protocol, scope, credential, client, webhook, and error semantics.
- Operational Credentials are encrypted or referenced through a consumer-provided vault boundary.
- Connection health is broader than token validity and includes grant, scope, installation, subscription, and capability checks.
- Provider mutations declare idempotency and eventual-consistency behavior.
- Event ingress verifies, deduplicates, records, and acknowledges before durable processing.
- Managed resources are optional; simple Connections do not require the reconciliation runtime.
- Every behavior-bearing service has a test or memory layer.
- New durable concepts require a feature document; stable decisions require an ADR.

## Spec branches

- Product intent: `docs/spec/01-product-intent.md`
- Vocabulary and domain model: `docs/spec/02-vocabulary-and-domain-model.md`
- Non-functional requirements: `docs/spec/03-non-functional-requirements.md`
- Connections and subjects: `docs/spec/04-connections-and-subjects.md`
- Providers and provider kits: `docs/spec/05-providers-and-provider-kits.md`
- Credentials and grants: `docs/spec/06-credentials-and-grants.md`
- Authorization flows and installations: `docs/spec/07-authorization-flows-and-installations.md`
- Health, refresh, and revocation: `docs/spec/08-health-refresh-and-revocation.md`
- Event subscriptions and ingress: `docs/spec/09-event-subscriptions-and-ingress.md`
- Managed resources and reconciliation: `docs/spec/10-managed-resources-and-reconciliation.md`
- Durable operations: `docs/spec/11-durable-operations.md`
- Microsoft provider: `docs/spec/12-microsoft-provider.md`
- SDK and layers: `docs/spec/13-sdk-and-layer-composition.md`
- Testing and conformance: `docs/spec/14-testing-and-provider-conformance.md`
- Plus-One migration: `docs/spec/15-plusone-migration.md`
- Roadmap: `docs/spec/16-roadmap-and-open-questions.md`
