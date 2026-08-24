import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const adminEntry = {
  name: 'admin-entry',
  closeBundle() {
    const distDir = resolve(process.cwd(), 'dist')
    const adminDir = resolve(distDir, 'admin')
    mkdirSync(adminDir, { recursive: true })
    copyFileSync(resolve(distDir, 'index.html'), resolve(adminDir, 'index.html'))
  },
}

export default defineConfig({
  plugins: [react(), adminEntry],
})
