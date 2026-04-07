# Contact form (Formspree)

This site uses Formspree to submit the contact form from GitHub Pages.

## Setup

1. Create a form in Formspree and copy the endpoint URL (looks like `https://formspree.io/f/xxxxxxx`).
2. Set the endpoint in your environment:
   - Local dev: create `.env.local` (see `.env.example`) and set `VITE_FORMSPREE_ENDPOINT`
   - Production builds: set `VITE_FORMSPREE_ENDPOINT` in your build/deploy environment
3. Rebuild and redeploy.

