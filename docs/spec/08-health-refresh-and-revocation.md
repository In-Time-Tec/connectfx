# Health, Refresh, And Revocation

Connection health evaluates the complete operational relationship:

- credential presence and expiration;
- refresh success;
- grant and scope validity;
- provider tenant and account existence;
- installation status;
- required event subscriptions;
- required capability probes;
- managed-resource drift when enabled.

Health results are typed as healthy, degraded, failing, reauthorization required, administrator action required, or revoked and include remediation metadata.

Credential refresh runs proactively before expiry and also on demand. Refresh uses per-provider schedules, bounded concurrency, rate-limit awareness, and terminal failure classification.

Revocation marks canonical state first, prevents new credential leases, invokes provider revocation where supported, cascades through subscriptions and managed resources according to policy, destroys secret material, and records partial failures for repair.
