// Generates src/placephotos.generated.js
//
// Every place card must show a photo that actually belongs to that place's
// district. This script resolves the "home district" of every candidate photo
// (Wikimedia Commons GPS + categories, or the place name inside a Chhattisgarh
// Tourism Board file name) and then assigns one verified photo per place:
//
//   1. the place's own photo, when it is verified for that district
//   2. a photo of that exact place found on Wikimedia Commons
//   3. a photo from the same district and the same kind of place
//   4. any photo from the same district
//   5. the district banner
//
// Anything that cannot be verified never reaches the app.
//
// Usage:  node tools/place-photos/generate.mjs
// Input:  tools/place-photos/data/*.json  (harvested photo metadata)
//         src/placephotos.generated.js     (output)

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { markerDistrict, urlLabel, isGeneric, genericException, typeBucket, TYPE_RULES, norm, nameMatchesPlace } from './rules.mjs';
import { CURATED_PLACE_IMAGES, CURATED_DISTRICT_FALLBACKS } from './data/curated-map.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const DATA = join(HERE, 'data');
const read = p => JSON.parse(readFileSync(p, 'utf8'));

const catalogue = read(join(DATA, 'catalogue.json'));   // [{ name, district, type, image, districtImage }]
const commons = read(join(DATA, 'commons.json'));       // harvested Commons files
const curated = read(join(DATA, 'curated.json'));       // photos already used by the app
const districtSearch = read(join(DATA, 'district_photos.json'));
const placeSearch = read(join(DATA, 'search_results.json'));

// ── the curated gallery map (candidate photos, district-checked below) ───────
const curatedMap = CURATED_PLACE_IMAGES;

// ── district coordinates (parsed from the app so both stay in sync) ──────────
const appSrc = readFileSync(join(ROOT, 'src', 'App.js'), 'utf8');
const DCO = {};
const reD = /name: '([^']+)',[\s\S]{0,600}?coordinates: \{ lat: ([-\d.]+), lng: ([-\d.]+) \}/g;
let m;
while ((m = reD.exec(appSrc))) if (!DCO[m[1]]) DCO[m[1]] = { lat: +m[2], lon: +m[3] };

const kmBetween = (a, b, c, d) => {
  const R = 6371, t = Math.PI / 180;
  const dLa = (c - a) * t, dLo = (d - b) * t;
  const x = Math.sin(dLa / 2) ** 2 + Math.cos(a * t) * Math.cos(c * t) * Math.sin(dLo / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};

// ── index every known file by its name ───────────────────────────────────────
const fileByLabel = new Map();
for (const f of [...commons, ...curated]) {
  if (!f || f.missing || !f.thumb) continue;
  fileByLabel.set(norm(urlLabel(f.title)), f);
}

// Resolve which district an image belongs to. Returns null when unknown.
function homeDistrict(url) {
  const label = urlLabel(url);
  const f = fileByLabel.get(norm(label));
  if (f) return homeOf(f);
  const byName = markerDistrict(label);
  if (byName) return byName;
  return null;
}

// Same, for a file record that carries its own coordinates. A photo whose
// coordinates are nowhere near Chhattisgarh is never used, no matter what its
// name says (e.g. a Czech monument of a person called "Mohla").
function homeOf(f) {
  if (!f) return null;
  if (f.lat != null) {
    let best = null;
    for (const [d, c] of Object.entries(DCO)) {
      const km = kmBetween(c.lat, c.lon, f.lat, f.lon);
      if (km < 60 && (!best || km < best.km)) best = { d, km };
    }
    return best ? best.d : null;
  }
  const byName = markerDistrict(urlLabel(f.thumb || f.title || ''));
  if (byName) return byName;
  const byMeta = markerDistrict(`${f.title || ''} ${f.desc || ''} ${(f.cats || []).join(' ')}`);
  return byMeta || null;
}

// ── candidate photos, grouped by the district they belong to ─────────────────
// A photo may only enter a pool when it is *verifiable*: GPS coordinates inside
// the district, a file name that states the district, or text/categories that
// place it in Chhattisgarh. This stops look-alike words (e.g. the Czech word
// "mohla" in an aircraft photo) from being mistaken for a district.
// Evidence that a search hit really is in Chhattisgarh. Membership of the
// Chhattisgarh-scoped Commons/curated pools is evidence in itself; the looser
// district-name searches are not, so those hits need coordinates, a near-centre
// distance, or the state name in their own metadata ("Louny District" does not
// mean Chhattisgarh, and neither does a PIB licence tag mentioning India).
const CHHATTISGARH = /chhattisgarh|chhatisgarh|chattisgarh/;
const inState = (f, text) => f.lat != null
  || (f.km != null && f.km <= 70)
  || CHHATTISGARH.test(text);

const districtPool = {};   // district -> [ { url, title, bucket } ]
const addPool = (district, bucket, url, title, rec) => {
  if (!district || !url) return;
  if (!/^https?:|^\/\//.test(url)) return;
  if (!/\.(jpe?g|png|webp)(\?|$)/i.test(url)) return;
  if (isGeneric(url) && !genericException(url, district)) return;
  districtPool[district] = districtPool[district] || [];
  if (!districtPool[district].some(x => x.url === url)) districtPool[district].push({ url, title, bucket, rec });
};

for (const f of [...commons, ...curated]) {
  if (!f || f.missing || !f.thumb) continue;
  const d = homeOf(f);
  if (!d) continue;
  const text = norm(`${(f.cats || []).join(' ')} ${f.title} ${f.desc || ''}`);
  let bucket = 'culture';
  for (const [k, re] of Object.entries(TYPE_RULES)) if (re.test(text)) { bucket = k; break; }
  addPool(d, bucket, f.thumb, f.title, f);
}

// district-level search results (photos of landmarks inside the district)
for (const [district, files] of Object.entries(districtSearch)) {
  for (const f of files || []) {
    if (!f || !f.thumb) continue;
    // Use the coordinate on the file itself: a photo taken outside Chhattisgarh
    // (even one whose name contains a district-like word) is never used.
    const d = homeOf(f);
    if (d !== district) continue;
    const text = norm(`${(f.cats || []).join(' ')} ${f.title} ${f.desc || ''}`);
    if (!inState(f, text)) continue;
    let bucket = 'culture';
    for (const [k, re] of Object.entries(TYPE_RULES)) if (re.test(text)) { bucket = k; break; }
    addPool(district, bucket, f.thumb, f.title, f);
  }
}

// the district's own CTB banner file — usable as a pool member unless its name
// points at a different district (several of them did)
for (const [district, url] of Object.entries(CURATED_DISTRICT_FALLBACKS)) {
  if (!url) continue;
  const home = homeDistrict(url);
  if (home && home !== district) continue;
  addPool(district, 'culture', url, `${district} banner`);
}

// ── assignment ───────────────────────────────────────────────────────────────
// A pool must never hold a photo that verifiably belongs to another district.
const poolIssues = [];
for (const [district, items] of Object.entries(districtPool)) {
  for (const it of items) {
    const h = homeOf(it.rec) || homeDistrict(it.url);
    if (h && h !== district) poolIssues.push(`${district} <- ${urlLabel(it.url)} [${h}]`);
  }
}


if (process.env.PHOTO_DEBUG) {
  for (const [dd, items] of Object.entries(districtPool)) {
    if (!dd.startsWith(process.env.PHOTO_DEBUG)) continue;
    console.log('POOL', dd, items.length);
    items.slice(0, 14).forEach(i => console.log('   ', urlLabel(i.url), '|', i.bucket));
  }
}
const rot = {};
const pick = (arr, key) => {
  rot[key] = rot[key] || 0;
  const v = arr[rot[key] % arr.length];
  rot[key]++;
  return v;
};

const PLACE_PHOTOS = {};
const PLACE_GALLERIES = {};
const notes = [];
const crossDistrict = [];

for (const place of catalogue) {
  const district = place.district;
  const bucket = typeBucket(place.type);
  const pool = districtPool[district] || [];
  const banner = place.districtImage;
  const name = place.name;

  // candidate photos of this exact place that were curated in src/placeimage.js.
  // A curated photo may be kept when it belongs to the place's district or when
  // its file name points at that place (some places are listed under a
  // neighbouring district in the catalogue).
  const curatedOwn = (curatedMap[name] || []).filter(u => {
    if (isGeneric(u)) return false;
    const home = homeDistrict(u);
    return home === district || nameMatchesPlace(u, name);
  });
  const curatedOwnUnverified = (curatedMap[name] || []).filter(u => {
    if (isGeneric(u)) return false;
    const home = homeDistrict(u);
    return home !== district && home !== null && !nameMatchesPlace(u, name);
  });

  // 1) an exact photo of this place found on Wikimedia Commons. A high text
  //    similarity is not enough: the file must also be of this place by name or
  //    belong to this district (otherwise "… Waterfall" matches any waterfall).
  const hit = (placeSearch[district + '||' + name] || {}).cands || [];
  const best = hit.find(h => h.s >= 0.85
    && (nameMatchesPlace(h.thumb, name) || homeDistrict(h.thumb) === district));

  // 2) the place's current photo, when it verifiably belongs to this district
  //    (or when the file name points at the place itself)
  const currentHome = place.image ? homeDistrict(place.image) : null;
  const currentOk = Boolean(place.image) && !isGeneric(place.image)
    && (currentHome === district || nameMatchesPlace(place.image, name));

  let chosen = null;
  let kind = 'district';

  if (best) {
    chosen = { url: best.thumb, title: best.title };
    kind = 'place';
  } else if (curatedOwn.length) {
    chosen = { url: curatedOwn[0], title: name };
    // A file that only names the district is a district photo, not this place.
    kind = nameMatchesPlace(curatedOwn[0], name) ? 'place' : 'district';
  } else if (currentOk) {
    chosen = { url: place.image, title: name };
    kind = nameMatchesPlace(place.image, name) ? 'place' : 'district';
  } else {
    const typed = pool.filter(x => x.bucket === bucket && x.url !== banner);
    const loose = pool.filter(x => x.url !== banner && TYPE_RULES[bucket].test(x.title || ''));
    const any = pool.filter(x => x.url !== banner);
    const src = typed.length ? typed : loose.length ? loose : any;
    if (src.length) {
      const p = pick(src, `${district}|${bucket}`);
      chosen = { url: p.url, title: p.title };
      kind = 'district';
    } else if (banner && !isGeneric(banner)) {
      chosen = { url: banner, title: district };
      kind = 'district-banner';
    }
  }

  if (!chosen) {
    notes.push(`${district} | ${name}: no verified photo`);
    continue;
  }

  PLACE_PHOTOS[name] = { url: chosen.url, kind, title: chosen.title || name };
  // gallery = photos that verifiably show this exact place (or a search hit)
  const gallery = [];
  for (const u of curatedOwn) if (nameMatchesPlace(u, name)) gallery.push(u);
  if (currentOk && nameMatchesPlace(place.image, name) && !gallery.includes(place.image)) gallery.push(place.image);
  if (best && best.thumb !== place.image && !gallery.includes(best.thumb)) gallery.push(best.thumb);
  if (gallery.length) PLACE_GALLERIES[name] = gallery.slice(0, 5);
  if (curatedOwnUnverified.length) {
    crossDistrict.push({ place: name, district, images: curatedOwnUnverified.map(urlLabel) });
  }
}

// ── district banners: only verified for their own district ───────────────────
const DISTRICT_PHOTOS = {};
const bannerIssues = [];
for (const district of Object.keys(DCO)) {
  const entry = catalogue.find(p => p.district === district);
  if (!entry) continue;
  const banner = entry.districtImage;
  const home = banner ? homeDistrict(banner) : null;
  if (banner && home === district && !isGeneric(banner)) {
    DISTRICT_PHOTOS[district] = { url: banner, title: district };
    continue;
  }
  bannerIssues.push({ district, banner, home });
  const pool = (districtPool[district] || []).filter(x => !isGeneric(x.url));
  const official = CURATED_DISTRICT_FALLBACKS[district];
  const pick = (official && pool.find(x => x.url === official)) || pool[0];
  if (pick) {
    DISTRICT_PHOTOS[district] = { url: pick.url, title: pick.title };
  }
  // An unverifiable banner is never used — better no banner than a wrong one.
}

// ── curated experience cards (tribal/eco) get their district's photos too ───
const EXPERIENCE_PHOTOS = {};
const EXP_PREFIX = {
  WMF: 'https://upload.wikimedia.org/wikipedia/commons/',
  WM: 'https://upload.wikimedia.org/wikipedia/commons/thumb/',
  CTB: 'https://portal-tourism.cgstate.gov.in/files/',
  CTBP: 'https://portal-tourism.cgstate.gov.in/private/files/',
};
const expBlock = appSrc.slice(appSrc.indexOf('const TRIBAL_ECO_EXPERIENCES = ['));
for (const line of expBlock.split('\n').slice(0, 40)) {
  const id = (line.match(/id: '([^']+)'/) || [])[1];
  const district = (line.match(/district: '([^']+)'/) || [])[1];
  const img = (line.match(/image: `\$\{(WMF|WM|CTB|CTBP)\}([^`]+)`/) || [])[2];
  if (!id || !district) continue;
  const current = img ? EXP_PREFIX[(line.match(/image: `\$\{(WMF|WM|CTB|CTBP)\}/) || [])[1]] + img : null;
  const pool = (districtPool[district] || []).filter(x => x.url !== current);
  const currentOk = current && homeDistrict(current) === district ? current : null;
  const chosen = currentOk || (pool.length ? pool[0].url : DISTRICT_PHOTOS[district]?.url);
  if (chosen) EXPERIENCE_PHOTOS[id] = { url: chosen, kind: currentOk ? 'place' : 'district' };
}

// ── write the generated file ─────────────────────────────────────────────────
const banner = `// AUTO-GENERATED by tools/place-photos/generate.mjs — do not edit by hand.
//
// Every URL below was checked against the place's district (Wikimedia Commons
// GPS coordinates / categories, or the place name inside a Chhattisgarh Tourism
// Board file name). No photo of one district is ever used for another.
//
// kind:
//   'place'          the photo shows that exact place
//   'district'       a verified photo from the same district (and kind of place)
//   'district-banner' the district's own banner photo
`;
const lines = [banner, '', 'export const PLACE_PHOTOS = {'];
for (const [name, v] of Object.entries(PLACE_PHOTOS)) {
  lines.push(`  ${JSON.stringify(name)}: { url: ${JSON.stringify(v.url)}, kind: ${JSON.stringify(v.kind)}, title: ${JSON.stringify(v.title)} },`);
}
lines.push('};', '', 'export const PLACE_GALLERIES = {');
for (const [name, list] of Object.entries(PLACE_GALLERIES)) {
  lines.push(`  ${JSON.stringify(name)}: ${JSON.stringify(list)},`);
}
lines.push('};', '', 'export const DISTRICT_PHOTOS = {');
for (const [district, v] of Object.entries(DISTRICT_PHOTOS)) {
  lines.push(`  ${JSON.stringify(district)}: { url: ${JSON.stringify(v.url)}, title: ${JSON.stringify(v.title)} },`);
}
lines.push('};', '', 'export const EXPERIENCE_PHOTOS = {');
for (const [id, v] of Object.entries(EXPERIENCE_PHOTOS)) {
  lines.push(`  ${JSON.stringify(id)}: { url: ${JSON.stringify(v.url)}, kind: ${JSON.stringify(v.kind)} },`);
}
lines.push('};', '');

writeFileSync(join(ROOT, 'src', 'placephotos.generated.js'), lines.join('\n'));

const kinds = Object.values(PLACE_PHOTOS).reduce((a, v) => (a[v.kind] = (a[v.kind] || 0) + 1, a), {});
console.log('places with a photo :', Object.keys(PLACE_PHOTOS).length, '/', catalogue.length, kinds);
console.log('galleries           :', Object.keys(PLACE_GALLERIES).length);
console.log('district banners    :', Object.keys(DISTRICT_PHOTOS).length);
console.log('banner replacements :', bannerIssues.length);
bannerIssues.forEach(b => console.log('   ', b.district, '→', urlLabel(b.banner || ''), '(was ' + b.home + ')'));
console.log('places without any verified photo:');
notes.forEach(n => console.log('   ', n));
console.log('\npool entries pointing at another district:', poolIssues.length);
poolIssues.slice(0, 40).forEach(p => console.log('   ', p));
console.log('\ncurated images dropped because they belong to another district:', crossDistrict.length);
crossDistrict.slice(0, 12).forEach(c => console.log(`   ${c.district} | ${c.place} → ${c.images.join(', ')}`));

const used = {};
for (const v of Object.values(PLACE_PHOTOS)) used[v.url] = (used[v.url] || 0) + 1;
const dups = Object.entries(used).filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]);
console.log('\nphotos shared by more than one card:', dups.length, '| worst:', dups[0]?.[1]);
dups.slice(0, 6).forEach(([u, n]) => console.log('   x' + n, u.slice(-64)));
