# MVP — Validation Criteria

The MVP branch is complete and mergeable when every criterion below is met.

---

## 1. Dashboard

- [ ] `/` redirects unauthenticated users to `/login`.
- [ ] Dashboard shows three summary cards: **Active Agents** (count), **Open Appointments** (count), **Most Common Ailment** (name or "None yet").
- [ ] Agent health breakdown shows a count per status (Active / Inactive / Under Observation) with a coloured indicator.
- [ ] Recent appointments section lists the 5 most recent appointments with agent name, therapy, date, and status badge.
- [ ] Empty recent-appointments state shows the playful message ("All agents are healthy today. Suspicious.") rather than a blank section.
- [ ] "Book appointment" and "View all agents" quick-action CTAs are visible and link to the correct routes.
- [ ] Dashboard renders correctly at 375 px width: stacked layout, no horizontal scroll, no clipped content.

---

## 2. Empty states

- [ ] Visiting `/agents` with no agents shows a friendly non-empty message (no blank table or bare page).
- [ ] Visiting `/ailments` with no ailments shows a message.
- [ ] Visiting `/therapies` with no therapies shows a message.
- [ ] Visiting `/appointments` with no appointments shows a message **and** a "Book appointment" CTA link.
- [ ] Dashboard summary cards display `0` (not blank or NaN) when counts are zero.

---

## 3. Loading skeletons

- [ ] Each list page (`/agents`, `/ailments`, `/therapies`, `/appointments`) and `/agents/[id]` has a visible `loading.tsx` skeleton — no blank white screen on slow connections.
- [ ] Skeletons use `animate-pulse` and approximate the shape of the loaded page layout.
- [ ] Skeletons are responsive and do not cause horizontal scroll at 375 px.

---

## 4. Error boundaries

- [ ] Each route (`/agents`, `/agents/[id]`, `/ailments`, `/therapies`, `/appointments`) has an `error.tsx` that catches render errors and shows a message + "Try again" button.
- [ ] Clicking "Try again" calls `reset()` and retries the segment render.
- [ ] An error in one route does not crash the shared nav or any other route.
- [ ] The global `src/app/error.tsx` catches errors not covered by a route-level boundary.

---

## 5. TypeScript

- [ ] `pnpm tsc --noEmit` passes with zero errors.

---

## 6. No regressions

- [ ] Phase 1 login flow still works end-to-end.
- [ ] All Phase 2 pages (agents, ailments, therapies, appointments, appointments/new) still load and display data correctly.
- [ ] `vitest run` — all tests pass.
- [ ] `pnpm build` completes without errors.
