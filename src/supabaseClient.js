import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kjljqvhvvlqgdhflbycr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqbGpxdmh2dmxxZ2RoZmxieWNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MTA4MzUsImV4cCI6MjA4NTk4NjgzNX0.iRcCNldpQQRXdaxaWHcUreGls67LsEAZsAv2G6mdRFY'

export const supabase = createClient(supabaseUrl, supabaseKey)