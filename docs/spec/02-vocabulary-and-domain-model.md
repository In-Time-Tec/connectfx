# Vocabulary And Domain Model

`CONTEXT.md` is canonical. This document records the relationships between its terms.

```text
Subject
  owns or is assigned
Connection
  targets
Provider + optional Provider tenant
  exercises through
Credential profile -> Credential
  under
Grant
  enabling
Capability
  optionally maintains
Installation, Event subscription, Managed resource
```

A Connection has one stable local identity even when credentials rotate, scopes change, installations are replaced, or provider metadata changes. A Connection may use several Credential profiles and Grants.

An Installation is a provider-side application presence. It may be part of a Connection but is not the Connection itself. An Event subscription and Managed resource likewise have their own provider identity and lifecycle.

Subject identifiers are opaque host values. Core does not define people, organizations, Agents, tenants, or accounts.

A Connection is the primary primitive. It is not a token, login, Session, or authentication account. The host authenticates and authorizes before passing its opaque Subject to ConnectFX.

Provider-specific capabilities preserve Slack, Microsoft, GitHub, AWS, and database semantics. Core standardizes their lifecycle boundaries; it does not erase them into universal resource or operation types.
