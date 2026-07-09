# ConnectFX Docs App

## Purpose

`apps/docs` is the FoldKit documentation shell for ConnectFX. It is a static Vite app; framework behavior stays in `packages/`.

## Rules

- Keep the app as a presentation shell over `src/content/registry.ts`.
- Source prose from `docs/spec/`, `CONTEXT.md`, and `SPEC.md`. ConnectFX is specification-first and pre-implementation; pages must describe the specified contracts, not invent shipped APIs.
- Code examples illustrate the specified SDK shape. Snippets that import unimplemented `@connectfx/*` packages live in `src/snippets/` as illustrative `.txt`-style sources and are not executed.
- Do not add runtime behavior, persistence, provider calls, or host-product semantics here.
- Add FoldCN components through the local `../foldcn` registry and keep the generated `components.json` configuration.
- Do not use `Date.now`; use fixed timestamps in examples.

## Verification

```bash
bun run --cwd apps/docs test
bun run --cwd apps/docs typecheck
bun run --cwd apps/docs build
```
