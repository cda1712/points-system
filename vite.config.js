import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuration pour GitHub Pages  
  base: process.env.NODE_ENV === 'production' ? '/points-system/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
