import { supabase } from './supabase';

// Initialize database tables for client invite system
export async function initializeDatabase() {
  try {
    // Create client_invites table
    // Note: This approach creates the table through a stored procedure
    // In production, you'd use Supabase migrations instead
    
    // Try to insert a dummy record to test if table exists
    const { error: testError } = await supabase
      .from('client_invites')
      .select('id')
      .limit(1);

    if (testError && testError.code === 'PGRST116') {
      // Table doesn't exist
      console.log('Client invites table does not exist. Please create it manually in Supabase.');
      console.log(`
Run this SQL in your Supabase SQL editor:

CREATE TABLE IF NOT EXISTS public.client_invites (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id text NOT NULL,
  client_name text NOT NULL,
  client_email text NOT NULL,
  invite_token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  invited_by text NOT NULL,
  created_at timestamptz DEFAULT now(),
  accepted_at timestamptz,
  UNIQUE (project_id, client_email)
);

ALTER TABLE public.client_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access client_invites" ON public.client_invites FOR ALL USING (true);

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  role text DEFAULT 'Client' CHECK (role IN ('Engineer', 'Project Lead', 'Admin', 'Client')),
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (id)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Service role full access profiles" ON public.profiles FOR ALL USING (true);
      `);
    }

    // Similarly for profiles table
    const { error: profileTestError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (profileTestError && profileTestError.code === 'PGRST116') {
      console.log('Profiles table does not exist. Please create it manually in Supabase (see SQL above).');
    }

    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error };
  }
}

// Call this when the app starts
export const ensureDatabaseExists = () => {
  if (typeof window !== 'undefined') {
    // Only run in browser
    setTimeout(() => {
      initializeDatabase();
    }, 1000);
  }
};