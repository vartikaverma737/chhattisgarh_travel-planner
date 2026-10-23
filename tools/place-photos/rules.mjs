// Shared photo-matching rules.
//
// Every image used by the app must belong to the district of the place it is
// shown on. Wikimedia Commons files carry GPS coordinates and categories, so
// their home district can be resolved objectively. Chhattisgarh Tourism Board
// (CTB) files carry the place name in the file name, so their home district
// can be resolved from the name.

// Place names that pin a photo to one district. Longest match wins.
export const MARKERS = [
  ['Tirathgarh', 'Bastar'], ['Chitrakote', 'Bastar'], ['Jagdalpur', 'Bastar'], ['Darbha', 'Bastar'], ['Bastar', 'Bastar'],
  ['Ambikapur', 'Surguja'], ['Mainpat', 'Surguja'], ['Parshvanath', 'Surguja'], ['Surguja', 'Surguja'],
  ['Ratanpur', 'Bilaspur'], ['Bilaspur', 'Bilaspur'],
  ['Pendra', 'Gaurela-Pendra-Marwahi'], ['Marwahi', 'Gaurela-Pendra-Marwahi'], ['Gaurela', 'Gaurela-Pendra-Marwahi'],
  ['Amritdhara', 'Korea'], ['Tatapani', 'Balrampur'], ['Ramanujganj', 'Balrampur'], ['Balrampur', 'Balrampur'],
  ['Chirmiri', 'Manendragarh-Chirmiri-Bharatpur'], ['Manendragarh', 'Manendragarh-Chirmiri-Bharatpur'],
  ['Bharatpur', 'Manendragarh-Chirmiri-Bharatpur'], ['Hasdeo', 'Manendragarh-Chirmiri-Bharatpur'],
  ['Koriya', 'Korea'],
  ['Gangrel', 'Dhamtari'], ['Sihawa', 'Dhamtari'], ['Dhamtari', 'Dhamtari'],
  ['Rajnandgaon', 'Rajnandgaon'], ['Rajim', 'Rajnandgaon'],
  ['Mahasamund', 'Mahasamund'], ['Sirpur', 'Mahasamund'],
  ['Baikunthpur', 'Korea'], ['Korea', 'Korea'], ['Chirimiri', 'Manendragarh-Chirmiri-Bharatpur'],
  ['Dantewada', 'Dantewada'], ['Bailadila', 'Dantewada'],
  ['Kondagaon', 'Kondagaon'], ['Dokra', 'Kondagaon'], ['Umargaon', 'Kondagaon'], ['Bodeli', 'Kabirdham'],
  ['Kabirdham', 'Kabirdham'], ['Kawardha', 'Kabirdham'], ['Bhoramdeo', 'Kabirdham'],
  ['Khairagarh', 'Khairagarh-Chhuikhadan-Gandai'], ['Chhuikhadan', 'Khairagarh-Chhuikhadan-Gandai'], ['Gandai', 'Khairagarh-Chhuikhadan-Gandai'],
  ['Ambagarh', 'Mohla-Manpur-Ambagarh Chowki'],
  ['Surajpur', 'Surajpur'], ['Bhainsamundi', 'Surajpur'], ['Silajeet', 'Surajpur'],
  ['Narayanpur', 'Narayanpur'], ['Bhairamgarh', 'Narayanpur'],
  ['Sakti', 'Sakti'], ['Chandrapur', 'Sakti'],
  ['Bemetara', 'Bemetara'], ['Deorbeeja', 'Bemetara'],
  ['Bijapur', 'Bijapur'],
  ['Gariaband', 'Gariyaband'], ['Gariyaband', 'Gariyaband'],
  ['Sarangarh', 'Sarangarh-Bilaigarh'], ['Bilaigarh', 'Sarangarh-Bilaigarh'],
  ['Kanker', 'Kanker'],
  ['Baloda Bazar', 'Baloda Bazar'], ['Balodabazar', 'Baloda Bazar'], ['Balod', 'Balod'],
  ['Lormi', 'Mungeli'], ['Mungeli', 'Mungeli'],
  ['Janjgir', 'Janjgir-Champa'], ['Champa', 'Janjgir-Champa'], ['Shivnath', 'Janjgir-Champa'],
  ['Raigarh', 'Raigarh'], ['Jashpur', 'Jashpur'], ['Jogimara', 'Jashpur'],
  ['Korba', 'Korba'], ['Bhilai', 'Durg'], ['Durg', 'Durg'],
  ['Arang', 'Raipur'], ['Saragaon', 'Raipur'], ['Naya Raipur', 'Raipur'], ['Raipur', 'Raipur'], ['Shivratanamantpur', 'Raipur'],
  ['Kudargarhi', 'Dantewada'], ['Girivilas', 'Raigarh'], ['Abujmarh', 'Bastar'],
];

export const norm = s => (s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();

// The 33 districts, with the names people use for them.
export const DISTRICT_ALIASES = {
  koriya: 'Korea',
  korba: 'Korba',
  balrampur: 'Balrampur',
  baloda: 'Baloda Bazar',
  bazar: 'Baloda Bazar',
  gaurela: 'Gaurela-Pendra-Marwahi',
  pendra: 'Gaurela-Pendra-Marwahi',
  marwahi: 'Gaurela-Pendra-Marwahi',
  manendragarh: 'Manendragarh-Chirmiri-Bharatpur',
  chirmiri: 'Manendragarh-Chirmiri-Bharatpur',
  bharatpur: 'Manendragarh-Chirmiri-Bharatpur',
  khairagarh: 'Khairagarh-Chhuikhadan-Gandai',
  chhuikhadan: 'Khairagarh-Chhuikhadan-Gandai',
  gandai: 'Khairagarh-Chhuikhadan-Gandai',
  ambagarh: 'Mohla-Manpur-Ambagarh Chowki',
  sarangarh: 'Sarangarh-Bilaigarh',
  bilaigarh: 'Sarangarh-Bilaigarh',
  janjgir: 'Janjgir-Champa',
  champa: 'Janjgir-Champa',
  gariyaband: 'Gariyaband',
  gariaband: 'Gariyaband',
  ambikapur: 'Surguja',
  surguja: 'Surguja',
  rajnandgaon: 'Rajnandgaon',
  dhamtari: 'Dhamtari',
  kondagaon: 'Kondagaon',
  dantewada: 'Dantewada',
  kabirdham: 'Kabirdham',
  kawardha: 'Kabirdham',
  narayanpur: 'Narayanpur',
  surajpur: 'Surajpur',
  bijapur: 'Bijapur',
  sakti: 'Sakti',
  bemetara: 'Bemetara',
  jashpur: 'Jashpur',
  sihawa: 'Dhamtari',
  bhilai: 'Durg',
  durg: 'Durg',
  raipur: 'Raipur',
  ratanpur: 'Bilaspur',
  bilaspur: 'Bilaspur',
  mungeli: 'Mungeli',
  lormi: 'Mungeli',
  balod: 'Balod',
  raigarh: 'Raigarh',
  mahasamund: 'Mahasamund',
  sirpur: 'Mahasamund',
};

// A file name that says "<something> district" names the district outright —
// that statement wins over every place-name marker.
export function statedDistrict(text) {
  const t = ' ' + norm(text) + ' ';
  const re = /([a-z]{3,25})\s+(?:distt|dist\.|district)\b/g;
  let m;
  while ((m = re.exec(t))) {
    const d = DISTRICT_ALIASES[m[1]];
    if (d) return d;
  }
  return null;
}

export function markerDistrict(text) {
  const stated = statedDistrict(text);
  if (stated) return stated;
  const t = ' ' + norm(text) + ' ';
  let best = null;
  for (const [marker, district] of MARKERS) {
    const m = norm(marker);
    if (!m) continue;
    const re = new RegExp('(^|[^a-z0-9])' + m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '([^a-z0-9]|$)');
    if (re.test(t) && (!best || m.length > best.len)) best = { district, len: m.length };
  }
  return best ? best.district : null;
}

// File name of an image url, without the size prefix and the extension.
export function urlLabel(url) {
  let s = (url || '').split('?')[0].split('#')[0].split('/').pop();
  try { s = decodeURIComponent(s); } catch { /* keep raw */ }
  return s.replace(/^\d+px-/, '').replace(/\.[a-z0-9]+$/i, '');
}

// Images that must never be used as a place photo:
//  • the generic Gangrel dam shot (belongs to Dhamtari only)
//  • the shared "00chrm" village shot and the "tribal woman" shot
//  • map / tile / collage files
export const GENERIC_PATTERNS = [
  /gangrel-bandh-image/i,
  /00chrm/i,
  /tribal_woman/i,
  /gps coordinates/i,
  /(^|[^a-z0-9])coa([^a-z0-9]|$)/i,
  /coat of arms|emblem|seal of/i,
  /locator|in chhattisgarh \(india\)|districts? of/i,
  /\.svg(\?|$)/i,
  /prime minister|union home minister|chief minister|inaugurat|narendra modi|rajnath singh/i,
  /uttar pradesh|madhya pradesh|maharashtra|odisha|orissa|jharkhand|andhra|telangana|bihar|gujarat|rajasthan|punjab|haryana|uttarakhand|kerala|karnataka|tamil nadu|west bengal|assam|sikkim|manipur|tripura|meghalaya|nagaland|mizoram|arunachal|indonesia|filming|movie/i,
];

export function isGeneric(url) {
  const label = (urlLabel(url) || '').replace(/[_]+/g, ' ');
  if (GENERIC_PATTERNS.some(re => re.test(label))) return true;
  if (/\.svg(\?|$)/i.test(url || '')) return true;
  return /(^|[^a-z0-9])(map|tile|topograph|locator|flag|logo)([^a-z0-9]|$)/i.test(label);
}

// The Gangrel dam photo is legitimate for Dhamtari places only.
export function genericException(url, district) {
  if (/gangrel-bandh-image/i.test(urlLabel(url))) return district === 'Dhamtari';
  return false;
}

// Place "type" buckets used to pick a thematically matching photo.
export const TYPE_RULES = {
  tribal: /haat|market|bazaar|mandi|shop|street|craft|dokra|dhokra|stall|basti|folk|bhoj|chhatri|gond|bhil|baiga|handicraft/i,
  spiritual: /temple|mandir|dham|shrine|mosque|church|jain|ashram|deity|mandap|math|goddess|devi|baba|pilgrim|sanctum|maa |durga|maa/i,
  heritage: /fort|palace|museum|heritage|archaeol|ruin|monument|historic|memorial|stone age|archaeolog|chhatri|sanskrit|gond/i,
  nature: /waterfall|falls|dam|lake|river|tank|ghat|reservoir|pond|forest|jungle|national park|sanctuary|reserve|hill|valley|boating|garden|park|wildlife|tiger|bird|viewpoint|trail|camp|eco|grassland|meadow|picnic|island/i,
  adventure: /cave|gufa|trek|raft|adventure|zip|canyon|rappelling|safari/i,
  culture: /mela|fair|festival|dussehra|navratri|cultural|museum|statue|palace|art|yatra/i,
};

// Map a place "type" string (from the catalogue) to one of the buckets above.
export function typeBucket(type) {
  const s = (type || '').toLowerCase();
  if (/tribal|dokra|dhokra|haat|market|bazaar|shopping|food|craft|folk|cafe|bhoj|street|stall|restaurant/.test(s)) return 'tribal';
  if (/wildlife|sanctuary|national|zoo|forest|reserve|arany|jungle|trail|camp|eco|bird|waterfall|dam|lake|river|tank|ghat|pond|boating|water|hot spring|picnic|reservoir|island|hill|viewpoint|mountain|peak|garden|park|nature|scenic|valley|spot/.test(s)) return 'nature';
  if (/temple|mandir|dham|shrine|mosque|church|jain|ashram|pilgrimage|religious|spiritual|gufa|cave|deity|monastery/.test(s)) return 'spiritual';
  if (/fort|palace|museum|heritage|archaeolog|monument|ruin|historic|art/.test(s)) return 'heritage';
  if (/trek|safari|rappelling|zip|adventure|rafting/.test(s)) return 'adventure';
  return 'culture';
}

// Words that carry no identifying information when matching a file name to a
// place name.
const STOP_WORDS = new Set([
  'temple', 'dam', 'waterfall', 'museum', 'park', 'lake', 'fort', 'palace', 'market', 'haat', 'bazaar',
  'bridge', 'ghat', 'monument', 'zoo', 'sanctuary', 'national', 'hills', 'falls', 'talab', 'tank', 'chaurasi',
  'mandir', 'maa', 'madh', 'dham', 'kund', 'sarovar', 'gufa', 'cave', 'jhiri', 'durg', 'maidan', 'chowk',
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
  'life', 'sun', 'sunset', 'sunrise', 'view', 'morning', 'evening', 'night', 'hidden', 'spot', 'spots',
]);

const placeTokens = name => {
  const raw = norm(name).split(' ').filter(Boolean);
  return raw.filter(t => t.length > 2 && !STOP_WORDS.has(t) && !DISTRICT_ALIASES[t]);
};

// Does this file name point at this specific place? A file name that only names
// the district ("kanker-1.jpg") does not identify a place inside it.
export function nameMatchesPlace(url, placeName) {
  const tokens = placeTokens(placeName);
  if (!tokens.length) return false;
  const label = norm(urlLabel(url));
  const words = new Set(label.split(' ').filter(w => w.length > 2));
  const hits = tokens.filter(t => words.has(t));
  return hits.length / tokens.length >= 0.6;
}
