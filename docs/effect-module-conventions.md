# Effect Module Conventions

ConnectFX modules expose intentional namespaces from package entrypoints. Behavior-bearing modules export an `Interface`, a `Context.Service`, and explicit production and test layers. Errors crossing service boundaries use `Schema.TaggedErrorClass`.

```ts
import { Context, Effect, Layer, Schema } from "effect"

export class ConnectionFailed extends Schema.TaggedErrorClass<ConnectionFailed>()("ConnectFX/ConnectionFailed", {
  operation: Schema.String,
  detail: Schema.String,
}) {}

export interface Interface {
  readonly inspect: (input: unknown) => Effect.Effect<unknown, ConnectionFailed>
}

export class Service extends Context.Service<Service, Interface>()("@connectfx/core/Example.Service") {}

export const testLayer = (implementation: Interface) => Layer.succeed(Service, implementation)
```

## Rules

- Use named Effect functions for service methods, workflows, and provider operations.
- Bind services to named variables inside `Effect.gen` before invoking methods.
- Use `Config` and `Redacted` for secret configuration.
- Use Effect `Clock`, randomness, HTTP, cryptography, streams, queues, scopes, schedules, SQL, and workflows instead of raw platform APIs where available.
- Do not use terminal Effect runners inside domain packages.
- Provider adapters translate provider values at the edge and do not leak them into core schemas.
- Test time through `TestClock`; do not wait on real timers.
