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

## Phase 2 — Agent model + list page

- Prisma: `Agent` model (id, name, model, status, createdAt)
- Seed a handful of sample agents
- `/agents` page: table listing all agents with status badge
- `/agents/[id]` page: agent detail (read-only)

**Done when:** staff can browse agents from the nav.

---

## Phase 3 — Ailment catalog

- Prisma: `Ailment` model (id, name, description, severity)
- Seed common ailments (e.g. *Prompt Fatigue*, *Context Overflow*, *Hallucination Anxiety*)
- `/ailments` page: browsable catalog with severity indicator

**Done when:** staff can read about each ailment.

---

## Phase 4 — Therapy catalog

- Prisma: `Therapy` model (id, name, description, ailmentId)
- Seed therapies linked to ailments
- `/therapies` page: catalog, grouped or filtered by ailment

**Done when:** each ailment has at least one recommended therapy visible.

---

## Phase 5 — Appointments: create + list

- Prisma: `Appointment` model (id, agentId, therapyId, scheduledAt, status)
- `/appointments/new` form: pick agent, therapy, date/time
- `/appointments` page: list upcoming appointments for logged-in staff

**Done when:** a staff member can book an appointment end-to-end.

---

## Phase 6 — Staff dashboard

- `/` (home): summary cards — active agents, open appointments, most common ailment
- Quick-action links to book an appointment or view an agent

**Done when:** the home page gives a meaningful at-a-glance view.

---

## Phase 7 — Polish

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
