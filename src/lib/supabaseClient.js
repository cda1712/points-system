import { createClient } from '@supabase/supabase-js'

// Configuration Supabase avec variables d'environnement et fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mzenjlhhchktynlvpjui.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16ZW5qbGhoY2hrdHlubHZwanVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjYwMDIsImV4cCI6MjA4NzEwMjAwMn0.QhZowVwu5hkwWgCWGkj7H-448r8TTdZF3qVuLVIdiG8'

// Diagnostic Supabase avec gestion d'erreurs
console.log('🚀 Initialisation Supabase...')
console.log('URL:', supabaseUrl)
console.log('Env Mode:', import.meta.env.MODE || 'development')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables Supabase manquantes!')
  throw new Error('Configuration Supabase incomplète')
}

let supabase
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  })
  console.log('✅ Client Supabase créé avec succès')
  
  // Test de connectivité
  supabase.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.warn('⚠️ Problème session Supabase:', error.message)
    } else {
      console.log('✅ Connection Supabase OK')
    }
  }).catch(err => {
    console.warn('⚠️ Test connection Supabase échoué:', err.message)
  })
  
} catch (error) {
  console.error('❌ Erreur création client Supabase:', error)
  throw new Error(`Impossible de créer le client Supabase: ${error.message}`)
}

export { supabase }
