# Deploy to GitHub Pages

The site is a TanStack Start app that currently builds for a server runtime (Cloudflare Workers). GitHub Pages only serves static files, so the build needs a static output mode — plus a workflow that runs on `main` and publishes it.

Good news: the app has one page (`/`), no server functions and no API routes, so a fully static export works with no loss of functionality.

## What will be added / changed

1. **Static build mode** (`vite.config.ts`)
   - Keep the current Cloudflare build as the default so Lovable preview/publish keeps working.
   - When the env var `GITHUB_PAGES=true` is set, switch the Nitro preset to `static` and prerender `/`, producing plain HTML/CSS/JS.

2. **New script** in `package.json`
   - `build:pages` — runs the static build with that env var set.

3. **Pages support files** in `public/`
   - `.nojekyll` so folders like `_build`/underscore-prefixed assets aren't stripped by Jekyll.
   - `CNAME` containing your custom domain, so the domain setting survives every deploy.
   - `404.html` produced from the prerendered index, so deep links and refreshes resolve.

4. **GitHub Actions workflow** (`.github/workflows/deploy.yml`)
   - Triggers on push to `main` and manual dispatch.
   - Uses Bun, installs deps, runs `build:pages`, uploads the static output, deploys with `actions/deploy-pages`.
   - Correct `pages: write` / `id-token: write` permissions and a `github-pages` environment.

5. **Docs**
   - Short README note: enable Pages → Source: "GitHub Actions", then set the custom domain in Settings → Pages.

## Notes

- With a custom domain (or a `<user>.github.io` repo) the site is served from the root, so no base path is needed. If you ever deploy to `username.github.io/repo-name/` instead, a base path would have to be configured — tell me and I'll add it.
- I need the custom domain to write the `CNAME` file. If you don't give one now, I'll leave `CNAME` out and you can add the domain in the Pages settings UI (it will need re-adding after each deploy until the file exists).

## Technical detail

- `defineConfig({ nitro: process.env.GITHUB_PAGES ? { preset: "static", prerender: { routes: ["/"] } } : undefined })`; the existing `tanstackStart.server.entry` override stays for the non-static path.
- Static output lands in `.output/public`; the workflow uploads that directory.
- CDN-hosted assets (`.asset.json` pointers to `/__l5e/assets-v1/...`) are served by Lovable's infrastructure and will 404 on GitHub Pages. That affects the CV PDF and the Tests gallery images. Fix as part of this work: re-import those files as local assets under `src/assets/` so Vite bundles them into the static output.
