// Free map configuration — Leaflet + OpenStreetMap tiles.
// No API key, no billing and no signup required. Leaflet is loaded on demand
// from the unpkg CDN and tiles stream from openstreetmap.org.
//
// The exported names keep the historic "Google Maps" surface (loadGoogleMaps,
// getMapsStatus, MAPS_*) so callers stay unchanged. If a paid Google Maps key
// is ever added, only this module + GoogleMapView need to change.
export const MAPS_LOADING = 'loading';
export const MAPS_LOADED = 'loaded';
export const MAPS_ERROR = 'error';
export const MAPS_MISSING_KEY = 'missing-key';

const LEAFLET_VERSION = '1.9.4';
const LEAFLET_CSS = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.css`;
const LEAFLET_JS = `https://unpkg.com/leaflet@${LEAFLET_VERSION}/dist/leaflet.js`;

const state = { status: null, promise: null };

export function getMapsStatus() {
  return state.status;
}

function ensureLeafletCss() {
  if (document.querySelector('link[data-leaflet-css]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = LEAFLET_CSS;
  link.setAttribute('data-leaflet-css', '');
  document.head.appendChild(link);
}

export function loadGoogleMaps() {
  if (state.status === MAPS_LOADED) return Promise.resolve();
  if (state.promise) return state.promise;

  if (window.L && window.L.map) {
    state.status = MAPS_LOADED;
    return Promise.resolve();
  }

  state.status = MAPS_LOADING;
  ensureLeafletCss();
  state.promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = LEAFLET_JS;
    script.async = true;
    script.defer = true;
    script.onload = () => { state.status = MAPS_LOADED; resolve(); };
    script.onerror = () => { state.status = MAPS_ERROR; reject(new Error(MAPS_ERROR)); };
    document.head.appendChild(script);
  });
  return state.promise;
}
