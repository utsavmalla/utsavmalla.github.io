# Project guide

This repo is a React + Vite portfolio with an optional Express + MongoDB backend.

## Frontend structure

- `src/api/`: frontend API client and backend URL handling.
- `src/components/`: reusable React components grouped by feature.
- `src/components/ui/`: shared UI primitives such as dialogs and status messages.
- `src/pages/`: route-level pages such as `Home`, `Admin`, `ManageProjects`, and `ManageCv`.
- `src/data/`: fallback portfolio data used when the backend is unavailable.
- `src/hooks/` and `src/context/`: shared React behavior.
- `src/styles/globals.css`: global styles and design tokens.

## Backend structure

- `backend/src/index.ts`: Express app setup and route mounting.
- `backend/src/routes/`: HTTP route handlers and auth-protected endpoints.
- `backend/src/models/`: Mongoose schemas plus model-backed data operations.
- `backend/src/middleware/`: Express middleware such as auth verification.
- `backend/src/lib/`: backend service clients such as Supabase.
- `backend/src/seed-data/`: MongoDB seed data matching frontend fallback shapes.

## Data flow

Frontend sections fetch through `src/api/client.ts`. Backend routes read/write via Mongoose models. If project, experience, or skill API calls fail, the frontend keeps rendering fallback arrays from `src/data/*`.

Admin pages live under `/admin`, including `/admin/projects` and `/admin/cv`.

