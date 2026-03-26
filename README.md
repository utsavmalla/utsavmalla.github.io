# Utsav Malla Portfolio

Modern, responsive portfolio website built with React, TypeScript, and Vite.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Helmet Async

## Quick Start (Frontend)

### Prerequisites

- Node.js 18+ and npm

### Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

### Scripts (root)

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Backend (optional)

This repo includes a small Express + MongoDB backend to serve portfolio data (`projects`, `experience`, `skills`). The frontend fetches from the backend on mount and **falls back to the local arrays in `src/data/*` if the API call fails**.

See:
- [docs/backend.md](docs/backend.md) (setup, env vars, routes, seeding)
- [docs/data-model.md](docs/data-model.md) (API shapes + where data lives)

## Configuration (environment variables)

- **Frontend**
  - `VITE_API_BASE_URL` (defaults to `http://localhost:4000`)
  - `VITE_FORMSPREE_ENDPOINT`
- **Backend**
  - `MONGODB_URI` (required)
  - `PORT` (default `4000`)
  - `CORS_ORIGIN` (default `*`)

Related docs:
- [docs/backend.md](docs/backend.md)
- [docs/contact-form.md](docs/contact-form.md)

## Docs

- [docs/backend.md](docs/backend.md)
- [docs/data-model.md](docs/data-model.md)
- [docs/deployment.md](docs/deployment.md)
- [docs/contact-form.md](docs/contact-form.md)

## Project Structure

```
src/
  api/           # frontend API client
  components/    # React components
  context/       # React Context providers
  data/          # fallback TypeScript data arrays
  hooks/         # custom React hooks
  styles/        # global CSS styles
  App.tsx
  main.tsx
backend/         # optional Express API + MongoDB
docs/            # developer documentation
```

## Cursor repo context (markdown to maintain)

- `.cursor/AGENTS.md` is the **primary Cursor context note** for this repo (how to run, architecture/data flow, conventions, and a prompt checklist). Keep it updated when you change scripts, env vars, endpoints, or data shapes.
- Optional: add `.cursor/rules/*.md` if you want stricter, enforceable coding conventions later.
- Recommended split of responsibilities:
  - Keep `README.md` short and stable (entry point + links)
  - Keep `docs/*.md` for longer setup/deployment guides
  - Keep `.cursor/AGENTS.md` for “how to work in this repo with Cursor” (prompt checklist + source-of-truth notes)

## License

© 2024 Utsav Malla. All rights reserved.
