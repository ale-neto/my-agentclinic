# Plan — Phase 1: Project Scaffold

## Group 1 — Next.js scaffold

1. Replace the bare TypeScript project with a Next.js app: run `create-next-app` with App Router, TypeScript, Tailwind CSS, and `src/` directory layout.
2. Confirm `tsconfig.json` has `"strict": true`; remove placeholder `src/index.ts`.
3. Verify `next dev` starts and the default home page renders without errors.

## Group 2 — Prisma + SQLite

4. Install Prisma and `@prisma/client`; run `prisma init`.
5. Set `DATABASE_URL=file:./dev.db` in `.env`.
6. Add a `User` model to `schema.prisma` (id, email, passwordHash, name, createdAt).
7. Run `prisma migrate dev --name init` to apply the schema.
8. Write `prisma/seed.ts`: insert one staff user with a bcrypt-hashed password and run it via `prisma db seed`.

## Group 3 — NextAuth credentials provider

9. Install `next-auth` and `bcryptjs` (plus `@types/bcryptjs`).
10. Create `src/lib/auth.ts` exporting NextAuth config with a credentials provider that queries Prisma and verifies the password hash.
11. Add the route handler at `src/app/api/auth/[...nextauth]/route.ts`.
12. Create a minimal `/login` page with email + password form wired to `signIn`.
13. Add a stub `/dashboard` page protected by `getServerSession`; redirect unauthenticated visitors to `/login`.

## Group 5 — Layout shell

18. Create `src/styles/layout.css` with structural rules for the page shell (flex column, sticky header, sticky footer, grow main area).
19. Create `src/components/layout/Header.tsx`, `Main.tsx`, and `Footer.tsx` as three focused subcomponents.
20. Create `src/components/layout/Layout.tsx`: import the CSS file (Next.js emits a `<link rel="stylesheet">` automatically) and compose the three subcomponents.
21. Update `src/app/layout.tsx` to wrap page content in `<Layout>`.
22. Update existing pages — replace outer `<main>` with `<div>` so the one semantic `<main>` lives only in `Main.tsx`.

## Group 4 — Verification

14. Run `tsc --noEmit` — must exit with zero errors.
15. Start `next dev`; confirm the home page loads with no console errors.
16. Open `/login`, submit the seeded credentials, and confirm redirect to `/dashboard`.
17. Confirm the seed script reports the correct row count, proving the database is reachable.
