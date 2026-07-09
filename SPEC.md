# ConnectFX Specification Index

ConnectFX is an embedded-first, Effect-native framework for durable external-system Connections. Consumers compose it into their own application, persistence, authorization boundary, and deployment.

## How to read this tree

Read `CONTEXT.md`, then the root specification documents, then the feature branch matching the work. Stable architectural decisions live under `docs/spec/decisions/`. Implementation must not introduce public behavior absent from this tree.

```diagram
SPEC.md
├─ 00-reading-guide.md
├─ 01-product-intent.md
├─ 02-vocabulary-and-domain-model.md
├─ 03-non-functional-requirements.md
├─ feature branches
│  ├─ 04-connections-and-subjects.md
│  ├─ 05-providers-and-provider-kits.md
│  ├─ 06-credentials-and-grants.md
│  ├─ 07-authorization-flows-and-installations.md
│  ├─ 08-health-refresh-and-revocation.md
│  ├─ 09-event-subscriptions-and-ingress.md
│  ├─ 10-managed-resources-and-reconciliation.md
│  ├─ 11-durable-operations.md
│  ├─ 12-microsoft-provider.md
│  ├─ 13-sdk-and-layer-composition.md
│  ├─ 14-testing-and-provider-conformance.md
│  └─ 15-plusone-migration.md
├─ planning
│  └─ 16-roadmap-and-open-questions.md
└─ decisions
   ├─ ADR-0001-connectfx-is-an-embedded-effect-native-connection-framework.md
   ├─ ADR-0002-connections-are-not-authentication-accounts.md
   ├─ ADR-0003-provider-kits-own-provider-semantics.md
   ├─ ADR-0004-consumers-own-authentication-and-product-authorization.md
   ├─ ADR-0005-managed-resources-are-an-optional-capability.md
   ├─ ADR-0006-runtime-owns-durable-operations.md
   └─ ADR-0007-microsoft-is-the-first-deep-provider.md
```

## Canonical entry points

| Need                                    | Read                                                        |
| --------------------------------------- | ----------------------------------------------------------- |
| Why ConnectFX exists                    | `docs/spec/01-product-intent.md`                            |
| Domain language                         | `CONTEXT.md`, `docs/spec/02-vocabulary-and-domain-model.md` |
| Reliability and security requirements   | `docs/spec/03-non-functional-requirements.md`               |
| Connection identity and lifecycle       | `docs/spec/04-connections-and-subjects.md`                  |
| Provider extension boundary             | `docs/spec/05-providers-and-provider-kits.md`               |
| Token, key, and grant handling          | `docs/spec/06-credentials-and-grants.md`                    |
| OAuth, admin consent, and installations | `docs/spec/07-authorization-flows-and-installations.md`     |
| Health and background maintenance       | `docs/spec/08-health-refresh-and-revocation.md`             |
| Provider events                         | `docs/spec/09-event-subscriptions-and-ingress.md`           |
| Provisioning and drift repair           | `docs/spec/10-managed-resources-and-reconciliation.md`      |
| Durable execution                       | `docs/spec/11-durable-operations.md`                        |
| Microsoft package                       | `docs/spec/12-microsoft-provider.md`                        |
| Public Effect SDK                       | `docs/spec/13-sdk-and-layer-composition.md`                 |
| Provider conformance                    | `docs/spec/14-testing-and-provider-conformance.md`          |
| Extracting from Plus-One                | `docs/spec/15-plusone-migration.md`                         |
| Planned expansion                       | `docs/spec/16-roadmap-and-open-questions.md`                |

## Non-negotiable decisions

1. ConnectFX is embedded-first and Effect-native.
2. A Connection is a durable operational relationship, not an OAuth account or Credential.
3. Core is provider-neutral; Provider kits own provider semantics.
4. Consumers authenticate and authorize Subjects before invoking ConnectFX.
5. Credentials are encrypted or vault-referenced and have explicit rotation and revocation lifecycle.
6. Connection health includes grants, scopes, installations, subscriptions, and capabilities, not only token validity.
7. Event ingress verifies, deduplicates, records, and acknowledges before durable work.
8. Managed resources and reconciliation are optional capabilities over Connections.
9. The runtime owns durable operation state; Provider kits do not persist private orchestration engines.
10. Microsoft is the first deep provider but does not define core ontology.
11. Relay owns communication and BatonFX owns agent execution.
12. Every behavior-bearing service and Provider kit exposes deterministic test layers.

## Spec maintenance rules

- Update the owning feature document before changing behavior.
- Add an ADR when changing a stable decision.
- Update `CONTEXT.md` before introducing or renaming domain terms.
- Keep this file an index; detailed requirements belong in feature documents.
