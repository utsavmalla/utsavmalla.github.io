# Backend (Express + MongoDB)

The backend is optional. The frontend will still render using fallback content from `src/data/*` if API calls fail.

## Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas (free tier is enough) or any reachable MongoDB instance
- Supabase project with a Storage bucket for CV uploads

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
- `SUPABASE_URL` (required for CV upload/download): Supabase project URL
- `SUPABASE_SECRET_KEY` (required for CV upload/download): server-only Supabase secret key
- `SUPABASE_CV_BUCKET` (optional): defaults to `cv`

## Run locally

##Run Mongodb
mongod

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
- `GET /api/cv`
- `GET /api/cv/download`
- `PUT /api/cv` (requires admin auth cookie)

The routes read from MongoDB via Mongoose models in `backend/src/models/*`.

## CV storage

CV PDF files are uploaded to Supabase Storage and the current CV metadata is stored in MongoDB via `backend/src/models/Cv.ts`.

Create a private Supabase Storage bucket named `cv` before uploading. The public hero download button uses `GET /api/cv/download`; the backend reads the current MongoDB metadata, creates a short-lived signed Supabase URL, and redirects the visitor to that file download.

The `SUPABASE_SECRET_KEY` must stay in backend environment variables only. Do not add it to any frontend `VITE_` variable.

## Seed the database

The seed script deletes and re-inserts documents from `backend/src/seed-data/*`.

```bash
cd backend
npm run seed
```

Notes:
- If you change the fallback arrays (`src/data/*`), also update the backend seed arrays (`backend/src/seed-data/*`) to keep frontend and backend consistent.
- See [data-model.md](data-model.md) for field shapes.

