import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Gestionnaire d'erreur global pour la production
window.addEventListener('error', (e) => {
  console.error('❌ Erreur détectée:', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('❌ Promise rejetée:', e.reason);
});

console.log('🚀 Application BDE Points - Démarrage');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Élément #root introuvable');
  }
  
  console.log('✅ Montage de l\'application React...');
  
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  console.log('✅ Application React montée avec succès !');
  
} catch (error) {
  console.error('💥 Erreur fatale main.jsx:', error);
  
  // Page d'erreur simple pour les cas extrêmes
  document.body.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #f44336, #d32f2f);
      min-height: 100vh; display: flex; justify-content: center; align-items: center;
      font-family: Arial, sans-serif; color: white; text-align: center; padding: 20px;
    ">
      <div style="
        background: rgba(255, 255, 255, 0.1); padding: 40px; border-radius: 20px;
        backdrop-filter: blur(10px); max-width: 500px;
      ">
        <h1 style="font-size: 2.5rem; margin-bottom: 20px;">💥 Erreur Critique</h1>
        <p style="font-size: 1.2rem; margin-bottom: 15px;">
          <strong>Message:</strong> ${error.message}
        </p>
        <p style="margin-bottom: 20px;">L'application React n'a pas pu se charger.</p>
        <button onclick="window.location.reload()" style="
          background: #FFD700; color: #333; padding: 12px 24px; 
          border: none; border-radius: 25px; font-weight: bold;
          cursor: pointer; font-size: 16px;
        ">
          🔄 Recharger la page
        </button>
      </div>
    </div>
  `;
}
