import { bullets, callout, code, codeBlock, definePage, h2, h3, lead, link, p, pills, table } from "../prose"

const planned = callout(
  "warning",
  "Specification-first",
  "Connectfx is pre-release. These pages describe accepted contracts and intended package boundaries. Check repository issues and release notes before treating an API as shipped.",
)

export const introduction = definePage({
  path: "/docs/start/introduction",
  title: "What is Connectfx?",
  navTitle: "Introduction",
  group: "Start",
  description: "An embedded-first framework for durable operational access to external systems.",
  content: [
    lead(
      "Connectfx models a Connection as a durable, authorized relationship between a host Subject and an external Provider account or tenant. Credentials, Grants, health, installations, subscriptions, and optional managed resources evolve around that relationship.",
    ),
    planned,
    h2("why", "Why Connectfx"),
    p(
      "OAuth libraries can acquire tokens, but production integrations also need durable identity, refresh coordination, revocation, grant tracking, health, event ingress, administrator actions, and reconciliation. Connectfx specifies those concerns as Effect services and provider kits.",
    ),
    h2("boundaries", "Framework boundaries"),
    table(
      ["Concern", "Owner"],
      [
        ["Authentication and application Sessions", "Authfx"],
        ["Connections, Credentials, Grants, provider health", "Connectfx"],
        ["Product authorization and tenancy", "Host application"],
        ["Durable communication", "Relayfx"],
        ["Agent execution", "Batonfx"],
      ],
    ),
    h2("first-provider", "Microsoft first, provider-neutral core"),
    p(
      "The first deep provider kit targets Microsoft Graph, Exchange, Entra, Teams, and Azure Bot Service. Microsoft concepts stay inside the provider package unless another provider proves a shared abstraction.",
    ),
  ],
})

export const installation = definePage({
  path: "/docs/start/installation",
  title: "Installation",
  navTitle: "Installation",
  group: "Start",
  description:
    "Add provider-neutral core and opt into provider, persistence, ingress, and reconciliation packages as needed.",
  content: [
    planned,
    codeBlock({ label: "Planned package installation", language: "bash", source: "bun add @connectfx/core effect" }),
    h2("optional-packages", "Optional packages"),
    bullets(
      "Provider kits such as Microsoft",
      "Effect SQL store implementations",
      "Durable Workflow runtime",
      "Event ingress adapters",
      "Managed-resource reconcilers",
      "Deterministic provider fixtures",
    ),
    h2("repository", "Verify the repository"),
    codeBlock({
      label: "Local gates",
      language: "bash",
      source:
        "bun install --frozen-lockfile\nbun run format:check\nbun run lint\nbun run typecheck\nbun run test\nbun run build",
    }),
  ],
})

export const quickstart = definePage({
  path: "/docs/start/quickstart",
  title: "Quickstart",
  navTitle: "Quickstart",
  group: "Start",
  description: "See the intended composition for creating and operating a provider Connection.",
  content: [
    planned,
    h2("compose", "Compose the provider and stores"),
    codeBlock({
      label: "Planned layer graph",
      source: `import { Layer } from "effect"
import { Connections } from "@connectfx/core"
import { Microsoft } from "@connectfx/microsoft"

const ConnectLive = Connections.layer.pipe(
  Layer.provide(Microsoft.layer),
  Layer.provide(ConnectionStoreLive),
  Layer.provide(CredentialVaultLive),
  Layer.provide(GrantStoreLive),
  Layer.provide(OperationRuntimeLive),
)
`,
    }),
    h2("lifecycle", "Connection lifecycle"),
    bullets(
      "The host authorizes a Subject before invoking Connectfx",
      "Begin provider authorization or administrator action",
      "Acquire and vault Credentials",
      "Record Grants and installations",
      "Assess Connection health",
      "Refresh, revoke, subscribe, and reconcile through durable operations",
    ),
  ],
})

export const connectionModel = definePage({
  path: "/docs/learn/connections-and-subjects",
  title: "Connections and Subjects",
  navTitle: "Connections and Subjects",
  group: "Learn",
  description: "A Connection is a lifecycle object, not an OAuth account or token row.",
  content: [
    h2("subject", "Subject"),
    p(
      "A Subject is an opaque host entity assigned to a Connection. Connectfx does not interpret whether it represents a person, organization, application, or service.",
    ),
    h2("connection", "Connection"),
    p(
      "A Connection is the durable operational relationship between that Subject and a Provider account or Provider tenant.",
    ),
    h2("identity", "Durable identity"),
    bullets(
      "Stable Connection ID",
      "Provider key",
      "Provider tenant and account references",
      "Lifecycle state",
      "Required capabilities",
      "Health summary",
      "Created and updated metadata",
    ),
    callout(
      "info",
      "Not authentication",
      "Connectfx never authenticates callers. The host proves and authorizes the Subject before calling Connection operations.",
    ),
  ],
})

export const credentials = definePage({
  path: "/docs/learn/credentials-and-grants",
  title: "Credentials and Grants",
  navTitle: "Credentials and Grants",
  group: "Learn",
  description: "Secrets exercise a Connection; Grants explain what the provider or administrator permits.",
  content: [
    h2("credential", "Credential"),
    p(
      "A Credential is secret or signed material used to exercise a Connection: OAuth tokens, API keys, service accounts, application secrets, certificates, or installation tokens.",
    ),
    h2("profile", "Credential profile"),
    p(
      "The profile stores lifecycle metadata and a vault reference rather than leaking usable secret material into ordinary records.",
    ),
    pills(["Kind", "Scopes", "Subject", "Expires at", "Rotation", "Vault reference", "Connection usage"]),
    h2("grant", "Grant"),
    p("A Grant is a provider or administrator authorization fact. It is not a host product role or permission."),
    callout(
      "info",
      "Vault boundary",
      "Operational Credentials are encrypted or referenced through a host-supplied vault. Stores and logs must not contain usable secrets.",
    ),
  ],
})

export const health = definePage({
  path: "/docs/learn/health-and-revocation",
  title: "Health, refresh, and revocation",
  navTitle: "Health and revocation",
  group: "Learn",
  description: "Connection health includes every dependency required to exercise declared capabilities.",
  content: [
    h2("health", "Health is broader than token validity"),
    bullets(
      "Credential acquisition",
      "Required scope and Grant coverage",
      "Installation presence",
      "Subscription status",
      "Provider capability checks",
      "Managed-resource convergence where enabled",
    ),
    h2("refresh", "Proactive refresh"),
    p(
      "Refresh is coordinated as a durable operation so concurrent callers do not rotate the same Credential independently.",
    ),
    h2("revocation", "Revocation"),
    p(
      "Revocation stops new operations, invalidates or removes Credentials where possible, tears down provider registrations as specified, and records observable lifecycle transitions.",
    ),
  ],
})

export const providerKit = definePage({
  path: "/docs/learn/provider-kits",
  title: "Provider kits",
  navTitle: "Provider kits",
  group: "Learn",
  description: "One deep package owns the protocols, clients, errors, and quirks of a Provider.",
  content: [
    h2("owns", "What a Provider kit owns"),
    bullets(
      "Authorization and consent",
      "Credential acquisition and refresh",
      "Provider clients",
      "Scope and Grant semantics",
      "Webhook verification",
      "Installation discovery",
      "Provider-specific errors",
      "Eventual-consistency and idempotency behavior",
    ),
    h2("core", "What core owns"),
    p(
      "Core owns provider-neutral Connection identity, lifecycle contracts, stores, durable operation interfaces, health composition, and conformance expectations.",
    ),
    h2("conformance", "Conformance"),
    p(
      "Every Provider kit must satisfy shared contract tests and ship deterministic fixtures for provider responses, failures, retries, and ingress verification.",
    ),
  ],
})

export const composeLayers = definePage({
  path: "/docs/guides/compose-layers",
  title: "Compose Connectfx layers",
  navTitle: "Compose layers",
  group: "Guides",
  description: "Keep provider semantics, durable operations, stores, and host policy independently replaceable.",
  content: [
    planned,
    codeBlock({
      label: "Production graph",
      source: `const ProductionConnections = Connections.layer.pipe(
  Layer.provide(Microsoft.layer),
  Layer.provide(PostgresStores.layer),
  Layer.provide(EncryptedCredentialVault.layer),
  Layer.provide(WorkflowRuntime.layer),
  Layer.provide(VerifiedIngress.layer),
)
`,
    }),
    h2("tests", "Test graph"),
    p(
      "Swap the provider client, clock, vault, stores, workflow runtime, and ingress verifier for deterministic layers while preserving the same Connection services.",
    ),
    codeBlock({
      label: "Test graph",
      source: `const TestConnections = Connections.testLayer.pipe(
  Layer.provide(MicrosoftTestKit.layer),
)`,
    }),
  ],
})

export const microsoft = definePage({
  path: "/docs/guides/microsoft",
  title: "Microsoft provider",
  navTitle: "Microsoft provider",
  group: "Guides",
  description: "Operate Microsoft Graph, Exchange, Entra, Teams, and Bot resources through one provider kit.",
  content: [
    planned,
    h2("surfaces", "Initial surfaces"),
    pills(["Microsoft Graph", "Exchange", "Entra", "Teams", "Azure Bot Service"]),
    h2("credentials", "Credential modes"),
    bullets(
      "Delegated user authorization",
      "Organization administrator consent",
      "Application Credentials",
      "Certificates or secrets through the vault boundary",
    ),
    h2("provider-specific", "Provider-specific concepts stay provider-specific"),
    p(
      "Shared mailboxes, Entra applications, Teams application packages, and Azure Bot resources are Microsoft managed resources. They do not become generic core types.",
    ),
    h2("durability", "Durable operations"),
    p(
      "Consent waits, eventual consistency, subscription renewal, mailbox readiness, and infrastructure convergence are coordinated through the operation runtime defined by Connectfx.",
    ),
  ],
})

export const subscriptions = definePage({
  path: "/docs/guides/event-subscriptions",
  title: "Event subscriptions",
  navTitle: "Event subscriptions",
  group: "Guides",
  description: "Verify, deduplicate, record, and acknowledge provider events before durable processing.",
  content: [
    planned,
    h2("registration", "Provider registration"),
    p(
      "An Event subscription records provider resource, change types, callback ownership, expiry, renewal state, and the Connection that authorizes it.",
    ),
    h2("ingress", "Ingress sequence"),
    bullets(
      "Verify provider authenticity",
      "Parse and Schema-decode the event",
      "Deduplicate by provider delivery identity",
      "Record durable ingress state",
      "Acknowledge within the provider deadline",
      "Process asynchronously through the operation runtime",
    ),
    callout(
      "info",
      "Consumer-owned endpoint",
      "Connectfx supplies verification and processing contracts. The host owns public routing, authentication around management APIs, and deployment topology.",
    ),
  ],
})

export const reconciliation = definePage({
  path: "/docs/guides/reconciliation",
  title: "Managed-resource reconciliation",
  navTitle: "Reconciliation",
  group: "Guides",
  description: "Converge optional provider resources without making every Connection a provisioning system.",
  content: [
    planned,
    h2("optional", "Managed resources are optional"),
    p(
      "Simple Connections do not require desired-state reconciliation. Provider kits add managed-resource types only where the product needs to own provider-side objects.",
    ),
    h2("loop", "Reconciliation loop"),
    bullets(
      "Load desired state",
      "Observe provider state",
      "Plan idempotent changes",
      "Apply with retry policy",
      "Wait through provider eventual consistency",
      "Verify convergence",
      "Record drift and administrator actions",
    ),
    h3("examples", "Microsoft examples"),
    pills(["Shared mailbox", "Entra application", "Teams application", "Azure Bot resource"]),
  ],
})

export const vocabulary = definePage({
  path: "/docs/reference/vocabulary",
  title: "Vocabulary",
  navTitle: "Vocabulary",
  group: "Reference",
  description: "Canonical names for Connectfx lifecycle and provider boundaries.",
  content: [
    table(
      ["Term", "Meaning"],
      [
        [code("Subject"), "Opaque host entity assigned to a Connection"],
        [code("Connection"), "Durable relationship between Subject and Provider account or tenant"],
        [code("Provider kit"), "Deep provider package owning protocols, clients, and quirks"],
        [code("Credential"), "Secret or signed material used to exercise a Connection"],
        [code("Grant"), "Provider or administrator authorization fact"],
        [code("Installation"), "Provider-side application or service presence"],
        [code("Event subscription"), "Provider registration requesting change delivery"],
        [code("Managed resource"), "Provider object reconciled toward desired state"],
      ],
    ),
    h2("avoid", "Terms to avoid"),
    p(
      "Do not call a Connection an OAuth account, a Credential a Connection, a Subject a tenant, or a Grant a product permission. Those substitutions collapse distinct lifecycle responsibilities.",
    ),
  ],
})

export const packageReference = definePage({
  path: "/docs/reference/packages",
  title: "Package map",
  navTitle: "Packages",
  group: "Reference",
  description: "Intended package boundaries for core, providers, persistence, runtime, ingress, and tests.",
  content: [
    planned,
    table(
      ["Package", "Responsibility"],
      [
        [code("@connectfx/core"), "Provider-neutral schemas, services, stores, and lifecycle contracts"],
        [code("@connectfx/microsoft"), "Microsoft authorization, clients, health, subscriptions, and resources"],
        [code("@connectfx/sql"), "Effect SQL store implementations"],
        [code("@connectfx/runtime"), "Durable operation and Workflow composition"],
        [code("@connectfx/test"), "Provider fixtures, conformance suites, and test layers"],
      ],
    ),
    h2("status", "Implementation status"),
    p(
      "Only packages present in the repository and listed in release notes should be considered available. Follow ",
      link("https://github.com/In-Time-Tec/connectfx/issues", "the implementation backlog"),
      " for delivery order.",
    ),
  ],
})

export const invariants = definePage({
  path: "/docs/reference/invariants",
  title: "Operational invariants",
  navTitle: "Operational invariants",
  group: "Reference",
  description: "Rules every Connectfx package, Provider kit, and durable operation must preserve.",
  content: [
    h2("core", "Core invariants"),
    bullets(
      "Connections are durable lifecycle objects, not Credential aliases",
      "Connectfx never authenticates callers or decides host authorization",
      "Core contains no provider-specific branches",
      "Provider kits own protocol and scope semantics",
      "Credentials remain encrypted or vault-referenced",
      "Provider mutations declare idempotency and eventual-consistency behavior",
      "Event ingress verifies and records before durable processing",
      "Every behavior-bearing service has a test or memory layer",
    ),
    h2("change", "Change control"),
    p(
      "New durable concepts require a feature document. Stable decisions require an ADR before implementation changes the contract.",
    ),
  ],
})
