// View/search history persistence. Kept tiny and guarded so it works anywhere
// (Jest/jsdom, SSR, or a browser with storage disabled).

const VIEWS_KEY = 'cg-travel.view-history.v1';
const SEARCHES_KEY = 'cg-travel.search-history.v1';
const MAX_VIEWS = 80;
const MAX_SEARCHES = 50;

function safeParse(raw) {
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch (e) {
    return [];
  }
}

function readHistory(key) {
  if (typeof window === 'undefined' || !window.localStorage) return [];
  try {
    return safeParse(window.localStorage.getItem(key));
  } catch (e) {
    return [];
  }
}

function writeHistory(key, entries) {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(entries));
  } catch (e) {
    // storage full/blocked — recommendations degrade gracefully to popularity
  }
}

/**
 * Record a place view. Dedupes consecutive identical views; returns new list.
 */
export function recordPlaceView(view) {
  const now = Date.now();
  const history = readHistory(VIEWS_KEY);
  const filtered = history.filter(h => !(h.name === view.name && h.district === view.district));
  const next = [...filtered, { name: view.name, district: view.district, type: view.type, ts: now }]
    .slice(-MAX_VIEWS);
  writeHistory(VIEWS_KEY, next);
  return next;
}

export function loadViewHistory() {
  return readHistory(VIEWS_KEY);
}

export function clearViewHistory() {
  writeHistory(VIEWS_KEY, []);
  return [];
}

export function recordSearchTerm(query) {
  const q = String(query || '').trim().slice(0, 80);
  if (!q) return readHistory(SEARCHES_KEY);
  const history = readHistory(SEARCHES_KEY).filter(s => s.q !== q);
  const last = history[history.length - 1];
  // skip rapid keystrokes while the user extends (or trims back) the same search
  const withinWindow = last && Date.now() - last.ts < 30000;
  if (withinWindow && (q.startsWith(last.q) || last.q.startsWith(q))) return history;
  const next = [...history, { q, ts: Date.now() }].slice(-MAX_SEARCHES);
  writeHistory(SEARCHES_KEY, next);
  return next;
}

export function loadSearchHistory() {
  return readHistory(SEARCHES_KEY);
}

export function clearSearchHistory() {
  writeHistory(SEARCHES_KEY, []);
  return [];
}

export function storageAvailable() {
  if (typeof window === 'undefined' || !window.localStorage) return false;
  try {
    const k = '__cg_test__';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return true;
  } catch (e) {
    return false;
  }
}