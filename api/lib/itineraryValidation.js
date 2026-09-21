// Shared input-validation used by the Vercel serverless functions.
// Dependency-free so it can also run inside the Jest test environment.

export const ALLOWED_TOP_LEVEL_KEYS = Object.freeze([
  'name',
  'starting_district',
  'days',
  'pace',
  'budget',
  'group_type',
  'interests',
  'itinerary',
]);

export const ALLOWED_INTERESTS = Object.freeze([
  'nature',
  'spiritual',
  'heritage',
  'adventure',
  'photography',
  'tribal',
  'ecotourism',
  'localculture',
]);

export const ALLOWED_PACE = Object.freeze(['relaxed', 'moderate', 'packed']);
export const ALLOWED_BUDGET = Object.freeze(['budget', 'moderate', 'luxury']);
export const ALLOWED_GROUP_TYPES = Object.freeze(['solo', 'couple', 'family', 'friends']);

export const MAX_NAME_LENGTH = 120;
export const MAX_STARTING_DISTRICT_LENGTH = 80;
export const MAX_DAYS = 30;
export const MAX_INTERESTS = 10;
export const MAX_BODY_BYTES = 1024 * 1024; // 1 MiB total request body
export const MAX_ITINERARY_JSON_BYTES = 512 * 1024; // 512 KiB serialized itinerary JSON
export const DEFAULT_LIMIT = 50;
export const MAX_LIMIT = 100;

// Columns safe to read publicly (never leaks delete_token).
export const PUBLIC_ITINERARY_COLUMNS =
  'id,name,starting_district,days,pace,budget,group_type,interests,itinerary,created_at';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidUuid(value) {
  return typeof value === 'string' && UUID_RE.test(value);
}

export function sanitizeLimit(value, fallback = DEFAULT_LIMIT, max = MAX_LIMIT) {
  if (typeof value !== 'string' && typeof value !== 'number') return fallback;
  const parsed = Number.parseInt(String(value), 10);
  if (!Number.isInteger(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, max);
}

function bad(message, status = 400) {
  return { ok: false, error: message, status };
}

// Builds a clean object containing only allowed columns with validated,
// correctly-typed values. Unknown keys are stripped, never forwarded.
export function sanitizeItineraryPayload(raw, rawBytes) {
  if (typeof rawBytes === 'number' && rawBytes > MAX_BODY_BYTES) {
    return bad('Request payload too large', 413);
  }
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    return bad('Invalid itinerary payload');
  }

  const out = {};

  for (const key of ALLOWED_TOP_LEVEL_KEYS) {
    if (!(key in raw)) continue;
    const value = raw[key];

    if (key === 'name') {
      if (typeof value !== 'string') return bad('Invalid itinerary name');
      const trimmed = value.trim();
      if (!trimmed || trimmed.length > MAX_NAME_LENGTH) {
        return bad('Invalid itinerary name');
      }
      out.name = trimmed;
      continue;
    }

    if (key === 'starting_district') {
      if (value === null || value === undefined) continue;
      if (typeof value !== 'string' || value.length > MAX_STARTING_DISTRICT_LENGTH) {
        return bad('Invalid starting district');
      }
      out.starting_district = value;
      continue;
    }

    if (key === 'days') {
      if (!Number.isInteger(value) || value < 1 || value > MAX_DAYS) {
        return bad('Invalid trip duration');
      }
      out.days = value;
      continue;
    }

    if (key === 'pace') {
      if (value === null || value === undefined) continue;
      if (!ALLOWED_PACE.includes(value)) return bad('Invalid pace');
      out.pace = value;
      continue;
    }

    if (key === 'budget') {
      if (value === null || value === undefined) continue;
      if (!ALLOWED_BUDGET.includes(value)) return bad('Invalid budget');
      out.budget = value;
      continue;
    }

    if (key === 'group_type') {
      if (value === null || value === undefined) continue;
      if (!ALLOWED_GROUP_TYPES.includes(value)) return bad('Invalid group type');
      out.group_type = value;
      continue;
    }

    if (key === 'interests') {
      if (value === null || value === undefined) continue;
      if (!Array.isArray(value) || value.length > MAX_INTERESTS) {
        return bad('Invalid interests');
      }
      const seen = new Set();
      for (const item of value) {
        if (typeof item !== 'string' || !ALLOWED_INTERESTS.includes(item)) {
          return bad('Invalid interests');
        }
        seen.add(item);
      }
      out.interests = Array.from(seen);
      continue;
    }

    if (key === 'itinerary') {
      if (value === null || value === undefined) continue;
      if (typeof value !== 'object' || Array.isArray(value)) {
        return bad('Invalid itinerary data');
      }
      const serialized = JSON.stringify(value);
      if (typeof serialized !== 'string' || serialized.length > MAX_ITINERARY_JSON_BYTES) {
        return bad('Itinerary data too large');
      }
      if (Array.isArray(value.itinerary)) {
        if (value.itinerary.length === 0) return bad('Itinerary has no days');
        if (value.itinerary.length > MAX_DAYS) return bad('Itinerary has too many days');
      }
      out.itinerary = value;
      continue;
    }
  }

  if (!('name' in out)) {
    return bad('Itinerary name is required');
  }

  return { ok: true, data: out };
}

// Random capability token used for ownership-based deletion. Generated
// server-side on insert and only ever returned to the creating client.
export function createDeleteToken() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  // RFC 4122-shaped fallback for environments without Web Crypto.
  const bytes = Array.from({ length: 16 }, () => Math.floor(Math.random() * 256));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}