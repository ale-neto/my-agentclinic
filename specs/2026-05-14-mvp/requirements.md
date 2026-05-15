# MVP — Requirements: Dashboard + Polish

## Scope

Deliver Phase 3 (staff dashboard) and Phase 4 (polish) in a single vertical slice. The MVP is "done" when the home page provides a meaningful at-a-glance view for staff and the app handles loading and failure states gracefully across all routes.

### Phase 3 — Staff Dashboard

The home page (`/`) is currently a public marketing splash. After this phase it becomes a protected staff dashboard:

| Section | Content |
|---|---|
| Summary cards | Active agent count, open appointment count, most common ailment |
| Agent health breakdown | Count of agents per status (Active / Inactive / Under Observation) |
| Recent appointments | Last 5 appointments: agent name, therapy, scheduled date, status badge |
| Quick-action CTAs | "Book appointment" → `/appointments/new`, "View all agents" → `/agents` |

### Phase 4 — Polish

| Item | Scope |
|---|---|
| Empty states | All list pages + dashboard sections show a friendly message + CTA when data is absent |
| Loading skeletons | Per-route `loading.tsx` files with Suspense-compatible skeleton placeholders |
| Error boundaries | Per-route `error.tsx` client components with a "Try again" button |

Accessibility pass is explicitly **out of scope** for this branch.

---

## Decisions

### Dashboard replaces the public splash
The existing marketing landing page at `/` is removed entirely. Staff who hit `/` unauthenticated are redirected to `/login`. There is no separate "landing page" — this is an internal tool.

### Stats computed server-side
All dashboard aggregates (counts, most-common ailment, breakdown) are computed in a new `src/lib/stats.ts` module using Prisma queries. No client-side fetches or API routes needed.

### getMostCommonAilment via groupBy
The "most common ailment" card counts how many appointments reference each ailment (via therapy → ailmentId), then returns the ailment name with the highest count. Falls back to "None yet" when there are no appointments.

### Loading skeletons via Next.js Suspense
Each route gets a `loading.tsx` alongside its `page.tsx`. A shared `<Skeleton />` component provides consistent placeholder shapes (text bars, card outlines, table rows). No third-party skeleton library.

### Error boundaries are client components
`error.tsx` files must be `'use client'` (Next.js requirement). Each renders a short message and a "Try again" button wired to the `reset` prop.

### Empty states are inline
Empty states are rendered inline in the same server component with a conditional check. No separate wrapper component unless the exact same pattern repeats more than twice.

### Tone of empty states
Empty states must be playful, per `specs/mission.md`. An empty appointments list is not "No data found" — it is "All agents are healthy today. Suspicious." Ailments empty state: "The catalog is empty. Enjoy it while it lasts."

---

## Context

- Stack: Next.js App Router, Prisma + SQLite, Tailwind CSS, NextAuth.js — see `specs/tech-stack.md`.
- Every page must be responsive: mobile (375 px) → tablet → desktop using Tailwind's `sm:` / `md:` / `lg:` breakpoints.
- Tone: satirical and playful — see `specs/mission.md`.
