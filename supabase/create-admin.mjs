import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://pqpakdilvjlyqfzfsyca.supabase.co'
const SUPABASE_ANON_KEY = process.env.ANON_KEY

const email = process.argv[2]
const password = process.argv[3]

if (!email || !password) {
  console.error('Usage: node create-admin.mjs email@example.com motdepasse')
  process.exit(1)
}

if (password.length < 6) {
  console.error('Mot de passe trop court (minimum 6 caractères)')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const { data, error } = await supabase.auth.signUp({ email, password })

if (error) {
  console.error('Erreur :', error.message)
} else {
  console.log('✓ Utilisateur créé :', data.user?.email)
  console.log('  Vérifie ta boîte mail si Supabase demande une confirmation.')
}
