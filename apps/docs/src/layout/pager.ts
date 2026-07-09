import type { Html } from "foldkit/html"
import { html } from "foldkit/html"

import type { Message } from "../app/message"
import { navGroups } from "../content/registry"
import type { DocsPage } from "../prose/page"
import { arrowLeft, arrowRight } from "./icon"

const h = html<Message>()
const orderedPages: ReadonlyArray<DocsPage> = navGroups.flatMap((group) => group.pages)
const card = (page: DocsPage, direction: "previous" | "next"): Html =>
  h.a(
    [
      h.Href(page.path),
      h.Class(
        direction === "previous"
          ? "group flex flex-1 items-center gap-3 rounded-lg border border-gray-300 px-4 py-3 transition hover:border-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          : "group flex flex-1 items-center justify-end gap-3 rounded-lg border border-gray-300 px-4 py-3 text-right transition hover:border-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
      ),
    ],
    [
      ...(direction === "previous" ? [arrowLeft("size-4 shrink-0 text-gray-500")] : []),
      h.div(
        [],
        [
          h.p(
            [h.Class("text-xs font-semibold tracking-wider text-gray-500 uppercase")],
            [direction === "previous" ? "Previous" : "Next"],
          ),
          h.p(
            [h.Class("mt-0.5 text-sm font-medium text-gray-900 group-hover:text-accent-600 dark:text-white")],
            [page.navTitle],
          ),
        ],
      ),
      ...(direction === "next" ? [arrowRight("size-4 shrink-0 text-gray-500")] : []),
    ],
  )
export const pager = (path: string): Html => {
  const index = orderedPages.findIndex((page) => page.path === path)
  if (index === -1) return h.empty
  const previous = index > 0 ? orderedPages[index - 1] : undefined
  const next = index < orderedPages.length - 1 ? orderedPages[index + 1] : undefined
  return h.nav(
    [h.AriaLabel("Docs pagination"), h.Class("mt-12 flex gap-4 border-t border-gray-300 pt-6 dark:border-gray-800")],
    [
      previous === undefined ? h.div([h.Class("flex-1")], []) : card(previous, "previous"),
      next === undefined ? h.div([h.Class("flex-1")], []) : card(next, "next"),
    ],
  )
}
