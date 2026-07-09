# Connections And Subjects

A Connection is a durable lifecycle object identified by `ConnectionId`. It binds one opaque Subject to one Provider and optional Provider tenant or external account identity.

Connection states are `pending`, `authorizing`, `active`, `degraded`, `reauthorization-required`, and `revoked`. State changes are explicit and auditable.

Core operations include create pending Connection, inspect, list by Subject, attach verified provider identity, activate, degrade with remediation, require reauthorization, and revoke.

Subject values contain an opaque type and id selected by the host. Stores filter by Subject at every boundary. ConnectFX never resolves authentication cookies or host membership.

A consumer may associate product entities with a Connection in its own storage. ConnectFX does not include `AgentId`, `MemberId`, product tenant ids, or owner semantics.
