import { sanitizeItineraryPayload, createDeleteToken, MAX_BODY_BYTES } from './lib/itineraryValidation.js';

const MAX_BODY = MAX_BODY_BYTES;

async function readBody(req, maxBytes) {
  if (req.body !== undefined) {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (body.length > maxBytes) {
      return { ok: false, status: 413, error: 'Request payload too large' };
    }
    return { ok: true, body };
  }
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;
    let settled = false;
    req.on('data', (chunk) => {
      total += chunk.length;
      if (total > maxBytes) {
        if (!settled) {
          settled = true;
          req.removeAllListeners('data');
          req.removeAllListeners('end');
          req.resume();
          resolve({ ok: false, status: 413, error: 'Request payload too large' });
        }
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if (settled) return;
      settled = true;
      const body = Buffer.concat(chunks).toString('utf8');
      if (body.length > maxBytes) {
        resolve({ ok: false, status: 413, error: 'Request payload too large' });
      } else {
        resolve({ ok: true, body });
      }
    });
    req.on('error', (err) => reject(err));
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Supabase not configured' });
  }

  let rawBody;
  try {
    rawBody = await readBody(req, MAX_BODY);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  if (!rawBody.ok) {
    return res.status(rawBody.status).json({ error: rawBody.error });
  }

  let payload;
  try {
    payload = rawBody.body ? JSON.parse(rawBody.body) : {};
  } catch (err) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const checked = sanitizeItineraryPayload(payload, rawBody.body.length);
  if (!checked.ok) {
    return res.status(checked.status).json({ error: checked.error });
  }

  const row = { ...checked.data, delete_token: createDeleteToken() };

  try {
    const r = await fetch(`${supabaseUrl}/rest/v1/itineraries`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(row),
    });

    const text = await r.text().catch(() => '');
    let parsed;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch (err) {
      parsed = null;
    }

    if (!r.ok || parsed === null) {
      return res.status(r.ok ? 500 : 502).json({ error: 'Database operation failed' });
    }

    const created = Array.isArray(parsed) ? parsed[0] : parsed;
    res.status(201).setHeader('Content-Type', 'application/json');
    return res.json(created);
  } catch (err) {
    return res.status(502).json({ error: 'Database operation failed' });
  }
}