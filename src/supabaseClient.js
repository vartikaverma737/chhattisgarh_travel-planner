const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

async function postgrest(path, { method = 'GET', body } = {}) {
  if (!isSupabaseConfigured) throw new Error('Database not configured');

  // Header values must be ASCII (ISO-8859-1). Strip any hidden non-ASCII
  // characters (e.g. zero-width spaces copied from a dashboard) so they can
  // never break fetch().
  const latin1 = (v) => String(v || '').replace(/[^\x00-\xFF]/g, '');

  const headers = {
    apikey: latin1(SUPABASE_ANON_KEY),
    'Content-Type': 'application/json',
  };
  if (method === 'POST') headers.Prefer = 'return=representation';

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    const short = detail.slice(0, 300);
    throw new Error(`Database error (${res.status})${short ? `: ${short}` : ''}`);
  }

  return res.json();
}

export async function saveItinerary(payload) {
  const rows = await postgrest('itineraries', { method: 'POST', body: payload });
  return rows[0] || {};
}

export async function fetchItinerary(id) {
  const rows = await postgrest(`itineraries?select=*&id=eq.${encodeURIComponent(id)}`);
  return rows[0] || null;
}