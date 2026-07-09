import { Option } from "effect"
import type { Html } from "foldkit/html"
import { html } from "foldkit/html"

import {
  codeBlock,
  codeBlockContent,
  codeBlockCopyButton,
  codeBlockHeader,
  codeBlockTitle,
} from "@/components/ui/code-block"

import { ClickedCopyCode, type Message } from "../app/message"
import type { Model } from "../app/model"
import { betaBadge, mark } from "../layout/brand"
import { check, github } from "../layout/icon"
import { githubUrl } from "../layout/shell"

const h = html<Message>()
const install = "bun add @connectfx/core effect"

const heading = (text: string): Html =>
  h.h2([h.Class("text-3xl font-light tracking-tight text-gray-900 md:text-4xl dark:text-white")], [text])

const installBlock = (model: Model): Html =>
  codeBlock({ language: "bash", class: "rounded-lg" }, [
    codeBlockHeader({}, [
      codeBlockTitle({}, ["Install"]),
      codeBlockCopyButton({
        isCopied: Option.contains(model.copiedCode, install),
        onCopied: ClickedCopyCode({ source: install }),
      }),
    ]),
    codeBlockContent({ code: install, language: "bash" }),
  ])

const checkItem = (text: string): Html =>
  h.li(
    [h.Class("flex items-start gap-3")],
    [check("mt-1 size-4 text-accent-600"), h.span([h.Class("text-gray-700 dark:text-gray-300")], [text])],
  )

const hero = (model: Model): Html =>
  h.section(
    [h.Class("landing-section")],
    [
      h.div(
        [h.Class("landing-section-narrow")],
        [
          h.div(
            [h.Class("flex flex-wrap items-center gap-4")],
            [
              mark("size-12 md:size-14"),
              h.h1(
                [h.Class("text-5xl font-light tracking-tight text-gray-900 md:text-7xl dark:text-white")],
                ["Connectfx"],
              ),
              betaBadge("px-2 py-1 text-xs"),
            ],
          ),
          h.p(
            [h.Class("mt-6 max-w-4xl text-2xl font-light text-gray-900 md:text-3xl dark:text-white")],
            ["Durable external-system Connections for Effect applications."],
          ),
          h.p(
            [h.Class("mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400")],
            [
              "Credentials expire. Grants drift. Subscriptions lapse. Provider resources converge slowly. Connectfx gives those operational relationships durable identity, typed lifecycles, provider kits, health, and test seams.",
            ],
          ),
          h.div([h.Class("mt-8 max-w-xl")], [installBlock(model)]),
          h.div(
            [h.Class("mt-8 flex flex-wrap gap-3")],
            [
              h.a([h.Href("/docs/start/quickstart"), h.Class("cta-primary")], ["Get started"]),
              h.a(
                [h.Href("/docs/learn/connections-and-subjects"), h.Class("cta-secondary")],
                ["Read the Connection model"],
              ),
            ],
          ),
        ],
      ),
    ],
  )

const pillars = (): Html => {
  const cards: ReadonlyArray<readonly [string, string]> = [
    ["Durable relationship", "Stable identity and lifecycle around a Subject and Provider account or tenant."],
    ["Operational access", "Credentials, Grants, installations, capabilities, and health remain explicit."],
    ["Provider-owned semantics", "One deep kit owns protocols, clients, webhooks, scopes, errors, and quirks."],
  ]
  return h.section(
    [h.Class("landing-section")],
    [
      h.div(
        [h.Class("landing-section-narrow")],
        [
          heading("A Connection is more than a token."),
          h.div(
            [h.Class("mt-10 grid gap-4 md:grid-cols-3")],
            cards.map(([title, body]) =>
              h.div(
                [h.Class("rounded-lg border border-gray-300 bg-cream/60 p-6 dark:border-gray-700 dark:bg-gray-850")],
                [
                  h.h3([h.Class("text-lg font-medium")], [title]),
                  h.p([h.Class("mt-2 text-gray-600 dark:text-gray-400")], [body]),
                ],
              ),
            ),
          ),
        ],
      ),
    ],
  )
}

const failureModes = (): Html =>
  h.section(
    [h.Class("landing-section")],
    [
      h.div(
        [h.Class("landing-section-narrow")],
        [
          heading("Built for the failure modes integrations actually have."),
          h.ul(
            [h.Class("mt-8 space-y-4 text-lg")],
            [
              checkItem("Coordinated Credential refresh and revocation"),
              checkItem("Health that checks Grants, installations, subscriptions, and capabilities"),
              checkItem("Verified, deduplicated ingress before durable processing"),
              checkItem("Optional desired-state reconciliation for provider resources"),
            ],
          ),
        ],
      ),
    ],
  )

const boundaries = (): Html =>
  h.section(
    [h.Class("landing-section")],
    [
      h.div(
        [h.Class("landing-section-narrow grid gap-10 md:grid-cols-2")],
        [
          h.div(
            [],
            [
              heading("Connectfx operates."),
              h.p(
                [h.Class("mt-4 text-gray-600 dark:text-gray-400")],
                ["It manages durable access to external systems through provider kits and host-owned infrastructure."],
              ),
            ],
          ),
          h.div(
            [],
            [
              heading("Your product authorizes."),
              h.p(
                [h.Class("mt-4 text-gray-600 dark:text-gray-400")],
                [
                  "The host authenticates callers, decides which Subject may act, owns tenancy, and chooses deployment topology.",
                ],
              ),
            ],
          ),
        ],
      ),
    ],
  )

const finalCta = (model: Model): Html =>
  h.section(
    [h.Class("landing-section")],
    [
      h.div(
        [h.Class("landing-section-narrow")],
        [
          heading("Start with the Connection contract."),
          h.div([h.Class("mt-8 max-w-xl")], [installBlock(model)]),
          h.div(
            [h.Class("mt-8 flex flex-wrap gap-3")],
            [
              h.a([h.Href("/docs/start/quickstart"), h.Class("cta-primary")], ["Read the quickstart"]),
              h.a(
                [h.Href(githubUrl), h.Target("_blank"), h.Rel("noreferrer"), h.Class("cta-secondary")],
                [github("size-4"), "View on GitHub"],
              ),
            ],
          ),
        ],
      ),
    ],
  )

export const landing = (model: Model): Html =>
  h.main(
    [h.Id("main-content"), h.Class("overflow-x-hidden")],
    [hero(model), pillars(), failureModes(), boundaries(), finalCta(model)],
  )
