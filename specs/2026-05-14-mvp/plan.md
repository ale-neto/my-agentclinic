# MVP — Implementation Plan

Each group is a shippable increment. Work top-to-bottom; later groups depend on earlier ones.

---

## Group 1 — Stats data layer

1. Create `src/lib/stats.ts` with server-only Prisma query functions:
   - `getActiveAgentCount()` — `prisma.agent.count({ where: { status: 'ACTIVE' } })`
   - `getOpenAppointmentCount()` — `prisma.appointment.count({ where: { status: 'SCHEDULED' } })`
   - `getMostCommonAilment()` — group appointments by ailmentId (via therapy), return the ailment name with highest count; fallback `null` when no appointments exist
   - `getAgentStatusBreakdown()` — `prisma.agent.groupBy(['status'])` returning `{ status, _count }[]`
   - `getRecentAppointments(n = 5)` — `findMany` ordered by `scheduledAt desc`, limited to n, including agent + therapy + ailment

---

## Group 2 — Home page dashboard

2. Rewrite `src/app/page.tsx` as an auth-gated async server component.
3. Fetch all stats in parallel with `Promise.all([...])` at the top of the component.
4. Summary cards row — three cards side-by-side on `sm:`, stacked on mobile:
   - **Active Agents** — count with indigo accent
   - **Open Appointments** — count with yellow accent
   - **Most Common Ailment** — ailment name (or "None yet") with red accent
5. Agent health breakdown — three inline items with a coloured dot each: Active (green), Inactive (gray), Under Observation (yellow).
6. Recent appointments — compact table: Agent, Therapy, Date, Status badge. Last 5 rows. Empty state: "All agents are healthy today. Suspicious."
7. Quick-action row — two buttons: "Book appointment" (indigo, filled) + "View all agents" (indigo, outline).
8. Responsive: single-column on mobile, grid layout on `sm:`.

---

## Group 3 — Empty states

9. `src/app/agents/page.tsx` — empty state when `agents.length === 0`: "No agents registered yet. Run `pnpm prisma db seed` to get started."
10. `src/app/ailments/page.tsx` — "The ailment catalog is empty. Enjoy it while it lasts."
11. `src/app/therapies/page.tsx` — "No therapies on file. Agents are on their own."
12. `src/app/appointments/page.tsx` — replace existing bare "No appointments yet." with a message + "Book appointment" CTA button.
13. Dashboard recent-appointments section — "All agents are healthy today. Suspicious." (already noted in Group 2).

---

## Group 4 — Skeleton primitives + loading files

14. Create `src/components/Skeleton.tsx` — export `SkeletonText` (animated gray bar), `SkeletonCard` (rounded box), `SkeletonRow` (table-row-width bar). Use `animate-pulse` from Tailwind.
15. Create `src/app/loading.tsx` — global fallback: three `<SkeletonCard>` blocks centered.
16. Create `src/app/agents/loading.tsx` — skeleton that mimics the agents table: header row + 5 skeleton rows.
17. Create `src/app/agents/[id]/loading.tsx` — skeleton that mimics the detail card + appointments section.
18. Create `src/app/ailments/loading.tsx` — skeleton cards matching the ailment grid.
19. Create `src/app/therapies/loading.tsx` — skeleton rows matching the therapy list.
20. Create `src/app/appointments/loading.tsx` — skeleton table rows matching appointments table.

---

## Group 5 — Error boundaries

21. Create `src/app/error.tsx` — global `'use client'` error component; displays "Something went wrong." + "Try again" button that calls `reset()`.
22. Create `src/app/agents/error.tsx` — same pattern, route-specific message.
23. Create `src/app/agents/[id]/error.tsx`.
24. Create `src/app/ailments/error.tsx`.
25. Create `src/app/therapies/error.tsx`.
26. Create `src/app/appointments/error.tsx`.
27. All error components share the same structure; keep them thin — no shared abstraction needed unless they diverge.

---

## Group 6 — Nav, smoke-test, quality gates

28. Verify the nav "Home" / logo link points to `/` and the dashboard renders correctly when logged in.
29. Manually smoke-test all routes: dashboard, agents, agents/[id], ailments, therapies, appointments, appointments/new.
30. Verify empty states render (use a logged-in session with the seeded DB, test by temporarily commenting out data or reading the empty branch).
31. Run `pnpm tsc --noEmit` — zero errors.
32. Run `vitest run` — all tests pass.
