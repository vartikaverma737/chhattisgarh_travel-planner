// Google Maps configuration.
// Set REACT_APP_GOOGLE_MAPS_API_KEY in your environment instead of hardcoding
// a key in source. Get one at https://console.cloud.google.com/google/maps-apis
export const GOOGLE_MAPS_API_KEY = (process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '').trim();

export const MAPS_LOADING = 'loading';
export const MAPS_LOADED = 'loaded';
export const MAPS_ERROR = 'error';
export const MAPS_MISSING_KEY = 'missing-key';

const state = { status: null, promise: null };

export function getMapsStatus() {
  return state.status;
}

export function loadGoogleMaps() {
  if (state.status === MAPS_LOADED) return Promise.resolve();
  if (state.promise) return state.promise;

  if (!GOOGLE_MAPS_API_KEY) {
    state.status = MAPS_MISSING_KEY;
    return Promise.reject(new Error(MAPS_MISSING_KEY));
  }

  if (window.google && window.google.maps) {
    state.status = MAPS_LOADED;
    return Promise.resolve();
  }

  state.status = MAPS_LOADING;
  state.promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => { state.status = MAPS_LOADED; resolve(); };
    script.onerror = () => { state.status = MAPS_ERROR; reject(new Error(MAPS_ERROR)); };
    document.head.appendChild(script);
  });
  return state.promise;
}