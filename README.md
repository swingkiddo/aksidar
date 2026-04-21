# Дар Косметик (Dar Kosmetik)

B2B cosmetics and soap manufacturer website built with Next.js 16 App Router.

## Project Overview

- **Next.js 16** with App Router
- **Prisma** ORM with SQLite database
- **shadcn/ui** components with Tailwind CSS v4

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run db:seed` | Seed database with sample data |

## Database

- SQLite via Prisma (`prisma/dev.db`)
- Models: Category, Brand, Product, Certificate, Admin
- Run `npm run db:seed` to populate sample data (40 products, 9 certificates)

## Structure

```
src/
├── app/           # Next.js App Router pages
│   ├── api/       # API routes
│   ├── catalog/   # Catalog pages
│   └── page.tsx   # Home page
├── components/    # React components
│   ├── ui/        # shadcn components
│   ├── layout/    # Layout components
│   └── shared/    # Shared components
├── lib/           # Utilities and Prisma client
└── types/         # TypeScript types
```

## Admin Access

- Login: `admin`
- Password: `admin123`

## Tech Stack

- Next.js 16 (App Router, Server Actions)
- React 19 with React Compiler
- TypeScript
- Tailwind CSS v4
- Prisma
- SQLite
- framer-motion