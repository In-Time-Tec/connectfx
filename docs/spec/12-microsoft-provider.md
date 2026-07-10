# Microsoft Provider

The Microsoft Provider kit is the first deep implementation. It owns Microsoft tenant discovery, authorization and administrator consent, application and service-principal credentials, Graph, Exchange Online, Teams application infrastructure, Azure Bot Service integration, and Graph event subscriptions.

Evidence-gated capability slices are:

1. Graph application credential acquisition and authenticated client runtime.
2. Graph subscription ensure and renewal.
3. Exchange shared mailbox, aliases, visibility, FullAccess, SendAs, and optional licensing reconciliation.
4. Later, when product evidence requires them: Microsoft organization installation and service-app admin consent; Entra application and service-principal reconciliation; Azure Bot Service; and Teams infrastructure.

Only the first slice is required for alpha, the second for beta, and the shared-mailbox slice for release candidate. The later breadth is not a v1 prerequisite. A materially different second Provider kit, rather than more Microsoft surface area, validates stable core extension points for v1.

Microsoft namespaces remain provider-specific. Core never parses Graph scopes, Microsoft tenant ids, UPNs, Teams manifests, Exchange cmdlets, or Azure resource ids.

The package ships deterministic fixtures and can target the Plus-One `m365-mock` behavior during migration without importing Plus-One code.
