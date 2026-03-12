# Utsav Malla Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Vite.

## Features

- 🎨 Dark/Light theme toggle with persistence
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- ♿ Accessible with ARIA labels and keyboard navigation
- 🎯 SEO optimized with React Helmet
- 🎭 Smooth scroll animations
- 📝 Form validation

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Helmet Async** - SEO meta tags
- **CSS Variables** - Theming system

## Getting Started

### Prerequisites
npm
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/utsavmalla/utsavmalla.github.io.git
cd utsavmalla.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Backend (Node.js + MongoDB Atlas)

The portfolio data (projects, experience, skills) can be served from a small Node.js/Express backend using MongoDB Atlas instead of only static files.

Backend code lives in the `backend/` folder.

### Backend prerequisites

- Node.js 18+ and npm
- A free-tier MongoDB Atlas cluster (M0)

### Backend setup

```bash
cd backend
npm install        # if not already installed
cp .env.example .env
```

Edit `.env` with:

- `MONGODB_URI` – your MongoDB Atlas connection string
- `PORT` – e.g. `4000`
- `CORS_ORIGIN` – frontend origin for local dev: `http://localhost:5173`

### Seed the database

The seed script reuses the existing TypeScript data in `src/data/` so you keep a single source of truth.

```bash
cd backend
npm run seed
```

This will:

- Connect to MongoDB Atlas using `MONGODB_URI`
- Clear and insert data into the `projects`, `experience`, and `skills` collections

### Run backend locally

```bash
cd backend
npm run dev
```

This starts the Express server (default `http://localhost:4000`) with routes:

- `GET /api/health`
- `GET /api/projects`
- `GET /api/experience`
- `GET /api/skills`

You can test these endpoints using a browser, Postman, or Thunder Client.

### Frontend → backend integration

The frontend uses a small API client in `src/api/client.ts` and reads the backend base URL from:

- `VITE_API_BASE_URL` – e.g. `http://localhost:4000` for local dev, or your Render/Railway URL in production.

React components (`Projects`, `Experience`, `Skills`) now:

- Fetch data from the backend on mount
- Fall back to the existing static arrays in `src/data/` if the API call fails

## Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory, ready for deployment.

## Deployment

This project is configured for GitHub Pages deployment with a custom domain.

1. Build the project: `npm run build`
2. The `CNAME` file is automatically copied to `dist` during build
3. Deploy the `dist` folder to GitHub Pages

## Contact Form (Formspree)

This site uses [Formspree](https://formspree.io/) to submit the contact form from GitHub Pages.

1. Create a form in Formspree and copy the endpoint URL (looks like `https://formspree.io/f/xxxxxxx`)
2. Set the endpoint in your environment:
   - Local dev: create `.env.local` (see `.env.example`) and set `VITE_FORMSPREE_ENDPOINT`
   - Production (GitHub Pages build): set `VITE_FORMSPREE_ENDPOINT` in your build/deploy environment
3. Rebuild + redeploy

## Project Structure

```
src/
  components/     # React components
  context/        # React Context providers
  data/           # TypeScript data files
  hooks/          # Custom React hooks
  styles/         # Global CSS styles
  App.tsx         # Main app component
  main.tsx        # Entry point
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

© 2024 Utsav Malla. All rights reserved.
