# Phase 2 — Validation Criteria

Phase 2 is complete and mergeable when every criterion below is met.

---

## 1. Schema

- [ ] `pnpm prisma migrate status` reports no pending migrations.
- [ ] All four models (`Agent`, `Ailment`, `Therapy`, `Appointment`) exist in the SQLite database.
- [ ] `Appointment.therapyId` correctly references `Therapy`; `Therapy.ailmentId` references `Ailment`.

## 2. Seed data

- [ ] `pnpm prisma db seed` runs without errors.
- [ ] Database contains at least 5 agents, 6 ailments, and 12 therapies after seeding.
- [ ] Every ailment has at least 2 therapies linked to it.
- [ ] Severity values are drawn from the enum (LOW / MEDIUM / HIGH / CRITICAL).

## 3. Agent pages

- [ ] `/agents` loads and shows a table with agent name, model, and a coloured status badge.
- [ ] `/agents/[id]` loads for every seeded agent and shows name, model, status, and createdAt.
- [ ] Both pages redirect unauthenticated users to `/login`.
- [ ] Both pages render correctly at 375 px width (no horizontal scroll, no clipped content).

## 4. Ailment & therapy pages

- [ ] `/ailments` shows all seeded ailments with a visible severity indicator (colour or label).
- [ ] `/therapies` shows all therapies grouped or labelled by ailment.
- [ ] Both pages redirect unauthenticated users to `/login`.
- [ ] Both pages render correctly at 375 px width.

## 5. Appointment list

- [ ] `/appointments` shows a table of all appointments (agent name, therapy name, date, status).
- [ ] Page redirects unauthenticated users to `/login`.
- [ ] Page renders correctly at 375 px width.

## 6. Appointment booking (end-to-end)

- [ ] `/appointments/new` loads with a populated agent dropdown.
- [ ] Selecting an ailment updates the therapy dropdown to show only therapies for that ailment.
- [ ] Submitting the form with valid data creates an `Appointment` row in the database.
- [ ] After submission, the user is redirected to `/appointments` and the new appointment appears.
- [ ] Submitting with missing fields shows a validation error (no silent failure).
- [ ] Page renders correctly at 375 px width.

## 7. Navigation

- [ ] A logged-in user can reach all six pages from the nav without typing URLs.
- [ ] The nav is usable on a 375 px viewport.

## 8. TypeScript

- [ ] `pnpm tsc --noEmit` passes with zero errors.

## 9. No regressions

- [ ] Phase 1 login flow still works after Phase 2 changes.
- [ ] `pnpm build` completes without errors.
