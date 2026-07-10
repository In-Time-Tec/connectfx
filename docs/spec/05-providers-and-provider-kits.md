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

Provider registration is explicit at layer composition. Each capability supplies its own focused registration and Layer. There is no giant ProviderKit interface whose optional members grow with every provider. Missing registrations fail typed. Core never enumerates known provider ids.

Provider kits preserve native semantics—including Microsoft, Slack, GitHub, AWS, and database concepts—while core standardizes Connection lifecycle, credential custody, identity, health, errors, events, and durable-operation boundaries. Runtime code consumes provider-neutral capability contracts rather than importing a provider package.

Provider errors normalize authentication, authorization, rate limiting, conflict, not found, unavailable, invalid response, and unsupported capability while retaining opaque provider detail for observability.
