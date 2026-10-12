#!/usr/bin/env node
// Extract the canonical English place catalogue (ALL_DISTRICTS) from src/App.js
// plus the supplemental catalogue (src/supplemental/catalog) into ml/data/places.json,
// so the Python training pipeline consumes the exact same content the app ships.
// Tested invariants: 33 districts, globally unique place names.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appPath = join(__dirname, '..', '..', 'src', 'App.js');
const src = readFileSync(appPath, 'utf8');

function findConstant(name) {
  const re = new RegExp(`const\\s+${name}\\s*=\\s*('(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*")`, 'm');
  const m = src.match(re);
  if (!m) throw new Error(`Missing constant ${name}`);
  return m[1].slice(1, -1); // strip quotes
}

const CTB = findConstant('CTB');
const WM = findConstant('WM');
const WMF = findConstant('WMF');
const FALLBACK = findConstant('FALLBACK');

const START_RE = /const\s+ALL_DISTRICTS\s*=\s*\[/;
const startMatch = src.match(START_RE);
if (!startMatch) throw new Error('ALL_DISTRICTS not found');
const start = startMatch.index + startMatch[0].length - 1; // index of '['
let depth = 0;
let i = start;
let quote = null;
let escaped = false;
while (i < src.length) {
  const ch = src[i];
  if (quote === '`') {
    if (escaped) { escaped = false; }
    else if (ch === '\\') { escaped = true; }
    else if (ch === '`') { quote = null; }
  } else if (quote) {
    if (escaped) { escaped = false; }
    else if (ch === '\\') { escaped = true; }
    else if (ch === quote) { quote = null; }
  } else if (ch === "'" || ch === '"' || ch === '`') {
    quote = ch;
    escaped = false;
  } else if (ch === '[') {
    depth += 1;
  } else if (ch === ']') {
    depth -= 1;
    if (depth === 0) { i += 1; break; }
  }
  i += 1;
}

let body = src.slice(start, i); // includes the balanced [...]
// Resolve image URL template literals to plain strings.
body = body
  .replaceAll('${CTB}', CTB)
  .replaceAll('${WM}', WM)
  .replaceAll('${WMF}', WMF)
  .replaceAll('${FALLBACK}', FALLBACK)
  .replace(/`/g, "'"); // template literals → plain single-quoted strings

// We stripped the backticks but kept any \n / whitespace inside — safe to eval.
const ALL_DISTRICTS = new Function(`return (${body});`)();
if (!Array.isArray(ALL_DISTRICTS)) throw new Error('Parsed ALL_DISTRICTS is not an array');

// Supplemental catalogue (src/supplemental/catalog/part1..6.js) is merged into
// the same runtime shape App.js uses — core places first, then supplemental,
// per district. Supplemental files are pure object literals, so they eval here
// without a bundler. Part order must match src/supplemental/index.js.
function placeItem(p) {
  return {
    name: p.name,
    type: p.type,
    shortDesc: p.shortDesc || '',
    fullDesc: p.fullDesc || '',
    rating: Number(p.rating || 0),
    entryFee: p.entryFee || '',
    bestTime: p.bestTime || '',
    timings: p.timings || '',
  };
}

function loadSupplementalPlaces() {
  const byDistrict = {};
  for (const file of ['part1.js', 'part2.js', 'part3.js', 'part4.js', 'part5.js', 'part6.js']) {
    const src = readFileSync(join(__dirname, '..', '..', 'src', 'supplemental', 'catalog', file), 'utf8');
    const body = src.replace(/export\s+default\s+\w+\s*;?\s*$/, '').trim();
    const DATA = new Function(`${body}; return DATA;`)();
    for (const [district, places] of Object.entries(DATA)) {
      byDistrict[district] = [...(byDistrict[district] || []), ...places];
    }
  }
  return byDistrict;
}

const supplemental = loadSupplementalPlaces();

const districts = ALL_DISTRICTS.map(d => ({
  name: d.name,
  desc: d.desc,
  highlights: d.highlights,
  coordinates: d.coordinates || null,
  category: d.category || 'culture',
  touristPlaces: [
    ...(d.touristPlaces || []).map(placeItem),
    ...(supplemental[d.name] || []).map(placeItem),
  ],
}));

const totalPlaces = districts.reduce((s, d) => s + d.touristPlaces.length, 0);
const supplementalCount = Object.values(supplemental).reduce((s, p) => s + p.length, 0);
console.log(`Districts: ${districts.length}, Places: ${totalPlaces} (${supplementalCount} supplemental)`);
if (districts.length !== 33) throw new Error(`Expected 33 districts, got ${districts.length}`);
const allNames = districts.flatMap(d => d.touristPlaces.map(p => p.name));
if (new Set(allNames).size !== allNames.length) {
  const dupes = [...new Set(allNames.filter((n, i) => allNames.indexOf(n) !== i))];
  throw new Error(`Duplicate place names across merged catalogue: ${dupes.join(', ')}`);
}

mkdirSync(join(__dirname, '..', 'data'), { recursive: true });
writeFileSync(
  join(__dirname, '..', 'data', 'places.json'),
  JSON.stringify(districts, null, 2),
  'utf8'
);
console.log(`Wrote ml/data/places.json (${totalPlaces} places).`);