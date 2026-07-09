import type { Html } from "foldkit/html"

import type { TocEntry } from "../prose/node"

export type DocsPageView = Readonly<{ title: string; navTitle: string; toc: ReadonlyArray<TocEntry>; body: Html }>
