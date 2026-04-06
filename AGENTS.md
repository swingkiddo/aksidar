# AGENTS.md — dar-kosmetik

## Project

Next.js 16 App Router site for "Дар Косметик" — a Russian B2B cosmetics/soap manufacturer. Static data, no backend or API.

## Commands

```
npm run dev      # dev server (localhost:3000)
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

No test framework is configured. Do not attempt to run tests.

## Architecture

- **Entry**: `src/app/layout.tsx` (root layout with Header, Footer, FloatingContact)
- **Pages**: `src/app/` — `page.tsx`, `catalog/`, `about/`, `certificates/`, `contacts/`
- **Catalog**: uses dynamic route `catalog/[slug]/` for product detail pages
- **Data**: all content is static in `src/lib/data.ts` — products, certificates, nav items
- **Components**: `src/components/ui/` (shadcn), `src/components/layout/` (Header/Footer), `src/components/shared/` (dialogs)
- **Types**: `src/types/index.ts`
- **Path alias**: `@/*` → `./src/*`

## Key tooling quirks

- **Tailwind v4** — uses `@import "tailwindcss"` in `globals.css`, not `tailwind.config.js`. Theme tokens are defined via `@theme inline` in CSS.
- **React Compiler** enabled in `next.config.ts` (`reactCompiler: true`). Avoid patterns the compiler can't handle (e.g., closures capturing mutable state across renders).
- **shadcn/ui** — components in `src/components/ui/` are managed via the shadcn CLI. Do not hand-edit them unless fixing a bug; add new ones with `npx shadcn add <component>`.
- **Fonts**: Cormorant Garamond (display) + Mulish (body), both with Cyrillic subsets. CSS variables `--font-display` / `--font-body` set in layout.

## Style conventions

- All UI text is in Russian. Do not introduce English copy.
- Brand colors defined in `globals.css` — use semantic tokens (`bg-green-mid`, `text-green-deep`, etc.) not raw hex values.
- Animations use framer-motion with `whileInView` + `viewport={{ once: true }}` pattern for scroll-triggered reveals.
