## Cleanup: remove unused files & dependencies

Scope: delete source files, assets, and npm packages that no reachable file (starting from `src/routes/index.tsx` and `__root.tsx`) imports. No behavior changes.

### Unused portfolio components (delete)
- `src/components/portfolio/Contact.tsx`
- `src/components/portfolio/Footer.tsx`
- `src/components/portfolio/Hero.tsx`
- `src/components/portfolio/Nav.tsx`
- `src/components/portfolio/InkDraw.tsx`
- `src/components/portfolio/SectionHeading.tsx` (only imported by `Contact.tsx`)

### Unused MCP scaffolding (delete)
Never wired into `vite.config.ts`; no imports anywhere.
- `src/lib/mcp/` (entire directory: `tools/get-profile.ts`, `tools/list-projects.ts`, `tools/list-writings.ts`)
- Remove `@lovable.dev/mcp-js` from `package.json`

### Unused shadcn/ui components (delete)
Not imported by any surviving file. Keep only: `button`, `dialog`, `label`, `input`, `separator`, `skeleton`, `toggle`, `tooltip` (verified in-use).
Delete: `accordion`, `alert`, `alert-dialog`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input-otp`, `menubar`, `navigation-menu`, `pagination`, `popover`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `sidebar`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toggle-group`.

### Unused hook (delete)
- `src/hooks/use-mobile.tsx` (only consumer is `sidebar.tsx`, which is being removed)

### Dependency prune (`bun remove`)
Radix packages tied to deleted components, plus other now-unused libs:
`@radix-ui/react-accordion`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-menubar`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-select`, `@radix-ui/react-slider`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toggle-group`, `@lovable.dev/mcp-js`, `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-hook-form`, `@hookform/resolvers`, `react-resizable-panels`, `recharts`, `sonner`, `vaul`.

Kept Radix: `react-dialog`, `react-label`, `react-separator`, `react-slot`, `react-toggle`, `react-tooltip` (still used).

### Kept (verified in use)
All other `portfolio/*` components, both assets (`portrait.png`, `vitruvian.png`, thumbs), `use-expand-with-loading`, `SectionDialog`, three.js stack, framer-motion, react-icons, lucide-react.

### Verification
After deletion, run the build to confirm nothing imports a removed file.
