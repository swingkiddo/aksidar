# AGENTS.md — dar-kosmetik

## Project

Next.js 16 App Router site for "Дар Косметик" — a Russian B2B cosmetics/soap manufacturer with dynamic data from SQLite database.

## Commands

```
npm run dev      # dev server (localhost:3000)
npm run build    # production build  
npm run start    # serve production build
npm run lint     # eslint
npm run db:seed  # seed database with sample data
```

No test framework is configured. Do not attempt to run tests.

## Architecture

### Database
- **Prisma** with SQLite (`prisma/dev.db`)
- **Models**: `Category`, `Brand`, `Product`, `Certificate`, `Admin`
- **Seed**: `prisma/seed.ts` populates 40 products, 9 certificates, admin user

### Entry Points
- **Root layout**: `src/app/layout.tsx` (Header, Footer, FloatingContact)
- **Server pages**: `src/app/page.tsx`, `catalog/`, `about/`, `certificates/`, `contacts/`, `terms/`, `privacy/`
- **Client page**: `src/app/catalog/page.tsx` (interactive filtering)
- **Product detail**: `src/app/catalog/[slug]/` (dynamic route)

### API Routes
- `/api/products` — list products (with filters)
- `/api/categories` — list categories
- `/api/brands` — list brands
- `/api/certificates` — list certificates
- `/api/admin/login` — admin authentication
- `/api/admin/products` — admin product CRUD

### Client-Side Data
- **Hooks**: `useProducts`, `useCategories`, `useCertificates` — fetch from API routes
- **Components**: `ProductCard` (reusable for products & categories)

### Data Flow
```
Prisma (SQLite) → API Routes → Client Hooks → React Components
```

### Components
- **UI**: `src/components/ui/` — shadcn components (Button, Badge, Card, Accordion, Dialog, Sheet, etc.)
- **Layout**: `src/components/layout/` — Header, Footer, FloatingContact
- **Shared**: `src/components/shared/` — ProductCard, ContactDialog, ContactForm, etc.

### Types
- `src/types/index.ts` — TypeScript interfaces

### Path Alias
- `@/*` → `./src/*`

## Key tooling quirks

- **Tailwind v4** — uses `@import "tailwindcss"` in `globals.css`, not `tailwind.config.js`. Theme tokens defined via `@theme inline` in CSS.
- **React Compiler** enabled in `next.config.ts` (`reactCompiler: true`). Avoid patterns the compiler can't handle (e.g., closures capturing mutable state across renders).
- **shadcn/ui** — components in `src/components/ui/` managed via shadcn CLI. Do not hand-edit unless fixing a bug; add new ones with `npx shadcn add <component>`.
- **Base UI** — used for some primitives (Dialog, Sheet, Button) via `@base-ui/react`
- **Fonts**: Cormorant Garamond (display) + Mulish (body), both with Cyrillic subsets. CSS variables `--font-display` / `--font-body` set in layout.

## Style conventions

- All UI text is in Russian. Do not introduce English copy.
- Brand colors defined in `globals.css` — use semantic tokens (`bg-green-mid`, `text-green-deep`, etc.) not raw hex values.
- Animations use framer-motion with `whileInView` + `viewport={{ once: true }}` for scroll-triggered reveals.
- Card buttons: `bg-green-mist/50` (dim) → `group-hover:bg-green-mid` (bright on hover).

## Content

### Categories (3)
- Жидкое мыло — Бутылки (475–1000 мл)
- Жидкое мыло — Канистры (5 л)
- Бытовая химия

### Brands (4)
- Флородель, ЕЛИКУМ, ЕЛИКОМ, ТРИДОРА

### Products (40)
- Soap 1–23: Бутылки (475, 500, 520, 1000 мл)
- Soap 24–38: Канистры (5 л)
- Soap 39–40: Бытовая химия

### Certificates (9)
- Декларации на гель-мыло, крем-мыло, мыло-пену
- Сертификаты на ЕЛИКУМ, ЕЛИКОМ, ТРИДОРА

### Admin
- Login: `admin`
- Password: `admin123` (hashed with bcrypt)