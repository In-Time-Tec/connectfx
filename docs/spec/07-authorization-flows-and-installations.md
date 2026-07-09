# Authorization Flows And Installations

Authorization flows acquire or verify Provider Grants and Credentials for a pending Connection. Flows may be interactive OAuth, administrator consent, API-key entry, service-account setup, app installation, or provider-specific manual verification.

Each flow has expiring single-use state, exact redirect or callback intent, provider-specific challenge data, and an idempotent completion key. Completion attaches provider identities, Grants, Credential profiles, and optional Installations before activating the Connection.

Administrator consent is first-class. A flow may suspend with an Administrator action that includes structured instructions and a resumable verification condition. Administrator action is not a generic provider failure.

Installations have stable local ids, provider external ids, status, observed metadata, and revocation state. Provider kits define installation semantics.
