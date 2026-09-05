import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Fallback dummy client or real Supabase client
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface LeadSubmission {
  id?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone: string;
  city?: string;
  service?: string;
  message?: string;
  source_page?: string;
  created_at?: string;
}
