# SDK And Layer Composition

The public API is Effect-native. Consumers compose Connection stores, Provider registry, Provider kits, vault, authorization flows, health, operations, event subscriptions, and managed resources through layers.

The initial package graph is deliberately small:

```text
@connectfx/core
  <- @connectfx/microsoft
  <- @connectfx/testing
```

Core exposes schemas, services, capability contracts, errors, and plain configuration values and depends only on Effect. Microsoft depends on core, never on runtime. Capability-specific registrations and layers replace a universal optional ProviderKit interface. Add `@connectfx/store-sql`, `@connectfx/runtime`, or `@connectfx/http` only when an implemented slice proves the need; runtime consumes provider-neutral capability contracts. Core imports none of them.

One-shot operations return `Effect`; event and progress feeds return `Stream`; configuration uses `Config`; secrets use `Redacted`; credential leases use `Scope`; retries use `Schedule`.

The initial published surface is expected to use `@connectfx/*`. Publishing remains deferred until contracts are implemented and conformance-tested.
