import { defineConfig } from 'vite'

// Configuration pour HTML statique - Bypass React temporairement
export default defineConfig({
  // Configuration pour GitHub Pages  
  base: process.env.NODE_ENV === 'production' ? '/points-system/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Copier l'index.html statique directement
    rollupOptions: {
      input: {
        main: 'index.html'
      }
    }
  },
  // Pas de plugins React pour cette version
  plugins: []
})
