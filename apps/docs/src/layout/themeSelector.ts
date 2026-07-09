import type { Html } from "foldkit/html"
import { html } from "foldkit/html"

import { button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { SelectedThemePreference, type Message } from "../app/message"
import type { ThemePreference } from "../app/model"
import { computer, moon, sun } from "./icon"

const h = html<Message>()
const themeButton = (preference: ThemePreference, active: ThemePreference, icon: Html, label: string): Html => {
  const isActive = preference === active
  return button(
    {
      variant: "ghost",
      size: "icon",
      onClick: SelectedThemePreference({ preference }),
      class: cn("size-8", isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"),
      attributes: [h.AriaPressed(isActive.toString()), h.AriaLabel(label)],
    },
    [icon],
  )
}
export const themeSelector = (active: ThemePreference): Html =>
  h.div(
    [
      h.Role("group"),
      h.AriaLabel("Theme preference"),
      h.Class("flex items-center gap-0.5 rounded-lg border bg-muted p-0.5"),
    ],
    [
      themeButton("Light", active, sun("size-4"), "Light mode"),
      themeButton("System", active, computer("size-4"), "System mode"),
      themeButton("Dark", active, moon("size-4"), "Dark mode"),
    ],
  )
