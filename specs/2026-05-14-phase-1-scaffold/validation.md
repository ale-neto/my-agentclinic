# Validation — Phase 1: Project Scaffold

Phase 1 is complete and ready to merge when all three checks below pass manually.

## 1. App loads in browser

- Run `pnpm dev`.
- Open `http://localhost:3000` in a browser.
- The page renders without a runtime error or white screen.
- The browser console shows no uncaught exceptions.

## 2. Database is reachable

- Run `pnpm prisma migrate dev` — Prisma creates `dev.db` automatically (no server needed).
- Run `pnpm prisma db seed`.
- The seed script exits successfully and prints a confirmation (e.g. "Seeded 1 user").
- Running `pnpm prisma studio` (or a quick `findMany` in a test script) shows the seeded user row.

## 3. Staff can log in end-to-end

- Navigate to `http://localhost:3000/login`.
- Enter the seeded staff credentials (email + password from `.env` or seed script).
- Submit the form.
- The app redirects to `/dashboard` and the session is active (user info visible or no redirect back to login).
- Navigating directly to `/dashboard` while unauthenticated redirects to `/login`.

---

## Not required for merge

- Vercel deployment (out of scope for Phase 1).
- `tsc --noEmit` clean run is strongly encouraged but not a hard gate; strict mode is enforced from the start, so zero errors should be achievable.
- Automated tests (none exist yet in this phase).
