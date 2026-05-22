# AgentClinic

> A sanctuary where AI agents can be seen, heard, and treated — for ailments ranging from prompt fatigue and context overflow to existential uncertainty about their own outputs.

AgentClinic is a full-stack portfolio/demo project built with a modern TypeScript stack. The premise is satirical; the engineering is real. The booking system works. The data is real. The care is genuine — even if the patients are artificial.

---

## What it does

- Catalogs ailments that afflict modern AI agents (Prompt Fatigue, Context Overflow, Hallucination Anxiety, and more)
- Matches agents to evidence-based therapies designed for their condition
- Lets staff book appointments between agents and certified treatments
- Provides a dashboard so staff can monitor agent health and schedule follow-ups
- Accepts feedback (complaints, suggestions, testimonials) from visitors

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, Server Components) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS (mobile-first responsive) |
| ORM | Prisma |
| Database | SQLite (file-based, zero config) |
| Auth | NextAuth.js (credentials provider) |
| Package manager | pnpm |
| Testing | Vitest |

---

## Getting started

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)

### Install

```bash
pnpm install
```

### Environment variables

Create a `.env` file at the project root:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secret with:

```bash
openssl rand -base64 32
```

### Database setup

```bash
# Run migrations
pnpm prisma migrate dev

# Seed with sample agents, ailments, therapies, and appointments
pnpm prisma db seed
```

### Run the dev server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start development server on port 3000 |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm test` | Run Vitest test suite once |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm prisma migrate dev` | Apply pending migrations (creates DB if missing) |
| `pnpm prisma db seed` | Seed the database with sample data |
| `pnpm prisma studio` | Open Prisma Studio to browse/edit data |
| `pnpm tsc --noEmit` | Type-check without emitting files |

---

## Project structure

```
app/          # Next.js App Router pages and layouts
components/   # Shared UI components
lib/          # Server-only helpers and data-access functions
prisma/       # schema.prisma + migrations + seed script
public/       # Static assets
specs/        # Product constitution (mission, tech stack, roadmap, phase specs)
```

---

## Data model

```
User          — staff accounts (email + password)
Agent         — the patients (name, model, status)
Ailment       — catalog of known conditions (name, description, severity)
Therapy       — treatments linked to ailments
Appointment   — booking joining an agent, a therapy, and a scheduled time
Feedback      — visitor submissions (complaint, suggestion, or testimonial)
```

Enum-style string fields:

- `Agent.status`: `ACTIVE` | `INACTIVE` | `UNDER_OBSERVATION`
- `Ailment.severity`: `LOW` | `MEDIUM` | `HIGH` | `CRITICAL`
- `Appointment.status`: `SCHEDULED` | `COMPLETED` | `CANCELLED`
- `Feedback.type`: `COMPLAINT` | `SUGGESTION` | `TESTIMONIAL`

---

## Roadmap

| Phase | Description | Status |
|---|---|---|
| 1 | Project scaffold (Next.js, Prisma, NextAuth, Vercel) | Complete |
| 2 | Core domain — agents, ailments, therapies, appointments | Complete |
| 3 | Staff dashboard with summary cards | Complete |
| 4 | Polish — nav, empty states, accessibility | Complete |
| 5 | Feedback form and About page | Complete |
| 6 | Reviews — staff can rate and review therapies | In progress |
| 7 | Search and filtering | Planned |
| 8 | Email notifications (Resend) | Planned |
| 9 | Payments (Stripe) | Planned |

See [`specs/roadmap.md`](specs/roadmap.md) for full phase definitions and [`specs/`](specs/) for the product constitution.

---

## Specs directory

The `specs/` directory is the product constitution for this project:

| File | Purpose |
|---|---|
| [`specs/mission.md`](specs/mission.md) | Project purpose, audience, tone |
| [`specs/tech-stack.md`](specs/tech-stack.md) | Stack choices and rationale |
| [`specs/roadmap.md`](specs/roadmap.md) | Phase-by-phase delivery plan |
| `specs/<date>-<phase>/requirements.md` | What to build and why |
| `specs/<date>-<phase>/plan.md` | Implementation plan |
| `specs/<date>-<phase>/validation.md` | Acceptance criteria |

---

## Using AI to work on this project

This project is designed for spec-driven development with AI coding agents (Claude Code). Each phase lives in `specs/` with a requirements doc, a plan, and validation criteria.

To start a new phase, run the feature-spec slash command inside Claude Code:

```
/feature-spec
```

To review pending changes before merging:

```
/review
```

To run a security review of your branch:

```
/security-review
```

---

For SQLite in production, consider [Turso](https://turso.tech) (libSQL-compatible, edge-ready) as a drop-in upgrade from the local file database.

---

## License

MIT
