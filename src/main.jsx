import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Gestionnaire d'erreur global pour le diagnostic
window.addEventListener('error', (e) => {
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial;">
      <h1>🚨 Erreur détectée</h1>
      <p><strong>Message:</strong> ${e.message}</p>
      <p><strong>Fichier:</strong> ${e.filename}</p>
      <p><strong>Ligne:</strong> ${e.lineno}</p>
      <p><strong>Stack:</strong></p>
      <pre style="background: #f0f0f0; padding: 10px; overflow: auto;">${e.error?.stack || 'Pas de stack trace'}</pre>
    </div>
  `
})

try {
  const root = createRoot(document.getElementById('root'))
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  
  // Si ça arrive jusqu'ici sans erreur, affichons un message de succès temporaire
  setTimeout(() => {
    if (!document.querySelector('#root').innerHTML.trim()) {
      document.body.innerHTML = `
        <div style="padding: 20px; color: orange; font-family: Arial;">
          <h1>⚠️ Diagnostic</h1>
          <p>React s'est chargé mais le composant App ne s'affiche pas.</p>
          <p>Vérifiez les erreurs dans la console ou les problèmes Supabase.</p>
        </div>
      `
    }
  }, 2000)
  
} catch (error) {
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial;">
      <h1>💥 Erreur lors du rendu React</h1>
      <p><strong>Message:</strong> ${error.message}</p>
      <p><strong>Stack:</strong></p>
      <pre style="background: #f0f0f0; padding: 10px; overflow: auto;">${error.stack}</pre>
    </div>
  `
}
