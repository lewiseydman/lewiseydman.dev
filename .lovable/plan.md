## 1. Wire the résumé

- Copy the uploaded PDF to `public/resume.pdf` so the existing `Download Résumé` button in `ExperienceTimeline.tsx` resolves with no code change.
- Reseed `experience` in `ExperienceTimeline.tsx` with the four real roles from the PDF (100Green – Communications Manager, ITS – Frontend Developer, ITS – Designer, Freelance Designer & Developer), preserving the existing timeline/gear visual.
- Update About copy stats (years shipping, etc.) to numbers that match the résumé.

## 2. Laudes → real testimonials

- Rebuild `Appraisals.tsx` as testimonials from former colleagues, clients, and people you've built for, not tool reviews.
- New card shape: large pull-quote (Cormorant italic), then attribution block — name, role, company, relationship (Colleague / Client / Built for). Keeps the existing two-column sepia/ink card grid and `Laus · NN` marginalia for visual continuity.
- Seed with 4 placeholder testimonials clearly marked as drafts so you can swap in real quotes.

## 3. Push the orbit pointer further from each heading

Matches the red arrow in your screenshot — currently the dot sits ~`0.6rem` from the label.

- In `OrbitLabel.tsx`: bump `tailLen` (`0.14` → `~0.22`) so the leader line travels further before reaching the label, and increase the dot's offset from the label (`-0.6rem` → `~-1.4rem`) plus add matching `pl-/pr-` padding so the dot visibly detaches from the heading.
- Mirror `tailLen` in `OrbitLines.tsx` so the SVG leader line and the label dot stay aligned.
- Verify nothing clips at the stage edge after the bump (labels remain inside the 100svh frame at the supported viewports).

## 4. About — better Design / Engineering / Product layout

- Replace the equal 3-column sepia-bordered strip with a more deliberate composition: 3 stacked horizontal "plates" inside the same Cormorant/mono-mar vocabulary, each with:
  - Roman numeral + discipline name (Cormorant display, large)
  - One-line italic principle (sepia)
  - A short body paragraph
  - A small "Instruments" row (tools/methods) as monospaced tags with hairline dividers
- Add a faint left-edge ornament (vertical sepia rule + index dot) to tie the three plates into a single "manuscript" rather than three disconnected cards.
- Rewrite the three disciplines using résumé language (UX strategy, React/TypeScript, product discovery + service blueprinting).

## 5. Opera — deeper case studies + live link

For each project in `SelectedWork.tsx`:

- Extend the `Project` type with `liveUrl?: string` and a `deepDive: { heading: string; body: string }[]` array that appears **below** the existing Context / Role / Challenge / Approach / Outcome grid.
- Detail view gets a new "Notebook" section beneath the 5-card grid rendering each `deepDive` entry as a longer-form paragraph block (wider measure, generous line-height, drop sepia rule between entries) so you can write in-depth narrative.
- Add a "Visit live product →" pill button next to the Outcome footer, styled to match the résumé download button (sepia outline, hover fill). Hidden when `liveUrl` is missing.
- Seed deep-dive copy + live URLs as placeholders so you can edit text only.

## 6. Three.js sphere — match Vitruvian ink + lower opacity

- In `VitruvianScene.tsx`: change the wireframe color from `#2e251c` to the exact figure outline ink. I'll sample the asset and use the matching token (likely `var(--ink)` resolved at runtime, or its hex equivalent), applied to both icosahedra and both torus rings for full consistency.
- Lower opacities: outer icosa `0.10 → 0.06`, inner icosa `0.12 → 0.07`, rings `0.25 / 0.18 → 0.14 / 0.10`, so the sphere reads as a faint ink overlay and the Vitruvian face/torso is no longer obscured.

## 7. CMS suggestions (discussion only — not implemented in this change)

Three options, ranked for your stated GitHub-commit preference:

1. **Markdown + frontmatter in repo (recommended).** Move `blogs`, `work`, `appraisals`, `tests`, `experience` out of `.tsx` and into `src/content/<section>/*.md(x)` with typed frontmatter. Pros: every edit is a GitHub commit, full diff history, no extra service, supports MDX for rich blog bodies. Cons: still requires opening GitHub to edit.
2. **GitHub web editor + Decap CMS (formerly Netlify CMS).** Same markdown files as #1, plus a `/admin` route that gives you a Notion-style editor backed by GitHub OAuth — every save is a commit. Pros: friendly UI, zero backend, full version history. Cons: small `/admin` setup cost; the user-facing site stays unchanged.
3. **Headless CMS (Sanity / Contentlayer / Tina).** Strongest authoring UX, but breaks the "everything is a git commit" property unless you pick TinaCMS (which uses GitHub as its backing store).

My suggestion: **#2 (Decap on top of markdown files)**. It keeps the commit history you want while removing the need to edit `.tsx` files. Happy to scope this as a follow-up.

## Technical notes

- Files touched: `src/components/portfolio/{OrbitLabel.tsx, About.tsx, SelectedWork.tsx, Appraisals.tsx, ExperienceTimeline.tsx, VitruvianScene.tsx}`, plus `public/resume.pdf` (new).
- No new dependencies, no backend, no route changes.
- All copy seeded as placeholders where appropriate so you can swap in final text without touching structure.

## Out of scope

- The CMS migration itself (suggestions only this turn, per your request).
- Any colour-system changes beyond syncing the sphere to the Vitruvian ink.
