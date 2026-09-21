import {
  sanitizeItineraryPayload,
  sanitizeLimit,
  isValidUuid,
  createDeleteToken,
  MAX_DAYS,
  MAX_NAME_LENGTH,
  MAX_BODY_BYTES,
} from '../../api/lib/itineraryValidation.js';

const validItinerary = {
  name: 'Bastar Waterfall Adventure',
  starting_district: 'Bastar',
  days: 3,
  pace: 'moderate',
  budget: 'moderate',
  group_type: 'family',
  interests: ['nature', 'tribal'],
  itinerary: { itinerary: [{ day: 1, title: 'Day 1', activities: [] }], insights: [] },
};

describe('sanitizeItineraryPayload', () => {
  test('accepts a valid payload and returns only allowed columns', () => {
    const r = sanitizeItineraryPayload(validItinerary, 1000);
    expect(r.ok).toBe(true);
    expect(Object.keys(r.data).sort()).toEqual(
      ['budget', 'days', 'group_type', 'interests', 'itinerary', 'name', 'pace', 'starting_district'].sort()
    );
  });

  test('strips unknown keys and trims the name', () => {
    const r = sanitizeItineraryPayload({ ...validItinerary, admin: true, delete_token: 'spoofed', name: '  My Trip  ' }, 1000);
    expect(r.ok).toBe(true);
    expect(r.data).not.toHaveProperty('admin');
    expect(r.data).not.toHaveProperty('delete_token');
    expect(r.data.name).toBe('My Trip');
  });

  test('rejects a missing name', () => {
    const { name, ...rest } = validItinerary;
    const r = sanitizeItineraryPayload(rest, 1000);
    expect(r.ok).toBe(false);
    expect(r.status).toBe(400);
  });

  test('rejects a name that is too long', () => {
    const r = sanitizeItineraryPayload({ ...validItinerary, name: 'x'.repeat(MAX_NAME_LENGTH + 1) }, 1000);
    expect(r.ok).toBe(false);
  });

  test('rejects a non-string name', () => {
    const r = sanitizeItineraryPayload({ ...validItinerary, name: 123 }, 1000);
    expect(r.ok).toBe(false);
  });

  test('rejects days outside 1..30', () => {
    expect(sanitizeItineraryPayload({ ...validItinerary, days: 0 }, 1000).ok).toBe(false);
    expect(sanitizeItineraryPayload({ ...validItinerary, days: MAX_DAYS + 1 }, 1000).ok).toBe(false);
    expect(sanitizeItineraryPayload({ ...validItinerary, days: 3.5 }, 1000).ok).toBe(false);
    expect(sanitizeItineraryPayload({ ...validItinerary, days: '3' }, 1000).ok).toBe(false);
  });

  test('rejects invalid pace', () => {
    expect(sanitizeItineraryPayload({ ...validItinerary, pace: 'ludicrous' }, 1000).ok).toBe(false);
  });

  test('rejects invalid budget', () => {
    expect(sanitizeItineraryPayload({ ...validItinerary, budget: 'free' }, 1000).ok).toBe(false);
  });

  test('rejects invalid group_type', () => {
    expect(sanitizeItineraryPayload({ ...validItinerary, group_type: 'millionaires' }, 1000).ok).toBe(false);
  });

  test('rejects interests that are not an array', () => {
    expect(sanitizeItineraryPayload({ ...validItinerary, interests: 'nature' }, 1000).ok).toBe(false);
  });

  test('rejects interests containing unknown values', () => {
    const r = sanitizeItineraryPayload({ ...validItinerary, interests: ['nature', '<script>'] }, 1000);
    expect(r.ok).toBe(false);
  });

  test('dedupes duplicate interests', () => {
    const r = sanitizeItineraryPayload({ ...validItinerary, interests: ['nature', 'nature'] }, 1000);
    expect(r.ok).toBe(true);
    expect(r.data.interests).toEqual(['nature']);
  });

  test('rejects an itinerary that is an array', () => {
    const r = sanitizeItineraryPayload({ ...validItinerary, itinerary: [] }, 1000);
    expect(r.ok).toBe(false);
  });

  test('rejects an itinerary with no days', () => {
    const r = sanitizeItineraryPayload({ ...validItinerary, itinerary: { itinerary: [] } }, 1000);
    expect(r.ok).toBe(false);
  });

  test('rejects an itinerary with too many days', () => {
    const days = Array.from({ length: MAX_DAYS + 1 }, (_, i) => ({ day: i + 1 }));
    const r = sanitizeItineraryPayload({ ...validItinerary, itinerary: { itinerary: days } }, 10 * 1024 * 1024);
    expect(r.ok).toBe(false);
  });

  test('rejects an oversized itinerary JSON payload', () => {
    // ~700 KB serialized itinerary: above the 512 KiB itinerary limit but
    // below the 1 MiB request-body limit so the itinerary check is hit first.
    const big = {
      itinerary: [
        {
          day: 1,
          title: 'Day 1',
          activities: Array.from({ length: 25000 }, (_, i) => ({
            title: `x${i}${'y'.repeat(20)}`,
          })),
        },
      ],
    };
    const r = sanitizeItineraryPayload({ ...validItinerary, itinerary: big }, 900 * 1024);
    expect(r.ok).toBe(false);
    expect(r.error).toBe('Itinerary data too large');
  });

  test('rejects an oversized request body with 413', () => {
    const r = sanitizeItineraryPayload(validItinerary, MAX_BODY_BYTES + 1);
    expect(r.ok).toBe(false);
    expect(r.status).toBe(413);
  });

  test('rejects non-object payloads', () => {
    expect(sanitizeItineraryPayload(null, 10).ok).toBe(false);
    expect(sanitizeItineraryPayload('string', 10).ok).toBe(false);
    expect(sanitizeItineraryPayload([], 10).ok).toBe(false);
  });

  test('treats missing size metadata as no size limit', () => {
    const r = sanitizeItineraryPayload(validItinerary, undefined);
    expect(r.ok).toBe(true);
  });
});

describe('isValidUuid', () => {
  test('accepts RFC 4122 UUIDs', () => {
    expect(isValidUuid('4f4ef1ad-0d2b-4b0a-9e9e-9b8e1a5a2c11')).toBe(true);
    expect(isValidUuid('4f4ef1ad-0d2b-4b0a-9e9e-9b8e1a5a2c11'.toUpperCase())).toBe(true);
  });

  test('rejects malformed ids', () => {
    expect(isValidUuid('not-a-uuid')).toBe(false);
    expect(isValidUuid('')).toBe(false);
    expect(isValidUuid(null)).toBe(false);
    expect(isValidUuid(123)).toBe(false);
    expect(isValidUuid('4f4ef1ad-0d2b-4b0a-9e9e-9b8e1a5a2c1')).toBe(false);
  });
});

describe('sanitizeLimit', () => {
  test('clamps to 1..100 with a default of 50', () => {
    expect(sanitizeLimit(undefined)).toBe(50);
    expect(sanitizeLimit('abc')).toBe(50);
    expect(sanitizeLimit('0')).toBe(50);
    expect(sanitizeLimit('-5')).toBe(50);
    expect(sanitizeLimit('25')).toBe(25);
    expect(sanitizeLimit('999')).toBe(100);
  });
});

describe('createDeleteToken', () => {
  test('returns a 36-char UUID-shaped token', () => {
    const token = createDeleteToken();
    expect(token).toHaveLength(36);
    expect(isValidUuid(token)).toBe(true);
  });

  test('produces unique tokens', () => {
    const a = createDeleteToken();
    const b = createDeleteToken();
    expect(a).not.toBe(b);
  });
});