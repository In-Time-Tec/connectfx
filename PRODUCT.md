# ConnectFX Product Intent

## The short version

ConnectFX is the embedded-first, Effect-native connection framework for TypeScript. It turns credentials and provider grants into healthy, durable Connections that applications can use to reach external accounts, workspaces, and organizations.

## Why it exists

Product integrations repeatedly rebuild authorization flows, token custody, service accounts, application installations, provider clients, refresh and rotation, health checks, webhook registrations, revocation, and provider-specific setup. Hosted integration platforms solve some of this by moving the control plane outside the application. ConnectFX keeps it in the consumer's Effect application and persistence.

## Boundary rules

- ConnectFX owns operational access to external systems. It does not authenticate users into the host application; AuthFX owns that domain.
- ConnectFX does not own product authorization. Consumers decide which authenticated subject may create, use, modify, or revoke a Connection.
- Provider kits own provider protocols and resource models. Core stays provider-neutral.
- Managed-resource provisioning is an optional capability, not the definition of every Connection.
- Relay owns durable communication across surfaces. ConnectFX establishes and maintains the provider relationship Relay adapters may use.

## Designed to grow

The target framework supports OAuth grants, API keys, service accounts, application credentials, app installations, proactive refresh, provider clients, webhooks, sync cursors, health, revocation, and declarative managed resources. Microsoft is the first deep provider; Google, Slack, GitHub, Notion, and others validate later abstractions.

## Where it is today

The repository contains the charter, vocabulary, specifications, ADRs, toolchain, and implementation backlog. Runtime behavior has not been implemented.
