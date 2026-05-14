# Requirements — Phase 1: Project Scaffold

## Context

AgentClinic is a playful-but-real clinic management app for AI agents (see `specs/mission.md`). Phase 1 establishes the technical foundation that every subsequent phase builds on: a running Next.js app, a connected database, and a working staff login.

The current repo is a bare TypeScript scaffold (`src/index.ts`, no framework, no DB). Phase 1 replaces it entirely.

## In scope

- Next.js app with App Router, TypeScript (strict), and Tailwind CSS.
- Prisma ORM connected to a local SQLite database.
- A `User` model in the Prisma schema representing staff members.
- One seeded staff user for development login.
- NextAuth.js credentials provider that authenticates against the `User` table.
- A `/login` page and a stub `/dashboard` page (protected route).

## Out of scope

- Vercel deployment (deferred to a later phase).
- Any domain models beyond `User` (Agent, Ailment, Therapy, Appointment come in later phases).
- Email-based auth, OAuth, or role-based access control.
- UI polish, responsive layout, or empty states.

## Locked decisions

| Decision | Value | Reason |
|---|---|---|
| TypeScript mode | `strict: true`, no suppressions | Enforced from day one per Mary's reliability requirement |
| Database target | SQLite via `DATABASE_URL=file:./dev.db` in `.env` | No server to install or configure; simplest path for local dev |
| Auth approach | Credentials provider querying Prisma `User` table | Avoids hardcoded secrets; sets up the User model needed by later phases |
| Package manager | pnpm | Per tech-stack spec |

## Open questions

- Password hashing: `bcryptjs` (pure JS, no native deps) vs `argon2`. Default to `bcryptjs` unless changed.
- Session strategy: JWT (default for credentials provider) is fine for Phase 1; can switch to database sessions later.
