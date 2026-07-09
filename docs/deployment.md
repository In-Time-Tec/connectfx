# Deployment

## Docs site deploys

The docs site (`apps/docs`) is a static Vite build deployed through Railway project `connectfx` with two GitHub-triggered environments, both gated on green CI:

- Staging https://connectfx-docs-staging.up.railway.app — auto-deploys every push to `main`.
- Production https://connectfx-docs.up.railway.app — auto-deploys every push to `release`.
- Pull requests create temporary Railway PR environments based on staging and remove them when the pull request closes.

Promote staging to production:

```bash
git push origin main:release
```

If `release` ever diverges (direct hotfix), confirm the hotfix landed on `main`, then `git push --force-with-lease origin main:release`.

Build config lives in `apps/docs/railway.json`; the build command is `bun install --frozen-lockfile && bun turbo build --filter=@connectfx/docs` and the static output dir comes from the `RAILPACK_SPA_OUTPUT_DIR=apps/docs/dist` service variable set on each Railway service.

Verify both environments any time:

```bash
bun run verify:docs-deploy
```

The script asserts the landing page, a deep docs link, and `llms.txt` respond with 200 on staging and production and that the served `<title>` is `Connectfx`.
