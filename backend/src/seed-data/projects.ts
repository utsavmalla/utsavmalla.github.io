export interface ProjectSeed {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  link: string
}

export const projectsSeed: ProjectSeed[] = [
  {
    id: 'campnepal',
    title: 'CampNepal — Campground Explorer & Reviews',
    description:
      'CampNepal is a small full‑stack web app for discovering, creating and reviewing camping spots in Nepal. Built with Node.js and Express, views use EJS/ejs‑mate, data is stored in MongoDB via Mongoose, and input is validated with Joi; method‑override enables PUT/DELETE from forms. Users can browse campgrounds, add/edit listings, and leave reviews — making it easy to share and find trusted camping locations.',
    image: '/images/CampNepalPreview.png',
    imageAlt: 'Screenshot of CampNepal project',
    link: 'https://github.com/utsavmalla/Camp-Nepal',
  },
  {
    id: 'portfolio',
    title: 'My Portfolio',
    description:
      'A modern, responsive portfolio website built with React, TypeScript, and Vite. This project is configured for GitHub Pages and action for CI/CD with a custom domain.',
    image: '/images/portfolio.png',
    imageAlt: 'Screenshot of My Portfolio',
    link: 'https://github.com/utsavmalla/utsavmalla.github.io',
  },
  {
    id: 'inspect-ease-dash',
    title: 'InspectEase Dash',
    description:
      'A dashboard for easy inspection management, built with React, TypeScript, Vite, tailwindcss and Build using cursor and loveldev tools. It provides a user-friendly interface for tracking and managing inspections efficiently.',
    image: '/images/inspection esy dashboard.png',
    imageAlt: 'Screenshot of InspectEase Dash',
    link: 'https://github.com/TombTeam/inspect-ease-dash',
  },
]

