# Stop GitHub Actions charges while keeping the site live

The current `.github/workflows/deploy.yml` runs on GitHub Actions every time you push to `main`. GitHub Actions is GitHub's own CI/CD service and bills separately from Lovable.

## Option 1: Make the repo public (recommended if source is not sensitive)

This is the easiest way to eliminate charges. GitHub Actions and GitHub Pages are both free for public repos within standard limits.

1. Go to **GitHub → repo → Settings → General → Danger Zone → Change repository visibility**.
2. Choose **Public**.
3. Confirm. The workflow will continue to run for free, and the site stays live at `lewiseydman.dev`.

## Option 2: Keep the repo private and reduce costs

Private repos require a paid GitHub plan to use GitHub Pages, and Actions minutes are metered. You can lower the bill by reducing how often the workflow runs.

1. Review the workflow trigger in `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

2. If you do not need every push to go live, remove the `push` trigger and keep only manual deploys:

```yaml
on:
  workflow_dispatch:
```

You would then click **Actions → Deploy to GitHub Pages → Run workflow** whenever you want to publish.

3. Keep the custom-domain variable set so the `CNAME` file is still written on each manual deploy.

## Option 3: Switch to a different host

If the repo must stay private and you want automatic deploys with no GitHub Actions charges, you could move the site to a host that does not require a paid plan for private-repo deployments. This would require replacing the GitHub Pages workflow with a different deploy pipeline.

## Recommendation

Make the repo public if the portfolio source code is not sensitive. This removes all GitHub Actions and GitHub Pages costs while keeping the existing workflow unchanged.

If you want me to implement Option 2 (manual-only deploys), I can update the workflow file so it only runs when you trigger it manually. Just approve the plan and I will make the change.
