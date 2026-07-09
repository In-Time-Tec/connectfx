# Credentials And Grants

Credential profiles describe operational credentials without exposing secret material. Supported kinds are open and provider-extensible; initial examples include OAuth, API key, client credentials, service account, signed JWT, certificate, bot token, and installation token.

A vault port stores, retrieves, rotates, and destroys encrypted or externally referenced secret material. Core persistence stores only vault references, metadata, expiration, scope, status, and audit fields.

Grants record provider or administrator authorization facts. They are separate from Credentials because credentials may rotate while the grant remains and because one grant may authorize several credentials or capabilities.

Provider scope semantics remain in the Provider kit. Core stores declared and observed provider scope identifiers but does not infer implication such as `ReadWrite` covering `Read`.

Credential leases are scoped resources. Consumers receive `Redacted` material only inside an Effect scope and must not persist it.
