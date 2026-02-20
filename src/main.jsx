import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// VERSION ULTRA-SIMPLE GARANTIE DE FONCTIONNER
function TestApp() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '25px',
        padding: '50px',
        maxWidth: '600px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)'
      }}>
        <h1 style={{fontSize: '3.5rem', marginBottom: '30px'}}>
          🎯 SYSTÈME DE POINTS BDE
        </h1>
        
        <div style={{
          fontSize: '2rem',
          margin: '30px 0',
          padding: '25px',
          background: 'rgba(76, 175, 80, 0.4)',
          borderRadius: '15px',
          border: '3px solid #4CAF50'
        }}>
          ✅ VERCEL DÉPLOIEMENT RÉUSSI !
        </div>
        
        <div style={{fontSize: '1.4rem', margin: '20px 0'}}>
          <strong>🚀 Application React Fonctionnelle</strong><br/>
          <em>Version simplifiée - Tous systèmes OK</em>
        </div>
        
        <button
          onClick={() => alert('🎉 React + JavaScript + Vercel = SUCCESS !')}
          style={{
            background: 'linear-gradient(45deg, #FFD700, #FFA500)',
            color: '#333',
            padding: '15px 30px',
            borderRadius: '25px',
            border: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            margin: '20px 10px'
          }}
        >
          🧪 Tester JavaScript
        </button>
        
        <div style={{
          marginTop: '30px',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '20px',
          borderRadius: '15px',
          fontSize: '1rem'
        }}>
          <div style={{color: '#4CAF50', margin: '8px 0'}}>✅ HTML rendu par React</div>
          <div style={{color: '#4CAF50', margin: '8px 0'}}>✅ CSS en ligne appliqué</div>
          <div style={{color: '#4CAF50', margin: '8px 0'}}>✅ JavaScript interactif</div>
          <div style={{color: '#4CAF50', margin: '8px 0'}}>✅ React {React.version} actif</div>
          <div style={{color: '#87CEEB', margin: '8px 0'}}>📅 {new Date().toLocaleString('fr-FR')}</div>
          <div style={{color: '#87CEEB', margin: '8px 0'}}>🌐 {window.location.hostname}</div>
        </div>
      </div>
    </div>
  )
}

// Gestionnaire d'erreur simple
window.addEventListener('error', (e) => {
  console.error('❌ ERREUR:', e.message);
  document.body.innerHTML = `
    <div style="padding: 30px; color: red; font-family: Arial; background: #fff;">
      <h1>🚨 ERREUR JAVASCRIPT</h1>
      <p><strong>Message:</strong> ${e.message}</p>
      <p><strong>Ligne:</strong> ${e.lineno}</p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
    </div>
  `;
});

console.log('🚀 Application de test démarrée');

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Élément #root introuvable');
  }
  
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <TestApp />
    </StrictMode>
  );
  
  console.log('✅ Application React montée avec succès');
  
} catch (error) {
  console.error('💥 Erreur fatale:', error);
  document.body.innerHTML = `
    <div style="padding: 30px; color: white; background: red; font-family: Arial;">
      <h1>💥 ERREUR CRITIQUE</h1>
      <p><strong>Message:</strong> ${error.message}</p>
      <p><strong>Stack:</strong></p>
      <pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 5px;">${error.stack}</pre>
    </div>
  `;
}
