export default async function handler(req, res) {
  const id = req.query.id;
  if (!id) {
    return res.status(400).json({ error: 'Missing id' });
  }

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  try {
    const r = await fetch(
      `${supabaseUrl}/rest/v1/itineraries?select=*&id=eq.${encodeURIComponent(id)}`,
      {
        headers: { apikey: supabaseKey },
      }
    );

    const text = await r.text().catch(() => '');
    res.status(r.status).setHeader('Content-Type', 'application/json');
    return res.send(text || '[]');
  } catch (err) {
    return res.status(502).json({ error: `Upstream error: ${err.message}` });
  }
}