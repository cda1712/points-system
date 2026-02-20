import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuration React restaurée avec sécurité
export default defineConfig({
  plugins: [react()],
  // Configuration pour GitHub Pages  
  base: process.env.NODE_ENV === 'production' ? '/points-system/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
