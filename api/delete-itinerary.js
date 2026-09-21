import { isValidUuid } from './lib/itineraryValidation.js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }
  if (!isValidUuid(id)) {
    return res.status(400).json({ error: 'Invalid itinerary id' });
  }

  const deleteToken = req.headers['x-delete-token'];
  if (!deleteToken || typeof deleteToken !== 'string' || deleteToken.length > 128) {
    return res.status(401).json({ error: 'Delete token required' });
  }

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  try {
    const r = await fetch(
      `${supabaseUrl}/rest/v1/itineraries?id=eq.${id}&delete_token=eq.${encodeURIComponent(deleteToken)}`,
      {
        method: 'DELETE',
        headers: {
          apikey: supabaseKey,
          Prefer: 'return=representation',
          'x-delete-token': deleteToken,
        },
      }
    );

    const text = await r.text().catch(() => '');
    let parsed;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch (err) {
      parsed = null;
    }

    if (!r.ok) {
      return res.status(502).json({ error: 'Database operation failed' });
    }

    const deleted = Array.isArray(parsed) ? parsed : [];
    if (deleted.length === 0) {
      return res.status(404).json({ error: 'Itinerary not found or you are not allowed to delete it' });
    }

    res.status(200).setHeader('Content-Type', 'application/json');
    return res.json(deleted[0]);
  } catch (err) {
    return res.status(502).json({ error: 'Upstream error' });
  }
}