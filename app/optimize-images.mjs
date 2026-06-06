import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const PUBLIC = './public'

const targets = [
  // Photos artistes — max 1400px large, qualité 82
  { file: 'artist-empreinte.png', width: 1400, quality: 82 },
  { file: 'artist-akapov.png',    width: 1400, quality: 82 },
  { file: 'artist-indicible.jpg', width: 1400, quality: 82 },
  { file: 'artist-feuillette.jpg',width: 1400, quality: 82 },
  // Photos de sections — max 1600px
  { file: 'apropos.png',          width: 1600, quality: 82 },
  { file: 'coprod.png',           width: 1600, quality: 82 },
  { file: 'edition.png',          width: 1600, quality: 82 },
  { file: 'Cover_flower.jpg',     width: 1600, quality: 85 },
  // Logo
  { file: 'logo-fx.png',          width: 800,  quality: 90 },
  // Covers discographie — max 600px
  { file: 'cover-vertigo-inst.jpg',   width: 600, quality: 82 },
  { file: 'cover-satellite.jpg',      width: 600, quality: 82 },
  { file: 'cover-ice-cold-knives.jpg',width: 600, quality: 82 },
  { file: 'cover-void.jpg',           width: 600, quality: 82 },
  { file: 'cover-ordre-temple.jpg',   width: 600, quality: 82 },
  { file: 'cover-indicible-ep.jpg',   width: 600, quality: 82 },
  { file: 'cover-melted.jpg',         width: 600, quality: 82 },
  { file: 'cover-shame.jpg',          width: 600, quality: 82 },
]

for (const { file, width, quality } of targets) {
  const input = join(PUBLIC, file)
  const ext = extname(file).toLowerCase()
  const isJpg = ext === '.jpg' || ext === '.jpeg'

  try {
    const before = statSync(input).size
    const img = sharp(input).resize({ width, withoutEnlargement: true })
    const buf = isJpg
      ? await img.jpeg({ quality, mozjpeg: true }).toBuffer()
      : await img.png({ quality, compressionLevel: 9 }).toBuffer()

    await sharp(buf).toFile(input)
    const after = statSync(input).size
    const ratio = Math.round((1 - after / before) * 100)
    console.log(`✓ ${file.padEnd(30)} ${(before/1024/1024).toFixed(1)}MB → ${(after/1024).toFixed(0)}KB  (-${ratio}%)`)
  } catch (e) {
    console.error(`✗ ${file}: ${e.message}`)
  }
}
