# Backend (Express + MongoDB)

The backend is optional. The frontend will still render using fallback content from `src/data/*` if API calls fail.

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas (free tier is enough) or any reachable MongoDB instance

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Set the following variables in `backend/.env`:

- `MONGODB_URI` (required): MongoDB connection string
- `PORT` (optional): defaults to `4000`
- `CORS_ORIGIN` (optional): defaults to `*` (for local dev you can set `http://localhost:5173`)

## Run locally

```bash
cd backend
npm run dev
```

Backend defaults to `http://localhost:4000`.

## Routes

- `GET /api/health`
- `GET /api/projects`
- `GET /api/experience`
- `GET /api/skills`

The routes read from MongoDB via Mongoose models in `backend/src/models/*`.

## Seed the database

The seed script deletes and re-inserts documents from `backend/src/seed-data/*`.

```bash
cd backend
npm run seed
```

Notes:
- If you change the fallback arrays (`src/data/*`), also update the backend seed arrays (`backend/src/seed-data/*`) to keep frontend and backend consistent.
- See [data-model.md](data-model.md) for field shapes.

