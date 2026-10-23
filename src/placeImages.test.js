import { DISTRICTS } from './App';
import { getPlaceImages, PLACE_PHOTOS, DISTRICT_PHOTOS, PLACE_GALLERIES } from './placeimage';

// Independent district check — deliberately not shared with the generator, so a
// mistake in one of them is caught here.
const DISTRICT_MARKERS = [
  ['Tirathgarh', 'Bastar'], ['Chitrakote', 'Bastar'], ['Jagdalpur', 'Bastar'], ['Bastar', 'Bastar'],
  ['Ambikapur', 'Surguja'], ['Mainpat', 'Surguja'], ['Surguja', 'Surguja'],
  ['Ratanpur', 'Bilaspur'], ['Bilaspur', 'Bilaspur'],
  ['Pendra', 'Gaurela-Pendra-Marwahi'], ['Marwahi', 'Gaurela-Pendra-Marwahi'], ['Gaurela', 'Gaurela-Pendra-Marwahi'],
  ['Tatapani', 'Balrampur'], ['Ramanujganj', 'Balrampur'], ['Balrampur', 'Balrampur'],
  ['Chirmiri', 'Manendragarh-Chirmiri-Bharatpur'], ['Manendragarh', 'Manendragarh-Chirmiri-Bharatpur'],
  ['Hasdeo', 'Manendragarh-Chirmiri-Bharatpur'],
  ['Gangrel', 'Dhamtari'], ['Sihawa', 'Dhamtari'], ['Dhamtari', 'Dhamtari'],
  ['Rajnandgaon', 'Rajnandgaon'], ['Mahasamund', 'Mahasamund'], ['Sirpur', 'Mahasamund'],
  ['Baikunthpur', 'Korea'], ['Korea', 'Korea'],
  ['Dantewada', 'Dantewada'], ['Bailadila', 'Dantewada'],
  ['Kondagaon', 'Kondagaon'], ['Dokra', 'Kondagaon'],
  ['Kabirdham', 'Kabirdham'], ['Kawardha', 'Kabirdham'], ['Bhoramdeo', 'Kabirdham'],
  ['Khairagarh', 'Khairagarh-Chhuikhadan-Gandai'], ['Chhuikhadan', 'Khairagarh-Chhuikhadan-Gandai'],
  ['Ambagarh', 'Mohla-Manpur-Ambagarh Chowki'],
  ['Surajpur', 'Surajpur'], ['Narayanpur', 'Narayanpur'],
  ['Sakti', 'Sakti'], ['Bemetara', 'Bemetara'], ['Bijapur', 'Bijapur'],
  ['Gariaband', 'Gariyaband'], ['Sarangarh', 'Sarangarh-Bilaigarh'], ['Bilaigarh', 'Sarangarh-Bilaigarh'],
  ['Kanker', 'Kanker'], ['Balod', 'Balod'], ['Mungeli', 'Mungeli'],
  ['Janjgir', 'Janjgir-Champa'], ['Champa', 'Janjgir-Champa'], ['Raigarh', 'Raigarh'],
  ['Jashpur', 'Jashpur'], ['Korba', 'Korba'], ['Bhilai', 'Durg'], ['Durg', 'Durg'],
  ['Arang', 'Raipur'], ['Saragaon', 'Raipur'], ['Raipur', 'Raipur'],
];

const label = url => {
  let s = (url || '').split('?')[0].split('/').pop();
  try { s = decodeURIComponent(s); } catch { /* keep raw */ }
  return s.replace(/^\d+px-/, '').replace(/\.[a-z0-9]+$/i, '').toLowerCase();
};

// A file name that says "<x> district" names the district outright.
const ALIASES = {
  koriya: 'Korea', balrampur: 'Balrampur', baloda: 'Baloda Bazar', bazar: 'Baloda Bazar',
  gaurela: 'Gaurela-Pendra-Marwahi', pendra: 'Gaurela-Pendra-Marwahi', marwahi: 'Gaurela-Pendra-Marwahi',
  manendragarh: 'Manendragarh-Chirmiri-Bharatpur', chirmiri: 'Manendragarh-Chirmiri-Bharatpur',
  bharatpur: 'Manendragarh-Chirmiri-Bharatpur', khairagarh: 'Khairagarh-Chhuikhadan-Gandai',
  chhuikhadan: 'Khairagarh-Chhuikhadan-Gandai', gandai: 'Khairagarh-Chhuikhadan-Gandai',
  ambagarh: 'Mohla-Manpur-Ambagarh Chowki',
  sarangarh: 'Sarangarh-Bilaigarh',
  bilaigarh: 'Sarangarh-Bilaigarh', janjgir: 'Janjgir-Champa', champa: 'Janjgir-Champa',
  gariyaband: 'Gariyaband', gariaband: 'Gariyaband', ambikapur: 'Surguja', surguja: 'Surguja',
  rajnandgaon: 'Rajnandgaon', dhamtari: 'Dhamtari', kondagaon: 'Kondagaon',
  dantewada: 'Dantewada', kabirdham: 'Kabirdham', kawardha: 'Kabirdham', narayanpur: 'Narayanpur',
  surajpur: 'Surajpur', bijapur: 'Bijapur', sakti: 'Sakti', bemetara: 'Bemetara',
  jashpur: 'Jashpur', sihawa: 'Dhamtari', bhilai: 'Durg', durg: 'Durg', raipur: 'Raipur',
  ratanpur: 'Bilaspur', bilaspur: 'Bilaspur', mungeli: 'Mungeli', lormi: 'Mungeli',
  kanker: 'Kanker', balod: 'Balod', raigarh: 'Raigarh', mahasamund: 'Mahasamund',
  sirpur: 'Mahasamund', korba: 'Korba', korea: 'Korea',
};

const statedDistrict = url => {
  const text = ' ' + label(url).toLowerCase().replace(/[^a-z0-9\s]/g, ' ') + ' ';
  const re = /([a-z]{3,25})\s+(?:distt|dist\.|district)\b/g;
  let m;
  while ((m = re.exec(text))) {
    if (ALIASES[m[1]]) return ALIASES[m[1]];
  }
  return null;
};

const homeDistrict = url => {
  const stated = statedDistrict(url);
  if (stated) return stated;
  const text = ' ' + label(url).replace(/[_.]/g, ' ').replace(/[^a-z0-9 ]/g, ' ') + ' ';
  let best = null;
  DISTRICT_MARKERS.forEach(([marker, district]) => {
    const m = marker.toLowerCase();
    const re = new RegExp('(^|[^a-z0-9])' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9]|$)');
    if (re.test(text) && (!best || m.length > best.len)) best = { district, len: m.length };
  });
  return best ? best.district : null;
};

const GENERIC = [/gangrel-bandh-image/i, /00chrm/i, /tribal_woman/i, /gps coordinates/i];

// Words that carry no identifying information when a file name is matched
// against a place name.
const STOP = new Set([
  'temple', 'dam', 'waterfall', 'museum', 'park', 'lake', 'fort', 'palace', 'market', 'haat', 'bazaar',
  'bridge', 'ghat', 'monument', 'zoo', 'sanctuary', 'national', 'hills', 'falls', 'talab', 'tank', 'chaurasi',
  'mandir', 'madh', 'dham', 'kund', 'sarovar', 'gufa', 'cave', 'jhiri', 'durg', 'maidan', 'chowk',
  'basti', 'bazar', 'mandi', 'gadhi', 'gadh', 'udh', 'bhoj', 'cafe', 'restaurant', 'food', 'street', 'corner',
  'stall', 'point', 'junction', 'station', 'view', 'viewpoint', 'reach', 'circuit', 'trail', 'walk', 'loop',
  'grove', 'block', 'forest', 'river', 'camp', 'stay', 'homestay', 'lodge', 'golf', 'ground', 'stadium',
  'airport', 'railway', 'bus', 'hospital', 'school', 'college', 'university', 'office', 'factory', 'mine',
  'mines', 'plant', 'hotel', 'resort', 'mall', 'complex', 'center', 'centre', 'gate', 'entrance', 'base',
  'hill', 'peak', 'fortress', 'ruins', 'ruin', 'remains', 'heritage', 'scenic', 'secret', 'hidden', 'awaited',
  'authorised', 'informal', 'nagar', 'town', 'city', 'village', 'district', 'state', 'india', 'chhattisgarh',
  'chhattisgarhi', 'sagar', 'bhavan', 'sadna', 'patthar', 'pathar', 'giri', 'pura', 'khurd', 'kalan', 'naya',
  'new', 'old', 'and', 'the', 'of', 'deva', 'devi', 'shiva', 'vishnu', 'krishna', 'hanuman', 'ganesh', 'durga',
  'lakshmi', 'saraswati', 'baba', 'satnarayan', 'bhagwati', 'goddess', 'mandap', 'math', 'jungle', 'wild',
  'life', 'sun', 'sunset', 'sunrise', 'morning', 'evening', 'night', 'spot', 'spots',
]);

// The photo's file name points at this place? (Some places are listed under a
// neighbouring district in the catalogue — e.g. Tandula Dam under Durg.)
const nameMatchesPlace = (url, placeName) => {
  const words = label(url).replace(/[_.]/g, ' ').replace(/[^a-z0-9 ]/g, ' ').split(' ').filter(w => w.length > 2);
  const tokens = placeName.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)
    .filter(t => !STOP.has(t) && t.length > 2);
  if (!tokens.length) return false;
  const hits = tokens.filter(t => words.includes(t));
  return hits.length / tokens.length >= 0.6;
};

const places = DISTRICTS.flatMap(d => (d.touristPlaces || []).map(p => ({ ...p, district: d.name })));

describe('place image coverage', () => {
  it('every place resolves to at least one usable image', () => {
    const missing = [];

    places.forEach(p => {
      const imgs = getPlaceImages(p.name, p.district, p.image);
      if (!imgs || imgs.length === 0) {
        missing.push(`${p.district} / ${p.name}`);
        return;
      }
      imgs.forEach(u => {
        if (!/^https?:\/\//.test(u)) missing.push(`${p.district} / ${p.name} -> ${u}`);
      });
    });

    expect(missing).toEqual([]);
  });

  it('no place falls back to the generic cross-district Gangrel image', () => {
    const gangrel = 'https://portal-tourism.cgstate.gov.in/files/gangrel-bandh-image.webp';
    const offenders = [];

    places.forEach(p => {
      if (p.district === 'Dhamtari') return; // Gangrel Dam belongs to Dhamtari
      if (p.image === gangrel) offenders.push(`${p.district} / ${p.name}`);
    });

    expect(offenders).toEqual([]);
  });

  it('every district banner points at an absolute https url', () => {
    DISTRICTS.forEach(d => {
      expect(d.image).toMatch(/^https?:\/\//);
    });
  });
});

describe('photos belong to the district of the place they are shown on', () => {
  it('no place uses a photo whose name points at another district', () => {
    const offenders = [];

    places.forEach(p => {
      const photo = PLACE_PHOTOS[p.name];
      if (!photo) return;
      const home = homeDistrict(photo.url);
      if (!home || home === p.district) return;
      if (nameMatchesPlace(photo.url, p.name)) return;
      offenders.push(`${p.district} / ${p.name} -> ${label(photo.url)} (${home})`);
    });

    expect(offenders).toEqual([]);
  });

  it('no gallery mixes in a photo from another district', () => {
    const offenders = [];

    places.forEach(p => {
      (PLACE_GALLERIES[p.name] || []).forEach(url => {
        const home = homeDistrict(url);
        if (!home || home === p.district) return;
        if (nameMatchesPlace(url, p.name)) return;
        offenders.push(`${p.district} / ${p.name} -> ${label(url)} (${home})`);
      });
    });

    expect(offenders).toEqual([]);
  });

  it('no district banner shows a photo of a different district', () => {
    const offenders = [];

    DISTRICTS.forEach(d => {
      const photo = DISTRICT_PHOTOS[d.name];
      if (!photo) return;
      const home = homeDistrict(photo.url);
      if (!home || home === d.name) return;
      offenders.push(`${d.name} -> ${label(photo.url)} (${home})`);
    });

    expect(offenders).toEqual([]);
  });

  it('the shared generic photos are never used outside their own district', () => {
    const offenders = [];

    places.forEach(p => {
      const photo = PLACE_PHOTOS[p.name];
      if (!photo) return;
      if (!GENERIC.some(re => re.test(photo.url))) return;
      if (p.district === 'Dhamtari') return; // the Gangrel dam belongs to Dhamtari
      offenders.push(`${p.district} / ${p.name} -> ${label(photo.url)}`);
    });

    expect(offenders).toEqual([]);
  });

  it('every place is marked as an exact photo or a district photo', () => {
    places.forEach(p => {
      const photo = PLACE_PHOTOS[p.name];
      expect(photo).toBeTruthy();
      expect(['place', 'district', 'district-banner']).toContain(photo.kind);
    });
  });
});
