export const isSupabaseConfigured = Boolean(process.env.REACT_APP_SUPABASE_URL || '');

async function postgrest(method, path, body) {
  const res = await fetch(`/api/${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let detail = '';
    try {
      const j = await res.json();
      detail = j.error || '';
    } catch (e) {
      detail = await res.text().catch(() => '');
    }
    throw new Error(detail ? `Database error (${res.status}): ${detail.slice(0, 300)}` : `Database error (${res.status})`);
  }

  return res.json();
}

export async function saveItinerary(payload) {
  const rows = await postgrest('POST', 'save-itinerary', payload);
  return (Array.isArray(rows) ? rows[0] : rows) || {};
}

export async function fetchItinerary(id) {
  const rows = await postgrest('GET', `get-itinerary?id=${encodeURIComponent(id)}`, null);
  return (Array.isArray(rows) ? rows[0] : rows) || null;
}

export async function listItineraries(limit = 50) {
  return postgrest('GET', `list-itineraries?limit=${limit}`, null);
}

export async function deleteItinerary(id) {
  return postgrest('DELETE', `delete-itinerary?id=${encodeURIComponent(id)}`, null);
}