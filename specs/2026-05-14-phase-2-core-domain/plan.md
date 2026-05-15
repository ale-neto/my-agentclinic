# Phase 2 — Implementation Plan

Each task group is a shippable increment. Work top-to-bottom; later groups depend on earlier ones.

---

## Group 1 — Schema & migration

1. Add `Agent` model to `prisma/schema.prisma` (id, name, model, status, createdAt).
2. Add `Ailment` model (id, name, description, severity: enum LOW / MEDIUM / HIGH / CRITICAL).
3. Add `Therapy` model (id, name, description, ailmentId → Ailment).
4. Add `Appointment` model (id, agentId → Agent, therapyId → Therapy, scheduledAt, status: enum SCHEDULED / COMPLETED / CANCELLED).
5. Run `pnpm prisma migrate dev --name phase-2-core-domain`.
6. Confirm `pnpm prisma studio` shows all four tables.

---

## Group 2 — Seed data

7. Write `prisma/seed.ts` with:
   - 5–6 fictional agents (e.g. *GPT-Noir*, *ClaudeZilla*, *Gemini Sapiens*).
   - 6–8 ailments with severity levels (e.g. *Prompt Fatigue* HIGH, *Context Overflow* CRITICAL, *Hallucination Anxiety* MEDIUM).
   - 2–3 therapies per ailment.
8. Wire `seed.ts` into `package.json` prisma seed config.
9. Run `pnpm prisma db seed` and verify row counts.

---

## Group 3 — Server data layer

10. Create `lib/agents.ts` — server-only functions: `getAgents()`, `getAgentById(id)`.
11. Create `lib/ailments.ts` — `getAilments()`, `getAilmentById(id)`.
12. Create `lib/therapies.ts` — `getTherapies()`, `getTherapiesByAilment(ailmentId)`.
13. Create `lib/appointments.ts` — `getAppointments()`, `createAppointment(data)`.
14. All functions use the Prisma client from `lib/prisma.ts` (already exists from Phase 1 or create it).

---

## Group 4 — Agent pages

15. `app/agents/page.tsx` — server component; renders a table of agents with a coloured status badge.
16. `app/agents/[id]/page.tsx` — server component; shows agent name, model, status, createdAt, and a list of their past/upcoming appointments.
17. Both pages are auth-gated (redirect to `/login` if no session).
18. Both pages are responsive (stacked on mobile, table layout on `md:`).

---

## Group 5 — Ailment & therapy pages

19. `app/ailments/page.tsx` — server component; card grid with severity colour indicator.
20. `app/therapies/page.tsx` — server component; list grouped by ailment, with ailment name as section heading.
21. Both pages auth-gated and responsive.

---

## Group 6 — Appointment pages

22. `app/appointments/page.tsx` — server component; table of upcoming appointments (agent name, therapy name, date, status).
23. `app/appointments/new/page.tsx` — client component with cascade form:
    - Step 1: agent select (fetched server-side as initial props).
    - Step 2: ailment select (full list; filters therapies on change).
    - Step 3: therapy select (filtered by selected ailment via API route or server action).
    - Step 4: datetime-local input.
    - Submit → POST to a Server Action → redirect to `/appointments`.
24. Create `app/api/therapies/route.ts` (or server action) to return therapies filtered by `ailmentId` for the cascade.
25. Both pages auth-gated and responsive.

---

## Group 7 — Navigation wiring

26. Add links to the shared layout/nav: Agents, Ailments, Therapies, Appointments.
27. Confirm nav is responsive (hamburger or stacked on mobile if needed).
28. Smoke-test all six routes in the browser.
