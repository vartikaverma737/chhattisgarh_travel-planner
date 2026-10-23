// Copies the harvested photo metadata into tools/place-photos/data, trimmed to
// the fields the generator needs. Run once after a fresh harvest.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const TMP = 'C:\\Users\\verma\\AppData\\Local\\Temp\\opencode\\imgcheck';
const OUT = join(HERE, 'data');
mkdirSync(OUT, { recursive: true });

const trim = f => ({
  title: f.title,
  thumb: f.thumb,
  cats: (f.cats || []).filter(c => !/^(CC|Media|Photographs|Images|Category:|Files with|Creator:|Self-|User:|GFDL|PD-|Copyright|Author|Source)/i.test(c)).slice(0, 8),
  lat: f.lat ?? null,
  lon: f.lon ?? null,
  desc: (f.desc || '').slice(0, 160),
});

const asArray = j => (Array.isArray(j) ? j : Object.values(j));
const commons = asArray(JSON.parse(readFileSync(join(TMP, 'commons_meta.json'), 'utf8')))
  .filter(f => f && !f.missing && f.thumb).map(trim);
const curated = asArray(JSON.parse(readFileSync(join(TMP, 'curated_meta.json'), 'utf8')))
  .filter(f => f && !f.missing && f.thumb).map(trim);

writeFileSync(join(OUT, 'commons.json'), JSON.stringify(commons, null, 0));
writeFileSync(join(OUT, 'curated.json'), JSON.stringify(curated, null, 0));
console.log('commons.json', commons.length, 'curated.json', curated.length);
