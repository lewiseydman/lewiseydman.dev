# Deploying to GitHub Pages

The site builds to a fully static export (no server runtime required).

## One-time setup

1. Push the repo to GitHub with `main` as the default branch.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Optional but recommended for a custom domain:
   **Settings → Secrets and variables → Actions → Variables → New variable**
   - Name: `CUSTOM_DOMAIN`
   - Value: `lewiseydman.dev`

   The deploy writes a `CNAME` file from this variable, so the domain setting
   survives every deploy.

4. **Settings → Pages → Custom domain**: enter the same domain and let GitHub
   provision the certificate. DNS: `A` records for the apex pointing at
   GitHub Pages IPs (185.199.108–111.153), or a `CNAME` for `www` pointing at
   `<user>.github.io`.

## How it works

- `.github/workflows/deploy.yml` runs on every push to `main` (and manually).
- It runs `bun run build:pages`, which sets `GITHUB_PAGES=true`.
- In that mode `vite.config.ts` disables the server deploy target and turns on
  TanStack Start prerendering, producing static HTML in `dist/client`.
- The workflow copies `index.html` to `404.html` (client-side routing fallback)
  and adds `.nojekyll`, then deploys `dist/client`.

## Local check

```bash
bun run build:pages
npx serve dist/client
```

## Notes

- The site is served from the domain root. If you ever host it at
  `username.github.io/repo-name/` instead, a Vite `base` path must be added.
- The default `bun run build` is unchanged and still targets the Lovable/
  Cloudflare runtime.
