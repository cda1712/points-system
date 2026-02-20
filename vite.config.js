import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration React temporairement forcée pour Vercel
export default defineConfig({
  plugins: [react()],
  // TEMPORAIRE : Force base à racine pour Vercel (changera plus tard pour GitHub Pages)
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: process.env.NODE_ENV !== 'production'
  }
})
