// ─── PLACE PHOTOS ─────────────────────────────────────────────────────────────
// Every photo shown in the app comes from src/placephotos.generated.js.
//
// That file is produced by tools/place-photos/generate.mjs, which checks every
// photo against the district of the place it is shown on:
//   • Wikimedia Commons files are matched by GPS coordinates and categories
//   • Chhattisgarh Tourism Board files are matched by the place name in the
//     file name
// A photo of one district is never used for a place in another district.
//
// kind:
//   'place'           the photo shows that exact place
//   'district'        a verified photo from the same district (and kind of place)
//   'district-banner' the district's own banner photo
import { PLACE_PHOTOS, PLACE_GALLERIES, DISTRICT_PHOTOS, EXPERIENCE_PHOTOS } from './placephotos.generated';

// Photos for one place: the place's own photo first, then the other verified
// photos of that place, then the district photo as a last resort.
export function getPlaceImages(placeName, districtName, primaryImage) {
  const photo = PLACE_PHOTOS[placeName];
  const gallery = PLACE_GALLERIES[placeName] || [];
  const districtPhoto = DISTRICT_PHOTOS[districtName]?.url;
  const primary = photo?.url || primaryImage;
  return [...new Set([primary, ...gallery, districtPhoto].filter(Boolean))].slice(0, 5);
}

// The single photo a card shows, with the information needed for the label
// ("exact photo" vs "photo from <district>").
export function getPlacePhoto(placeName, districtName, primaryImage) {
  const photo = PLACE_PHOTOS[placeName];
  if (photo) return photo;
  const districtPhoto = DISTRICT_PHOTOS[districtName];
  if (districtPhoto) return { url: districtPhoto.url, kind: 'district-banner', title: districtName };
  if (primaryImage) return { url: primaryImage, kind: 'place', title: placeName };
  return null;
}

// The photo used for a district header.
export function getDistrictPhoto(districtName) {
  return DISTRICT_PHOTOS[districtName] || null;
}

export { PLACE_PHOTOS, PLACE_GALLERIES, DISTRICT_PHOTOS, EXPERIENCE_PHOTOS };
