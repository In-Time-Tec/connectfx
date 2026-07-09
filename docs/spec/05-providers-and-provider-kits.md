# Providers And Provider Kits

Core defines provider identity, registration, capability metadata, normalized errors, and the interfaces required by Connection services. A Provider kit is the only package allowed to know provider endpoints, object ids, scopes, token formats, webhook signatures, pagination, throttling, and resource schemas.

A kit may contribute:

- authorization and consent flows;
- credential acquisition and refresh;
- authenticated client layers;
- provider identity and tenant discovery;
- health checks;
- event subscription definitions and verification;
- managed-resource definitions;
- provider-specific test fixtures.

Provider registration is explicit at layer composition. Missing registrations fail typed. Core never enumerates known provider ids.

Provider errors normalize authentication, authorization, rate limiting, conflict, not found, unavailable, invalid response, and unsupported capability while retaining opaque provider detail for observability.
