# Plus-One Migration

Plus-One is the first consumer and extraction source, not the ConnectFX domain model.

Adapt existing Plus-One tables and vault behind ConnectFX ports before considering a physical schema migration. During every stage exactly one active owner refreshes each credential, renews each subscription, and reconciles each resource; dual schedulers are forbidden. Migrate one capability at a time and preserve provider behavior.

The extraction order is:

1. Place a Plus-One adapter over existing persistence and vault, then prove Microsoft application credentials, one read-only Graph operation, and test substitution.
2. Transfer Graph subscription and durable inbox ownership, persisting deliveries before acknowledgement.
3. Transfer shared mailbox reconciliation, including delegates and aliases.
4. Evaluate physical schema migration only after the ports and ownership boundary are proven.
5. Extract organization consent, Entra, Bot, or Teams capabilities independently when product evidence requires them.

ConnectFX must not import Plus-One Tenant, Member, Agent, Mandate, Authority, Principal, Sponsor, profile, owner, or onboarding vocabulary. Plus-One authorizes Subjects, maps resources to Agents, and projects Connection state into product UI.

Migration preserves current provider behavior before introducing generalized abstractions. Temporary compatibility adapters remain in Plus-One. Product and agent workflow sequencing migrates to Relay separately from provider-local convergence.
