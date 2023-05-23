import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseClient = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);