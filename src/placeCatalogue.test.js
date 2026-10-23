// Exports the merged runtime catalogue (districts + places + images) to
// tools/place-photos/data/catalogue.json. The photo generator
// (tools/place-photos/generate.mjs) reads that file, so the generated photos
// always match the place list the app actually renders.
//
// Run with:  npm test -- --testPathPattern "placeCatalogue"
import fs from 'fs';
import path from 'path';
import { DISTRICTS } from './App';
import { getPlaceImages } from './placeimage';

const OUT = path.join(__dirname, '..', 'tools', 'place-photos', 'data', 'catalogue.json');

test('export runtime catalogue for the photo generator', () => {
  const out = [];
  DISTRICTS.forEach(d => {
    (d.touristPlaces || []).forEach(p => {
      out.push({
        name: p.name,
        district: d.name,
        type: p.type,
        image: p.image || '',
        districtImage: d.image || '',
        resolved: getPlaceImages(p.name, d.name, p.image),
      });
    });
  });
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2));
  expect(out.length).toBeGreaterThan(300);
});
