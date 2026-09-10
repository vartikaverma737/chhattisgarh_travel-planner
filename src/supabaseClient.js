import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function saveItinerary(payload) {
  if (!supabase) throw new Error('Database not configured');
  const { data, error } = await supabase.from('itineraries').insert([payload]).select('id').single();
  if (error) throw error;
  return data;
}

export async function fetchItinerary(id) {
  if (!supabase) throw new Error('Database not configured');
  const { data, error } = await supabase.from('itineraries').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}