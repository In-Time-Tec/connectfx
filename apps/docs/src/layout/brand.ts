import type { Html } from "foldkit/html"
import { html } from "foldkit/html"

import { cn } from "@/lib/utils"

import type { Message } from "../app/message"

const h = html<Message>()
export const mark = (className: string): Html =>
  h.svg(
    [
      h.Xmlns("http://www.w3.org/2000/svg"),
      h.ViewBox("0 0 180 180"),
      h.Fill("none"),
      h.AriaHidden(true),
      h.Class(className),
    ],
    [
      h.path([h.D("M37 60h45v23H60v37H37Z"), h.Class("fill-accent-600 dark:fill-accent-500")], []),
      h.path([h.D("M98 60h45v60h-23V83H98Z"), h.Class("fill-gray-900 dark:fill-white")], []),
      h.path([h.D("M72 79h36v22H72Z"), h.Class("fill-accent-300 dark:fill-accent-700")], []),
    ],
  )
export const betaBadge = (className?: string): Html =>
  h.span(
    [
      h.Class(
        cn(
          "-rotate-6 rounded bg-accent-700 px-1.5 py-0.5 text-[10px] font-extrabold tracking-wider text-white uppercase select-none dark:bg-accent-500",
          className,
        ),
      ),
    ],
    ["Beta"],
  )
export const brandLockup = (): Html =>
  h.a(
    [h.Href("/"), h.Class("flex items-center gap-2")],
    [
      mark("size-6 md:size-7"),
      h.span([h.Class("text-lg font-medium tracking-tight text-gray-900 dark:text-white")], ["Connectfx"]),
      betaBadge(),
    ],
  )
