import { sanitizeLimit, PUBLIC_ITINERARY_COLUMNS } from './lib/itineraryValidation.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  const limit = sanitizeLimit(req.query.limit);

  try {
    const r = await fetch(
      `${supabaseUrl}/rest/v1/itineraries?select=id,name,days,starting_district,group_type,created_at&order=created_at.desc&limit=${limit}`,
      {
        headers: { apikey: supabaseKey },
      }
    );

    const text = await r.text().catch(() => '');
    let parsed;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch (err) {
      parsed = null;
    }

    if (!r.ok || parsed === null) {
      return res.status(502).json({ error: 'Database operation failed' });
    }

    res.status(200).setHeader('Content-Type', 'application/json');
    return res.json(parsed);
  } catch (err) {
    return res.status(502).json({ error: 'Upstream error' });
  }
}