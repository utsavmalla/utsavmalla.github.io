import { copyFileSync, readFileSync, existsSync, writeFileSync } from 'fs'
import { join } from 'path'

try {
  const distPath = 'dist'
  
  // Copy CNAME for custom domain
  copyFileSync('CNAME', join(distPath, 'CNAME'))
  console.log('✓ CNAME copied to dist')
  
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
