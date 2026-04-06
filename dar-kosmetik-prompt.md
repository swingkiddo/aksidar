# Dar Kosmetik — Wholesale Soap Company Website

## Project Overview

You are building a **production-ready, multi-page website** for **Dar Kosmetik** — a B2B wholesale manufacturer of soap and household cleaning products. The site must function as a professional wholesale platform, not a retail shop.

**Primary audience:** Procurement managers, retail buyers, HoReCa purchasing departments, distributors.

**Core business goals:**
- Generate wholesale inquiries (quote requests, calls, emails)
- Build trust through certifications, production volumes, and product breadth
- Rank organically for wholesale soap and cleaning product queries

---

## Plugin Usage Strategy

You have access to a specialized plugin suite. Use them as follows:

**`ui-ux-pro-max`** — activate for every UI/UX decision: layout architecture, component design, interaction patterns, accessibility, mobile responsiveness, and visual hierarchy across all pages.

**`figma`** — use to produce high-fidelity mockups and design tokens before writing any code. Generate the design system (colors, typography, spacing, component library) in Figma first, then hand off to engineering.

**`engineering-skills` + `engineering-advanced-skills`** — use for all HTML/CSS/JS implementation, performance optimization (Core Web Vitals), semantic markup, structured data (JSON-LD), image optimization pipeline, and build tooling.

**`marketing-skills`** — activate for: copywriting all page content (headlines, descriptions, CTAs), structuring the value proposition, writing meta titles/descriptions, defining conversion funnels, and planning the CTA hierarchy across pages.

**`product-skills`** — use when defining the product catalog structure, category taxonomy, filtering logic, and how product variants (sizes, packaging formats) are presented.

**`ra-qm-skills`** — activate for certifications page architecture, compliance messaging, quality assurance framing, and how to present regulatory documents to build B2B trust.

**`pm-skills`** — use to sequence the build: define page priorities, dependencies between design and engineering tasks, and deliverable checkpoints.

**`c-level-skills` + `business-growth-skills`** — activate when making strategic decisions about positioning, competitive differentiation, and the overall narrative that makes Dar Kosmetik the obvious wholesale choice.

**`finance-skills`** — use if implementing any pricing tier logic, MOQ (minimum order quantity) displays, or wholesale calculator features.

---

## Brand & Visual Identity

### Logo
The logo is a **circular green emblem** featuring a leaf/sprout motif with organic wave elements below it — evoking nature, cleanliness, and organic production. The overall feel is trustworthy, natural, and professional.

### Color Palette (derived from logo)
Build the entire design system around these values:

```
--green-deep:    #1a4a2e   ← primary brand, headers, nav
--green-mid:     #2d6b45   ← buttons, active states, links
--green-bright:  #3d8c5a   ← accents, tags, highlights
--green-light:   #5aaa72   ← secondary accents, icons
--green-mist:    #e8f2eb   ← section backgrounds, cards
--green-pale:    #f3f8f4   ← page background alternation
--earth:         #8c6239   ← warm accent (trust, certifications)
--earth-light:   #c49a6c   ← secondary warm elements
--cream:         #faf7f2   ← main page background
--ink:           #1c2419   ← body text
```

### Typography
- **Display / Headlines:** Cormorant Garamond (serif) — conveys quality and heritage
- **Body / UI:** Mulish (sans-serif) — clean, readable, modern
- Never use Inter, Roboto, or Arial

### Design Style
**Scandinavian Organic B2B** — generous whitespace, natural texture references, structured grid, restrained use of decoration. Clean enough to feel professional, warm enough to feel trustworthy. Not a retail site — a supplier platform.

---

## Site Architecture

### Pages to Build

#### 1. Home (`/`)
**Purpose:** Convert first-time visitors into inquiry leads.

Sections:
- **Hero** — Full-width with headline, subheadline, and two CTAs: "Request a Price List" (primary) and "View Catalog" (ghost). Include a rotating or static product visual. Hero must contain the H1 with primary keyword.
- **Trust Bar** — Horizontal strip with 4–5 social proof signals: years in market, product SKU count, countries shipped to, certifications count, production capacity.
- **Product Categories** — 4 cards linking to catalog sections: Liquid Soap (Canisters & Cartridges), Liquid Soap (Bottles), Household Chemicals, Private Label.
- **Why Us / USPs** — 3–4 blocks: own production, certified quality, flexible MOQ, custom labeling.
- **Certifications Teaser** — Section with 2–3 certificate thumbnails and a link to the full certifications page.
- **CTA Block** — Full-width green background section: "Ready to order wholesale?" + form fields (name, company, phone, message) + submit button.
- **Footer** — Logo, navigation, contacts, legal links.

#### 2. Catalog (`/catalog`)
**Purpose:** Let buyers find exactly what they need quickly.

Requirements:
- **Filter sidebar** (desktop) / **filter drawer** (mobile): filter by category, packaging type, volume, scent/fragrance, certification
- **Product grid** — cards with: product photo, name, short description, packaging formats available, MOQ badge, "Request Price" CTA
- **Category tabs or top-level filter:** Liquid Soap | Canisters & Cartridges | Bottles | Household Chemicals
- Each product card links to a product detail page
- URL structure must be SEO-friendly: `/catalog/liquid-soap/canister-5l-lavender`

**Product types to include:**
1. **Liquid Soap — Canisters** (5L, 10L, 20L bulk canisters) — for HoReCa, dispensers, refill systems
2. **Liquid Soap — Cartridges** (0.5L–1L refill cartridges for foam/liquid dispensers)
3. **Liquid Soap — Bottles** (0.3L–1L retail-ready or semi-retail bottles)
4. **Household Chemicals** — dishwashing liquid, surface cleaners, glass cleaner, floor cleaner, etc.

#### 3. Product Detail (`/catalog/[category]/[slug]`)
**Purpose:** Provide all technical and commercial information to enable a purchase decision.

Sections:
- Product image gallery (multiple angles, packaging variants)
- Product name + short tagline
- Key specs table: volume options, packaging, fragrance variants, pH level, composition type, shelf life
- Badges: certifications it holds, eco status
- MOQ and packaging info
- "Request a Quote" button (opens modal or scrolls to contact form)
- Related products strip

#### 4. Certifications (`/certificates`)
**Purpose:** Build regulatory trust with buyers and procurement teams.

Design requirements:
- **Grid of certificate cards** — each card shows: certificate thumbnail/preview, certificate name, issuing body, valid until date, product scope
- **Click to expand** — lightbox or modal showing the full certificate document (PDF viewer or full-size image)
- **Filter by product category** — buyers can see only certs relevant to their product interest
- **Download button** per certificate (PDF)
- Friendly introductory copy explaining what each type of certification means for quality assurance
- `ra-qm-skills` should define the copy and framing for compliance messaging

#### 5. About (`/about`)
- Production story, founding year, team photo or facility imagery
- Production capacity stats
- Geography of supply
- Values (natural ingredients, responsible production)

#### 6. Contacts (`/contacts`)
- Contact form (name, company, phone, email, product interest dropdown, message)
- Map embed
- Direct email, phone, working hours
- WhatsApp / Telegram links (important for Russian/CIS market)

---

## SEO Architecture

Use `marketing-skills` + `engineering-skills` together for this.

### Technical SEO
- Semantic HTML5 throughout: `<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`, `<header>`, `<footer>`
- One `<h1>` per page, proper `h2`→`h3` hierarchy
- All images: descriptive `alt` attributes, `loading="lazy"`, WebP format with fallback
- `<title>` and `<meta name="description">` unique per page — write actual content, not placeholders
- Canonical tags on all pages
- `robots.txt` and `sitemap.xml` included in deliverables
- Page load: target Largest Contentful Paint < 2.5s, no layout shift on load

### Structured Data (JSON-LD)
Implement on every relevant page:
- `Organization` — on homepage and about
- `Product` — on every product detail page (name, description, image, offers)
- `BreadcrumbList` — on catalog and product pages
- `FAQPage` — on homepage if FAQ section added
- `ItemList` — on catalog index page

### URL & Content Strategy
- Target keyword clusters:
  - `[product name] оптом` / `wholesale [product]`
  - `жидкое мыло оптом`, `бытовая химия оптовые поставки`
  - `производитель мыла`, `поставщик мыла`
- Page titles follow pattern: `[Product] Оптом — Производитель | Дар Косметик`
- Meta descriptions: 140–160 chars, include keyword + differentiator + CTA

---

## UX Requirements

### Conversion-Focused Patterns (use `marketing-skills` + `ui-ux-pro-max`)
- Sticky nav with "Request Price" CTA always visible
- Every product page has a persistent "Request a Quote" button (sticky on mobile)
- Trust signals (certifications, years, capacity) visible above the fold on homepage
- WhatsApp / Telegram floating button on all pages (bottom-right)

### Catalog UX (use `product-skills` + `ui-ux-pro-max`)
- Filters must not trigger full page reload — use URL params + JS filtering
- Product cards: show volume options as selectable badges on hover
- "Compare" functionality for up to 3 products
- Pagination OR infinite scroll — choose based on catalog size (if <50 products, single scroll; if larger, paginate with 24 per page)

### Certificates Page UX (use `ra-qm-skills` + `ui-ux-pro-max`)
- Cards arranged in a clean 3-column grid (2 on tablet, 1 on mobile)
- Certificate card hover: slight elevation, "View" button appears
- Modal/lightbox for full certificate view — keyboard-navigable, ESC to close
- Filter tabs at top: All | Soap Products | Household Chemicals | Quality Systems

### Mobile (use `ui-ux-pro-max` + `engineering-skills`)
- Mobile-first CSS
- Hamburger nav with smooth slide-in drawer
- Filter sidebar becomes bottom sheet on mobile
- All CTAs min-height 48px (touch targets)
- Font sizes: min 16px body, 14px secondary

---

## Content Guidelines

Use `marketing-skills` to write or validate all copy.

### Tone of Voice
- Professional but approachable
- Direct and data-driven (real numbers, not vague claims)
- Subtly emphasize scale, reliability, and quality — what procurement managers care about
- Russian language for user-facing content (site is for Russian/CIS market)

### Homepage Headline Direction
Something like:
> "Натуральная мыльная продукция оптом — от производителя"

Subheadline:
> "Жидкое мыло, бытовая химия и средства гигиены для розницы, HoReCa и дистрибьюции. Собственное производство, сертифицированное качество, гибкие условия."

---

## Deliverables Checklist

Use `pm-skills` to sequence and track:

- [ ] Design tokens & component library (Figma, via `figma` plugin)
- [ ] Homepage — full design + implementation
- [ ] Catalog page — design + filtering logic
- [ ] Product detail page — template
- [ ] Certificates page — grid + lightbox
- [ ] About page
- [ ] Contacts page
- [ ] JSON-LD structured data on all pages
- [ ] `sitemap.xml` + `robots.txt`
- [ ] Meta tags — all pages
- [ ] Mobile-responsive — all pages
- [ ] WhatsApp/Telegram floating CTA
- [ ] Performance audit (Core Web Vitals pass)

---

## Constraints

- No stock photo placeholder mentality — design must work with real product photography (canisters, bottles, cartridges) or clean product illustration fallbacks
- No purple gradients, no generic SaaS aesthetic
- No lorem ipsum in final deliverables — all copy must be real or realistic placeholder
- The site should feel like it belongs next to European B2B supplier sites, not a cheap Russian e-commerce template
