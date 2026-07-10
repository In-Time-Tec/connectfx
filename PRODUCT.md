# ConnectFX Product Intent

## The short version

ConnectFX helps teams safely connect their product to external systems and keep those Connections working over time. Better Auth/AuthFX connects people to the product; ConnectFX connects the product to external systems.

## Why it exists

Product integrations repeatedly rebuild authorization flows, token custody, service accounts, application installations, provider clients, refresh and rotation, health checks, webhook registrations, revocation, and provider-specific setup. Hosted integration platforms solve some of this by moving the control plane outside the application. ConnectFX keeps it in the consumer's Effect application and persistence.

The closest product analogue is Nango. ConnectFX differs by being embedded-first, Effect-native, infrastructure-owning, and deeper on health, durable provider operations, and resource convergence.

## Boundary rules

- ConnectFX owns operational access to external systems. It does not authenticate users into the host application; AuthFX owns that domain.
- ConnectFX does not own product authorization. Consumers decide which authenticated subject may create, use, modify, or revoke a Connection.
- Provider kits own provider protocols and resource models. Core stays provider-neutral.
- Managed-resource provisioning is an optional capability, not the definition of every Connection.
- ConnectFX owns convergence of one Connection or provider resource against provider facts. Relay owns sequencing product intent across Connections, resources, agents, communications, and human decisions. Relay may wait on a black-box ConnectFX OperationId; it does not mirror internal steps.
- BatonFX owns agent execution. FoldKit and FoldCN own UI. ConnectFX imports none of these frameworks.

## Scope test

Use ConnectFX when access persists and carries lifecycle concerns such as credentials, consent, installations, refresh, webhooks, subscriptions, health, or recovery. A stateless HTTP API call does not qualify by itself. ConnectFX is not an ORM, ETL engine, workflow engine, general IaC system, or agent tool catalog.

## Designed to grow

Provider kits preserve provider semantics. Core standardizes lifecycle, credential custody, identity, health, errors, events, and durable-operation boundaries. Microsoft is the first deep provider; a materially different second provider must validate stable extension points before v1.

## Where it is today

The repository contains the charter, vocabulary, specifications, ADRs, toolchain, and implementation backlog. Runtime behavior has not been implemented.
