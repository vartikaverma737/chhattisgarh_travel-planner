export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  const limit = Math.min(parseInt(req.query.limit || '50', 10), 100);

  try {
    const r = await fetch(
      `${supabaseUrl}/rest/v1/itineraries?select=id,name,days,starting_district,group_type,created_at&order=created_at.desc&limit=${limit}`,
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