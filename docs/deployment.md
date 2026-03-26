# Deployment

This project is set up for GitHub Pages deployment with a custom domain.

## Build

From the project root:

```bash
npm run build
```

Output goes to `dist/`.

## CNAME

The root build script runs `node scripts/copy-cname.js` to ensure `CNAME` is present in `dist/` during deployment.

## GitHub Pages

Typical flow:

1. Build the project (`npm run build`)
2. Deploy the `dist/` folder via your preferred GitHub Pages workflow (Actions or manual)

