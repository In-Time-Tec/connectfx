# Testing And Provider Conformance

Tests are organized by contract:

- schemas and codecs;
- Connection lifecycle;
- Credential vault and lease behavior;
- Grant and scope handling;
- authorization flow replay and expiry;
- proactive refresh and revocation;
- health classification;
- event subscription convergence and ingress verification;
- managed-resource plan, apply, and verify;
- durable Operation crash and replay;
- store concurrency and isolation.

Every Provider kit runs a shared conformance suite for registration, identity discovery, credential acquisition, typed errors, retry classification, idempotent replay, revocation, and test-layer substitution. Capabilities add their own conformance suites.

Managed resources prove `inspect -> plan -> apply -> inspect -> converged`, including ambiguous provider outcomes and eventual consistency.

No default test requires live provider credentials. Live Microsoft tests are opt-in against an isolated tenant.
