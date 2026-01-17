export interface Project {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  link: string
}

export const projects: Project[] = [
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
    id: 'project-2',
    title: 'Project Two',
    description:
      'Short description of the project highlighting tech used and user impact.',
    image: '/images/project-2.jpg',
    imageAlt: 'Screenshot of Project 2',
    link: '#',
  },
  {
    id: 'project-3',
    title: 'Project Three',
    description:
      'Short description of the project highlighting tech used and user impact.',
    image: '/images/project-3.jpg',
    imageAlt: 'Screenshot of Project 3',
    link: '#',
  },
]
