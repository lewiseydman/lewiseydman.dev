## 1. Replace the résumé PDF

- Upload `user-uploads://Lewis_Eydman_CV.pdf` to the Lovable CDN with `lovable-assets create --filename Lewis_Eydman_CV.pdf`, write the pointer to `src/assets/Lewis_Eydman_CV.pdf.asset.json`.
- Delete the old `public/Lewis_Eydman_Resume.pdf`.
- In `src/components/portfolio/ResumeDialog.tsx`, import the pointer and use `cvAsset.url` for the `<object>`, `<iframe>`, "Open in new tab" and "Download" links. Update `download` filename to `Lewis_Eydman_CV.pdf`.

## 2. Align Resume dialog styling with the rest of the site

Match the manuscript/sticky-header pattern used in `Blogs.tsx`, `Tests.tsx`, `SelectedWork.tsx`:

- Wrap the actions row in a sticky sub-header styled like `DialogSubHeader` (negative-margin bar spanning the dialog body edges, `backdrop-blur-md`, `border-b border-border`). The résumé has no detail view so no back button — put a short mono-caption on the left ("Curriculum vitae · PDF") and the two action buttons on the right.
- Move the intro paragraph beneath the sticky bar with the standard `flex flex-col gap-8 md:gap-12` rhythm already used elsewhere.
- Confirm both action buttons already use `pillButtonClasses("primary"|"ghost", …, "sm")` — they do; keep them but ensure the icon sizes (`h-3.5 w-3.5`) and spacing match the site's small pill convention exactly.
- Tighten the PDF preview frame: reuse the same `rounded-sm border border-border bg-card` shell, keep `h-[70vh]` but let it grow with `md:h-[75vh]` to match other dialog leaves' generous vertical rhythm.
- Keep the object → iframe → download fallback chain intact.

## Out of scope

No changes to `SectionDialog` chrome, other popovers, or button primitives.
