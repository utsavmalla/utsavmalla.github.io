# Data model (frontend + backend)

This project supports two sources for portfolio data:

- **Backend API (preferred when running backend)**: Express endpoints served from MongoDB.
- **Frontend fallback (always available)**: static arrays in `src/data/*`.

The UI components (`Projects`, `Experience`, `Skills`) fetch from the backend on mount and fall back to `src/data/*` if the request fails.

## Project

Used by:
- Frontend fallback: `src/data/projects.ts`
- Backend seed: `backend/src/seed-data/projects.ts`
- Backend model: `backend/src/models/Project.ts`

Fields:
- `id: string` (unique)
- `title: string`
- `description: string`
- `image: string` (public path like `/images/foo.png`)
- `imageAlt: string`
- `link: string`

## ExperienceItem

Used by:
- Frontend fallback: `src/data/experience.ts`
- Backend seed: `backend/src/seed-data/experience.ts`
- Backend model: `backend/src/models/Experience.ts`

Fields:
- `title: string`
- `duration: string`
- `responsibilities: string[]`

## Skill

Used by:
- Frontend fallback: `src/data/skills.ts`
- Backend seed: `backend/src/seed-data/skills.ts`
- Backend model: `backend/src/models/Skill.ts`

Fields:
- `name: string`
- `proficiency: number` (0–100)

## Keeping data consistent

When you add/update portfolio content, decide which mode you support:

- **Frontend-only mode**: edit only `src/data/*`.
- **Frontend + backend mode**: update both `src/data/*` and `backend/src/seed-data/*`, then re-run `npm run seed` in `backend/`.

