import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import logoImage from './assets/Logo Blanc (3).png'
import './App.css'

// Configuration des codes secrets et points par stand
const STAND_CODES = {
  'InkQG': { name: 'Stand Accueil INK – QG', points: [100, 200, 300, 400] },
  'InkJS': { name: 'Jelly Shot – Mystery Flavors', points: [100] },
  'InkQB': { name: 'Quiz avec Buzzer – Duel Chromatique', points: [200, 100] },
  'InkS': { name: 'JEUX VIDEO - SPLATOON', points: [100] },
  'InkEG': { name: 'Escape Game – Mission Infiltration', points: [500, 400, 300, 200, 100] },
  'InkT': { name: 'Tatouages – Ink Yourself', points: [200] },
  'InkFC': { name: 'FLipCup: 1v1', points: [200, 50] },
  'InkTI': { name: 'Trouve l\'Intru – Focus Challenge', points: [100, 50] },
  'InkWP': { name: 'Waterpong: 3v3', points: [200, 100] },
  'InkCT': { name: 'Chamboule-tout', points: [300, 200, 100] },
  'InkFI': { name: 'FRESQUE DE INK', points: [100] }
}

const BackgroundTrails = () => (
  <>
    {Array.from({ length: 9 }, (_, index) => (
      <div key={index + 1} className={`graffiti-trail trail-${index + 1}`}></div>
    ))}
  </>
)

// COMPOSANT : Pop-up mot de passe
const PasswordPopup = ({ isOpen, onClose, onValidatePassword }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!password.trim()) {
      setError('Veuillez entrer un mot de passe')
      return
    }

    const standInfo = STAND_CODES[password.trim()]
    if (!standInfo) {
      setError('Code secret invalide')
      return
    }

    onValidatePassword(password.trim(), standInfo)
    setPassword('')
    setError('')
  }

  const handleClose = () => {
    setPassword('')
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="password-overlay">
      <div className="password-popup">
        <div className="popup-header">
          <img 
            src={logoImage} 
            alt="Logo INK" 
            className="popup-logo"
          />
          <h2>Code Secret du Stand</h2>
          <button className="close-btn" onClick={handleClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="password-form">
          <div className="input-container">
            <input
              type="password"
              placeholder="Entrez le code secret..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              className="password-input"
              autoFocus
            />
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <button type="submit" className="validate-btn">
            Valider
          </button>
        </form>
      </div>
    </div>
  )
}

// COMPOSANT : Pop-up choix des points
const PointsChoicePopup = ({ isOpen, onClose, standInfo, onSelectPoints }) => {
  if (!isOpen || !standInfo) return null

  return (
    <div className="password-overlay">
      <div className="password-popup points-choice-popup">
        <div className="popup-header">
          <img 
            src={logoImage} 
            alt="Logo INK" 
            className="popup-logo"
          />
          <h2>{standInfo.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="points-selection">
          <h3>Choisissez vos points :</h3>
          <div className="points-grid">
            {standInfo.points.map((points) => (
              <button
                key={points}
                className="points-btn"
                onClick={() => onSelectPoints(points)}
              >
                {points} points
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


// COMPOSANT : Formulaire de participation
const ParticipationForm = ({ nom, setNom, prenom, setPrenom, email, setEmail, association, setAssociation, onSubmitForm, isLoading }) => (
  <div className="container">
    <div className="animated-background">
      <BackgroundTrails />
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
              width: '150px'
            }}
          />
        </div>
        <h1 className="main-title">Rejoignez notre aventure</h1>
        <p className="subtitle">Laissez votre empreinte et gagnez des points</p>
      </div>
      
      <form className="form-section" onSubmit={(e) => { e.preventDefault(); onSubmitForm(); }}>
        <div className="input-group">
          <div className="floating-label">
            <input
              id="nom"
              type="text"
              placeholder=" "
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className={`floating-input ${nom ? 'has-value' : ''}`}
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
              className={`floating-input ${prenom ? 'has-value' : ''}`}
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
              className={`floating-input ${email ? 'has-value' : ''}`}
              required
            />
            <label htmlFor="email" className="floating-label-text">Email</label>
          </div>
          
          <div className="floating-label">
            <input
              id="association"
              type="text"
              placeholder=" "
              value={association}
              onChange={(e) => setAssociation(e.target.value)}
              className={`floating-input ${association ? 'has-value' : ''}`}
              list="associations-list"
              autoComplete="off"
              required
            />
            <datalist id="associations-list">
              <option value="AMMA" />
              <option value="ADA" />
              <option value="AvironDeVinci" />
              <option value="Club Entrepreneurs De Vinci" />
              <option value="ComediaDaVinci" />
              <option value="Davincibot" />
              <option value="Davincicode" />
              <option value="De Vinci Partners" />
              <option value="De Vinci Durable" />
              <option value="Fablab" />
              <option value="DeVinciTrip" />
              <option value="DeVinciLumière" />
              <option value="Digiteam" />
              <option value="ESN" />
              <option value="ÉtoileDeVinci" />
              <option value="GOD" />
              <option value="Hydrovinci" />
              <option value="BlockChain De Vinci" />
              <option value="L'Extreme De Vinci" />
              <option value="LDV Esport" />
              <option value="La 404" />
              <option value="La Plume De Vinci" />
              <option value="La Joute De Vinci" />
              <option value="LéoIndieGames" />
              <option value="Léosphère" />
              <option value="Léosurvival" />
              <option value="Léonart" />
              <option value="LeoFiveDeVinci" />
              <option value="LKW" />
              <option value="LéoRunning Club" />
              <option value="LéoTactical" />
              <option value="Leo&co" />
              <option value="Léo4L" />
              <option value="LéoBasket" />
              <option value="Léocook" />
              <option value="Léofly" />
              <option value="Léostunt" />
              <option value="Léotaku" />
              <option value="Léotalks" />
              <option value="Léovoile" />
              <option value="Léovolley" />
              <option value="Léoworkout" />
              <option value="Léoclimb" />
              <option value="Léoublon" />
              <option value="Maison de vinci" />
              <option value="Musiquemix" />
              <option value="Poletech" />
              <option value="SAFE" />
              <option value="Slide Session" />
              <option value="3V" />
              <option value="Vinci Cheer" />
              <option value="VED" />
              <option value="Vinci investments" />
              <option value="VRT" />
              <option value="Vinci squad" />
              <option value="Lavague" />
              <option value="Léorugby" />
              <option value="IIMPACT" />
              <option value="Léolearning" />
              <option value="Virtual vinci" />
            </datalist>
            <label htmlFor="association" className="floating-label-text">Association à soutenir</label>
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
const ThankYouMessage = ({ participantInfo, setShowRanking, setShowAssociationRanking }) => (
  <div className="container">
    <div className="animated-background">
      <BackgroundTrails />
    </div>
    
    <div className="thank-you-card">
      <div className="success-animation">
        <div className="ink-drop">
            <img src={logoImage} 
            alt="Logo INK" 
            className="ink-logo-image" />
        </div>
        <div className="ripple"></div>
      </div>
      
      <div className="thank-you-content">
        <h1 className="thank-you-title">Empreinte laissée !</h1>
        <div className="participant-info">
          <p className="participant-name">{participantInfo?.prenom} {participantInfo?.nom}</p>
          <div className="points-display">
            <span className="points-number">
              {participantInfo?.points} {participantInfo?.points > 1 ? 'points' : 'point'}
            </span>
          </div>
        </div>
        
        <p className="status-message">
          {participantInfo?.isNewUser 
            ? 'Bienvenue dans l\'aventure INK !' 
            : 'Votre score continue de grandir !'
          }
        </p>
        
        {participantInfo?.association && (
          <div className="association-info">
            <h3>Vous soutenez :</h3>
            <p className="association-name">{participantInfo.association}</p>
          </div>
        )}
      </div>

      <div className="buttons-container">
        <button 
          className="ranking-btn"
          onClick={() => setShowRanking(true)}
        >
          <img 
            src={logoImage} 
            alt="Logo INK" 
            className="ink-logo-image"
            style={{ 
              maxHeight: '30px', 
              width: '30px',
              marginRight: '10px'
            }}
          />
          Classement Utilisateurs
        </button>
        
        <button 
          className="ranking-btn association-btn"
          onClick={() => setShowAssociationRanking(true)}
        >
          <img 
            src={logoImage} 
            alt="Logo INK" 
            className="ink-logo-image"
            style={{ 
              maxHeight: '30px', 
              width: '30px',
              marginRight: '10px'
            }}
          />
          Classement Associations
        </button>
      </div>
    </div>
  </div>
)

// COMPOSANT : Classement
const RankingView = ({ users, participantInfo, setShowRanking, onRefreshData }) => {
  // Actualisation automatique des données toutes les 3 secondes
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      onRefreshData()
    }, 3000)

    return () => clearInterval(refreshInterval)
  }, [onRefreshData])

  return (
    <div className="container">
      <div className="animated-background">
        <BackgroundTrails />
      </div>
    
    <div className="ranking-card">
      <div className="ranking-header standard-ranking-header users-ranking-header">
        <button 
          className="back-btn standard-back-btn"
          onClick={() => setShowRanking(false)}
        >
          ← Retour
        </button>
        <h1 className="ranking-title users-ranking-title">
          Classement Utilisateurs
        </h1>
        <img 
          src={logoImage} 
          alt="Logo INK" 
          className="ink-logo-image users-ranking-logo header-side-logo"
          style={{ 
            maxHeight: '90px', 
            width: '90px'
          }}
        />
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
}

// COMPOSANT : Classement des associations
const AssociationsRanking = ({ associations, participantInfo, setShowAssociationRanking, onRefreshData }) => {
  // Actualisation automatique des données toutes les 3 secondes
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      onRefreshData()
    }, 3000)

    return () => clearInterval(refreshInterval)
  }, [onRefreshData])

  return (
    <div className="container">
      <div className="animated-background">
        <BackgroundTrails />
      </div>
    
    <div className="ranking-card">
      <div className="ranking-header standard-ranking-header association-ranking-header">
        <button 
          className="back-btn standard-back-btn"
          onClick={() => setShowAssociationRanking(false)}
        >
          ← Retour
        </button>
        <h1 className="ranking-title association-ranking-title">
          Classements associations
        </h1>
        <img 
          src={logoImage} 
          alt="Logo INK" 
          className="ink-logo-image association-ranking-logo header-side-logo"
          style={{ 
            maxHeight: '90px', 
            width: '90px'
          }}
        />
      </div>

      <div className="ranking-list">
        {associations.length === 0 ? (
          <div className="empty-state">
            <div className="empty-ink"></div>
            <p>Aucune association soutenue pour le moment...</p>
          </div>
        ) : (
          associations.map((association, index) => (
            <div 
              key={association.name}
              className={`ranking-item ${index < 3 ? 'podium' : ''} ${participantInfo?.association === association.name ? 'current-user' : ''}`}
            >
              <div className="rank-badge">
                {index === 0 ? '🏆' : 
                 index === 1 ? '🥈' : 
                 index === 2 ? '🥉' : 
                 index + 1}
              </div>
              
              <div className="user-info">
                <span className="user-name">{association.name}</span>
                <span className="supporters-count">{association.supporters} supporter{association.supporters > 1 ? 's' : ''}</span>
                {participantInfo?.association === association.name && (
                  <span className="current-indicator">votre choix</span>
                )}
              </div>
              
              <div className="points-badge">
                <span className="points">{association.totalPoints}</span>
                <span className="ink-trail"></span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  )
}

// COMPOSANT : Classement Secret (Alternance automatique)
const SecretRankingView = ({ users, associations, participantInfo, setShowSecretRanking, secretViewMode, onRefreshData }) => {
  // Gestion de la classe full-screen sur le body
  useEffect(() => {
    document.body.classList.add('secret-ranking-active')
    return () => {
      document.body.classList.remove('secret-ranking-active')
    }
  }, [])

  // Actualisation automatique des données toutes les 3 secondes
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      onRefreshData()
    }, 3000)

    return () => clearInterval(refreshInterval)
  }, [onRefreshData])

  return (
    <div className="container">
      <div className="animated-background">
        <BackgroundTrails />
      </div>
      
      <div className="ranking-card secret-ranking-card">
        <div className="ranking-header">
          <button 
            className="back-btn"
            onClick={() => setShowSecretRanking(false)}
          >
            ← Retour
          </button>
          <h1 className="ranking-title centered-title">
            {secretViewMode === 'users' ? 'Classement Etudiants' : 'Classement Associations'}
          </h1>
          <img 
            src={logoImage} 
            alt="Logo INK" 
            className="ink-logo-image header-logo"
            style={{ 
              maxHeight: '90px', 
              width: '90px'
            }}
          />
        </div>

        {secretViewMode === 'users' ? (
          <div className="multi-columns-ranking">
            {Array.from({ length: 4 }, (_, columnIndex) => {
              const startIndex = columnIndex * 8
              const endIndex = startIndex + 8
              const columnUsers = users.slice(startIndex, endIndex)
              
              if (columnUsers.length === 0) return null
              
              return (
                <div key={columnIndex} className="ranking-list">
                  {columnUsers.map((user, index) => {
                    const globalIndex = startIndex + index
                    const isCurrentUser = participantInfo?.email === user.email
                    const isPodium = globalIndex < 3
                    return (
                      <div key={user.id} className={`ranking-item ${isPodium ? 'podium' : ''} ${isCurrentUser ? 'current-user' : ''}`}>
                        <div className="rank-badge">
                          {globalIndex === 0 ? '🏆' : 
                           globalIndex === 1 ? '🥈' : 
                           globalIndex === 2 ? '🥉' : 
                           globalIndex + 1}
                        </div>
                        
                        <div className="user-info">
                          <span className="user-name">{user.nom} {user.prenom}</span>
                          {isCurrentUser && (
                            <span className="current-indicator">vous</span>
                          )}
                        </div>
                        
                        <div className="points-badge">
                          <span className="points">{user.points}</span>
                          <span className="ink-trail"></span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }).filter(Boolean)}
          </div>
        ) : (
          <div className="multi-columns-ranking">
            {Array.from({ length: 4 }, (_, columnIndex) => {
              const startIndex = columnIndex * 8
              const endIndex = startIndex + 8
              const columnAssociations = associations.slice(startIndex, endIndex)
              
              if (columnAssociations.length === 0) return null
              
              return (
                <div key={columnIndex} className="ranking-list">
                  {columnAssociations.map((association, index) => {
                    const globalIndex = startIndex + index
                    const isCurrentUser = participantInfo?.association === association.name
                    const isPodium = globalIndex < 3
                    return (
                      <div key={association.name} className={`ranking-item ${isPodium ? 'podium' : ''} ${isCurrentUser ? 'current-user' : ''}`}>
                        <div className="rank-badge">
                          {globalIndex === 0 ? '🏆' : 
                           globalIndex === 1 ? '🥈' : 
                           globalIndex === 2 ? '🥉' : 
                           globalIndex + 1}
                        </div>
                        
                        <div className="user-info">
                          <span className="user-name">{association.name}</span>
                          <span className="supporters-count">{association.supporters} supporter{association.supporters > 1 ? 's' : ''}</span>
                          {isCurrentUser && (
                            <span className="current-indicator">votre choix</span>
                          )}
                        </div>
                        
                        <div className="points-badge">
                          <span className="points">{association.totalPoints}</span>
                          <span className="ink-trail"></span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            }).filter(Boolean)}
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [association, setAssociation] = useState('')
  const [users, setUsers] = useState([])
  const [associations, setAssociations] = useState([])
  const [hasParticipated, setHasParticipated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showRanking, setShowRanking] = useState(false)
  const [showAssociationRanking, setShowAssociationRanking] = useState(false)
  const [showSecretRanking, setShowSecretRanking] = useState(false)
  const [secretViewMode, setSecretViewMode] = useState('users') // 'users' ou 'associations'
  const [participantInfo, setParticipantInfo] = useState(null)
  const [showPasswordPopup, setShowPasswordPopup] = useState(false)
  const [showPointsChoice, setShowPointsChoice] = useState(false)
  const [currentStandInfo, setCurrentStandInfo] = useState(null)
  const [pendingPoints, setPendingPoints] = useState(0)

  // Vérifier si l'utilisateur a déjà participé dans cette session
  useEffect(() => {
    const participated = sessionStorage.getItem('hasParticipated')
    if (participated) {
      const info = JSON.parse(participated)
      setHasParticipated(true)
      setParticipantInfo(info)
    }
  }, [])

  // Gestion du formulaire de participation
  const handleFormSubmit = () => {
    if (!email || !nom || !prenom || !association) {
      alert('Veuillez remplir tous les champs (nom, prénom, email et association)')
      return
    }
    setShowPasswordPopup(true)
  }

  // Validation du mot de passe
  const handlePasswordValidation = (code, standInfo) => {
    setShowPasswordPopup(false)
    setCurrentStandInfo(standInfo)
    
    if (standInfo.points.length === 1) {
      // Un seul choix de points, attribuer directement
      participateWithPoints(standInfo.points[0])
    } else {
      // Plusieurs choix, afficher le pop-up de sélection
      setShowPointsChoice(true)
    }
  }

  // Sélection des points
  const handlePointsSelection = (points) => {
    setShowPointsChoice(false)
    participateWithPoints(points)
  }

  // Participer avec un nombre de points spécifique
  const participateWithPoints = async (points) => {
    console.log('🚀 Début participation - Email:', email, 'Nom:', nom, 'Prénom:', prenom, 'Association:', association, 'Points:', points)
    
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
        // Utilisateur existe déjà - ajoute les points et met à jour l'association
        console.log(`👤 Utilisateur trouvé, ajout de ${points} points et mise à jour association...`, existing)
        const { data: updateData, error: updateError } = await supabase
          .from('users')
          .update({ 
            points: existing.points + points,
            association_supportee: association
          })
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
          association: association,
          points: existing.points + points,
          isNewUser: false,
          earnedPoints: points
        }
        
        sessionStorage.setItem('hasParticipated', JSON.stringify(participantData))
        setParticipantInfo(participantData)
        setHasParticipated(true)

      } else {
        // Nouvel utilisateur - créer avec les points
        console.log(`➕ Création nouvel utilisateur avec ${points} points...`)
        const { data: insertData, error: insertError } = await supabase
          .from('users')
          .insert([{ 
            nom, 
            prenom, 
            email, 
            points: points, 
            association_supportee: association 
          }])
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
          association,
          points: points,
          isNewUser: true,
          earnedPoints: points
        }
        
        sessionStorage.setItem('hasParticipated', JSON.stringify(participantData))
        setParticipantInfo(participantData)
        setHasParticipated(true)
      }

      // Met à jour les classements
      console.log('🔄 Mise à jour des classements...')
      fetchUsers()
      fetchAssociations()

    } catch (err) {
      console.error('💥 Erreur inattendue:', err)
      alert(`Erreur inattendue: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour actualiser les données
  const refreshData = () => {
    fetchUsers()
    fetchAssociations()
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

  // Récupérer le classement des associations
  const fetchAssociations = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('association_supportee, points')
      .not('association_supportee', 'is', null)
      .not('association_supportee', 'eq', '')

    if (error) {
      console.error('Erreur fetchAssociations:', error)
      return
    }

    // Regrouper par association et calculer les points totaux
    const associationMap = {}
    data.forEach(user => {
      const association = user.association_supportee
      if (association) {
        if (!associationMap[association]) {
          associationMap[association] = {
            name: association,
            totalPoints: 0,
            supporters: 0
          }
        }
        associationMap[association].totalPoints += user.points
        associationMap[association].supporters += 1
      }
    })

    // Convertir en array et trier par points décroissants
    const associationsArray = Object.values(associationMap)
      .sort((a, b) => b.totalPoints - a.totalPoints)

    setAssociations(associationsArray)
  }

  useEffect(() => {
    fetchUsers()
    fetchAssociations()
  }, [])

  // Raccourci clavier secret CTRL+ALT+T
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey && event.key === 't') {
        event.preventDefault()
        console.log('🔓 Raccourci secret activé !')
        setShowSecretRanking(true)
        setShowRanking(false)
        setShowAssociationRanking(false)
      }
      // Escape pour fermer la vue secrète
      if (event.key === 'Escape' && showSecretRanking) {
        setShowSecretRanking(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showSecretRanking])

  // Alternance automatique dans la vue secrète (5 secondes)
  useEffect(() => {
    if (!showSecretRanking) return

    const interval = setInterval(() => {
      setSecretViewMode(current => current === 'users' ? 'associations' : 'users')
    }, 10_000)

    return () => clearInterval(interval)
  }, [showSecretRanking])

  // RENDU PRINCIPAL
  return (
    <>
      {showSecretRanking ? (
        <SecretRankingView 
          users={users}
          associations={associations}
          participantInfo={participantInfo}
          setShowSecretRanking={setShowSecretRanking}
          secretViewMode={secretViewMode}
          onRefreshData={refreshData}
        />
      ) : showRanking ? (
        <RankingView 
          users={users}
          participantInfo={participantInfo}
          setShowRanking={setShowRanking}
          onRefreshData={refreshData}
        />
      ) : showAssociationRanking ? (
        <AssociationsRanking 
          associations={associations}
          participantInfo={participantInfo}
          setShowAssociationRanking={setShowAssociationRanking}
          onRefreshData={refreshData}
        />
      ) : hasParticipated ? (
        <ThankYouMessage 
          participantInfo={participantInfo}
          setShowRanking={setShowRanking}
          setShowAssociationRanking={setShowAssociationRanking}
        />
      ) : (
        <ParticipationForm 
          nom={nom}
          setNom={setNom}
          prenom={prenom}
          setPrenom={setPrenom}
          email={email}
          setEmail={setEmail}
          association={association}
          setAssociation={setAssociation}
          onSubmitForm={handleFormSubmit}
          isLoading={isLoading}
        />
      )}
      
      <PasswordPopup
        isOpen={showPasswordPopup}
        onClose={() => setShowPasswordPopup(false)}
        onValidatePassword={handlePasswordValidation}
      />
      
      <PointsChoicePopup
        isOpen={showPointsChoice}
        onClose={() => setShowPointsChoice(false)}
        standInfo={currentStandInfo}
        onSelectPoints={handlePointsSelection}
      />
    </>
  )
}

export default App
