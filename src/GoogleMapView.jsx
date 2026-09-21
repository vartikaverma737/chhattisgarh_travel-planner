import { useEffect, useRef, useState } from 'react';
import { getMapsStatus, loadGoogleMaps, MAPS_LOADED, MAPS_MISSING_KEY, MAPS_ERROR } from './googleMapsConfig';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]
  ));
}

function PlaceholderMap({ title }) {
  return (
    <div className="w-full h-full min-h-[240px] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-4xl mb-2">🗺️</div>
        <p className="font-bold text-gray-700 mb-1">{title || 'Interactive Map'}</p>
        <p className="text-xs text-gray-500">Set <code className="text-orange-600 font-mono">REACT_APP_GOOGLE_MAPS_API_KEY</code> in your <code className="text-orange-600 font-mono">.env</code> file to enable live map markers.</p>
      </div>
    </div>
  );
}

// A reusable Google Maps component.
// props.places: [{ name, district, lat, lng, info? }]
// props.polyline: boolean — draws a route through the markers
// props.height: css height string
export default function GoogleMapView({ places = [], polyline = false, height = '240px', center, zoom = 8 }) {
  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const infoWindowRef = useRef(null);
  const [status, setStatus] = useState(getMapsStatus());
  const apiKeyReady = getMapsStatus() !== MAPS_MISSING_KEY;

  useEffect(() => {
    if (getMapsStatus() === MAPS_LOADED && mapDivRef.current && !mapRef.current) {
      initMap();
    } else {
      loadGoogleMaps()
        .then(() => { if (mapDivRef.current) initMap(); })
        .catch((err) => setStatus(err.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKeyReady]);

  function initMap() {
    const validPlaces = places.filter(p => typeof p.lat === 'number' && typeof p.lng === 'number');
    if (validPlaces.length === 0 || !window.google) return;
    const first = validPlaces[0];

    mapRef.current = new window.google.maps.Map(mapDivRef.current, {
      center: center || { lat: first.lat, lng: first.lng },
      zoom,
      mapTypeControl: true,
      fullscreenControl: true,
      streetViewControl: true,
    });

    validPlaces.forEach(p => {
      const marker = new window.google.maps.Marker({
        position: { lat: p.lat, lng: p.lng },
        map: mapRef.current,
        title: p.name,
      });
      const infoContent = `<div style="min-width:140px;font-family:system-ui,sans-serif">
        <strong style="color:#ea580c">${escapeHtml(p.name)}</strong><br/>
        <span style="font-size:12px;color:#555">${escapeHtml(p.district || '')}</span>
        ${p.info ? `<br/><span style="font-size:12px;color:#333">${escapeHtml(p.info)}</span>` : ''}
      </div>`;
      marker.addListener('click', () => {
        if (infoWindowRef.current) infoWindowRef.current.close();
        infoWindowRef.current = new window.google.maps.InfoWindow({ content: infoContent });
        infoWindowRef.current.open(mapRef.current, marker);
      });
      markersRef.current.push(marker);
    });

    if (polyline && validPlaces.length > 1) {
      new window.google.maps.Polyline({
        path: validPlaces.map(p => ({ lat: p.lat, lng: p.lng })),
        geodesic: true,
        strokeColor: '#ea580c',
        strokeOpacity: 1.0,
        strokeWeight: 4,
        map: mapRef.current,
      });
    }

    if (validPlaces.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      validPlaces.forEach(p => bounds.extend({ lat: p.lat, lng: p.lng }));
      mapRef.current.fitBounds(bounds);
    }
  }

  if ((status === null && !apiKeyReady) || status === MAPS_MISSING_KEY) {
    return <PlaceholderMap />;
  }

  if (status === MAPS_ERROR) {
    return (
      <div className="w-full h-full min-h-[240px] rounded-2xl bg-red-50 border-2 border-red-200 flex items-center justify-center">
        <p className="text-sm text-red-600 font-semibold px-6 text-center">Could not load Google Maps. Please check your API key.</p>
      </div>
    );
  }

  return <div ref={mapDivRef} style={{ width: '100%', height }} className="rounded-2xl" />;
}