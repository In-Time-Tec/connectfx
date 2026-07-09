import { Effect, Match, Option, Schema } from "effect"
import { define, mapMessages, type Command } from "foldkit/command"
import { load, pushUrl, replaceUrl } from "foldkit/navigation"
import { evo } from "foldkit/struct"
import { toString } from "foldkit/url"

import * as Dialog from "@/components/ui/dialog"
import * as Sheet from "@/components/ui/sheet"

import { legacyRedirects } from "../content/registry"
import { isSidebarGroupOpen, readSidebarGroups, SidebarGroups, writeSidebarGroups } from "../layout/sidebarStorage"
import { toPath, urlToRoute } from "../route/route"
import {
  ClearedCopiedCode,
  CompletedApplyTheme,
  CompletedCopyCode,
  CompletedLoadExternal,
  CompletedNavigateInternal,
  CompletedSaveSidebarGroups,
  CompletedSaveThemePreference,
  GotMobileNavigationMessage,
  GotSearchCommandMessage,
  GotSearchDialogMessage,
  GotSidebarGroups,
  GotThemePreference,
  type Message,
} from "./message"
import { ThemePreference, type Model } from "./model"
import { initialSearchCommand, itemToPath, SearchCommand } from "./searchPalette"

type Update = readonly [Model, ReadonlyArray<Command<Message>>]

export const update = (model: Model, message: Message): Update =>
  Match.value(message).pipe(
    Match.withReturnType<Update>(),
    Match.tagsExhaustive({
      ClickedLink: ({ request }) =>
        Match.value(request).pipe(
          Match.withReturnType<Update>(),
          Match.tagsExhaustive({
            Internal: ({ url }) => [model, [NavigateInternal({ url: toString(url) })]],
            External: ({ href }) => [model, [LoadExternal({ href })]],
          }),
        ),
      ChangedUrl: ({ url }) => {
        const route = urlToRoute(url)
        const redirectTarget = legacyRedirects.get(toPath(route))
        if (redirectTarget !== undefined) {
          return [model, [RedirectLegacy({ url: redirectTarget })]]
        }
        const [nextMobileNavigation, mobileNavigationCommands] = Sheet.close(model.mobileNavigation)
        return [
          evo(model, {
            route: () => route,
            url: () => url,
            mobileNavigation: () => nextMobileNavigation,
            isMobileTocOpen: () => false,
            maybeActiveSectionId: () => Option.none(),
          }),
          mapMessages(mobileNavigationCommands, (childMessage) =>
            GotMobileNavigationMessage({ message: childMessage }),
          ),
        ]
      },
      PressedSearchShortcut: () => {
        if (model.searchDialog.isOpen) {
          const [dialog, dialogCommands] = Dialog.close(model.searchDialog)
          const [command, commandCommands] = SearchCommand.close(model.searchCommand)
          return [
            evo(model, { searchDialog: () => dialog, searchCommand: () => command }),
            [
              ...mapMessages(dialogCommands, (child) => GotSearchDialogMessage({ message: child })),
              ...mapMessages(commandCommands, (child) => GotSearchCommandMessage({ message: child })),
            ],
          ]
        }
        const [dialog, dialogCommands] = Dialog.open(model.searchDialog)
        const [command, commandCommands] = SearchCommand.open(initialSearchCommand())
        return [
          evo(model, { searchDialog: () => dialog, searchCommand: () => command }),
          [
            ...mapMessages(dialogCommands, (child) => GotSearchDialogMessage({ message: child })),
            ...mapMessages(commandCommands, (child) => GotSearchCommandMessage({ message: child })),
          ],
        ]
      },
      GotSearchDialogMessage: ({ message: childMessage }) => {
        const [dialog, commands] = Dialog.update(model.searchDialog, childMessage)
        return [
          evo(model, { searchDialog: () => dialog }),
          mapMessages(commands, (child) => GotSearchDialogMessage({ message: child })),
        ]
      },
      GotSearchCommandMessage: ({ message: childMessage }) => {
        const [command, commands, maybeOut] = SearchCommand.update(model.searchCommand, childMessage)
        const forwarded = mapMessages(commands, (child) => GotSearchCommandMessage({ message: child }))
        const commandJustDismissed = model.searchCommand.isOpen && !command.isOpen
        return Option.match(maybeOut, {
          onNone: (): Update => {
            if (commandJustDismissed) {
              const [dialog, closeCommands] = Dialog.close(model.searchDialog)
              return [
                evo(model, { searchCommand: () => command, searchDialog: () => dialog }),
                [...forwarded, ...mapMessages(closeCommands, (child) => GotSearchDialogMessage({ message: child }))],
              ]
            }
            return [evo(model, { searchCommand: () => command }), forwarded]
          },
          onSome: (out): Update => {
            const [dialog, closeCommands] = Dialog.close(model.searchDialog)
            return [
              evo(model, { searchCommand: () => command, searchDialog: () => dialog }),
              [
                ...forwarded,
                ...mapMessages(closeCommands, (child) => GotSearchDialogMessage({ message: child })),
                NavigateInternal({ url: itemToPath(out.value) }),
              ],
            ]
          },
        })
      },
      ClickedMobileNavigationTrigger: () => {
        const [nextMobileNavigation, mobileNavigationCommands] = Sheet.open(model.mobileNavigation)
        return [
          evo(model, { mobileNavigation: () => nextMobileNavigation }),
          mapMessages(mobileNavigationCommands, (childMessage) =>
            GotMobileNavigationMessage({ message: childMessage }),
          ),
        ]
      },
      GotMobileNavigationMessage: ({ message: mobileNavigationMessage }) => {
        const [nextMobileNavigation, mobileNavigationCommands] = Sheet.update(
          model.mobileNavigation,
          mobileNavigationMessage,
        )
        return [
          evo(model, { mobileNavigation: () => nextMobileNavigation }),
          mapMessages(mobileNavigationCommands, (childMessage) =>
            GotMobileNavigationMessage({ message: childMessage }),
          ),
        ]
      },
      ClickedCopyCode: ({ source }) => [evo(model, { copiedCode: () => Option.some(source) }), [CopyCode({ source })]],
      CompletedCopyCode: ({ source }) => [model, [ScheduleClearCopiedCode({ source })]],
      ClearedCopiedCode: ({ source }) => [
        Option.contains(model.copiedCode, source) ? evo(model, { copiedCode: () => Option.none() }) : model,
        [],
      ],
      SelectedThemePreference: ({ preference }) => [
        evo(model, { themePreference: () => preference }),
        [ApplyTheme({ preference }), SaveThemePreference({ preference })],
      ],
      GotThemePreference: ({ preference }) => [
        evo(model, { themePreference: () => preference }),
        [ApplyTheme({ preference })],
      ],
      ChangedSystemTheme: () => [model, [ApplyTheme({ preference: model.themePreference })]],
      ToggledSidebarGroup: ({ group }) => {
        const open = { ...model.openSidebarGroups, [group]: !isSidebarGroupOpen(model.openSidebarGroups, group) }
        return [evo(model, { openSidebarGroups: () => open }), [SaveSidebarGroups({ open })]]
      },
      GotSidebarGroups: ({ open }) => [evo(model, { openSidebarGroups: () => open }), []],
      ChangedActiveSection: ({ sectionId }) => [evo(model, { maybeActiveSectionId: () => Option.some(sectionId) }), []],
      ToggledMobileTableOfContents: ({ isOpen }) => [evo(model, { isMobileTocOpen: () => isOpen }), []],
      ClickedMobileTableOfContentsLink: ({ sectionId }) => [
        evo(model, { maybeActiveSectionId: () => Option.some(sectionId), isMobileTocOpen: () => false }),
        [],
      ],
      CompletedApplyTheme: () => [model, []],
      CompletedSaveThemePreference: () => [model, []],
      CompletedSaveSidebarGroups: () => [model, []],
      CompletedNavigateInternal: () => [model, []],
      CompletedLoadExternal: () => [model, []],
    }),
  )

const NavigateInternal = define(
  "NavigateInternal",
  { url: Schema.String },
  CompletedNavigateInternal,
)(({ url }) => pushUrl(url).pipe(Effect.as(CompletedNavigateInternal())))
const LoadExternal = define(
  "LoadExternal",
  { href: Schema.String },
  CompletedLoadExternal,
)(({ href }) => load(href).pipe(Effect.as(CompletedLoadExternal())))
export const RedirectLegacy = define(
  "RedirectLegacy",
  { url: Schema.String },
  CompletedNavigateInternal,
)(({ url }) => replaceUrl(url).pipe(Effect.as(CompletedNavigateInternal())))
const CopyCode = define(
  "CopyCode",
  { source: Schema.String },
  CompletedCopyCode,
)(({ source }) =>
  Effect.promise(() => navigator.clipboard.writeText(source).catch(() => undefined)).pipe(
    Effect.as(CompletedCopyCode({ source })),
  ),
)
const ScheduleClearCopiedCode = define(
  "ScheduleClearCopiedCode",
  { source: Schema.String },
  ClearedCopiedCode,
)(({ source }) => Effect.sleep("2 seconds").pipe(Effect.as(ClearedCopiedCode({ source }))))
const THEME_STORAGE_KEY = "theme-preference"
const readThemePreference = (): ThemePreference => {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    if (raw === null) return "System"
    const parsed: unknown = JSON.parse(raw)
    return parsed === "Light" || parsed === "Dark" || parsed === "System" ? parsed : "System"
  } catch {
    return "System"
  }
}
const prefersDark = (): boolean =>
  typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").matches
export const LoadThemePreference = define(
  "LoadThemePreference",
  GotThemePreference,
)(Effect.sync(() => GotThemePreference({ preference: readThemePreference() })))
const ApplyTheme = define(
  "ApplyTheme",
  { preference: ThemePreference },
  CompletedApplyTheme,
)(({ preference }) =>
  Effect.sync(() => {
    document.documentElement.classList.toggle(
      "dark",
      preference === "Dark" || (preference === "System" && prefersDark()),
    )
    return CompletedApplyTheme()
  }),
)
const SaveThemePreference = define(
  "SaveThemePreference",
  { preference: ThemePreference },
  CompletedSaveThemePreference,
)(({ preference }) =>
  Effect.sync(() => {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preference))
    return CompletedSaveThemePreference()
  }),
)
export const LoadSidebarGroups = define(
  "LoadSidebarGroups",
  GotSidebarGroups,
)(Effect.sync(() => GotSidebarGroups({ open: readSidebarGroups() })))
const SaveSidebarGroups = define(
  "SaveSidebarGroups",
  { open: SidebarGroups },
  CompletedSaveSidebarGroups,
)(({ open }) =>
  Effect.sync(() => {
    writeSidebarGroups(open)
    return CompletedSaveSidebarGroups()
  }),
)
