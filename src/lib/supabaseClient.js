import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mzenjlhhchktynlvpjui.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16ZW5qbGhoY2hrdHlubHZwanVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjYwMDIsImV4cCI6MjA4NzEwMjAwMn0.QhZowVwu5hkwWgCWGkj7H-448r8TTdZF3qVuLVIdiG8'

// Diagnostic Supabase
console.log('🚀 Initialisation Supabase...')
console.log('URL:', supabaseUrl)
console.log('Key (partial):', supabaseAnonKey.substring(0, 20) + '...')

let supabase
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
  console.log('✅ Client Supabase créé avec succès')
} catch (error) {
  console.error('❌ Erreur création client Supabase:', error)
  throw error
}

export { supabase }
