import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const galleryDir = path.join(__dirname, 'public', 'gallery')
const outputJson = path.join(__dirname, 'src', 'gallery-list.json')

try {
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true })
  }

  const files = fs.readdirSync(galleryDir)
  const mediaExtensions = [
    '.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.bmp',
    '.mp4', '.webm', '.mov', '.ogg'
  ]

  const mediaFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return mediaExtensions.includes(ext)
  })

  fs.writeFileSync(outputJson, JSON.stringify(mediaFiles, null, 2))
  console.log(`Generated gallery list with ${mediaFiles.length} items.`)
} catch (error) {
  console.error('Error generating gallery list:', error)
}
