# Phase 2 — Requirements: Core Domain

## Scope

Deliver all six pages and the full data model in a single vertical slice. Phase 2 is "done" when a staff member can browse the agent/ailment/therapy catalogs and book an appointment end-to-end.

### Pages in scope

| Route | Purpose |
|---|---|
| `/agents` | Table listing all agents with status badge |
| `/agents/[id]` | Agent detail (read-only) |
| `/ailments` | Browsable catalog with severity indicator |
| `/therapies` | Catalog filtered/grouped by ailment |
| `/appointments` | List of upcoming appointments for logged-in staff |
| `/appointments/new` | Booking form (cascade: agent → ailment → therapies) |

---

## Decisions

### Booking form UX — three-step cascade
The new-appointment form uses a dependent cascade:
1. **Choose agent** — full list of registered agents.
2. **Choose ailment** — full ailment catalog; selecting one filters the therapy list.
3. **Choose therapy** — only therapies linked to the selected ailment are shown.
4. **Pick date/time** — datetime-local input.

Rationale: prevents nonsensical bookings (therapy mismatched to ailment) and guides staff naturally through the clinical decision.

### Seed data — playful and satirical
All seed data is invented in the spirit of the mission: agents are fictional, ailments are humorous AI conditions, therapies are absurd-but-earnest treatments. The tone must be consistent with `specs/mission.md` — playful satire, not parody that undermines the product's realism.

### Auth requirement
All six pages require a logged-in staff session. Unauthenticated requests redirect to `/login`. This is inherited from Phase 1's NextAuth setup.

### Read-only agent details
`/agents/[id]` is read-only in this phase. Edit/delete flows are deferred.

---

## Context

- Stack: Next.js App Router, Prisma + SQLite, Tailwind CSS, NextAuth.js — see `specs/tech-stack.md`.
- Every page must be responsive: mobile (375 px) → tablet → desktop using Tailwind's `sm:` / `md:` / `lg:` breakpoints.
- Tone: see `specs/mission.md`. Agents suffer; staff are complicit; therapies are earnest.
