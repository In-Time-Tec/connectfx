import { html } from "foldkit/html"
import type { Message } from "../app/message"
const h = html<Message>()
export const notFound = () =>
  h.main(
    [h.Id("main-content"), h.Class("mx-auto flex min-h-[60vh] max-w-3xl flex-col justify-center px-4 py-16")],
    [
      h.p([h.Class("text-sm text-muted-foreground")], ["404"]),
      h.h1([h.Class("mt-3 text-3xl font-semibold")], ["Page not found"]),
      h.p([h.Class("mt-4 text-muted-foreground")], ["The requested Connectfx docs page does not exist."]),
      h.a(
        [h.Href("/docs/start/introduction"), h.Class("mt-6 font-medium text-primary underline")],
        ["Open introduction"],
      ),
    ],
  )
