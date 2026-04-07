import { copyFileSync, readFileSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'

try {
  const distPath = 'dist'
  
  // Detect which branch this build is for
  // GitHub Actions provides GITHUB_REF environment variable
  const githubRef = process.env.GITHUB_REF || ''
  const isStaging = githubRef === 'refs/heads/staging'
  
  console.log(`Branch: ${githubRef || 'local'}`)
  
  // Only copy CNAME for production (main branch)
  // Staging uses GitHub Pages default URL: staging.utsavmalla.github.io
  if (!isStaging) {
    copyFileSync('CNAME', join(distPath, 'CNAME'))
    console.log('✓ CNAME copied to dist (production deployment)')
  } else {
    console.log('✓ Skipped CNAME (staging uses GitHub Pages default: staging.utsavmalla.github.io)')
  }
  
  // Create .nojekyll to prevent Jekyll from processing files (fixes MIME type issues)
  writeFileSync(join(distPath, '.nojekyll'), '')
  console.log('✓ .nojekyll created')
  
  // Create 404.html for GitHub Pages SPA routing
  // GitHub Pages will serve this for any 404, allowing React Router to handle routing
  const indexPath = join(distPath, 'index.html')
  if (existsSync(indexPath)) {
    const indexContent = readFileSync(indexPath, 'utf-8')
    writeFileSync(join(distPath, '404.html'), indexContent)
    console.log('✓ 404.html created for SPA routing')
  }
} catch (error) {
  console.error('Error in post-build script:', error.message)
  process.exit(1)
}
