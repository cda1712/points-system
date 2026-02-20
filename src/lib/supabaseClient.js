import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mzenjlhhchktynlvpjui.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16ZW5qbGhoY2hrdHlubHZwanVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MjYwMDIsImV4cCI6MjA4NzEwMjAwMn0.QhZowVwu5hkwWgCWGkj7H-448r8TTdZF3qVuLVIdiG8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
