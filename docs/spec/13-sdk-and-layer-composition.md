# SDK And Layer Composition

The public API is Effect-native. Consumers compose Connection stores, Provider registry, Provider kits, vault, authorization flows, health, operations, event subscriptions, and managed resources through layers.

The intended package graph is:

```text
@connectfx/core
  <- @connectfx/store-sql
  <- @connectfx/runtime
  <- @connectfx/http
  <- @connectfx/microsoft
  <- @connectfx/testing
```

Core exposes schemas, services, errors, and plain configuration values. Runtime owns durable operations. Provider packages depend inward on core and optional runtime contracts. Core imports none of them.

One-shot operations return `Effect`; event and progress feeds return `Stream`; configuration uses `Config`; secrets use `Redacted`; credential leases use `Scope`; retries use `Schedule`.

The initial published surface is expected to use `@connectfx/*`. Publishing remains deferred until contracts are implemented and conformance-tested.
