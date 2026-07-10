# Roadmap And Open Questions

## Evidence gates

### Alpha

- Minimal `@connectfx/core`, `@connectfx/microsoft`, and `@connectfx/testing` packages.
- Microsoft credential acquisition/client support and one read-only Graph operation.
- Deterministic tests and a Plus-One adapter over existing persistence and vault.

### Beta

- Durable Graph subscription and inbox path.
- Verified ingress persists and deduplicates a delivery before acknowledgement.
- Effect Workflow and Operation projection responsibilities are proven without duplicate retry state.

### Release candidate

- One concrete shared-mailbox resource converges against provider facts.
- Destructive-change and ambiguous-outcome behavior is proven.
- No universal generic reconciliation API is required.

### v1

- A second, materially different provider validates stable core capability extension points.
- Production, security, package, conformance, and migration gates pass.
- Teams, Entra, Bot breadth, and completion of the entire issue backlog are not prerequisites.

## Later candidates

- Google Workspace provider kit.
- Slack workspace and enterprise installation kit.
- GitHub App installation kit.
- Notion workspace kit.
- Generic API-key provider helper.
- Consumer-facing connection UI adapters.
- Multi-dialect Effect SQL store.

## Open questions and gates

- **Second provider selection — product owner, before v1 planning:** choose a provider materially different from Microsoft and name the core contracts it must test.
- **Connection event persistence — runtime owner, before beta schema freeze:** choose an event log or current-state plus outbox from measured inbox and projection needs.
- **OAuth helper sharing — core owner, after two implementations:** share through an independent standards package only if duplicated standards behavior is demonstrated; ConnectFX never imports AuthFX.

Issue cleanup is planning hygiene, not a release gate. Package additions and broader Microsoft capabilities require evidence from an owning milestone.
