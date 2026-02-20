import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Version ultra-simple pour tester le déploiement
function SimpleTestApp() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)'
      }}>
        <h1 style={{fontSize: '3rem', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}>
          🎯 Système de Points BDE
        </h1>
        
        <div style={{
          fontSize: '1.8rem',
          margin: '30px 0',
          padding: '20px',
          background: 'rgba(0, 255, 0, 0.2)',
          borderRadius: '15px',
          border: '3px solid #4CAF50',
          animation: 'pulse 2s infinite'
        }}>
          ✅ DÉPLOIEMENT RÉUSSI !
        </div>
        
        <div style={{fontSize: '1.3rem', margin: '20px 0', lineHeight: '1.6'}}>
          <strong>🚀 Application React active</strong><br/>
          <span style={{opacity: 0.9}}>Version test - Netlify en fonctionnement</span>
        </div>
        
        <div style={{margin: '30px 0'}}>
          <button
            onClick={() => {
              alert('🎉 JavaScript et React fonctionnent parfaitement !');
              console.log('✅ Test réussi !');
            }}
            style={{
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              color: '#333',
              padding: '15px 30px',
              borderRadius: '25px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              marginRight: '15px'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            🧪 Tester JavaScript
          </button>
          
          <a 
            href="https://github.com/cda1712/points-system" 
            target="_blank" 
            style={{
              background: 'linear-gradient(45deg, #4CAF50, #45a049)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              display: 'inline-block',
              transition: 'transform 0.3s ease'
            }}
          >
            📁 Code Source
          </a>
        </div>
        
        <div style={{
          marginTop: '30px',
          fontSize: '1rem',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '20px',
          borderRadius: '15px',
          textAlign: 'left'
        }}>
          <h3 style={{marginBottom: '15px', color: '#FFD700'}}>🔍 Diagnostics système :</h3>
          <div style={{lineHeight: '1.8'}}>
            <div style={{color: '#4CAF50'}}>✅ HTML rendu correctement</div>
            <div style={{color: '#4CAF50'}}>✅ CSS en ligne fonctionnel</div>
            <div style={{color: '#4CAF50'}}>✅ React {React.version} actif</div>
            <div style={{color: '#4CAF50'}}>✅ JavaScript exécuté</div>
            <div style={{color: '#4CAF50'}}>✅ Netlify déploiement OK</div>
            <div style={{color: '#87CEEB'}}>📅 {new Date().toLocaleString('fr-FR')}</div>
            <div style={{color: '#87CEEB'}}>🌐 {window.location.hostname}</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

// Gestionnaire d'erreur global
window.addEventListener('error', (e) => {
  console.error('❌ Erreur détectée:', e);
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial; background: white;">
      <h1>🚨 Erreur détectée</h1>
      <p><strong>Message:</strong> ${e.message}</p>
      <p><strong>Fichier:</strong> ${e.filename}</p>
      <p><strong>Ligne:</strong> ${e.lineno}</p>
      <pre style="background: #f0f0f0; padding: 10px; overflow: auto; margin-top: 15px;">${e.error?.stack || 'Pas de stack trace disponible'}</pre>
    </div>
  `
})

// Messages de diagnostic dans la console
console.log('🚀 Application de test React chargée');
console.log('✅ Modules React importés');
console.log('📍 URL:', window.location.href);
console.log('🕒 Heure:', new Date().toISOString());

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Élément #root introuvable dans le DOM');
  }
  
  console.log('✅ Élément root trouvé, création de l\'application...');
  
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <SimpleTestApp />
    </StrictMode>
  );
  
  console.log('✅ Application React montée avec succès !');
  
} catch (error) {
  console.error('💥 Erreur fatale:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial; background: #ffebe9;">
      <h1>💥 Erreur critique dans main.jsx</h1>
      <p><strong>Message:</strong> ${error.message}</p>
      <p><strong>Stack:</strong></p>
      <pre style="background: #f5f5f5; padding: 15px; border-radius: 5px; overflow: auto;">${error.stack}</pre>
      <p style="margin-top: 20px; color: #666;"><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
    </div>
  `;
}
