# Changelog

## 2026-05-14

- Scaffolded Next.js 14 app (App Router, TypeScript strict, Tailwind CSS)
- Added Prisma ORM with SQLite and `User` model; seeded one staff user
- Wired NextAuth.js credentials provider against the `User` table
- Built layout shell: sticky `Header`, growing `Main`, `Footer`
- Added `/login` page and protected `/dashboard` stub
- Wrote Phase 1 specs: mission, tech stack, roadmap, requirements, validation plan
- Added Vitest test suite: unit tests for `authorize` callback and DB integration test
- Made all pages responsive with Tailwind mobile-first breakpoints (`sm:`, `md:`)
- Updated specs to require responsive design as a cross-cutting constraint
- Consolidated roadmap phases 2–5 into a single Phase 2 (full domain slice)
