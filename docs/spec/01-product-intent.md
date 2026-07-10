# Product Intent

ConnectFX helps teams safely connect their product to external systems and keep those Connections working over time. It gives Effect applications an embedded connection control plane without requiring a hosted platform or scattering provider clients, credentials, webhooks, and provisioning logic across the product.

The framework owns Connections, Provider kits, Credentials, Grants, installations, health, event subscriptions, revocation, and optional managed-resource reconciliation. Consumers own authentication, product authorization, product tenancy, user experience, deployment, and provider-resource associations to product entities.

Use ConnectFX when provider access persists and involves credentials, consent, installations, refresh, webhooks, subscriptions, health, or recovery. It is not for every HTTP API and is not an ORM, ETL engine, general workflow engine, general IaC system, or agent tool catalog.

AuthFX authenticates people. The consumer, including Plus-One, authorizes product actions. ConnectFX owns provider-local Connection and resource convergence. Relay sequences product intent across systems and may wait on a black-box OperationId. BatonFX owns agent execution; FoldKit and FoldCN own UI. ConnectFX imports none of them.

The first deep provider is Microsoft because Plus-One has proven the need across Entra, Graph, Exchange, Teams, Azure Bot Service, organization consent, and expiring subscriptions. The architecture must still support simple OAuth and API-key Connections without adopting the Microsoft provisioning runtime.
