import { Option } from "effect"
import type { Html } from "foldkit/html"
import { html } from "foldkit/html"

import { cn } from "@/lib/utils"

import {
  ChangedActiveSection,
  ClickedMobileTableOfContentsLink,
  ToggledMobileTableOfContents,
  type Message,
} from "../app/message"
import type { TocEntry } from "../prose/node"
import { check, chevronDown } from "./icon"

const h = html<Message>()
const isActive = (entry: TocEntry, active: Option.Option<string>): boolean =>
  Option.exists(active, (id) => id === entry.id)
const entryView = (entry: TocEntry, active: boolean): Html =>
  h.keyed("li")(
    entry.id,
    [h.Class(cn(entry.level === 3 && "ml-3"))],
    [
      h.a(
        [
          h.Href(`#${entry.id}`),
          h.OnClick(ChangedActiveSection({ sectionId: entry.id })),
          ...(active ? [h.AriaCurrent("location")] : []),
          h.Class(
            cn(
              "block transition",
              active
                ? "text-accent-600 underline dark:text-accent-400"
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
            ),
          ),
        ],
        [entry.label],
      ),
    ],
  )
export const tableOfContents = (entries: ReadonlyArray<TocEntry>, active: Option.Option<string>): Html =>
  h.aside(
    [
      h.Class(
        "sticky top-[var(--header-height)] hidden h-[calc(100vh-var(--header-height))] w-56 shrink-0 overflow-y-auto py-10 xl:block",
      ),
    ],
    entries.length === 0
      ? []
      : [
          h.p(
            [h.Class("mb-2 text-xs font-semibold tracking-wider text-gray-900 uppercase dark:text-white")],
            ["On this page"],
          ),
          h.nav(
            [h.AriaLabel("Table of contents")],
            [
              h.ul(
                [h.Class("space-y-2 text-sm")],
                entries.map((entry) => entryView(entry, isActive(entry, active))),
              ),
            ],
          ),
        ],
  )
export const mobileTableOfContents = (
  entries: ReadonlyArray<TocEntry>,
  active: Option.Option<string>,
  isOpen: boolean,
): Html => {
  if (entries.length === 0) return h.empty
  const first = entries[0]
  const label = Option.match(active, {
    onNone: () => first?.label ?? "",
    onSome: (id) => entries.find((entry) => entry.id === id)?.label ?? first?.label ?? "",
  })
  return h.details(
    [
      h.Open(isOpen),
      h.OnToggle((open) => ToggledMobileTableOfContents({ isOpen: open })),
      h.Class(
        "group sticky top-[var(--header-height)] z-30 -mx-4 border-b border-gray-300 bg-cream sm:-mx-6 xl:hidden dark:border-gray-800 dark:bg-gray-900",
      ),
    ],
    [
      h.summary(
        [
          h.Class(
            "flex cursor-pointer list-none items-center justify-between px-4 py-3 sm:px-6 [&::-webkit-details-marker]:hidden",
          ),
        ],
        [
          h.div(
            [h.Class("flex min-w-0 items-center gap-2")],
            [
              h.span(
                [h.Class("shrink-0 text-xs font-semibold tracking-wider text-gray-500 uppercase")],
                ["On this page"],
              ),
              h.span([h.Class("truncate text-sm")], [label]),
            ],
          ),
          h.span([h.Class("ml-2 shrink-0 transition-transform group-open:rotate-180")], [chevronDown("size-4")]),
        ],
      ),
      h.nav(
        [h.AriaLabel("Table of contents"), h.Class("max-h-[50vh] overflow-y-auto")],
        [
          h.ul(
            [h.Class("divide-y divide-gray-300 text-sm dark:divide-gray-800")],
            entries.map((entry) => {
              const activeEntry = isActive(entry, active)
              return h.keyed("li")(
                entry.id,
                [],
                [
                  h.a(
                    [
                      h.Href(`#${entry.id}`),
                      h.OnClick(ClickedMobileTableOfContentsLink({ sectionId: entry.id })),
                      h.Class(
                        cn(
                          "flex items-center justify-between px-4 py-3 sm:px-6",
                          entry.level === 3 && "pl-8 sm:pl-10",
                          activeEntry ? "text-accent-600 dark:text-accent-400" : "text-gray-600 dark:text-gray-400",
                        ),
                      ),
                    ],
                    [entry.label, activeEntry ? check("size-4") : h.empty],
                  ),
                ],
              )
            }),
          ),
        ],
      ),
    ],
  )
}
