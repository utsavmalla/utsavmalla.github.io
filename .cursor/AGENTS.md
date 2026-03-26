# Utsav Malla Portfolio - Cursor Repo Note

This file is loaded by Cursor to reduce repeated context and to keep future edits consistent.

## Run / Build / Preview

Frontend (project root):
- `npm run dev` (Vite dev server)
- `npm run build` (runs `tsc`, then `vite build`, then copies CNAME)
- `npm run preview` (previews production build)
- `npm run lint`

Backend (`backend/`):
- `npm run dev` (Express + TS via `ts-node-dev`)
- `npm run build` (`tsc`)
- `npm run seed` (re-seeds MongoDB from `backend/src/seed-data/*`)

## Environment Variables

- Frontend:
  - `VITE_API_BASE_URL` (default: `http://localhost:4000`)
  - `VITE_FORMSPREE_ENDPOINT` (contact form)
- Backend:
  - `MONGODB_URI` (required)
  - `PORT` (optional, default: `4000`)
  - `CORS_ORIGIN` (optional, default: `*`)

## Architecture (high level)

Vite + React frontend renders sections. On mount, `Projects`, `Experience`, and `Skills` fetch data from the Express backend.

If the API request fails, each component keeps using the local fallback arrays in `src/data/*`.

### Data flow diagram

```mermaid
flowchart LR
  ProjectsUI[React Components (Projects/Experience/Skills)] -->|fetchProjects()/fetchExperience()/fetchSkills()| ApiClient[src/api/client.ts]
  ApiClient -->|GET /api/projects| ProjectsRoute[backend/src/routes/projects.ts]
  ApiClient -->|GET /api/experience| ExperienceRoute[backend/src/routes/experience.ts]
  ApiClient -->|GET /api/skills| SkillsRoute[backend/src/routes/skills.ts]
  ProjectsRoute --> ModelsProjects[Mongoose ProjectModel]
  ExperienceRoute --> ModelsExperience[Mongoose ExperienceModel]
  SkillsRoute --> ModelsSkills[Mongoose SkillModel]
  ModelsProjects -->|json| ProjectsUI
  ModelsExperience -->|json| ProjectsUI
  ModelsSkills -->|json| ProjectsUI
  Seed[backend/src/scripts/seed.ts] -->|insertMany| ModelsProjects
  Seed -->|insertMany| ModelsExperience
  Seed -->|insertMany| ModelsSkills
  Fallback[src/data/*] --> ProjectsUI
```

## Key Files (source-of-truth)

Frontend:
- `src/api/client.ts` (defines `API_BASE_URL` and `fetchProjects/Experience/Skills`)
- `src/components/Projects/Projects.tsx` (uses fallback `src/data/projects.ts`)
- `src/components/Experience/Experience.tsx` (uses fallback `src/data/experience.ts`)
- `src/components/Skills/Skills.tsx` (uses fallback `src/data/skills.ts`)
- `src/data/projects.ts` (shape: `Project`)
- `src/data/experience.ts` (shape: `ExperienceItem`)
- `src/data/skills.ts` (shape: `Skill`)

Backend:
- `backend/src/index.ts` (Express app + routes mount points)
- `backend/src/routes/projects.ts`
- `backend/src/routes/experience.ts`
- `backend/src/routes/skills.ts`
- `backend/src/models/*` (Mongoose schemas)
- `backend/src/scripts/seed.ts` (deletes + re-inserts from seed arrays)
- `backend/src/seed-data/*` (seed arrays)

## Conventions to follow

- TypeScript is `strict: true` in `tsconfig.json`.
- ESLint is present at the root; extend it when needed rather than disabling rules.
- Keep React components simple: fetch on mount with `useEffect`, store in local state, and keep the fallback arrays in `src/data/*`.
- Maintain API contract compatibility:
  - `Project` fields: `id`, `title`, `description`, `image`, `imageAlt`, `link`
  - `ExperienceItem` fields: `title`, `duration`, `responsibilities[]`
  - `Skill` fields: `name`, `proficiency`

## Recommended Cursor Workflow (prompt checklist)

When you ask Cursor to make a change, include:
- Goal/behavior (what should happen)
- Expected file(s) to edit (front vs backend, and which section)
- API contract details (endpoints + response shape) if it affects data
- Fallback impact (should `src/data/*` be updated, and should seed data be updated?)
- Acceptance checks:
  - Which component(s) should change
  - What to verify (browser render + API responses, if applicable)

Tip: Ask Cursor to “summarize the impact before editing” to reduce unnecessary diffs/tokens.

## Common tasks

- Add a new project card:
  - Update `src/data/projects.ts` with a new `Project` object
  - Update `backend/src/seed-data/projects.ts` with matching fields
  - Add the image into `public/images/` and ensure the `image` string matches the public path
  - Verify `Projects.tsx` renders the new card and the link behavior works as expected

- Update skills/experience:
  - Update both `src/data/skills.ts` (or `experience.ts`) and `backend/src/seed-data/skills.ts` (or `experience.ts`)
  - Keep field names consistent with the Mongoose models

- Debug “data not showing”:
  - Check frontend `VITE_API_BASE_URL` (defaults to `http://localhost:4000`)
  - Confirm backend routes work: `GET /api/projects`, `/api/experience`, `/api/skills`
  - If backend is failing, components should still display fallback content (so the UI should not be blank)

