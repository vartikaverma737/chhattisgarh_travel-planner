// Supplemental places (English source of truth) catalogue barrel.
// Merged into runtime districts in App.js and into the ML catalogue by
// ml/scripts/extract_catalog.mjs. hi/cg versions live in src/supplemental/lang.
import part1 from './catalog/part1';
import part2 from './catalog/part2';
import part3 from './catalog/part3';
import part4 from './catalog/part4';
import part5 from './catalog/part5';
import part6 from './catalog/part6';
import SUPPLEMENTAL_LANG from './lang';

const SUPPLEMENTAL_PLACES = Object.assign({}, part1, part2, part3, part4, part5, part6);

export function countSupplemental() {
  return Object.values(SUPPLEMENTAL_PLACES).reduce((sum, places) => sum + places.length, 0);
}

export { SUPPLEMENTAL_LANG };

export default SUPPLEMENTAL_PLACES;