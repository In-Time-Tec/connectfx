# Roadmap And Open Questions

## Initial implementation sequence

1. Core Connection, Subject, Provider, Credential profile, Grant, and health schemas.
2. Memory stores, vault, and provider conformance harness.
3. Provider registry and Connection lifecycle services.
4. Authorization transaction and credential lifecycle services.
5. Microsoft Graph client and application credential slice.
6. Graph event subscription lifecycle.
7. Durable runtime and SQL store.
8. Shared mailbox managed resource.
9. Organization consent and installation.
10. Teams and bot infrastructure.
11. Plus-One migration and end-to-end verification.

## Later candidates

- Google Workspace provider kit.
- Slack workspace and enterprise installation kit.
- GitHub App installation kit.
- Notion workspace kit.
- Generic API-key provider helper.
- Consumer-facing connection UI adapters.
- Multi-dialect Effect SQL store.

## Open questions

- Whether simple authorization flows live in core or a separate runtime package.
- Whether Connection events use an explicit event log or current-state rows plus outbox.
- Which second provider should validate Provider kit and Grant abstractions.
- Which Microsoft resource slice first requires destructive-change approval.
- Whether low-level OAuth standards helpers should be shared with AuthFX through an independent standards package or duplicated behind each domain contract.
