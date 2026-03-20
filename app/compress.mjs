import sharp from 'sharp'
import { readdirSync, mkdirSync } from 'fs'

const inputDir = '../public/hero-imgs'
const outputDir = '../public/hero-imgs/compressed'

mkdirSync(outputDir, { recursive: true })

const files = readdirSync(inputDir).filter(f => f.endsWith('.webp'))

for (const file of files) {
  await sharp(`${inputDir}/${file}`)
    .resize(1920, 1080, { fit: 'cover', withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(`${outputDir}/${file}`)
  console.log(`compressed ${file}`)
}