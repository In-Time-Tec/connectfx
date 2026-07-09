# Product Intent

ConnectFX gives Effect applications an embedded connection control plane for external systems without requiring a hosted integration platform or scattering provider clients, tokens, webhooks, and provisioning logic across the product.

The framework owns Connections, Provider kits, Credentials, Grants, installations, health, event subscriptions, revocation, and optional managed-resource reconciliation. Consumers own authentication, product authorization, product tenancy, user experience, deployment, and provider-resource associations to product entities.

The first deep provider is Microsoft because Plus-One has proven the need across Entra, Graph, Exchange, Teams, Azure Bot Service, organization consent, and expiring subscriptions. The architecture must still support simple OAuth and API-key Connections without adopting the Microsoft provisioning runtime.
