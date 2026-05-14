# Roadmap

Each phase is a single vertical slice: schema change + API + UI, shippable on its own.

**Cross-cutting requirement:** every page must be responsive (mobile → tablet → desktop) from Phase 1 onwards. Tailwind's mobile-first breakpoints (`sm:`, `md:`, `lg:`) are the standard approach; no page ships without working on a 375 px viewport.

---

## Phase 1 — Project scaffold

- Init Next.js (App Router, TypeScript, Tailwind, strict mode)
- Add Prisma + connect to local SQLite
- Add NextAuth.js with a credentials provider (staff login)
- Deploy skeleton to Vercel; confirm CI passes

**Done when:** the app loads, a staff member can log in, and the database is reachable.

**Status: complete** ✓ — 2026-05-14

---

## Phase 2 — Core domain: agents, ailments, therapies, and appointments

### Models + seed data
- Prisma: `Agent` model (id, name, model, status, createdAt) — seed a handful of sample agents
- Prisma: `Ailment` model (id, name, description, severity) — seed common ailments (e.g. *Prompt Fatigue*, *Context Overflow*, *Hallucination Anxiety*)
- Prisma: `Therapy` model (id, name, description, ailmentId) — seed therapies linked to ailments
- Prisma: `Appointment` model (id, agentId, therapyId, scheduledAt, status)

### Pages
- `/agents` — table listing all agents with status badge
- `/agents/[id]` — agent detail (read-only)
- `/ailments` — browsable catalog with severity indicator
- `/therapies` — catalog, grouped or filtered by ailment
- `/appointments` — list upcoming appointments for logged-in staff
- `/appointments/new` — form to pick agent, therapy, and date/time

**Done when:** staff can browse agents, read ailment and therapy catalogs, and book an appointment end-to-end.

---

## Phase 3 — Staff dashboard

- `/` (home): summary cards — active agents, open appointments, most common ailment
- Quick-action links to book an appointment or view an agent

**Done when:** the home page gives a meaningful at-a-glance view.

---

## Phase 4 — Polish

- Consistent nav, header, and footer (responsive from Phase 1; this phase refines)
- Empty states, loading skeletons, error boundaries
- Accessibility pass (semantic HTML, focus management)

**Done when:** Steve is happy and the site looks good on a phone.

---

## Later (not yet scoped)

- Agent self-registration flow
- Email reminders for upcoming appointments
- Therapy outcome tracking (did it help?)
- Public-facing ailment/therapy pages (no login required)
