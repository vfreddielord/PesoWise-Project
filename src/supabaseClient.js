import { createClient } from '@supabase/supabase-js'

// This looks for variables in your .env file locally OR Vercel Settings online
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)