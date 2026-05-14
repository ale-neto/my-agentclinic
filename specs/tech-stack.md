# Tech Stack

## Guiding constraints

- Full TypeScript end-to-end (Mary's requirement for reliability and type safety).
- Attractive, modern UI that works well in a current browser (Steve's requirement).
- Proven, popular stack with a large ecosystem — not experimental.

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js (App Router) | Full-stack TypeScript, file-based routing, server components, API route handlers |
| Language | TypeScript (strict) | End-to-end type safety |
| Styling | Tailwind CSS | Utility-first, fast to build attractive UIs, no CSS file sprawl |
| ORM | Prisma | Type-safe database client, excellent DX, schema-first migrations |
| Database | SQLite | Zero-config file-based DB; no server needed for local dev; Prisma handles it transparently |
| Auth | NextAuth.js | Staff login with minimal setup; supports OAuth and credentials |
| Deployment | Vercel | Zero-config for Next.js; preview deployments per branch |
| Package manager | pnpm | Fast, disk-efficient |

## Project structure (top-level)

```
app/          # Next.js App Router pages and layouts
components/   # Shared UI components
lib/          # Shared utilities and server-only helpers
prisma/       # schema.prisma + migrations
public/       # Static assets
specs/        # This directory — product constitution
```

## Database design (initial entities)

- `Agent` — the patient (name, model, created\_at, status)
- `Ailment` — catalog of known conditions
- `Therapy` — catalog of treatments, linked to ailments
- `Appointment` — booking record joining an agent, a therapy, and a time slot
