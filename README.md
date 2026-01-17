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
