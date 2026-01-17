import { copyFileSync } from 'fs'
import { join } from 'path'

try {
  copyFileSync('CNAME', join('dist', 'CNAME'))
  console.log('✓ CNAME copied to dist')
} catch (error) {
  console.error('Error copying CNAME:', error.message)
  process.exit(1)
}
