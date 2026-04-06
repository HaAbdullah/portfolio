import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Scans public/gallery/ and writes public/gallery-manifest.json automatically.
// Just drop files into public/gallery/ — no code changes needed.
function galleryManifestPlugin() {
  const galleryDir = path.resolve(__dirname, 'public/gallery')
  const manifestPath = path.resolve(__dirname, 'public/gallery-manifest.json')

  const write = () => {
    if (!fs.existsSync(galleryDir)) return
    const files = fs.readdirSync(galleryDir).filter(f => !f.startsWith('.'))
    fs.writeFileSync(manifestPath, JSON.stringify(files))
  }

  return {
    name: 'gallery-manifest',
    buildStart() { write() },
    configureServer(server: any) {
      write()
      server.watcher.add(galleryDir)
      server.watcher.on('add', (f: string) => { if (f.startsWith(galleryDir)) write() })
      server.watcher.on('unlink', (f: string) => { if (f.startsWith(galleryDir)) write() })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), galleryManifestPlugin()],
  // Use base path for GitHub Pages, root for Vercel
  base: process.env.NODE_ENV === 'production' && process.env.DEPLOY_TARGET === 'github' ? '/portfolio/' : '/',
})
