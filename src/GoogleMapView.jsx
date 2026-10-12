import { useEffect, useRef, useState } from 'react';
import { getMapsStatus, loadGoogleMaps, MAPS_LOADED, MAPS_ERROR } from './googleMapsConfig';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));
}

// A reusable map component backed by Leaflet + OpenStreetMap (free, key-less).
// props.places: [{ name, district, lat, lng, info? }]
// props.polyline: boolean — draws a route through the markers
// props.height: css height string
export default function GoogleMapView({ places = [], polyline = false, height = '240px', center, zoom = 8 }) {
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const [status, setStatus] = useState(getMapsStatus());

  useEffect(() => {
    let cancelled = false;
    const build = () => { if (!cancelled && mapDivRef.current) initMap(); };

    if (getMapsStatus() === MAPS_LOADED && mapDivRef.current && !mapRef.current) {
      initMap();
    } else {
      loadGoogleMaps().then(build).catch((err) => setStatus(err.message));
    }

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function initMap() {
    const L = window.L;
    const validPlaces = places.filter(p => typeof p.lat === 'number' && typeof p.lng === 'number');
    if (validPlaces.length === 0 || !L || !L.map) return;
    const first = validPlaces[0];

    const map = L.map(mapDivRef.current, {
      center: center ? [center.lat, center.lng] : [first.lat, first.lng],
      zoom,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    validPlaces.forEach(p => {
      const marker = L.marker([p.lat, p.lng]).addTo(map);
      const popup = `<div style="min-width:140px;font-family:system-ui,sans-serif">
        <strong style="color:#ea580c">${escapeHtml(p.name)}</strong><br/>
        <span style="font-size:12px;color:#555">${escapeHtml(p.district || '')}</span>
        ${p.info ? `<br/><span style="font-size:12px;color:#333">${escapeHtml(p.info)}</span>` : ''}
      </div>`;
      marker.bindPopup(popup);
    });

    if (polyline && validPlaces.length > 1) {
      L.polyline(validPlaces.map(p => [p.lat, p.lng]), { color: '#ea580c', weight: 4 }).addTo(map);
    }

    if (validPlaces.length > 1) {
      map.fitBounds(validPlaces.map(p => [p.lat, p.lng]), { padding: [24, 24] });
    }

    // Container may have been laid out after init (e.g. inside a modal).
    window.setTimeout(() => { try { map.invalidateSize(); } catch (e) { /* noop */ } }, 200);
  }

  if (status === MAPS_ERROR) {
    return (
      <div className="w-full h-full min-h-[240px] rounded-2xl bg-red-50 border-2 border-red-200 flex items-center justify-center">
        <p className="text-sm text-red-600 font-semibold px-6 text-center">Could not load the map. Please check your internet connection.</p>
      </div>
    );
  }

  return (
    <div
      ref={mapDivRef}
      style={{ width: '100%', height, overflow: 'hidden', isolation: 'isolate' }}
      className="rounded-2xl"
    />
  );
}
