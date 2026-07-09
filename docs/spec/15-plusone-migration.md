# Plus-One Migration

Plus-One is the first consumer and extraction source, not the ConnectFX domain model.

The extraction order is:

1. Move provider connection OAuth and operational token custody from Better Auth into ConnectFX, using one vault.
2. Extract Graph subscription ensure and renewal.
3. Extract shared mailbox reconciliation, including delegates and aliases.
4. Extract Microsoft organization installation and administrator consent.
5. Extract Entra, Azure Bot Service, Teams catalog, and rollout resources.
6. Replace legacy profile-owned external resources with Plus-One-owned bindings from `AgentId` to ConnectFX Connection and Managed resource ids.
7. Adapt Teams, mail, and Slack communication paths to Relay separately.

ConnectFX must not import Plus-One Tenant, Member, Agent, Mandate, Authority, Principal, Sponsor, profile, owner, or onboarding vocabulary. Plus-One authorizes Subjects, maps resources to Agents, and projects Connection state into product UI.

Migration preserves current provider behavior before introducing generalized abstractions. Temporary compatibility adapters remain in Plus-One.
