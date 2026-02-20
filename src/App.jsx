import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import logoImage from './assets/Logo Blanc (3).png'
import './App.css'


// COMPOSANT : Formulaire de participation
const ParticipationForm = ({ nom, setNom, prenom, setPrenom, email, setEmail, participateOnce, isLoading }) => (
  <div className="container">
    <div className="animated-background">
      <div className="graffiti-trail trail-1"></div>
      <div className="graffiti-trail trail-2"></div>
      <div className="graffiti-trail trail-3"></div>
      <div className="graffiti-trail trail-4"></div>
      <div className="graffiti-trail trail-5"></div>
    </div>
    
    <div className="participation-card">
      <div className="header-section">
        <div className="ink-logo-container">
          <img 
            src={logoImage} 
            alt="Logo INK" 
            className="ink-logo-image"
            style={{ 
              maxHeight: '150px', 
              width: '150px',
              filter: 'drop-shadow(0 0 10px rgba(102, 18, 240, 0.5))'
            }}
          />
        </div>
        <h1 className="main-title">Rejoignez notre aventure</h1>
        <p className="subtitle">Laissez votre empreinte et gagnez des points</p>
      </div>
      
      <form className="form-section" onSubmit={(e) => { e.preventDefault(); participateOnce(); }}>
        <div className="input-group">
          <div className="floating-label">
            <input
              id="nom"
              type="text"
              placeholder=" "
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="floating-input"
              required
            />
            <label htmlFor="nom" className="floating-label-text">Nom</label>
          </div>
          
          <div className="floating-label">
            <input
              id="prenom"
              type="text"
              placeholder=" "
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="floating-input"
              required
            />
            <label htmlFor="prenom" className="floating-label-text">Prénom</label>
          </div>
          
          <div className="floating-label">
            <input
              id="email"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="floating-input"
              required
            />
            <label htmlFor="email" className="floating-label-text">Email</label>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className={`submit-btn ${isLoading ? 'loading' : ''}`}
        >
          <span className="btn-text">
            {isLoading ? 'Inscription en cours...' : 'Laisser mon empreinte'}
          </span>
          <div className="ink-effect"></div>
        </button>
      </form>
    </div>
  </div>
)

// COMPOSANT : Message de remerciement
const ThankYouMessage = ({ participantInfo, setShowRanking }) => (
  <div className="container">
    <div className="animated-background">
      <div className="graffiti-trail trail-1"></div>
      <div className="graffiti-trail trail-2"></div>
      <div className="graffiti-trail trail-3"></div>
      <div className="graffiti-trail trail-4"></div>
      <div className="graffiti-trail trail-5"></div>
    </div>
    
    <div className="thank-you-card">
      <div className="success-animation">
        <div className="ink-drop">
            <img src={logoImage} 
            alt="Logo INK" />
        </div>
        <div className="ripple"></div>
      </div>
      
      <div className="thank-you-content">
        <h1 className="thank-you-title">Empreinte laissée !</h1>
        <div className="participant-info">
          <p className="participant-name">{participantInfo?.prenom} {participantInfo?.nom}</p>
          <div className="points-display">
            <span className="points-number">{participantInfo?.points}</span>
            <span className="points-label">point{participantInfo?.points > 1 ? 's' : ''}</span>
          </div>
        </div>
        
        <p className="status-message">
          {participantInfo?.isNewUser 
            ? 'Bienvenue dans l\'aventure INK !' 
            : 'Votre score continue de grandir !'
          }
        </p>
      </div>

      <button 
        className="ranking-btn"
        onClick={() => setShowRanking(true)}
      >
        <span>Découvrir le classement</span>
        <div className="btn-glow"></div>
      </button>
    </div>
  </div>
)

// COMPOSANT : Classement
const RankingView = ({ users, participantInfo, setShowRanking }) => (
  <div className="container">
    <div className="animated-background">
      <div className="graffiti-trail trail-1"></div>
      <div className="graffiti-trail trail-2"></div>
      <div className="graffiti-trail trail-3"></div>
      <div className="graffiti-trail trail-4"></div>
      <div className="graffiti-trail trail-5"></div>
    </div>
    
    <div className="ranking-card">
      <div className="ranking-header">
        <button 
          className="back-btn"
          onClick={() => setShowRanking(false)}
        >
          ← Retour
        </button>
        <h1 className="ranking-title">
          <img 
            src={logoImage} 
            alt="Logo INK" 
            className="ink-logo-image"
            style={{ 
              maxHeight: '90px', 
              width: '90px',
              marginRight: '125px',
              filter: 'drop-shadow(0 0 10px rgba(102, 18, 240, 0.5))'
            }}
          />
          Classement
        </h1>
      </div>

      <div className="ranking-list">
        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-ink"></div>
            <p>Aucune empreinte pour le moment...</p>
          </div>
        ) : (
          users.map((user, index) => (
            <div 
              key={user.id}
              className={`ranking-item ${index < 3 ? 'podium' : ''} ${participantInfo?.email === user.email ? 'current-user' : ''}`}
            >
              <div className="rank-badge">
                {index === 0 ? '🏆' : 
                 index === 1 ? '🥈' : 
                 index === 2 ? '🥉' : 
                 index + 1}
              </div>
              
              <div className="user-info">
                <span className="user-name">{user.nom} {user.prenom}</span>
                {participantInfo?.email === user.email && (
                  <span className="current-indicator">vous</span>
                )}
              </div>
              
              <div className="points-badge">
                <span className="points">{user.points}</span>
                <span className="ink-trail"></span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
)

function App() {
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [users, setUsers] = useState([])
  const [hasParticipated, setHasParticipated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showRanking, setShowRanking] = useState(false)
  const [participantInfo, setParticipantInfo] = useState(null)

  // Vérifier si l'utilisateur a déjà participé dans cette session
  useEffect(() => {
    const participated = sessionStorage.getItem('hasParticipated')
    if (participated) {
      const info = JSON.parse(participated)
      setHasParticipated(true)
      setParticipantInfo(info)
    }
  }, [])

  // Participer une seule fois
  const participateOnce = async () => {
    console.log('🚀 Début participation - Email:', email, 'Nom:', nom, 'Prénom:', prenom)
    
    if (!email || !nom || !prenom) {
      alert('Veuillez remplir tous les champs (nom, prénom et email)')
      return
    }

    setIsLoading(true)

    try {
      // Vérifie si l'utilisateur existe déjà
      console.log('🔍 Vérification utilisateur existant...')
      const { data: existing, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle()

      console.log('📊 Résultat recherche:', { existing, fetchError })

      if (fetchError) {
        console.error('❌ Erreur lors de la recherche:', fetchError)
        alert(`Erreur lors de la vérification: ${fetchError.message}`)
        setIsLoading(false)
        return
      }

      if (existing) {
        // Utilisateur existe déjà - ajoute 1 point
        console.log('👤 Utilisateur trouvé, ajout de 1 point...', existing)
        const { data: updateData, error: updateError } = await supabase
          .from('users')
          .update({ points: existing.points + 1 })
          .eq('id', existing.id)
          .select()

        console.log('📝 Résultat mise à jour:', { updateData, updateError })

        if (updateError) {
          console.error('❌ Erreur lors de la mise à jour:', updateError)
          alert(`Erreur lors de la mise à jour: ${updateError.message}`)
          setIsLoading(false)
          return
        }

        // Marquer comme ayant participé
        const participantData = {
          nom: existing.nom,
          prenom: existing.prenom,
          email: existing.email,
          points: existing.points + 1,
          isNewUser: false
        }
        
        sessionStorage.setItem('hasParticipated', JSON.stringify(participantData))
        setParticipantInfo(participantData)
        setHasParticipated(true)

      } else {
        // Nouvel utilisateur - créer avec 1 point
        console.log('➕ Création nouvel utilisateur...')
        const { data: insertData, error: insertError } = await supabase
          .from('users')
          .insert([{ nom, prenom, email, points: 1 }])
          .select()

        console.log('📝 Résultat création:', { insertData, insertError })

        if (insertError) {
          console.error('❌ Erreur lors de la création:', insertError)
          alert(`Erreur lors de la création: ${insertError.message}`)
          setIsLoading(false)
          return
        }

        // Marquer comme ayant participé
        const participantData = {
          nom,
          prenom,
          email,
          points: 1,
          isNewUser: true
        }
        
        sessionStorage.setItem('hasParticipated', JSON.stringify(participantData))
        setParticipantInfo(participantData)
        setHasParticipated(true)
      }

      // Met à jour le classement
      console.log('🔄 Mise à jour du classement...')
      fetchUsers()

    } catch (err) {
      console.error('💥 Erreur inattendue:', err)
      alert(`Erreur inattendue: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Récupérer tous les utilisateurs pour le classement
  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('points', { ascending: false })

    if (error) console.error('Erreur fetchUsers:', error)
    else setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // RENDU PRINCIPAL
  return (
    <>
      {showRanking ? (
        <RankingView 
          users={users}
          participantInfo={participantInfo}
          setShowRanking={setShowRanking}
        />
      ) : hasParticipated ? (
        <ThankYouMessage 
          participantInfo={participantInfo}
          setShowRanking={setShowRanking}
        />
      ) : (
        <ParticipationForm 
          nom={nom}
          setNom={setNom}
          prenom={prenom}
          setPrenom={setPrenom}
          email={email}
          setEmail={setEmail}
          participateOnce={participateOnce}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default App
