import SUPPLEMENTAL_PLACES, { countSupplemental, SUPPLEMENTAL_LANG } from './index';

const DISTRICTS = [
  'Raipur', 'Bilaspur', 'Bastar', 'Durg', 'Rajnandgaon', 'Korba', 'Surguja',
  'Mahasamund', 'Dhamtari', 'Gariyaband', 'Kabirdham', 'Jashpur', 'Korea',
  'Dantewada', 'Kanker', 'Kondagaon', 'Balod', 'Baloda Bazar', 'Balrampur',
  'Bemetara', 'Bijapur', 'Gaurela-Pendra-Marwahi', 'Janjgir-Champa',
  'Khairagarh-Chhuikhadan-Gandai', 'Manendragarh-Chirmiri-Bharatpur',
  'Mohla-Manpur-Ambagarh Chowki', 'Mungeli', 'Narayanpur', 'Raigarh',
  'Sakti', 'Sarangarh-Bilaigarh', 'Sukma', 'Surajpur',
];

describe('supplemental catalogue integrity', () => {
  it('uses only canonical district keys', () => {
    expect(Object.keys(SUPPLEMENTAL_PLACES).sort()).toEqual([...DISTRICTS].sort());
  });

  it('adds at least one place to every district', () => {
    for (const d of DISTRICTS) {
      expect(SUPPLEMENTAL_PLACES[d].length).toBeGreaterThan(0);
    }
  });

  it('every place record has the full schema', () => {
    const names = [];
    for (const places of Object.values(SUPPLEMENTAL_PLACES)) {
      for (const p of places) {
        for (const f of ['name', 'type', 'shortDesc', 'fullDesc', 'entryFee', 'bestTime', 'timings', 'tips']) {
          if (typeof p[f] !== 'string' || p[f].trim().length <= 2) {
            throw new Error(`${p.name} -> field ${f} missing or hollow`);
          }
        }
        if (typeof p.rating !== 'number' || p.rating < 3 || p.rating > 5) {
          throw new Error(`${p.name} -> rating out of range`);
        }
        names.push(p.name);
      }
    }
    expect(new Set(names).size).toBe(names.length); // globally unique names
  });

  it('has a meaningful supplemental size', () => {
    expect(countSupplemental()).toBeGreaterThanOrEqual(130);
  });

  it('every place has exact hi/cg translations', () => {
    for (const places of Object.values(SUPPLEMENTAL_PLACES)) {
      for (const p of places) {
        const tr = SUPPLEMENTAL_LANG[p.name];
        if (!tr) throw new Error(`no lang entry for ${p.name}`);
        for (const lng of ['hi', 'cg']) {
          const block = tr[lng];
          if (!block) throw new Error(`${p.name} missing ${lng} block`);
          for (const f of ['name', 'shortDesc', 'fullDesc', 'tips']) {
            if (typeof block[f] !== 'string' || block[f].trim().length <= 2) {
              throw new Error(`${p.name} -> ${lng}.${f} missing or hollow`);
            }
          }
        }
      }
    }
  });

  it('every lang key maps to a real place (no orphans)', () => {
    const english = new Set();
    for (const places of Object.values(SUPPLEMENTAL_PLACES)) {
      for (const p of places) english.add(p.name);
    }
    for (const key of Object.keys(SUPPLEMENTAL_LANG)) {
      if (!english.has(key)) throw new Error(`orphan lang key: ${key}`);
    }
  });
});