# Microsoft Provider

The Microsoft Provider kit is the first deep implementation. It owns Microsoft tenant discovery, authorization and administrator consent, application and service-principal credentials, Graph, Exchange Online, Teams application infrastructure, Azure Bot Service integration, and Graph event subscriptions.

Initial resource and capability slices are:

1. Graph application credential acquisition and authenticated client runtime.
2. Graph subscription ensure and renewal.
3. Exchange shared mailbox, aliases, visibility, FullAccess, SendAs, and optional licensing reconciliation.
4. Microsoft organization installation and service-app admin consent.
5. Entra application, service principal, and credential reconciliation.
6. Azure Bot Service and Teams channel reconciliation.
7. Teams manifest, tenant catalog publication, and user rollout.

Microsoft namespaces remain provider-specific. Core never parses Graph scopes, Microsoft tenant ids, UPNs, Teams manifests, Exchange cmdlets, or Azure resource ids.

The package ships deterministic fixtures and can target the Plus-One `m365-mock` behavior during migration without importing Plus-One code.
