import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Diagnostic ultra-détaillé pour Vercel
const DEBUG_MODE = true; // À désactiver plus tard
const logMessages = [];

function addLog(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  const logEntry = `[${timestamp}] ${message}`;
  logMessages.push(logEntry);
  
  if (type === 'error') {
    console.error(logEntry);
  } else {
    console.log(logEntry);
  }
  
  // Affiche les logs dans la page en cas de problème
  if (DEBUG_MODE && document.getElementById('debug-logs')) {
    document.getElementById('debug-logs').innerHTML = logMessages.slice(-10).join('<br/>');
  }
}

// Créer une zone de debug temporaire
if (DEBUG_MODE) {
  const debugDiv = document.createElement('div');
  debugDiv.id = 'debug-logs';
  debugDiv.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; 
    background: rgba(0, 0, 0, 0.8); color: #0f0; 
    padding: 10px; font-family: monospace; font-size: 12px;
    z-index: 10000; max-height: 150px; overflow-y: auto;
    border-bottom: 2px solid #0f0;
  `;
  document.body.appendChild(debugDiv);
  
  addLog('🚀 MODE DEBUG ACTIF - Diagnostic Vercel');
}

// Gestionnaire d'erreur global renforcé
window.addEventListener('error', (e) => {
  addLog(`❌ ERREUR JS: ${e.message} - Fichier: ${e.filename} - Ligne: ${e.lineno}`, 'error');
  
  if (DEBUG_MODE) {
    const errorInfo = document.createElement('div');
    errorInfo.style.cssText = `
      position: fixed; bottom: 10px; right: 10px;
      background: #f44336; color: white; padding: 15px;
      border-radius: 8px; font-family: Arial; z-index: 9999;
      max-width: 300px; font-size: 14px;
    `;
    errorInfo.innerHTML = `
      <strong>⚠️ Erreur JS:</strong><br/>
      ${e.message}<br/>
      <small>Fichier: ${e.filename || 'inconnu'}</small><br/>
      <small>Ligne: ${e.lineno || 'inconnue'}</small>
    `;
    document.body.appendChild(errorInfo);
    setTimeout(() => errorInfo.remove(), 10000);
  }
});

window.addEventListener('unhandledrejection', (e) => {
  addLog(`❌ PROMISE REJETÉE: ${e.reason}`, 'error');
});

addLog('🚀 Application BDE Points - Démarrage complet');
addLog(`📱 User Agent: ${navigator.userAgent}`);
addLog(`🌐 URL: ${window.location.href}`);
addLog(`📊 Environnement: ${import.meta.env.MODE || 'inconnu'}`);

try {
  addLog('🔍 Vérification DOM...');
  
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('❌ Élément #root introuvable dans le DOM');
  }
  
  addLog('✅ Root element trouvé');
  addLog(`📏 Root dimensions: ${rootElement.clientWidth}x${rootElement.clientHeight}`);
  
  addLog('🔧 Création du root React...');
  const root = createRoot(rootElement);
  
  addLog('🎨 Montage de l\'application...');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  addLog('✅ Application React montée avec succès !');
  addLog(`📍 React ${React.version} - Mode: ${import.meta.env.MODE}`);
  
  // Vérification que l'app s'est bien montée
  setTimeout(() => {
    if (rootElement.children.length === 0) {
      addLog('⚠️ ATTENTION: Le root est toujours vide après 1 seconde', 'error');
      
      if (DEBUG_MODE) {
        rootElement.innerHTML = `
          <div style="padding: 20px; background: #f44336; color: white; text-align: center;">
            <h2>❌ Échec du montage React</h2>
            <p>L'application ne s'est pas montée dans le DOM</p>
            <div style="background: rgba(0,0,0,0.3); padding: 10px; margin: 10px 0; text-align: left;">
              <strong>Logs de diagnostic:</strong><br/>
              ${logMessages.join('<br/>')}
            </div>
          </div>
        `;
      }
    } else {
      addLog('✅ Vérification: App présente dans le DOM');
      
      // Masquer le debug après succès
      if (DEBUG_MODE) {
        setTimeout(() => {
          const debugEl = document.getElementById('debug-logs');
          if (debugEl) debugEl.style.display = 'none';
        }, 3000);
      }
    }
  }, 1000);
  
} catch (error) {
  addLog(`💥 ERREUR FATALE: ${error.message}`, 'error');
  addLog(`Stack: ${error.stack}`, 'error');
  
  // Page d'erreur détaillée
  document.body.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #f44336, #d32f2f);
      min-height: 100vh; display: flex; justify-content: center; align-items: center;
      font-family: Arial, sans-serif; color: white; text-align: center; padding: 20px;
    ">
      <div style="
        background: rgba(255, 255, 255, 0.1); padding: 40px; border-radius: 20px;
        backdrop-filter: blur(10px); max-width: 600px;
      ">
        <h1 style="font-size: 2.5rem; margin-bottom: 20px;">💥 Erreur Critique React</h1>
        <p style="font-size: 1.2rem; margin-bottom: 15px;">
          <strong>Message:</strong> ${error.message}
        </p>
        <p style="margin-bottom: 20px;">L'application React n'a pas pu se charger.</p>
        
        <div style="
          margin: 20px 0; padding: 15px; background: rgba(0, 0, 0, 0.5);
          border-radius: 10px; text-align: left; font-size: 11px; max-height: 200px; overflow-y: auto;
        ">
          <strong>🔧 Logs de diagnostic complets:</strong><br/>
          ${logMessages.join('<br/>')}
        </div>
        
        <div style="
          margin: 20px 0; padding: 15px; background: rgba(0, 0, 0, 0.3);
          border-radius: 10px; text-align: left; font-size: 12px; max-height: 150px; overflow-y: auto;
        ">
          <strong>📚 Stack Trace:</strong><br/>
          ${error.stack ? error.stack.replace(/\n/g, '<br/>') : 'Pas de stack trace disponible'}
        </div>
        
        <button onclick="window.location.reload()" style="
          background: #FFD700; color: #333; padding: 12px 24px; 
          border: none; border-radius: 25px; font-weight: bold;
          cursor: pointer; font-size: 16px; margin: 5px;
        ">
          🔄 Recharger la page
        </button>
        
        <button onclick="console.log('Logs complets:', ${JSON.stringify(logMessages)})" style="
          background: #2196F3; color: white; padding: 12px 24px; 
          border: none; border-radius: 25px; font-weight: bold;
          cursor: pointer; font-size: 16px; margin: 5px;
        ">
          📋 Copier les logs
        </button>
      </div>
    </div>
  `;
}
