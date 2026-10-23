// One-off: move the curated photo maps out of src/placeimage.js into
// tools/place-photos/data/curated-map.js so the runtime bundle only ships the
// verified, district-checked photos from src/placephotos.generated.js.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');
const src = readFileSync(join(ROOT, 'src', 'placeimage.js'), 'utf8');

const PREFIX = {
  WMF: 'https://upload.wikimedia.org/wikipedia/commons/',
  WM: 'https://upload.wikimedia.org/wikipedia/commons/thumb/',
  CTB: 'https://portal-tourism.cgstate.gov.in/files/',
  CTBP: 'https://portal-tourism.cgstate.gov.in/private/files/',
};
const resolve = s => s.replace(/\$\{(WMF|WM|CTB|CTBP)\}/g, (_, k) => PREFIX[k]);

function extractMap(name) {
  const start = src.indexOf(`const ${name} = {`);
  if (start < 0) throw new Error(name + ' not found');
  const open = src.indexOf('{', start);
  let depth = 0, end = -1;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  return src.slice(open + 1, end);
}

const placeBody = extractMap('PLACE_IMAGES');
const districtBody = extractMap('DISTRICT_FB');

const parseEntries = (body, single = false) => {
  const out = [];
  if (single) {
    const re = /'((?:[^'\\]|\\.)*)'\s*:\s*`([^`]+)`,?/g;
    let m;
    while ((m = re.exec(body))) out.push([m[1].replace(/\\'/g, "'"), [resolve(m[2])]]);
    return out;
  }
  const re = /'((?:[^'\\]|\\.)*)'\s*:\s*\[([\s\S]*?)\n?\s*\],?/g;
  let m;
  while ((m = re.exec(body))) {
    const key = m[1].replace(/\\'/g, "'");
    const urls = [...m[2].matchAll(/`([^`]+)`/g)].map(x => resolve(x[1]));
    out.push([key, urls]);
  }
  return out;
};

const placeEntries = parseEntries(placeBody);
const districtEntries = parseEntries(districtBody, true);

const lines = [];
lines.push('// Curated photo candidates (hand-picked from the Chhattisgarh Tourism Board');
lines.push('// portal and Wikimedia Commons).');
lines.push('//');
lines.push('// This file is INPUT for tools/place-photos/generate.mjs, not app code: the');
lines.push('// generator checks every URL against the place\'s district and writes the');
lines.push('// verified result to src/placephotos.generated.js. Several entries below');
lines.push('// point at a photo of a neighbouring district — those are dropped by the');
lines.push('// generator instead of reaching the app.');
lines.push('');
lines.push('export const CURATED_PLACE_IMAGES = {');
for (const [k, urls] of placeEntries) {
  lines.push(`  ${JSON.stringify(k)}: ${JSON.stringify(urls)},`);
}
lines.push('};');
lines.push('');
lines.push('export const CURATED_DISTRICT_FALLBACKS = {');
for (const [k, urls] of districtEntries) {
  lines.push(`  ${JSON.stringify(k)}: ${JSON.stringify(urls[0] || '')},`);
}
lines.push('};');
lines.push('');

writeFileSync(join(ROOT, 'tools', 'place-photos', 'data', 'curated-map.js'), lines.join('\n'));
console.log('places:', placeEntries.length, 'districts:', districtEntries.length);
