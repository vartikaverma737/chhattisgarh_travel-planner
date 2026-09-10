import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Sun, Cloud, Menu, X, Search, Heart, Share2, Mountain, Camera, TreePine, Map, Navigation, Clock, Info, Users, Wallet, Sparkles, TrendingUp, ArrowRight, Check, Filter, Star, Phone, Globe, Save, Link2, Copy, Loader2, Bookmark } from 'lucide-react';

// ── STEP 1: Gallery imports ───────────────────────────────────────────────────
import { PLACE_IMAGES, getPlaceImages } from './placeimage';
import { PlaceImageCarousel, PlaceImageGrid, ImageLightbox } from './imagegallery';
import { saveItinerary, fetchItinerary, listItineraries, deleteItinerary, isSupabaseConfigured } from './supabaseClient';

const CTB = 'https://portal-tourism.cgstate.gov.in/files/';
const WM = 'https://upload.wikimedia.org/wikipedia/commons/thumb/';
const WMF = 'https://upload.wikimedia.org/wikipedia/commons/';
const FALLBACK = 'https://portal-tourism.cgstate.gov.in/files/gangrel-bandh-image.webp';

const DISTRICT_FALLBACKS = {
  'Korba': `${CTB}Malhaar,%20Bilaspur%20(2).JPG`,
  'Jashpur': `${CTB}jogimaracave.jpg`,
  'Korea': `${CTB}gangrel-bandh-image.webp`,
  'Kondagaon': `${CTB}001a7d7f9.jpg`,
  'Khairagarh-Chhuikhadan-Gandai': `${CTB}rajnandgaon.png`,
  'Manendragarh-Chirmiri-Bharatpur': `${CTB}go7.webp`,
  'Mohla-Manpur-Ambagarh Chowki': `${CTB}2019-08-25.jpg`,
  'Narayanpur': `${CTB}001a7d7f9.jpg`,
  'Raigarh': `${CTB}888053-tklnajnxuz-1534070188.jpg`,
  'Sakti': `${CTB}888053-tklnajnxuz-1534070188.jpg`,
  'Sarangarh-Bilaigarh': `${CTB}mahasamund-2.jpg`,
  'Sukma': `${CTB}001a7d7f9.jpg`,
  'Surajpur': `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
  'Balrampur': `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`,
  'Mungeli': `${CTB}mungeli-maon.jpg`,
};

function haversineDistance(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function distanceColor(km) {
  if (km <= 25) return { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0' };
  if (km <= 60) return { bg: '#fffbeb', text: '#92400e', border: '#fde68a' };
  return { bg: '#fef2f2', text: '#991b1b', border: '#fecaca' };
}

function driveTimeLabel(km) {
  const mins = Math.round((km / 40) * 60);
  if (mins < 60) return `~${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `~${h}h${m ? ` ${m}m` : ''}`;
}

const INTEREST_TYPE_MAP = {
  nature: ['Waterfall', 'Wildlife', 'Forest', 'Hill Station', 'Dam', 'River', 'Island', 'Natural', 'Mountain', 'Viewpoint', 'Lake', 'Hot Springs', 'Seasonal Waterfall', 'Village Pond', 'Nature Camp', 'Forest Lodge', 'Eco Camp', 'Garden', 'Park'],
  spiritual: ['Temple', 'Religious', 'Pilgrimage', 'Buddhist Site', 'Shrine', 'Dham', 'Mosque', 'Church', 'Jain Temple', 'Ashram'],
  heritage: ['Heritage', 'Fort', 'Museum', 'Archaeological', 'Palace', 'Cultural', 'Craft', 'Rural Market', 'Craft Workshop', 'Folk Performance', 'Monument', 'Rock Art'],
  adventure: ['Waterfall', 'Hill Station', 'Forest', 'Mountain', 'Wildlife', 'Cave', 'Trek', 'Safari', 'Forest Trail', 'Nature Camp', 'River Camp', 'Rappelling', 'Zip Line'],
  photography: ['Waterfall', 'Viewpoint', 'Fort', 'Hill Station', 'Lake', 'River', 'Cave', 'Valley', 'Village Pond', 'Rural Market', 'Tribal Village', 'Folk Performance', 'Rock Art', 'Garden'],
  tribal: ['Tribal Village', 'Tribal Market', 'Craft Workshop', 'Folk Performance', 'Community Stay', 'Tribal Trail', 'Bastar Craft', 'Tribal Dussehra', 'Dhokra', 'Gond Art', 'Tribal Haat'],
  ecotourism: ['Eco Camp', 'Nature Camp', 'Forest Lodge', 'Community Stay', 'River Camp', 'Birdwatching', 'Forest Trail', 'Eco Walk', 'Organic Farm', 'Wildlife', 'Garden'],
  localculture: ['Folk Performance', 'Rural Market', 'Tribal Market', 'Cultural', 'Craft Workshop', 'Craft', 'Village Pond', 'Gram Devta', 'Rural Haat', 'Festival', 'Traditional', 'Museum'],
};

const TRIBAL_ECO_EXPERIENCES = [
  { id: 'bastar-dussehra', title: 'Bastar Dussehra', subtitle: '75-day tribal festival — world\'s longest', district: 'Bastar', category: 'tribal', icon: '🥁', image: `${CTB}001a7d7f9.jpg`, description: 'The world\'s longest festival — 75 days of tribal rituals, processions and goddess worship centred on Danteshwari temple.', duration: '75 days (Oct–Nov)', bestFor: 'Culture & Photography', tags: ['tribal', 'culture'], responsibleTip: 'Attend with a local guide who can explain rituals respectfully. Seek permission before photographing sacred ceremonies.' },
  { id: 'dhokra-workshop', title: 'Dhokra Metal Casting', subtitle: 'Live craft workshop with master artisans', district: 'Kondagaon', category: 'tribal', icon: '🔥', image: `${CTB}001a7d7f9.jpg`, description: '4,000-year-old lost-wax bronze casting technique practised by Bastar\'s Dhokra artisans.', duration: 'Half day', bestFor: 'Heritage & Photography', tags: ['tribal', 'culture'], responsibleTip: 'Buy directly from the artisan — never from middlemen. Fair price supports the craft and family livelihood.' },
  { id: 'abujhmaad-trail', title: 'Abujhmaad Tribal Trail', subtitle: 'India\'s last great unexplored forest', district: 'Narayanpur', category: 'tribal', icon: '🏹', image: `${CTB}001a7d7f9.jpg`, description: 'Trek through the Abujhmaad — a vast forest inhabited by the Abujhmaria tribe.', duration: '2–3 days', bestFor: 'Adventure & Tribal', tags: ['tribal', 'eco'], responsibleTip: 'Government permit required. Use only authorised tribal guides.' },
  { id: 'mainpat-tibetan', title: 'Mainpat Tibetan Village', subtitle: 'Mini Tibet of Chhattisgarh', district: 'Surguja', category: 'culture', icon: '🏔️', image: `${CTB}Sarguja%20Palace%20Ambikapur.JPG`, description: 'Tibetan refugee settlements on a 3,700-ft plateau where monks, monasteries, prayer flags and butter tea transport you to the Himalayas.', duration: '1–2 days', bestFor: 'Culture & Nature', tags: ['culture', 'eco'], responsibleTip: 'Buy Tibetan handicrafts directly from community cooperatives. Stay in homestays.' },
  { id: 'kanger-eco-safari', title: 'Kanger Valley Eco Safari', subtitle: 'Caves, waterfalls & rare wildlife', district: 'Bastar', category: 'ecotourism', icon: '🦋', image: `${CTB}001a7d7f9.jpg`, description: 'Guided eco-walks through Kanger Valley National Park — caves, Tirathgarh waterfall, rare Bastar Hill Myna.', duration: 'Full day', bestFor: 'Eco & Photography', tags: ['eco', 'responsible'], responsibleTip: 'Only licensed naturalist guides permitted. Stick to marked trails.' },
  { id: 'gondi-art-village', title: 'Gond Art Village', subtitle: 'Living tradition of Gondi painting', district: 'Bastar', category: 'culture', icon: '🎨', image: `${CTB}001a7d7f9.jpg`, description: 'Visit Gond artist villages where families paint intricate, vibrant Gondi artworks.', duration: 'Half day', bestFor: 'Culture & Photography', tags: ['tribal', 'culture'], responsibleTip: 'Commission artwork directly. Certificate of authenticity from artist protects both you and the artisan.' },
  { id: 'tribal-haat', title: 'Weekly Tribal Haat', subtitle: 'Living market of forest communities', district: 'Balod', category: 'culture', icon: '🛒', image: `${CTB}2022110365.jpg`, description: 'Chhattisgarh\'s weekly tribal markets — forest produce, Dhokra crafts, medicinal herbs, traditional jewellery.', duration: 'Morning (4–5 hrs)', bestFor: 'Culture & Local Life', tags: ['tribal', 'culture'], responsibleTip: 'Arrive early. Pay fair price — haggling aggressively undercuts artisan livelihoods.' },
  { id: 'sabari-river-camp', title: 'Sabari River Tribal Camp', subtitle: 'Remote river camp on the Andhra border', district: 'Sukma', category: 'ecotourism', icon: '🏕️', image: `${CTB}001a7d7f9.jpg`, description: 'Camp beside the pristine Sabari River. Trek to tribal villages, fish with local communities.', duration: '2–3 days', bestFor: 'Eco & Adventure', tags: ['eco', 'tribal'], responsibleTip: 'Leave no trace. All waste must be carried out.' },
  { id: 'achanakmar-community', title: 'Achanakmar Community Forest Stay', subtitle: 'Tiger reserve buffer zone homestay', district: 'Bilaspur', category: 'ecotourism', icon: '🐯', image: `${CTB}mungeli-maon.jpg`, description: 'Stay with forest-edge communities in the Achanakmar Tiger Reserve buffer zone. Dawn jeep safaris, walking trails.', duration: '2 nights', bestFor: 'Eco & Wildlife', tags: ['eco', 'responsible'], responsibleTip: 'Book through forest department-approved operators. 40% of stay revenue goes directly to village conservation funds.' },
];

const SLOTS_PER_DAY = { relaxed: 2, moderate: 3, packed: 4 };
const TIME_SLOTS = ['8:00 AM', '10:30 AM', '1:30 PM', '4:00 PM'];

const DISTRICT_PALETTE = [
  { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe', dot: '#3b82f6' },
  { bg: '#f0fdf4', text: '#15803d', border: '#bbf7d0', dot: '#22c55e' },
  { bg: '#fdf4ff', text: '#7e22ce', border: '#e9d5ff', dot: '#a855f7' },
  { bg: '#fff7ed', text: '#c2410c', border: '#fed7aa', dot: '#f97316' },
  { bg: '#f0fdfa', text: '#0f766e', border: '#99f6e4', dot: '#14b8a6' },
  { bg: '#fefce8', text: '#a16207', border: '#fef08a', dot: '#eab308' },
  { bg: '#fff1f2', text: '#be123c', border: '#fecdd3', dot: '#f43f5e' },
  { bg: '#f8fafc', text: '#475569', border: '#cbd5e1', dot: '#64748b' },
  { bg: '#faf5ff', text: '#6b21a8', border: '#d8b4fe', dot: '#9333ea' },
  { bg: '#ecfdf5', text: '#065f46', border: '#6ee7b7', dot: '#10b981' },
];

function scorePlace(place, interests) {
  let score = 0;
  for (const interest of interests) {
    const types = INTEREST_TYPE_MAP[interest] || [];
    if (types.some(t => place.type?.toLowerCase().includes(t.toLowerCase()))) score += 2;
  }
  score += (place.rating || 0);
  return score;
}

function mapActivityType(placeType) {
  if (!placeType) return 'culture';
  const t = placeType.toLowerCase();
  if (['tribal village', 'tribal market', 'craft workshop', 'folk performance', 'community stay', 'tribal trail', 'dhokra', 'gond art', 'tribal haat', 'bastar craft'].some(x => t.includes(x))) return 'tribal';
  if (['eco camp', 'nature camp', 'forest lodge', 'river camp', 'birdwatching', 'eco walk', 'organic farm'].some(x => t.includes(x))) return 'eco';
  if (['waterfall', 'wildlife', 'forest', 'hill station', 'dam', 'river', 'natural', 'mountain', 'viewpoint', 'island', 'lake', 'hot springs', 'seasonal waterfall', 'village pond', 'forest trail', 'garden', 'park'].some(x => t.includes(x))) return 'nature';
  if (['temple', 'religious', 'pilgrimage', 'buddhist', 'shrine', 'dham', 'mosque', 'church', 'jain', 'ashram'].some(x => t.includes(x))) return 'spiritual';
  if (['heritage', 'fort', 'museum', 'archaeological', 'palace', 'craft', 'rural market', 'cultural', 'monument', 'rock art'].some(x => t.includes(x))) return 'heritage';
  if (['cave', 'trek', 'safari', 'rappelling', 'zip line'].some(x => t.includes(x))) return 'adventure';
  return 'culture';
}

function buildPlacePool(districts) {
  return districts.flatMap(district =>
    district.touristPlaces.map(place => ({ ...place, districtName: district.name, coords: district.coordinates }))
  );
}

function generateGeoItinerary(districts, days, interests, pace, startingDistrictName) {
  const slotsPerDay = SLOTS_PER_DAY[pace] || 3;
  const pool = buildPlacePool(districts);
  pool.forEach(p => { p._score = scorePlace(p, interests); });
  const startDistrict = districts.find(d => d.name === startingDistrictName)
    || districts.reduce((best, d) => {
      const total = d.touristPlaces.reduce((s, p) => s + scorePlace(p, interests), 0);
      return total > (best._total || -Infinity) ? { ...d, _total: total } : best;
    }, {});
  let currentAnchorCoords = startDistrict.coordinates;
  const usedNames = new Set();
  const itinerary = [];
  const visitedDistrictNames = new Set([startDistrict.name]);
  for (let day = 1; day <= days; day++) {
    const available = pool.filter(p => !usedNames.has(p.name));
    if (available.length === 0) break;
    const sorted = [...available].sort((a, b) => {
      const aVisited = visitedDistrictNames.has(a.districtName) ? 0 : 1;
      const bVisited = visitedDistrictNames.has(b.districtName) ? 0 : 1;
      if (aVisited !== bVisited) return aVisited - bVisited;
      const dA = haversineDistance(a.coords, currentAnchorCoords);
      const dB = haversineDistance(b.coords, currentAnchorCoords);
      return (dA - dB) * 0.8 - (a._score - b._score) * 5;
    });
    const dayPlaces = [];
    for (const candidate of sorted) {
      if (dayPlaces.length >= slotsPerDay) break;
      const dist = candidate.districtName;
      const uniqueDistrictsToday = new Set(dayPlaces.map(p => p.districtName));
      if (uniqueDistrictsToday.size >= 2 && !uniqueDistrictsToday.has(dist)) continue;
      dayPlaces.push(candidate);
    }
    if (dayPlaces.length < slotsPerDay) {
      for (const candidate of sorted) {
        if (dayPlaces.length >= slotsPerDay) break;
        if (dayPlaces.some(p => p.name === candidate.name)) continue;
        dayPlaces.push(candidate);
      }
    }
    dayPlaces.forEach(p => { usedNames.add(p.name); visitedDistrictNames.add(p.districtName); });
    const avgLat = dayPlaces.reduce((s, p) => s + p.coords.lat, 0) / dayPlaces.length;
    const avgLng = dayPlaces.reduce((s, p) => s + p.coords.lng, 0) / dayPlaces.length;
    currentAnchorCoords = { lat: avgLat, lng: avgLng };
    const uniqueDistricts = [...new Set(dayPlaces.map(p => p.districtName))];
    const activities = dayPlaces.map((place, i) => {
      const nextPlace = dayPlaces[i + 1];
      const distToNextKm = nextPlace ? Math.round(haversineDistance(place.coords, nextPlace.coords)) : null;
      const driveToNext = distToNextKm ? driveTimeLabel(distToNextKm) : null;
      return { time: TIME_SLOTS[i] || `${8 + i * 2}:00 AM`, title: place.name, districtName: place.districtName, duration: mapActivityType(place.type) === 'nature' ? '3 hrs' : '2 hrs', type: mapActivityType(place.type), rating: place.rating, entryFee: place.entryFee, tips: place.tips, distToNextKm, driveToNext };
    });
    const totalDayKm = activities.reduce((sum, a) => sum + (a.distToNextKm || 0), 0);
    itinerary.push({ day, title: `Day ${day} — ${uniqueDistricts.join(' & ')} Region`, uniqueDistricts, totalDayKm, activities });
  }
  return itinerary;
}

function groupActivitiesByDistrict(activities) {
  const map = {};
  const order = [];
  activities.forEach(act => {
    if (!map[act.districtName]) { map[act.districtName] = []; order.push(act.districtName); }
    map[act.districtName].push(act);
  });
  return order.map(district => ({ district, places: map[district] }));
}

const ALL_DISTRICTS = [
 { name: 'Raipur', image: `${CTB}001%20(2).jpg`, desc: 'Capital city with modern amenities and vibrant culture', highlights: 'State Capital', coordinates: { lat: 21.2514, lng: 81.6296 }, category: 'urban', touristPlaces: [
    { name: 'Mahant Ghasidas Memorial Museum', type: 'Museum', image: `${WM}b/b7/Mahant_Ghasidas_Memorial_Museum%2C_Raipur.jpg/320px-Mahant_Ghasidas_Memorial_Museum%2C_Raipur.jpg`, shortDesc: 'One of the oldest museums in central India with ancient artifacts and tribal art.', fullDesc: 'Established in 1875, this is one of the oldest museums in central India. It houses an extensive collection of archaeological artifacts, ancient sculptures, natural history specimens, coins, and manuscripts.', timings: '10:00 AM – 5:00 PM (Closed Mondays)', entryFee: '₹10 (Adults), ₹5 (Children)', bestTime: 'October to March', rating: 4.3, tips: 'Allow at least 2 hours for a thorough visit.' },
    { name: 'Nandan Van Zoo & Safari', type: 'Wildlife', image: `${WMF}4/47/Nandan_Van_zoo_Raipur.jpg`, shortDesc: 'Sprawling 800-acre forest zoo home to tigers, leopards, and exotic birds.', fullDesc: 'Spread over 800 acres of lush greenery, Nandan Van offers a unique blend of zoo and forest safari.', timings: '8:00 AM – 5:00 PM (Closed Mondays)', entryFee: '₹20 (Adults)', bestTime: 'November to February', rating: 4.5, tips: 'Arrive early for wildlife sightings.' },
    { name: 'Vivekananda Sarovar', type: 'Lake', image: `${WM}e/e9/Vivekananda_Sarovar_Raipur.jpg/320px-Vivekananda_Sarovar_Raipur.jpg`, shortDesc: 'Serene urban lake with a 37-foot Swami Vivekananda statue and musical fountain.', fullDesc: 'One of the most iconic landmarks of Raipur with boating and musical fountain.', timings: '5:00 AM – 10:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.6, tips: 'Visit during evenings for the fountain show.' },
    { name: 'Purkhouti Muktangan', type: 'Cultural', image: `${WMF}2/29/Purkhouti_Muktangan_Raipur_Chattisgarh.JPG`, shortDesc: 'Open-air museum celebrating tribal culture and folk traditions.', fullDesc: 'Cultural complex featuring replica villages, tribal art installations, and live craft demonstrations.', timings: '10:00 AM – 6:00 PM', entryFee: '₹20', bestTime: 'October to March', rating: 4.4, tips: 'Plan a full day visit.' },
    { name: 'MM Fun City', type: 'Park', image: `${FALLBACK}`, shortDesc: 'Large amusement and water park — perfect for families.', fullDesc: 'Popular amusement park with water rides, roller coasters, and entertainment shows for all ages.', timings: '10:00 AM – 7:00 PM', entryFee: '₹400–₹600', bestTime: 'October to March', rating: 4.1, tips: 'Weekdays are less crowded.' },
    { name: 'Champaran Dham', type: 'Pilgrimage', image: `${FALLBACK}`, shortDesc: 'Birthplace of saint Vallabhacharya — sacred riverside pilgrimage site on Mahanadi.', fullDesc: 'Holy site where Vallabhacharya was born in 1479. A beautiful ghat on the Mahanadi river.', timings: '6:00 AM – 8:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.5, tips: 'Visit during the annual Champaran Mela for a vibrant cultural experience.' },
    { name: 'Dudhadhari Math', type: 'Temple', image: `${FALLBACK}`, shortDesc: 'Ancient 16th-century monastery with ornate frescoes and sculptures.', fullDesc: 'One of Raipur\'s oldest religious institutions with a stunning main temple, ancient frescoes, and a museum inside.', timings: '6:00 AM – 8:00 PM', entryFee: 'Free', bestTime: 'Year-round', rating: 4.4, tips: 'The interior frescoes are exceptionally well preserved.' },
    { name: 'Rajiv Gandhi Smriti Van', type: 'Garden', image: `${FALLBACK}`, shortDesc: 'Beautiful urban forest and garden — ideal for morning walks and picnics.', fullDesc: 'Large forested garden in the heart of Raipur with well-maintained trails, open-air gyms, and a serene lake.', timings: '5:30 AM – 8:00 PM', entryFee: 'Free', bestTime: 'October to February', rating: 4.3, tips: 'Best for morning jogs and bird watching.' },
    { name: 'Science Centre Raipur', type: 'Museum', image: `${FALLBACK}`, shortDesc: 'Interactive science museum with hands-on exhibits for all ages.', fullDesc: 'Regional Science Centre with interactive exhibits on physics, biology, space science, and technology.', timings: '10:00 AM – 5:30 PM (Closed Mondays)', entryFee: '₹25', bestTime: 'Year-round', rating: 4.2, tips: 'Perfect for families with children.' },
    { name: 'Telibandha Lake', type: 'Lake', image: `${FALLBACK}`, shortDesc: 'Hidden urban lake — a peaceful retreat from city bustle.', fullDesc: 'Scenic lake in the heart of Raipur, perfect for evening walks.', timings: '5:00 AM – 9:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.0, tips: 'Best visited at sunset.' },
    { name: 'Chokhi Dhani Raipur', type: 'Cultural', image: `${CTB}001%20(2).jpg`, shortDesc: 'Rajasthani-themed ethnic village resort with folk performances, cuisine and crafts.', fullDesc: 'Chokhi Dhani is an authentic Rajasthani village experience on the outskirts of Raipur. It features traditional folk dances, puppet shows, camel rides, authentic Rajasthani thali, henna art, and handicraft stalls — perfect for families and groups.', timings: '5:00 PM – 11:00 PM (Weekdays), 12:00 PM – 11:00 PM (Weekends)', entryFee: '₹500–₹800 per person (includes food)', bestTime: 'October to March', rating: 4.3, tips: 'Go on weekends for the full folk performance lineup. Booking in advance is recommended.' },
    { name: 'Ram Mandir VIP Road', type: 'Temple', image: `${CTB}001%20(2).jpg`, shortDesc: 'One of Raipur\'s most famous and architecturally beautiful Ram temples on VIP Road.', fullDesc: 'The Ram Mandir on VIP Road is among the most visited temples in Raipur. Built in traditional North Indian temple architecture with ornate white marble and intricate carvings, it draws thousands of devotees daily. The temple is especially spectacular during Ram Navami and Diwali.', timings: '5:30 AM – 9:00 PM', entryFee: 'Free', bestTime: 'October to March; Ram Navami', rating: 4.6, tips: 'Visit early morning for peaceful darshan. The evening aarti is beautifully lit.' },
    { name: 'City Mall Raipur', type: 'Shopping', image: `${CTB}3%20(2).jpg`, shortDesc: 'One of Raipur\'s premier shopping destinations with top retail brands and food court.', fullDesc: 'City Mall is a popular shopping and entertainment hub in Raipur featuring national and international retail brands, a multi-cuisine food court, multiplex cinema, and gaming zones. A great place for an urban outing with family.', timings: '10:00 AM – 10:00 PM', entryFee: 'Free entry', bestTime: 'Year-round', rating: 4.1, tips: 'Weekday visits are less crowded. The food court has a wide variety of cuisines.' },
    { name: 'Colours Mall Raipur', type: 'Shopping', image: `${CTB}3%20(2).jpg`, shortDesc: 'Vibrant shopping mall with fashion, electronics, dining and entertainment.', fullDesc: 'Colours Mall is a well-known commercial complex in Raipur offering a curated mix of fashion retail, electronics stores, restaurants, and recreational facilities. Its central location makes it a popular hangout for all age groups.', timings: '10:00 AM – 10:00 PM', entryFee: 'Free entry', bestTime: 'Year-round', rating: 4.0, tips: 'Check for weekend sales events. Good dining options on the top floor.' },
    { name: 'Ambuja Mall Raipur', type: 'Shopping', image: `${CTB}3%20(2).jpg`, shortDesc: 'Large format mall with hypermarket, retail brands, dining and multiplex.', fullDesc: 'Ambuja Mall is one of Raipur\'s largest shopping centres featuring a Big Bazaar hypermarket, fashion and lifestyle brands, a multi-screen PVR cinema, and a broad range of restaurants and cafes. Ideal for a full day of shopping and entertainment.', timings: '10:00 AM – 10:30 PM', entryFee: 'Free entry', bestTime: 'Year-round', rating: 4.2, tips: 'PVR bookings sell out fast on weekends — book online in advance.' },
    { name: 'Zora Mall Raipur', type: 'Shopping', image: `${CTB}3%20(2).jpg`, shortDesc: 'Modern shopping and lifestyle mall with premium brands and entertainment.', fullDesc: 'Zora Mall is a contemporary retail and lifestyle destination in Raipur housing premium fashion brands, beauty outlets, an entertainment zone, and a food court. Popular among the city\'s young crowd.', timings: '10:00 AM – 10:00 PM', entryFee: 'Free entry', bestTime: 'Year-round', rating: 4.0, tips: 'The entertainment zone is great for kids and teenagers.' },
    { name: 'Amuse-O-Rama Water Park', type: 'Park', image: `${CTB}001%20(2).jpg`, shortDesc: 'Exciting water park with thrilling slides, wave pools and adventure rides.', fullDesc: 'Amuse-O-Rama is Raipur\'s popular water and amusement park featuring wave pools, multi-level water slides, rain dance, lazy river, and dry rides. A perfect summer escape for families and friend groups.', timings: '10:00 AM – 6:00 PM', entryFee: '₹400–₹700 per person', bestTime: 'March to June; October to November', rating: 4.2, tips: 'Go on weekdays to avoid long queues. Carry sunscreen and stay hydrated.' },
    { name: 'Telibandha Drive (Marine Drive)', type: 'Viewpoint', image: `${CTB}3%20(2).jpg`, shortDesc: 'Raipur\'s lakeside promenade — the city\'s answer to Marine Drive, ideal for evening strolls.', fullDesc: 'The Telibandha Talab waterfront promenade is affectionately called the "Marine Drive of Raipur." A beautifully developed walkway along the lake shore with lighting, gardens, food stalls, and space for jogging and cycling. One of the city\'s most loved evening spots.', timings: 'Open 24 hours (best 5:00 PM – 10:00 PM)', entryFee: 'Free', bestTime: 'October to March', rating: 4.4, tips: 'Evening visits after 6 PM are magical with the lake lights reflected on the water.' },
    { name: 'Banjari Mata Mandir', type: 'Temple', image: `${CTB}001%20(2).jpg`, shortDesc: 'Beloved goddess temple atop a hill — deeply revered by locals throughout Chhattisgarh.', fullDesc: 'Banjari Mata Mandir is one of the most popular and revered temples in Raipur, dedicated to Goddess Banjari — a form of Durga. Perched on an elevated spot, the temple draws massive crowds during Navratri and on Tuesdays. The views from the hilltop are excellent.', timings: '5:00 AM – 9:00 PM', entryFee: 'Free', bestTime: 'October to March; Navratri', rating: 4.5, tips: 'Tuesday mornings see the largest gatherings. Navratri celebrations are spectacular with lights and music.' },
    { name: 'Quiet Lake Raipur', type: 'Lake', image: `${CTB}3%20(2).jpg`, shortDesc: 'Serene natural lake on the outskirts — a peaceful escape from the city.', fullDesc: 'Quiet Lake is a tranquil water body on the periphery of Raipur that serves as a popular spot for picnics, fishing, bird watching, and early morning walks. The surrounding greenery makes it an ideal retreat for nature lovers seeking calm away from the urban bustle.', timings: 'Open all day (best 6:00 AM – 7:00 PM)', entryFee: 'Free', bestTime: 'October to March', rating: 4.0, tips: 'Bring binoculars for bird watching in winter months. Best visited early morning.' },
    { name: 'ISKCON Temple Raipur', type: 'Temple', image: `${CTB}001%20(2).jpg`, shortDesc: 'Grand ISKCON temple dedicated to Radha-Krishna with beautiful architecture and prasadam.', fullDesc: 'The ISKCON temple in Raipur is a stunning Vaishnava temple complex dedicated to Sri Radha Madanmohan. Built in traditional temple architecture with white marble interiors, it features a museum, daily aartis, bhajan sessions, and a restaurant serving delicious satvik prasadam. A spiritually uplifting and architecturally beautiful destination.', timings: '4:30 AM – 1:00 PM, 4:00 PM – 9:00 PM', entryFee: 'Free', bestTime: 'Year-round; Janmashtami is spectacular', rating: 4.7, tips: 'Attend the evening aarti at 7 PM for a beautiful spiritual experience. The prasadam restaurant is highly recommended.' },
    { name: 'Naya Raipur Central Park', type: 'Garden', image: `${CTB}001%20(2).jpg`, shortDesc: 'Sprawling urban central park in Nava Raipur — one of the largest in central India.', fullDesc: 'Central Park in Nava Raipur (the new capital city development) is a meticulously planned 80-acre green space featuring walking trails, cycling paths, themed gardens, an amphitheatre, and open lawns. Designed on the lines of Central Park New York, it is one of the most ambitious urban green spaces in central India.', timings: '5:00 AM – 9:00 PM', entryFee: 'Free', bestTime: 'October to February', rating: 4.4, tips: 'Morning cycling is very popular. The amphitheatre hosts weekend cultural events.' },
    { name: 'Shaheed Veer Narayan Singh International Stadium', type: 'Stadium', image: `${CTB}001%20(2).jpg`, shortDesc: 'World-class international cricket stadium — one of India\'s largest and most modern.', fullDesc: 'The Shaheed Veer Narayan Singh International Cricket Stadium in Nava Raipur is a state-of-the-art facility with a capacity of 65,000 spectators. It has hosted IPL matches, international ODIs, and T20s. The stadium\'s modern design and excellent facilities make it a landmark of Nava Raipur.', timings: 'Open on match days; Tours available on non-match days', entryFee: 'Match tickets vary; Tours: ₹50', bestTime: 'October to March (cricket season)', rating: 4.6, tips: 'Book match tickets well in advance through BookMyShow. The stadium tour is available on non-match days.' },
    { name: 'Maha Maya Temple Raipur', type: 'Temple', image: `${CTB}001%20(2).jpg`, shortDesc: 'Ancient and deeply revered Shakti temple — one of the oldest in Raipur.', fullDesc: 'Maha Maya Temple is one of the most ancient and important Shakti temples in Raipur, dedicated to Goddess Maha Maya (a powerful form of Durga). The temple has a history of several centuries and is particularly crowded during Navratri when the nine-day festival transforms the entire area into a spiritual celebration.', timings: '5:00 AM – 10:00 PM', entryFee: 'Free', bestTime: 'Navratri; October to March', rating: 4.6, tips: 'Navratri mornings from 5–7 AM are the most serene for darshan. The temple complex also has a small museum.' },
    { name: 'Hatkeshwar Mahadev Temple', type: 'Temple', image: `${CTB}001%20(2).jpg`, shortDesc: 'Historic Shiva temple on the banks of Kharun river — over 200 years old.', fullDesc: 'Hatkeshwar Mahadev is a historic and deeply revered Shiva temple situated on the banks of the Kharun River in Old Raipur. Believed to be over two centuries old, the temple is particularly significant during Mahashivratri and Shravan month when devotees pour in from across the region for special pujas and abhishek rituals.', timings: '5:00 AM – 9:00 PM', entryFee: 'Free', bestTime: 'Mahashivratri; Shravan month (July–August)', rating: 4.5, tips: 'Visit during Shravan Mondays for a traditional atmosphere. The riverside setting is very peaceful in the early morning.' },
    { name: 'Naya Raipur Musical Fountain', type: 'Cultural', image: `${CTB}3%20(2).jpg`, shortDesc: 'Spectacular evening musical fountain show with light, water and sound synchronisation.', fullDesc: 'The musical fountain in Naya Raipur (Nava Raipur) is a beautifully choreographed water, light, and sound show that draws large crowds every evening. The fountain jets synchronise with music and coloured lights to create a mesmerising visual experience — one of the best in central India.', timings: '7:00 PM – 9:00 PM (shows every 30 minutes)', entryFee: '₹20–₹50', bestTime: 'October to March', rating: 4.5, tips: 'Arrive 15 minutes before the show for a good viewing spot. Weekend shows are more elaborate.' },
    { name: 'Adivasi Sangrahalaya (Tribal Museum)', type: 'Museum', image: `${CTB}001%20(2).jpg`, shortDesc: 'Fascinating tribal heritage museum showcasing Chhattisgarh\'s 42 indigenous communities.', fullDesc: 'The Adivasi Sangrahalaya (Tribal Museum) in Raipur is a dedicated museum celebrating the rich cultural heritage of Chhattisgarh\'s 42 tribal communities. It features life-size displays of traditional dwellings, tribal art, ornaments, musical instruments, weapons, and ceremonial objects. An essential stop to understand the state\'s indigenous roots before exploring tribal regions.', timings: '10:00 AM – 6:00 PM (Closed Mondays)', entryFee: '₹15 (Adults), ₹5 (Children)', bestTime: 'October to March', rating: 4.5, tips: 'Visit before exploring Bastar or Surguja for cultural context. The diorama of tribal villages is exceptional.' },
    { name: 'Pandri Market', type: 'Shopping', image: `${CTB}3%20(2).jpg`, shortDesc: 'Bustling traditional wholesale and retail market — the heartbeat of Raipur commerce.', fullDesc: 'Pandri Market is Raipur\'s most famous and oldest commercial district, serving as the central hub for wholesale and retail trade in the city. It offers everything from fresh vegetables and spices to textiles, electronics, and daily essentials. The market\'s energy, narrow lanes, and competitive prices make it an authentic urban experience.', timings: '8:00 AM – 9:00 PM (most shops closed Sundays)', entryFee: 'Free', bestTime: 'October to March (avoid peak summer)', rating: 4.2, tips: 'Bargain confidently for the best prices. Morning visits are less crowded. Try local street food stalls inside the market.' },
    { name: 'Gurudwara Raipur', type: 'Religious', image: `${CTB}001%20(2).jpg`, shortDesc: 'Serene Sikh Gurudwara offering langar, spiritual peace, and warm community welcome.', fullDesc: 'Raipur\'s main Gurudwara is a beautiful Sikh shrine that is open to people of all faiths. The Gurudwara offers free community langar (meals) every day, religious kirtan, and a calm environment for meditation and prayer. Visitors are welcome to participate in the langar and experience the warmth of Sikh hospitality.', timings: '5:00 AM – 10:00 PM', entryFee: 'Free (langar is free)', bestTime: 'Year-round; Gurpurab festivals are special', rating: 4.6, tips: 'Cover your head and remove shoes before entering. The langar meal is wholesome and free for everyone.' },
    { name: 'Sendh Lake', type: 'Lake', image: `${CTB}3%20(2).jpg`, shortDesc: 'Beautiful natural lake on the outskirts of Raipur, popular for picnics and bird watching.', fullDesc: 'Sendh Lake is a picturesque water body located near Raipur, offering a serene natural environment away from urban noise. The lake attracts migratory birds in winter, making it a favourite among bird watchers. The surrounding area has scenic walking paths and open spaces perfect for family outings and picnics.', timings: 'Open all day', entryFee: 'Free', bestTime: 'November to February (migratory birds)', rating: 4.1, tips: 'Bring binoculars for bird watching. Early morning visits offer the best wildlife sightings.' },
    { name: 'Blue Water Park Raipur', type: 'Park', image: `${CTB}001%20(2).jpg`, shortDesc: 'Popular water and amusement park with multiple pools and rides for all ages.', fullDesc: 'Blue Water Park is a fun-filled amusement destination near Raipur featuring water slides, swimming pools, rain dance, and dry rides. With dedicated sections for children and adults, it is a family favourite especially during summer months. The park also has dining facilities and rest areas.', timings: '10:00 AM – 6:00 PM', entryFee: '₹350–₹600 per person', bestTime: 'March to June; October to November', rating: 4.0, tips: 'Visit on weekdays to avoid weekend rush. Carry a change of clothes. The food stalls inside are reasonably priced.' },
    { name: 'Chhattisgarh Vigyan Kendra', type: 'Museum', image: `${CTB}001%20(2).jpg`, shortDesc: 'State-of-the-art science centre with interactive galleries, planetarium and 3D shows.', fullDesc: 'Chhattisgarh Vigyan Kendra (State Science Centre) is Raipur\'s premier science and technology education facility. It houses interactive science galleries, a digital planetarium, 3D film shows, outdoor science park, and regular workshops for students. An excellent destination for families and students to explore science in a fun and engaging way.', timings: '10:00 AM – 6:00 PM (Closed Mondays)', entryFee: '₹30 (Science Gallery), ₹50 (Planetarium)', bestTime: 'Year-round', rating: 4.3, tips: 'Book planetarium shows in advance as slots fill up quickly on weekends. The outdoor science park is free.' },
    { name: 'Kaushalya Mata Temple Chandkhuri', type: 'Temple', image: `${CTB}001%20(2).jpg`, shortDesc: 'Ancient temple dedicated to Kaushalya — mother of Lord Ram — the only temple of its kind in the world.', fullDesc: 'The Kaushalya Mata Temple at Chandkhuri, located about 25 km from Raipur, is believed to be the only temple in the world dedicated to Kaushalya, the mother of Lord Ram. Chhattisgarh (ancient Dakshina Kosala) is revered as the maternal grandmother\'s home of Lord Ram. The temple sits on a beautiful island in the middle of a lake and is reached by a causeway, making it architecturally and spiritually unique.', timings: '6:00 AM – 8:00 PM', entryFee: 'Free', bestTime: 'Ram Navami; October to March', rating: 4.7, tips: 'Visit during Ram Navami for a grand celebration. The island setting with the lake makes for beautiful photographs at sunrise.' },
    { name: 'Marine Drive Raipur', type: 'Viewpoint', image: `${CTB}3%20(2).jpg`, shortDesc: 'Scenic lakeside promenade — Raipur\'s leisure waterfront with gardens and food stalls.', fullDesc: 'Marine Drive Raipur refers to the developed lakefront promenade along Telibandha and surrounding lakes. It features beautifully landscaped walking paths, ornamental gardens, food kiosks, and seating areas overlooking the water. A favourite destination for evening walks, cycling, and casual outings for Raipur residents.', timings: 'Open all day (best 5:00 PM – 10:00 PM)', entryFee: 'Free', bestTime: 'October to March', rating: 4.3, tips: 'The stretch is especially beautiful after dark with lake-side lighting. Street food from local vendors is a highlight.' },
  ]},
  
  { name: 'Bilaspur', image: `${CTB}Malhaar,%20Bilaspur%20(2).JPG`, desc: 'Rice bowl of Chhattisgarh with rich heritage', highlights: 'Heritage & Culture', coordinates: { lat: 22.0797, lng: 82.1409 }, category: 'heritage', touristPlaces: [
    { name: 'Ratanpur Fort', type: 'Fort', image: `${WM}a/a5/Ratanpur_fort_chhattisgarh.jpg/320px-Ratanpur_fort_chhattisgarh.jpg`, shortDesc: 'Historic 11th-century fort — once the ancient capital of the Haihaya dynasty.', fullDesc: 'Ratanpur Fort dates back to the 11th century when it served as the capital of the powerful Haihaya kings.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.4, tips: 'Hire a local guide.' },
    { name: 'Achanakmar Wildlife Sanctuary', type: 'Wildlife', image: `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/320px-Achanakmar_Wildlife_Sanctuary.jpg`, shortDesc: 'Pristine tiger reserve in the Maikal Hills.', fullDesc: 'Spread across 914 sq km, home to tigers, leopards, gaur, and 150+ bird species.', timings: '6:00 AM – 12:00 PM / 3:00 PM – 6:00 PM', entryFee: '₹200', bestTime: 'November to June', rating: 4.5, tips: 'Book safari slots in advance.' },
    { name: 'Mahamaya Temple Ratanpur', type: 'Temple', image: `${WM}0/0e/Mahamaya_Temple%2C_Ratanpur.jpg/320px-Mahamaya_Temple%2C_Ratanpur.jpg`, shortDesc: 'One of the most revered Shakti shrines — a Shakti Peetha.', fullDesc: 'One of the 52 Shakti Peethas, drawing thousands during Navratri.', timings: '5:00 AM – 9:00 PM', entryFee: 'Free', bestTime: 'Navratri; October to March', rating: 4.7, tips: 'Visit on regular days for a peaceful experience.' },
    { name: 'Kanan Pendari Zoo', type: 'Wildlife', image: `${WM}c/c4/Kanan_Pendari_Zoo_Bilaspur.jpg/320px-Kanan_Pendari_Zoo_Bilaspur.jpg`, shortDesc: 'One of the largest zoos in central India with diverse animal collection.', fullDesc: 'Houses over 100 species of animals and birds spread over 4.5 sq km of forest area.', timings: '9:00 AM – 5:30 PM (Closed Mondays)', entryFee: '₹20', bestTime: 'October to March', rating: 4.2, tips: 'Perfect for a family outing.' },
    { name: 'Malhaar Archaeological Site', type: 'Archaeological', image: `${CTB}Malhaar,%20Bilaspur%20(2).JPG`, shortDesc: 'Ancient city ruins from the Kushana period.', fullDesc: 'Malhaar was a thriving ancient city. Excavations have revealed terracotta figurines, ancient structures, and artifacts.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.3, tips: 'Visit the local museum for excavated finds.' },
    { name: 'Seorinarayan Temple', type: 'Temple', image: `${FALLBACK}`, shortDesc: 'Ancient Vishnu temple complex on the Mahanadi — one of the holiest sites in Chhattisgarh.', fullDesc: 'Temple at the confluence of three rivers. Ancient temples dating to the 11th century with extraordinary stone carvings.', timings: '6:00 AM – 8:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.5, tips: 'The trivenisangam is deeply sacred.' },
    { name: 'Laftinganj Waterfall', type: 'Waterfall', image: `${FALLBACK}`, shortDesc: 'Hidden waterfall near Bilaspur — a local secret surrounded by forests.', fullDesc: 'Serene waterfall accessible by a short forest trail from the Bilaspur–Ambikapur road.', timings: 'Open all day', entryFee: 'Free', bestTime: 'July to February', rating: 4.1, tips: 'A local guide makes finding it much easier.' },
  ]},
  { name: 'Bastar', image: `${CTB}001a7d7f9.jpg`, desc: 'Land of waterfalls, tribal culture and dense forests', highlights: 'Tribal Heritage', coordinates: { lat: 19.0728, lng: 82.0149 }, category: 'nature', touristPlaces: [
    { name: 'Chitrakote Waterfalls', type: 'Waterfall', image: `${WM}2/2e/Chitrakoot_Falls.jpg/320px-Chitrakoot_Falls.jpg`, shortDesc: "India's widest waterfall — the \"Niagara of India\".", fullDesc: "India's broadest waterfall, stretching nearly 300 meters during monsoon.", timings: 'Open all day', entryFee: 'Free', bestTime: 'July to February', rating: 4.8, tips: 'Monsoon offers most spectacular views.' },
    { name: 'Tirathgarh Falls', type: 'Waterfall', image: `${WM}7/74/Tirathgarh_waterfall.jpg/320px-Tirathgarh_waterfall.jpg`, shortDesc: 'Multi-tiered 300-feet waterfall inside Kanger Valley National Park.', fullDesc: 'Stunning 300-foot waterfall on the Kanger River inside the national park.', timings: '8:00 AM – 5:30 PM', entryFee: '₹20', bestTime: 'October to January', rating: 4.6, tips: 'Wear non-slip footwear.' },
    { name: 'Kanger Valley National Park', type: 'Wildlife', image: `${WM}8/83/Kanger_ghati.jpg/320px-Kanger_ghati.jpg`, shortDesc: 'Spectacular national park with caves, waterfalls, and rare wildlife.', fullDesc: '200 sq km of lush biodiversity with caves, waterfalls, and rare Bastar Hill Myna.', timings: '8:00 AM – 5:00 PM (Closed Tuesdays)', entryFee: '₹50', bestTime: 'November to April', rating: 4.7, tips: 'Hire a trained naturalist guide.' },
    { name: 'Kotumsar Cave', type: 'Cave', image: `${WM}b/b9/Kotumsar_Cave_Bastar.jpg/320px-Kotumsar_Cave_Bastar.jpg`, shortDesc: 'One of the longest natural caves in India with eyeless cave fish.', fullDesc: '1,327-meter cave with stalactites and rare eyeless cave fish species.', timings: '8:30 AM – 5:00 PM', entryFee: '₹50', bestTime: 'November to May', rating: 4.6, tips: 'Closed during monsoon. Wear closed-toe shoes.' },
    { name: 'Bastar Palace', type: 'Heritage', image: `${WM}9/9a/Bastar_Palace_Jagdalpur.jpg/320px-Bastar_Palace_Jagdalpur.jpg`, shortDesc: '200-year-old royal palace of Bastar kings — now a heritage museum.', fullDesc: 'Built in 1891, partial museum featuring royal artifacts and tribal art.', timings: '10:00 AM – 5:00 PM', entryFee: '₹20', bestTime: 'October to March', rating: 4.4, tips: 'Bastar Dussehra is a once-in-a-lifetime cultural experience.' },
    { name: 'Anthropological Museum Jagdalpur', type: 'Museum', image: `${FALLBACK}`, shortDesc: 'Fascinating museum dedicated to Bastar\'s 12 tribal communities and their art.', fullDesc: 'Showcases life-size tribal displays, traditional weapons, ornaments, musical instruments, and artworks of the Gondi, Maria, and Muria tribes.', timings: '10:00 AM – 5:00 PM (Closed Mondays)', entryFee: '₹15', bestTime: 'October to March', rating: 4.5, tips: 'Best visited before exploring tribal villages.' },
    { name: 'Dalpat Sagar Lake', type: 'Lake', image: `${FALLBACK}`, shortDesc: 'Large historic lake in Jagdalpur — popular for boating and evening walks.', fullDesc: 'Historic lake built during the Bastar kingdom era. Surrounded by a garden and popular for boating.', timings: 'Open all day', entryFee: 'Free (boat hire extra)', bestTime: 'October to March', rating: 4.2, tips: 'Sunset views over the lake are beautiful.' },
    { name: 'Mendri Ghumar Waterfall', type: 'Waterfall', image: `${FALLBACK}`, shortDesc: 'Hidden horseshoe waterfall — one of Bastar\'s most photogenic spots.', fullDesc: 'Beautiful waterfall on the Indravati river tributary. Less visited than Chitrakote.', timings: 'Open all day', entryFee: 'Free', bestTime: 'August to February', rating: 4.4, tips: 'Best after monsoon when water flow is maximum.' },
  ]},
  { name: 'Durg', image: `${CTB}2022-12-13.jpg`, desc: 'Industrial hub with temples and cultural richness', highlights: 'Steel City', coordinates: { lat: 21.1900, lng: 81.2849 }, category: 'urban', touristPlaces: [
    { name: 'Uwasaggaharam Parshwa Teerth', type: 'Jain Temple', image: `${WMF}3/37/Uwasaggaharam_Parshwa_Teerth_Durg.jpg`, shortDesc: 'Exquisitely carved Jain temple — one of the most beautiful in the region.', fullDesc: 'Magnificent Jain temple with detailed marble carvings and intricate relief work.', timings: '6:00 AM – 8:00 PM', entryFee: 'Free', bestTime: 'Year-round', rating: 4.7, tips: 'Remove shoes before entering.' },
    { name: 'Maitri Bagh Zoo', type: 'Wildlife', image: `${WM}5/5e/Maitri_Bagh_Bhilai.jpg/320px-Maitri_Bagh_Bhilai.jpg`, shortDesc: '53-acre zoo and botanical garden — built as a symbol of Indo-Soviet friendship.', fullDesc: 'Includes zoo, botanical garden, toy train, and boating on a central lake.', timings: '9:00 AM – 5:30 PM (Closed Mondays)', entryFee: '₹15', bestTime: 'October to March', rating: 4.3, tips: 'Perfect for a family day out.' },
    { name: 'Tandula Dam', type: 'Dam', image: `${WM}4/4c/Tandula_Dam_Balod.jpg/320px-Tandula_Dam_Balod.jpg`, shortDesc: 'Scenic reservoir surrounded by forested hills — great for birdwatching.', fullDesc: 'Built across Seonath River in 1921. Excellent for migratory birdwatching in winter.', timings: 'Open all day', entryFee: 'Free', bestTime: 'November to February', rating: 4.1, tips: 'Morning visits best for birdwatching.' },
    { name: 'Ganga Maiya Temple Durg', type: 'Temple', image: `${FALLBACK}`, shortDesc: 'Popular riverside temple dedicated to Ganga Maiya on the Shivnath river.', fullDesc: 'Beloved temple with large annual Chhath Puja celebration drawing thousands of devotees.', timings: '5:00 AM – 9:00 PM', entryFee: 'Free', bestTime: 'October to March; Chhath Puja', rating: 4.3, tips: 'Chhath Puja is spectacular.' },
  ]},
  { name: 'Rajnandgaon', image: `${CTB}rajnandgaon.png`, desc: 'Cultural and religious centre with famous hilltop temples', highlights: 'Temple Town', coordinates: { lat: 21.0977, lng: 81.0370 }, category: 'spiritual', touristPlaces: [
    { name: 'Dongargarh — Bambleshwari Temple', type: 'Temple', image: `${WM}c/c3/Bambleshwari_temple_Dongargarh.jpg/320px-Bambleshwari_temple_Dongargarh.jpg`, shortDesc: 'Hilltop Shakti shrine perched 1,600 feet high — accessible by ropeway.', fullDesc: 'One of the most revered pilgrimage sites with panoramic views. Ropeway or 1,100 steps.', timings: '4:00 AM – 10:00 PM', entryFee: 'Free (Ropeway ₹90)', bestTime: 'Navratri; October to March', rating: 4.8, tips: 'Start early on Navratri to avoid crowds.' },
    { name: 'Rajiv Lochan Mandir, Rajim', type: 'Temple', image: `${WM}9/93/Rajiv_Lochan_temple%2C_Rajim.jpg/320px-Rajiv_Lochan_temple%2C_Rajim.jpg`, shortDesc: 'Magnificent 8th-century Vishnu temple at the holy Triveni Sangam.', fullDesc: 'Nagara-style masterpiece at the confluence of three rivers — the Prayag of Chhattisgarh.', timings: '6:00 AM – 8:00 PM', entryFee: 'Free', bestTime: 'January/February for Kumbh Mela', rating: 4.7, tips: 'Visit during full moon night for a magical atmosphere.' },
    { name: 'Khutaghat Dam', type: 'Dam', image: `${WMF}5/55/Khutaghat_Dam_Chhattisgarh.jpg`, shortDesc: 'Beautiful dam with forest surroundings perfect for a nature retreat.', fullDesc: 'Scenic dam on the Sheonath River surrounded by dense forest, popular for picnics.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.0, tips: 'Great spot for morning walks.' },
    { name: 'Ambaghat Viewpoint', type: 'Viewpoint', image: `${FALLBACK}`, shortDesc: 'Dramatic mountain pass viewpoint on the Ambagarh road.', fullDesc: 'Spectacular viewpoint offering panoramic views of forested valleys.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.3, tips: 'Sunrise and sunset are equally spectacular.' },
  ]},
  { name: 'Korba', image: `${CTB}Malhaar,%20Bilaspur%20(2).JPG`, desc: 'Power capital with stunning natural waterfalls', highlights: 'Energy Hub', coordinates: { lat: 22.3595, lng: 82.7501 }, category: 'nature', touristPlaces: [
    { name: 'Kendai Waterfall', type: 'Waterfall', image: `${WMF}a/a2/Kendai_Waterfall_Korba_Chhattisgarh.jpg`, shortDesc: 'Stunning natural waterfall plunging through forest rocks.', fullDesc: 'Breathtaking waterfall in dense forests with natural pools and excellent trekking trails.', timings: 'Open all day', entryFee: 'Free', bestTime: 'July to February', rating: 4.4, tips: 'Wear trekking shoes.' },
    { name: 'Pali Shiv Temple', type: 'Temple', image: `${WMF}9/98/Pali_shiv_mandir_korba.jpg`, shortDesc: 'Ancient Shiva temple complex with historic sculptures and serene setting.', fullDesc: 'Group of ancient Shiva temples from the Kalachuri period with fine stone carvings.', timings: '6:00 AM – 7:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.2, tips: 'Visit during Mahashivratri for a vibrant festival experience.' },
    { name: 'Hasdev Bango Dam', type: 'Dam', image: `${FALLBACK}`, shortDesc: 'Massive reservoir dam on the Hasdeo river — stunning sunset destination.', fullDesc: 'One of the largest dams in Chhattisgarh with spectacular views.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.3, tips: 'Visit the dam viewpoint at sunset.' },
  ]},
  { name: 'Surguja', image: `${CTB}Sarguja%20Palace%20Ambikapur.JPG`, desc: 'Hill station, Mini Tibet and ancient caves', highlights: 'Mainpat – Mini Tibet', coordinates: { lat: 23.1128, lng: 83.1982 }, category: 'nature', touristPlaces: [
    { name: 'Mainpat Hill Station', type: 'Hill Station', image: `${WM}1/1d/Mainpat_Chhattisgarh.jpg/320px-Mainpat_Chhattisgarh.jpg`, shortDesc: '"Mini Tibet of Chhattisgarh" — scenic plateau at 3,700 ft.', fullDesc: 'Breathtaking plateau at 3,781 feet with Tibetan refugee settlements, monasteries, meadows.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to February', rating: 4.6, tips: 'Try Tibetan momos and butter tea.' },
    { name: 'Tiger Point Mainpat', type: 'Viewpoint', image: `${WMF}6/67/Tiger_Point_Mainpat.jpg`, shortDesc: 'Dramatic cliff-edge viewpoint with panoramic forested valley views.', fullDesc: 'Most popular viewpoint in Mainpat with spectacular sunrise and sunset vistas.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to February', rating: 4.7, tips: 'Arrive before sunrise for best photos.' },
    { name: 'Ramgarh Hill', type: 'Archaeological', image: `${WM}d/d8/Jogimarha_Cave_Ramgarh.jpg/320px-Jogimarha_Cave_Ramgarh.jpg`, shortDesc: "India's oldest surviving manmade theatre — the 2,300-year-old Sitabenga Cave.", fullDesc: "Contains the Sitabenga Cave dating to 300 BC and Jogimarha Cave with Brahmi inscriptions.", timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.5, tips: 'Engage a knowledgeable guide.' },
    { name: 'Tatapani Hot Springs', type: 'Hot Springs', image: `${WMF}8/8b/Tatapani_hot_spring_Surguja.jpg`, shortDesc: 'Natural geothermal hot springs with believed medicinal properties.', fullDesc: 'Geothermal springs beside the Mahanadi River, popular during Makar Sankranti.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.3, tips: 'Springs are hotter in cooler months.' },
    { name: 'Semarsot Wildlife Sanctuary', type: 'Wildlife', image: `${FALLBACK}`, shortDesc: 'Dense forested sanctuary rich in leopards, bison, and rare birds.', fullDesc: '430 sq km sanctuary in the Surguja hills with excellent biodiversity.', timings: '6:00 AM – 5:00 PM', entryFee: '₹100', bestTime: 'November to May', rating: 4.4, tips: 'Excellent birdwatching in morning.' },
    { name: 'Ulta Pani Mainpat', type: 'Natural', image: `${FALLBACK}`, shortDesc: 'Fascinating natural optical illusion — water appears to flow uphill.', fullDesc: 'A gravity-defying natural illusion near Mainpat where water and vehicles seem to roll uphill.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to February', rating: 4.5, tips: 'Try parking a vehicle and watching it roll "uphill".' },
  ]},
  { name: 'Mahasamund', image: `${CTB}mahasamund-2.jpg`, desc: 'Ancient archaeological treasures and heritage sites', highlights: 'Sirpur Heritage', coordinates: { lat: 21.1167, lng: 82.0833 }, category: 'heritage', touristPlaces: [
    { name: 'Sirpur Archaeological Site', type: 'Heritage', image: `${WM}5/5c/Sirpur_Chhattisgarh.jpg/320px-Sirpur_Chhattisgarh.jpg`, shortDesc: 'Once-magnificent ancient city on the Mahanadi — 12,000+ artifacts.', fullDesc: 'Capital of South Kosala kingdom with temples, monasteries, and palaces from 6th–8th centuries.', timings: 'Open all day; Museum 9:00–5:00', entryFee: '₹10', bestTime: 'October to March', rating: 4.6, tips: 'Sirpur Mahotsav in December is a must.' },
    { name: 'Laxman Temple Sirpur', type: 'Temple', image: `${WM}a/a3/Laxman_Temple_Sirpur_Chhattisgarh.jpg/320px-Laxman_Temple_Sirpur_Chhattisgarh.jpg`, shortDesc: 'Remarkably preserved 7th-century brick temple — a masterpiece of ancient architecture.', fullDesc: 'One of the finest examples of early Nagara architecture, entirely of burnt brick with intricate carvings.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.7, tips: 'Visit at dusk for dramatic lighting.' },
    { name: 'Buddha Vihar Sirpur', type: 'Buddhist Site', image: `${WM}3/38/Buddhist_monastery_Sirpur.jpg/320px-Buddhist_monastery_Sirpur.jpg`, shortDesc: "Ancient Buddhist monasteries showing the region's vibrant Buddhist past.", fullDesc: 'Complex of monasteries and stupas from 7th–9th centuries with exceptional bronze Buddhas.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.5, tips: 'Combine with Laxman Temple for a full heritage day.' },
    { name: 'Surang Tila Sirpur', type: 'Archaeological', image: `${FALLBACK}`, shortDesc: 'Massive underground Shiva temple excavated at Sirpur — a hidden marvel.', fullDesc: 'Extraordinary underground Shaiva temple discovered at Sirpur with a tunnel and several chambers.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.6, tips: 'One of the most remarkable discoveries at Sirpur — don\'t miss it.' },
  ]},
  { name: 'Dhamtari', image: `${CTB}gangrel-bandh-image.webp`, desc: 'Nature, wildlife and water sports paradise', highlights: 'Sihawa Range', coordinates: { lat: 20.7067, lng: 81.5490 }, category: 'nature', touristPlaces: [
    { name: 'Gangrel Dam (Ravishankar Sagar)', type: 'Dam', image: `${WM}5/53/Gangrel_Dam_Dhamtari.jpg/320px-Gangrel_Dam_Dhamtari.jpg`, shortDesc: "Chhattisgarh's largest dam — popular for water sports.", fullDesc: 'Largest dam in Chhattisgarh across the Mahanadi offering boating and water sports.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.4, tips: 'Book water sports in advance.' },
    { name: 'Madku Dweep', type: 'Island', image: `${WMF}7/7c/Madku_Dweep_Chhattisgarh.jpg`, shortDesc: 'Forested river island with ancient Shiva temples — accessible only by boat.', fullDesc: 'River island on the Sheonath with ancient Shiva temples and mystical atmosphere.', timings: 'Boat: 8:00 AM – 5:00 PM', entryFee: 'Free (boat extra)', bestTime: 'October to March', rating: 4.5, tips: 'Visit on weekdays for a peaceful experience.' },
    { name: 'Sihawa Shringhi Rishi Ashram', type: 'Religious', image: `${WMF}c/c9/Sihawa_Shringhi_Rishi_Ashram.jpg`, shortDesc: 'Ancient ashram — believed to be the birthplace of Mahanadi river.', fullDesc: 'Sacred ashram of sage Shringhi Rishi where the Mahanadi river originates in the Sihawa hills.', timings: '6:00 AM – 6:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.3, tips: 'The source spring of Mahanadi is a must-see.' },
  ]},
  { name: 'Gariyaband', image: `${CTB}2019-08-25.jpg`, desc: 'Spiritual and natural wonders in forested terrain', highlights: 'Jatmai Temple', coordinates: { lat: 20.6367, lng: 82.0623 }, category: 'spiritual', touristPlaces: [
    { name: 'Jatmai Ghatarrani Temple', type: 'Temple', image: `${WM}f/f3/Jatmai_Ghatarani_Temple.jpg/320px-Jatmai_Ghatarani_Temple.jpg`, shortDesc: 'Breathtaking waterfall-temple complex — Shakti shrine beside cascading falls.', fullDesc: 'Jatmai Temple dramatically beside a multi-tiered waterfall in a forested gorge.', timings: '6:00 AM – 7:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.7, tips: 'Visit after monsoon for finest experience.' },
    { name: 'Udanti Wildlife Sanctuary', type: 'Wildlife', image: `${WM}0/0c/Udanti_Wildlife_Sanctuary_Chhattisgarh.jpg/320px-Udanti_Wildlife_Sanctuary_Chhattisgarh.jpg`, shortDesc: 'Critical sanctuary for the endangered Wild Buffalo of Chhattisgarh.', fullDesc: '347 sq km sanctuary — one of the last strongholds of the Wild Buffalo.', timings: '6:00 AM – 5:00 PM', entryFee: '₹100', bestTime: 'November to June', rating: 4.3, tips: 'Early morning safaris for best chances.' },
    { name: 'Ghatarrani Waterfall', type: 'Waterfall', image: `${FALLBACK}`, shortDesc: 'Multi-tiered waterfall adjacent to the Jatmai Temple.', fullDesc: 'The waterfalls at Ghatarrani cascade over several tiers through forested gorge.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.6, tips: 'Post-monsoon has the highest water volume.' },
  ]},
  { name: 'Kabirdham', image: `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`, desc: 'Khajuraho of Chhattisgarh with ancient temples', highlights: 'Bhoramdeo Temple', coordinates: { lat: 22.0340, lng: 81.2726 }, category: 'heritage', touristPlaces: [
    { name: 'Bhoramdeo Temple', type: 'Temple', image: `${WM}e/e0/Bhoramdeo_temple_Kabirdham.jpg/320px-Bhoramdeo_temple_Kabirdham.jpg`, shortDesc: '"Khajuraho of Chhattisgarh" — 11th-century Shiva temple with erotic carvings.', fullDesc: 'Three 11th-century temple complex with exquisite carvings in verdant forest setting.', timings: 'Open all day', entryFee: '₹15', bestTime: 'October to March; March dance festival', rating: 4.7, tips: 'Bhoramdeo Dance Festival in March is spectacular.' },
    { name: 'Kawardha Palace', type: 'Heritage', image: `${WM}3/33/Kawardha_Palace_Chhattisgarh.jpg/320px-Kawardha_Palace_Chhattisgarh.jpg`, shortDesc: 'Magnificent 1939 Indo-Saracenic palace — now a heritage hotel.', fullDesc: 'Stunning palace by Kawardha royal family with landscaped gardens and royal heritage.', timings: 'Open all day', entryFee: 'Free entry', bestTime: 'October to March', rating: 4.5, tips: 'Overnight stay is an unforgettable royal experience.' },
    { name: 'Bhoramdeo Wildlife Sanctuary', type: 'Wildlife', image: `${WM}1/1d/Bhoramdeo_Sanctuary_Forest.jpg/320px-Bhoramdeo_Sanctuary_Forest.jpg`, shortDesc: 'Dense forested sanctuary surrounding the ancient Bhoramdeo temple complex.', fullDesc: 'Maikal Hills sanctuary home to leopards, sloth bears, and rich birdlife.', timings: '6:00 AM – 5:00 PM', entryFee: '₹50', bestTime: 'November to May', rating: 4.3, tips: 'Combine temple visit with a forest walk.' },
    { name: 'Madwa Mahal', type: 'Heritage', image: `${FALLBACK}`, shortDesc: 'Charming 14th-century wedding pavilion temple near Bhoramdeo.', fullDesc: 'Small temple pavilion built in the 14th century with carvings rivalling those of Bhoramdeo.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.5, tips: 'Very close to Bhoramdeo — don\'t miss it.' },
  ]},
  { name: 'Jashpur', image: `${CTB}jogimaracave.jpg`, desc: 'Tea gardens, tribal culture and scenic waterfalls', highlights: 'Kailash Caves', coordinates: { lat: 22.8863, lng: 84.1292 }, category: 'nature', touristPlaces: [
    { name: 'Kailash Gufa (Cave)', type: 'Cave', image: `${WMF}8/8c/Kailash_Gufa_Jashpur_Chhattisgarh.jpg`, shortDesc: 'Sacred natural cave temple dedicated to Lord Shiva amid serene forest.', fullDesc: 'Natural cave with Shiva linga formations in dense forests, ideal trek destination.', timings: '6:00 AM – 6:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.5, tips: 'The forest trek to the cave is as rewarding as the cave itself.' },
    { name: 'Rajpuri Waterfall', type: 'Waterfall', image: `${WMF}b/b4/Rajpuri_Waterfalls_Jashpur.jpg`, shortDesc: 'Beautiful waterfall cluster near Jashpur — most picturesque in the district.', fullDesc: 'Cascades over tiered rock formations into crystal-clear pools in highland forests.', timings: 'Open all day', entryFee: 'Free', bestTime: 'July to February', rating: 4.4, tips: 'Bring a picnic — pools are ideal for relaxing.' },
    { name: 'Jashpur Tea Gardens', type: 'Nature', image: `${WMF}e/e7/Jashpur_Tea_Garden_Chhattisgarh.jpg`, shortDesc: 'Scenic tea estates in the Jashpur highlands — rare in central India.', fullDesc: 'Small tea estates with scenic walks and tea cultivation learning opportunities.', timings: '8:00 AM – 5:00 PM', entryFee: 'Nominal', bestTime: 'October to March', rating: 4.3, tips: 'Morning visits when leaves are freshest.' },
    { name: 'Rani Jharna Waterfall', type: 'Waterfall', image: `${WMF}3/35/Rani_Jharna_Jashpur.jpg`, shortDesc: 'Serene hidden waterfall in thick forests — a photographer\'s delight.', fullDesc: 'Tranquil waterfall surrounded by dense canopy, rarely crowded, ideal for nature lovers.', timings: 'Open all day', entryFee: 'Free', bestTime: 'August to February', rating: 4.2, tips: 'Accessible by short jungle trek.' },
    { name: 'Kunkuri Church', type: 'Church', image: `${FALLBACK}`, shortDesc: 'Asia\'s second-largest Catholic church — a magnificent Gothic structure.', fullDesc: 'The massive Catholic diocese church at Kunkuri is one of Asia\'s largest and most beautiful Gothic churches.', timings: '7:00 AM – 7:00 PM', entryFee: 'Free', bestTime: 'Year-round (Christmas is special)', rating: 4.6, tips: 'Christmas midnight mass here is a remarkable experience.' },
  ]},
  { name: 'Korea', image: `${CTB}go7.webp`, desc: 'Amrit Dhara falls and dense elephant forests', highlights: 'Amrit Dhara Falls', coordinates: { lat: 23.2948, lng: 82.6697 }, category: 'nature', touristPlaces: [
    { name: 'Amrit Dhara Waterfall', type: 'Waterfall', image: `${WM}4/41/Amrit_Dhara_Waterfall_Korea.jpg/320px-Amrit_Dhara_Waterfall_Korea.jpg`, shortDesc: 'Spectacular 90-foot waterfall on the Hasdo River through dense forest gorge.', fullDesc: 'Amrit Dhara ("stream of nectar") with Shiva temple complex nearby, popular on Mahashivratri.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.7, tips: 'Visit in the morning for best light and fewest crowds.' },
    { name: 'Chirimiri Hill Station', type: 'Hill Station', image: `${WMF}5/55/Chirimiri_Hill_Station_Korea.jpg`, shortDesc: 'Pleasant coal-town hill station in Korea with cool climate and forest trails.', fullDesc: 'Charming hill town at 2,000+ feet with scenic forest walks and cool retreat atmosphere.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to February', rating: 4.2, tips: 'Ideal for those seeking cooler temperatures.' },
    { name: 'Hasdeo Aranya Forest', type: 'Forest', image: `${WM}b/b7/Hasdeo_Aranya_forest_Chhattisgarh.jpg/320px-Hasdeo_Aranya_forest_Chhattisgarh.jpg`, shortDesc: "Vast biodiversity-rich forest — habitat of elephants and tigers.", fullDesc: "One of central India's largest forests, critical habitat for elephants, tigers, 100s of birds.", timings: 'Forest dept permit required', entryFee: 'Permit fees', bestTime: 'November to April', rating: 4.5, tips: 'Hire accredited forest guide. Elephant sightings common at dawn.' },
  ]},
  { name: 'Dantewada', image: `${CTB}0011122_Dantewada_Danteswari_Mata_Mandir_Chattisgarh_007.jpg`, desc: 'Danteshwari Shakti Peetha — the soul of Bastar', highlights: 'Danteshwari Temple', coordinates: { lat: 18.8960, lng: 81.3490 }, category: 'spiritual', touristPlaces: [
    { name: 'Danteshwari Temple', type: 'Temple', image: `${WM}d/d9/Danteshwari_temple_Dantewada.jpg/320px-Danteshwari_temple_Dantewada.jpg`, shortDesc: 'One of the 52 Shakti Peethas — the most sacred goddess temple of Bastar.', fullDesc: 'Most revered shrine in Chhattisgarh, centre of the 75-day Bastar Dussehra festival.', timings: '5:00 AM – 9:00 PM', entryFee: 'Free', bestTime: 'Navratri; Bastar Dussehra', rating: 4.8, tips: 'Early morning puja is very peaceful.' },
    { name: 'Barsur Temple Complex', type: 'Heritage', image: `${WM}1/1a/Barsur_Ganesh_Temple_Dantewada.jpg/320px-Barsur_Ganesh_Temple_Dantewada.jpg`, shortDesc: 'Ancient temple complex with a massive twin Ganesh idol from the 10th century.', fullDesc: 'Cluster of ancient Nagara style temples with a pair of Ganesh statues, 5 feet tall each, at Barsur.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.4, tips: 'The twin Ganesh statues are incredibly rare.' },
  ]},
  { name: 'Kanker', image: `${CTB}kanker-1.jpg`, desc: 'Jungle camps, heritage palace and tribal trails', highlights: 'Kanker Jungle Camp', coordinates: { lat: 20.2681, lng: 81.4892 }, category: 'nature', touristPlaces: [
    { name: 'Kanker Palace', type: 'Heritage', image: `${WM}2/22/Kanker_Palace_Chhattisgarh.jpg/320px-Kanker_Palace_Chhattisgarh.jpg`, shortDesc: 'Historic 1937 palace — now a heritage hotel overlooking the Dudh River.', fullDesc: 'Gracious heritage property with forest surroundings and royal experience.', timings: 'Heritage hotel; day visits allowed', entryFee: 'Free entry', bestTime: 'October to March', rating: 4.6, tips: 'Staying at the palace is a unique experience.' },
    { name: 'Kanker Jungle Safari', type: 'Safari', image: `${WMF}4/48/Kanker_jungle_chhattisgarh.jpg`, shortDesc: 'Guided jungle safaris — rich in leopards and 150+ bird species.', fullDesc: 'Excellent biodiversity with leopards, spotted deer, sambar, sloth bears, and birds.', timings: '6:00 AM – 10:00 AM / 3:00 PM – 6:00 PM', entryFee: '₹300', bestTime: 'November to May', rating: 4.5, tips: 'Book in advance during peak season.' },
    { name: 'Dudh River Rafting', type: 'River', image: `${FALLBACK}`, shortDesc: 'Gentle river rafting on the scenic Dudh River through forested gorges.', fullDesc: 'White water rafting on the Dudh River through scenic forested terrain near Kanker.', timings: '8:00 AM – 4:00 PM', entryFee: '₹400–₹600', bestTime: 'October to March', rating: 4.4, tips: 'Must book through Kanker Palace or local operators.' },
  ]},
  { name: 'Kondagaon', image: `${CTB}001a7d7f9.jpg`, desc: 'Tribal crafts capital and gateway to Bastar art', highlights: 'Bastar Crafts', coordinates: { lat: 19.5960, lng: 81.6615 }, category: 'heritage', touristPlaces: [
    { name: 'Crafts Bazaar Kondagaon', type: 'Cultural', image: `${WMF}5/5d/Dhokra_craft_Kondagaon_Bastar.jpg`, shortDesc: 'Vibrant market showcasing authentic Bastar Dhokra metalwork and woodcraft.', fullDesc: "Crafts capital of Bastar with Dhokra casting, iron craft, terracotta, and bamboo work.", timings: '9:00 AM – 6:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.5, tips: 'Buy directly from artisan workshops.' },
    { name: 'Keshkal Ghati', type: 'Valley', image: `${WM}8/83/Keshkal_Valley_Kondagaon.jpg/320px-Keshkal_Valley_Kondagaon.jpg`, shortDesc: 'Dramatic mountain valley with 7 hairpin bends and forest panoramas.', fullDesc: 'Most scenic mountain pass in Chhattisgarh, favourite for photographers and road trippers.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.6, tips: 'Stop at every viewpoint. Sunset view from top is stunning.' },
    { name: 'Bell Metal Village Dokra', type: 'Tribal Village', image: `${FALLBACK}`, shortDesc: 'Visit working Dhokra artisan families — watch the 4,000-year-old craft live.', fullDesc: 'Villages near Kondagaon where Dhokra craft families still practise the ancient lost-wax bronze casting technique.', timings: '9:00 AM – 5:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.7, tips: 'Purchase directly from the artisan for authenticity and fair price.' },
  ]},
  { name: 'Balod', image: `${CTB}2022110365.jpg`, desc: 'Hidden gems — sacred temples, forest waterfalls & serene rural landscapes', highlights: 'Tandula Valley & Hidden Temples', coordinates: { lat: 20.7326, lng: 81.2058 }, category: 'nature', touristPlaces: [
    { name: 'Ganga Maiya Temple, Jhalmala', type: 'Temple', image: `${WMF}4/45/Ganga_Maiya_Temple_Jhalmala_Balod.jpg`, shortDesc: 'Revered riverside goddess temple at Jhalmala — a sacred spot of deep local faith.', fullDesc: 'Ganga Maiya Temple at Jhalmala is a beloved riverside shrine dedicated to Ganga Maiya.', timings: '5:00 AM – 8:00 PM', entryFee: 'Free', bestTime: 'October to March; Chhath Puja', rating: 4.5, tips: 'Visit during Chhath Puja for a spectacular sunrise ritual.' },
    { name: 'Tandula Dam & Reservoir', type: 'Dam', image: `${WM}4/4c/Tandula_Dam_Balod.jpg/320px-Tandula_Dam_Balod.jpg`, shortDesc: 'Major scenic dam on the Tandula river with backwaters, migratory birds and boating.', fullDesc: 'Spread over 1,100 hectares, the Tandula reservoir is one of the most scenic dams in Chhattisgarh.', timings: 'Open all day', entryFee: 'Free', bestTime: 'November to February', rating: 4.3, tips: 'Bring binoculars for birdwatching.' },
    { name: 'Rural Haat (Weekly Tribal Market)', type: 'Rural Market', image: `${WMF}6/69/Weekly_haat_Chhattisgarh_tribal.jpg`, shortDesc: 'Vibrant weekly tribal market — a living, breathing cultural experience.', fullDesc: 'The rural haats of Balod district are among the most authentic cultural experiences in Chhattisgarh.', timings: 'Typically 6:00 AM – 2:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.6, tips: 'Arrive early. Try local forest honey and traditional snacks.' },
  ]},
  { name: 'Baloda Bazar', image: `${CTB}baloda-bazar-navapara.jpg`, desc: 'Turturiya pilgrimage site and ancient heritage', highlights: 'Turturiya Ashram', coordinates: { lat: 21.6558, lng: 82.1541 }, category: 'spiritual', touristPlaces: [
    { name: 'Turturiya Ashram', type: 'Religious', image: `${WMF}a/a4/Turturiya_Ashram_Balodabazar.jpg`, shortDesc: 'Sacred ashram believed to be the birthplace of sage Valmiki, author of Ramayana.', fullDesc: 'Deeply revered pilgrimage site on the Balm river with ancient temples and tranquil surroundings.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.4, tips: 'Visit during Ram Navami for special celebrations.' },
    { name: 'Giroudpuri Dham', type: 'Pilgrimage', image: `${WM}8/88/Giroudpuri_Dham_Chhattisgarh.jpg/320px-Giroudpuri_Dham_Chhattisgarh.jpg`, shortDesc: 'Sacred birth site of Guru Ghasidas — founder of the Satnami movement.', fullDesc: 'Major pilgrimage centre for the Satnami community. A beautiful ghat on the Mahanadi.', timings: '5:00 AM – 9:00 PM', entryFee: 'Free', bestTime: 'January (Maghi Purnima)', rating: 4.5, tips: 'Maghi Purnima fair draws hundreds of thousands of devotees.' },
  ]},
  { name: 'Balrampur', image: `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`, desc: 'Waterfalls, forests and tribal culture in north Chhattisgarh', highlights: 'Tatapani & Waterfalls', coordinates: { lat: 23.8330, lng: 83.6000 }, category: 'nature', touristPlaces: [
    { name: 'Tatapani Hot Springs Balrampur', type: 'Hot Springs', image: `${WMF}3/3d/Tatapani_hot_springs_Balrampur_Chhattisgarh.jpg`, shortDesc: 'Natural hot water springs revered for medicinal properties near Balrampur.', fullDesc: 'Geothermal springs on the Son River banks, believed to cure skin ailments.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.3, tips: 'Early morning dip is the local tradition.' },
    { name: 'Sanjay Gandhi National Park', type: 'Wildlife', image: `${WM}b/b3/Sanjay_National_Park_tiger.jpg/320px-Sanjay_National_Park_tiger.jpg`, shortDesc: 'Sprawling national park shared with Madhya Pradesh — tiger and elephant habitat.', fullDesc: 'Part of the Sanjay-Dubri Tiger Reserve, home to tigers, leopards, gaurs, and wild dogs.', timings: '6:00 AM – 5:00 PM', entryFee: '₹150', bestTime: 'November to April', rating: 4.5, tips: 'Jeep safaris must be booked at the gate.' },
    { name: 'Dipadih Temple Complex', type: 'Temple', image: `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`, shortDesc: 'Ruined medieval temple complex in the forests of Kusmi — an archaeological wonder.', fullDesc: 'Ancient temple ruins dating to the medieval period near Kusmi, Balrampur.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.4, tips: 'One of Chhattisgarh\'s best-kept secrets — hire a local guide.' },
  ]},
  { name: 'Bemetara', image: `${CTB}12th_century_Sita_Mandir_HIndu_temple_Deorbeeja,_Bemetara_district,_Chhattisgarh_-_2.jpg`, desc: 'Agricultural heartland with temples and rural heritage', highlights: 'Rural Heritage', coordinates: { lat: 21.7177, lng: 81.5376 }, category: 'heritage', touristPlaces: [
    { name: 'Navagarh Fort', type: 'Fort', image: `${WMF}d/d2/Navagarh_Fort_Bemetara_Chhattisgarh.jpg`, shortDesc: 'Ancient fort with historical significance in the Seonath river plains.', fullDesc: 'Fortification remnants from the medieval era with surrounding moat and ancient stonework.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 3.9, tips: 'Great for history buffs interested in lesser-known heritage.' },
    { name: 'Sita Mandir Deorbeeja', type: 'Temple', image: `${CTB}12th_century_Sita_Mandir_HIndu_temple_Deorbeeja,_Bemetara_district,_Chhattisgarh_-_2.jpg`, shortDesc: '12th-century Sita Mandir with exquisite stone carvings — a hidden archaeological gem.', fullDesc: 'Beautifully carved 12th-century temple at Deorbeeja dedicated to Sita.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.3, tips: 'Very few tourists visit — an authentic heritage experience.' },
  ]},
  { name: 'Bijapur', image: `${CTB}2024071917.png`, desc: 'Remote Bastar frontier with pristine rivers and tribal life', highlights: 'Indravati National Park', coordinates: { lat: 18.8328, lng: 80.8032 }, category: 'nature', touristPlaces: [
    { name: 'Indravati National Park', type: 'Wildlife', image: `${WM}d/d8/Indravati_river_Bijapur.jpg/320px-Indravati_river_Bijapur.jpg`, shortDesc: 'Remote tiger reserve on the banks of the Indravati river.', fullDesc: 'One of India\'s most remote parks, home to the wild buffalo, tigers, and barasingha deer.', timings: '6:00 AM – 5:00 PM', entryFee: '₹200', bestTime: 'November to May', rating: 4.6, tips: 'Advance booking essential. Very remote — plan logistics carefully.' },
    { name: 'Indravati River Camping', type: 'River Camp', image: `${FALLBACK}`, shortDesc: 'Riverside camping on the pristine Indravati — one of India\'s most remote experiences.', fullDesc: 'Camp beside the Indravati River in pristine natural surroundings.', timings: 'All day/night', entryFee: 'Guide fees apply', bestTime: 'October to March', rating: 4.5, tips: 'Only with authorised operators. Self-camping not permitted.' },
  ]},
  { name: 'Gaurela-Pendra-Marwahi', image: `${CTB}go7.webp`, desc: 'Newest district with forested hills and tribal beauty', highlights: 'Pendra Hills', coordinates: { lat: 22.7706, lng: 81.9622 }, category: 'nature', touristPlaces: [
    { name: 'Pendra Hill Station', type: 'Hill Station', image: `${WMF}9/97/Pendra_Hills_Chhattisgarh.jpg`, shortDesc: 'Cool hill station in the Maikal range with pleasant climate and forest walks.', fullDesc: 'Pleasant town on the Chhattisgarh-Madhya Pradesh border with scenic forested surroundings.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to February', rating: 4.2, tips: 'Great base for exploring Achanakmar sanctuary.' },
    { name: 'Doodh Dhara Waterfall', type: 'Waterfall', image: `${WMF}e/e3/Doodh_Dhara_Waterfall_Chhattisgarh.jpg`, shortDesc: 'Milky-white cascade through basalt rocks — a scenic hidden gem.', fullDesc: 'Milky waterfall pouring over black basalt, named for its milk-like appearance, set in dense forest.', timings: 'Open all day', entryFee: 'Free', bestTime: 'August to February', rating: 4.3, tips: 'Carry enough water and snacks for the trek.' },
  ]},
  { name: 'Janjgir-Champa', image: `${CTB}888053-tklnajnxuz-1534070188.jpg`, desc: 'Ancient Shaktipeeth and Mahanadi riverfront heritage', highlights: 'Shaktipeeth Temples', coordinates: { lat: 22.0177, lng: 82.5804 }, category: 'spiritual', touristPlaces: [
    { name: 'Vishnu Temple Janjgir', type: 'Temple', image: `${WM}a/ab/Janjgir_Vishnu_temple_Chhattisgarh.jpg/320px-Janjgir_Vishnu_temple_Chhattisgarh.jpg`, shortDesc: '12th-century unfinished Vishnu temple — an architectural marvel of the Kalachuri era.', fullDesc: 'Massive 12th-century Vishnu temple that was never completed, with extraordinary stone carvings.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.5, tips: 'The unfinished state makes it even more fascinating.' },
    { name: 'Champa Shivnath River Ghats', type: 'River', image: `${WMF}7/7c/Shivnath_river_ghat_Champa.jpg`, shortDesc: 'Serene ghats on the Shivnath river — ideal for sunrise and spiritual walks.', fullDesc: 'Beautiful bathing ghats lined with temples along the Shivnath river.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.0, tips: 'Sunrise aarti at the ghats is a serene experience.' },
  ]},
  { name: 'Khairagarh-Chhuikhadan-Gandai', image: `${CTB}rajnandgaon.png`, desc: 'Music heritage, hills and forest landscape', highlights: 'Music University', coordinates: { lat: 21.4167, lng: 80.9833 }, category: 'heritage', touristPlaces: [
    { name: 'Indira Kala Sangit Vishwavidyalaya', type: 'Cultural', image: `${WM}a/a8/Indira_Kala_Sangit_Vishwavidyalaya_Khairagarh.jpg/320px-Indira_Kala_Sangit_Vishwavidyalaya_Khairagarh.jpg`, shortDesc: 'Asia\'s first music and arts university inside a royal palace — a cultural gem.', fullDesc: 'Established in 1956, this unique university is housed in the historic Khairagarh palace.', timings: 'Campus tours by appointment', entryFee: 'Free', bestTime: 'October to March', rating: 4.6, tips: 'Attend an evening music or dance performance if possible.' },
    { name: 'Khairagarh Fort Palace', type: 'Heritage', image: `${WMF}6/6f/Khairagarh_Palace_Chhattisgarh.jpg`, shortDesc: 'Elegant royal palace now housing the famous music university.', fullDesc: 'Beautiful heritage palace of the Khairagarh princely state with gracious architecture.', timings: 'Open during university hours', entryFee: 'Free', bestTime: 'October to March', rating: 4.4, tips: 'The palace architecture blends multiple styles beautifully.' },
  ]},
  { name: 'Manendragarh-Chirmiri-Bharatpur', image: `${CTB}go7.webp`, desc: 'Coal-mining hill town with forests and scenic valleys', highlights: 'Hasdeo Valley', coordinates: { lat: 23.2000, lng: 82.2167 }, category: 'nature', touristPlaces: [
    { name: 'Hasdeo Valley Viewpoint', type: 'Viewpoint', image: `${WMF}b/b2/Hasdeo_Valley_Chhattisgarh.jpg`, shortDesc: 'Panoramic viewpoint over the vast Hasdeo river valley and forested hills.', fullDesc: 'Spectacular viewpoint offering sweeping views of the Hasdeo Valley with forested ridgelines.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.3, tips: 'Sunset views are magnificent.' },
    { name: 'Sonmuda Valley', type: 'Valley', image: `${WMF}7/72/Son_river_origin_Sonmuda_Chhattisgarh.jpg`, shortDesc: 'Origin point of the Son river — a sacred and scenic destination.', fullDesc: 'The Son River emerges from the Sonmuda plateau; the valley is peaceful and rarely visited.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.4, tips: 'Combine with nearby forest areas for a full day.' },
  ]},
  { name: 'Mohla-Manpur-Ambagarh Chowki', image: `${CTB}2019-08-25.jpg`, desc: 'Tribal heartland with forests, waterfalls and wildlife', highlights: 'Kanger Forest', coordinates: { lat: 20.8000, lng: 80.7000 }, category: 'nature', touristPlaces: [
    { name: 'Ambagarh Fort Ruins', type: 'Fort', image: `${WMF}c/ca/Ambagarh_Fort_Chhattisgarh.jpg`, shortDesc: 'Ancient fort ruins atop a hill with commanding views over the plains.', fullDesc: 'Ruins of a medieval hill fort offering panoramic views and historical significance.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.0, tips: 'Best explored in the morning for cool temperatures.' },
    { name: 'Mohla Waterfall', type: 'Waterfall', image: `${CTB}gangrel-bandh-image.webp`, shortDesc: 'Secluded forest waterfall popular with locals for weekend visits.', fullDesc: 'Tranquil waterfall in thick forest, accessible by a short forest path.', timings: 'Open all day', entryFee: 'Free', bestTime: 'August to January', rating: 4.1, tips: 'Carry packed lunch — no facilities nearby.' },
  ]},
  { name: 'Mungeli', image: `${CTB}mungeli-maon.jpg`, desc: 'Achanakmar gateway and ancient temple heritage', highlights: 'Tiger Reserve Gateway', coordinates: { lat: 22.0638, lng: 81.6859 }, category: 'nature', touristPlaces: [
    { name: 'Achanakmar Tiger Reserve Buffer Zone', type: 'Wildlife', image: `${WM}6/6e/Achanakmar_Wildlife_Sanctuary.jpg/320px-Achanakmar_Wildlife_Sanctuary.jpg`, shortDesc: 'Buffer zone entry point into the Achanakmar Tiger Reserve from Mungeli.', fullDesc: 'Excellent wildlife zone with tigers, leopards, wild dogs, and exceptional birdlife.', timings: '6:00 AM – 12:00 PM / 3:00 PM – 6:00 PM', entryFee: '₹150', bestTime: 'November to June', rating: 4.5, tips: 'Morning safaris have the highest tiger sighting probability.' },
    { name: 'Lormi Waterfall', type: 'Waterfall', image: `${WMF}2/29/Lormi_waterfall_Mungeli.jpg`, shortDesc: 'Beautiful waterfall near Lormi town on the edge of the Achanakmar forests.', fullDesc: 'Charming waterfall accessible from Lormi town, surrounded by bamboo and sal forest.', timings: 'Open all day', entryFee: 'Free', bestTime: 'August to February', rating: 4.2, tips: 'Great combination with an Achanakmar safari day.' },
    { name: 'Madmaheshwar Temple', type: 'Temple', image: `${WMF}6/6a/Madmaheshwar_temple_Mungeli_Chhattisgarh.jpg`, shortDesc: 'Ancient Shiva temple in the hills — a revered pilgrimage stop.', fullDesc: 'Ancient Shiva shrine in a scenic hilltop setting drawing pilgrims from across the region.', timings: '6:00 AM – 7:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.2, tips: 'Peaceful environment makes it ideal for meditation.' },
  ]},
  { name: 'Narayanpur', image: `${CTB}001a7d7f9.jpg`, desc: 'Remote Abujhmaad heartland with pristine forests', highlights: 'Abujhmaad Forest', coordinates: { lat: 19.6754, lng: 81.0512 }, category: 'nature', touristPlaces: [
    { name: 'Abujhmaad Forest', type: 'Forest', image: `${WMF}0/07/Abujhmaad_forest_Chhattisgarh_tribal.jpg`, shortDesc: 'One of India\'s last great unexplored forests — a biodiversity treasure.', fullDesc: 'Vast uncharted forest inhabited by the Abujhmaria tribe, rich in flora and fauna.', timings: 'Permit required from district collector', entryFee: 'Permit fees', bestTime: 'November to April', rating: 4.6, tips: 'Requires government permission. Accessible only with authorized guides.' },
    { name: 'Orchha Wildlife Sanctuary', type: 'Wildlife', image: `${WMF}1/1c/Orchha_Wildlife_Sanctuary_Narayanpur.jpg`, shortDesc: 'Dense forest sanctuary with tigers and rich biodiversity near Narayanpur.', fullDesc: 'Part of the Indravati corridor with tigers, leopards, gaurs, and hundreds of bird species.', timings: '6:00 AM – 5:00 PM', entryFee: '₹200', bestTime: 'November to May', rating: 4.5, tips: 'One of the most remote wildlife destinations in India.' },
    { name: 'Abujhmaria Village Visit', type: 'Tribal Village', image: `${FALLBACK}`, shortDesc: 'Authorised cultural visits to Abujhmaria tribal settlements.', fullDesc: 'With government permission, cultural visits to Abujhmaria villages offer an unparalleled window into indigenous communities.', timings: 'Daylight hours (with permit)', entryFee: 'Guide fees', bestTime: 'November to April', rating: 4.7, tips: 'Permission must be obtained from the Narayanpur District Collector well in advance.' },
  ]},
  { name: 'Raigarh', image: `${CTB}888053-tklnajnxuz-1534070188.jpg`, desc: 'Cultural capital of Chhattisgarh with Chakradhar arts', highlights: 'Kathak Heritage', coordinates: { lat: 21.8974, lng: 83.3950 }, category: 'heritage', touristPlaces: [
    { name: 'Raigarh Palace', type: 'Heritage', image: `${WMF}9/96/Raigarh_Palace_Chhattisgarh.jpg`, shortDesc: 'Historic palace of the Raigarh royal family — patrons of Kathak dance.', fullDesc: 'Royal palace that was a hub of classical music and Kathak dance under Raja Chakradhar Singh.', timings: 'By appointment', entryFee: 'Nominal', bestTime: 'October to March', rating: 4.3, tips: 'Chakradhar Samaroh in October is a world-class classical arts festival.' },
    { name: 'Gomarda Wildlife Sanctuary', type: 'Wildlife', image: `${WMF}8/82/Gomarda_Wildlife_Sanctuary_Raigarh.jpg`, shortDesc: 'Lush sanctuary with tigers, leopards and diverse wildlife near Raigarh.', fullDesc: '277 sq km sanctuary with tigers, leopards, bison, and over 200 bird species.', timings: '6:00 AM – 5:00 PM', entryFee: '₹150', bestTime: 'November to May', rating: 4.4, tips: 'Under-visited and pristine — a hidden gem.' },
    { name: 'Singhpur Cave Art', type: 'Rock Art', image: `${WM}0/09/Singhpur_Rock_Art_Chhattisgarh.jpg/320px-Singhpur_Rock_Art_Chhattisgarh.jpg`, shortDesc: 'Ancient rock art caves with prehistoric paintings and carvings.', fullDesc: 'Prehistoric rock shelter paintings near Singhpur — believed to be 10,000 years old.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.5, tips: 'Hire a knowledgeable local guide to interpret the paintings.' },
  ]},
  { name: 'Sakti', image: `${CTB}888053-tklnajnxuz-1534070188.jpg`, desc: 'Newly formed district with temples and rural heritage', highlights: 'Janjgir Temples', coordinates: { lat: 22.0349, lng: 82.9568 }, category: 'heritage', touristPlaces: [
    { name: 'Chandrahasini Devi Temple', type: 'Temple', image: `${WM}5/5c/Chandrahasini_Devi_Temple_Chandrapur.jpg/320px-Chandrahasini_Devi_Temple_Chandrapur.jpg`, shortDesc: 'Famous Shakti shrine on the banks of the Mahanadi river.', fullDesc: 'Highly revered goddess temple at the confluence of Mahanadi, Jonk, and Lath rivers.', timings: '6:00 AM – 8:00 PM', entryFee: 'Free', bestTime: 'Navratri; October to March', rating: 4.6, tips: 'Navratri celebrations are spectacular.' },
    { name: 'Mahanadi River Banks', type: 'River', image: `${WM}c/c4/Mahanadi_river_Chhattisgarh.jpg/320px-Mahanadi_river_Chhattisgarh.jpg`, shortDesc: 'Peaceful Mahanadi riverfront for sunsets, fishing and picnics.', fullDesc: 'Beautiful sandy banks of the Mahanadi River ideal for relaxed evenings and fishing.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.0, tips: 'Evening visits during sunset are magical.' },
  ]},
  { name: 'Sarangarh-Bilaigarh', image: `${CTB}mahasamund-2.jpg`, desc: 'Royal heritage palaces and riverside temples', highlights: 'Sarangarh Palace', coordinates: { lat: 21.5869, lng: 83.0729 }, category: 'heritage', touristPlaces: [
    { name: 'Sarangarh Palace', type: 'Heritage', image: `${WMF}b/b5/Sarangarh_Palace_Chhattisgarh.jpg`, shortDesc: 'Graceful palace of the Sarangarh princely state — a lesser-known royal gem.', fullDesc: 'Beautiful palace with Chhattisgarhi architectural style and rich royal history.', timings: 'Open all day', entryFee: 'Free', bestTime: 'October to March', rating: 4.3, tips: 'Interact with the local community to learn about the royal heritage.' },
    { name: 'Bilaigarh Temple Complex', type: 'Temple', image: `${WMF}4/41/Bilaigarh_temple_Chhattisgarh.jpg`, shortDesc: 'Ancient cluster of temples in Bilaigarh town on the Mahanadi.', fullDesc: 'Group of traditional temples with beautiful stone carvings along the Mahanadi riverbank.', timings: '6:00 AM – 7:00 PM', entryFee: 'Free', bestTime: 'October to March', rating: 4.1, tips: 'The riverside setting makes for beautiful photographs.' },
  ]},
  { name: 'Sukma', image: `${CTB}001a7d7f9.jpg`, desc: 'Remote Bastar with Sabari river and tribal heritage', highlights: 'Sabari River', coordinates: { lat: 18.3918, lng: 81.6634 }, category: 'nature', touristPlaces: [
    { name: 'Sabari River Tribal Trail', type: 'River', image: `${WMF}5/55/Sabari_river_Sukma_Chhattisgarh.jpg`, shortDesc: 'Remote tribal rivertrail along the pristine Sabari (Sileru) river valley.', fullDesc: 'The Sabari River forms the border with Andhra Pradesh; the tribal villages and forests are extraordinary.', timings: 'Best with local tribal guide', entryFee: 'Nominal guide fee', bestTime: 'October to March', rating: 4.5, tips: 'One of India\'s most authentic tribal experience destinations.' },
    { name: 'Minpa Waterfall', type: 'Waterfall', image: `${CTB}gangrel-bandh-image.webp`, shortDesc: 'Stunning remote waterfall in the Sukma forests — a hidden natural jewel.', fullDesc: 'Rarely visited waterfall in pristine Sukma forest, best experienced with a tribal guide.', timings: 'Open all day', entryFee: 'Free', bestTime: 'September to February', rating: 4.4, tips: 'Requires a full day trip with a local guide.' },
    { name: 'Dornapal Tribal Village', type: 'Tribal Village', image: `${FALLBACK}`, shortDesc: 'Authentic Muria Gond tribal settlement with traditional lifestyle and crafts.', fullDesc: 'One of the more accessible Muria Gond villages, where traditional lifestyle and Gond art traditions are still alive.', timings: 'Daylight hours', entryFee: 'Nominal guide fee', bestTime: 'October to March', rating: 4.5, tips: 'Always go with an authorised cultural guide — never unannounced.' },
  ]},
  { name: 'Surajpur', image: `${CTB}Ruined_temple_near_Rani_Talab,_Dipadih_Kusmi_Dipadih_Chattisgarh_036.jpg`, desc: 'North Chhattisgarh forests, rivers and wildlife', highlights: 'Tamor Pingla', coordinates: { lat: 23.2248, lng: 82.8694 }, category: 'nature', touristPlaces: [
    { name: 'Tamor Pingla Wildlife Sanctuary', type: 'Wildlife', image: `${WMF}9/9c/Tamor_Pingla_wildlife_Surajpur.jpg`, shortDesc: 'Remote sanctuary home to elephants, tigers, and leopards.', fullDesc: 'Part of the Chhattisgarh elephant corridor; pristine forests with tiger and elephant populations.', timings: '6:00 AM – 5:00 PM', entryFee: '₹150', bestTime: 'November to May', rating: 4.4, tips: 'Excellent for elephant sightings in the dry season.' },
    { name: 'Chhatauni Waterfall', type: 'Waterfall', image: `${WMF}1/1a/Chhatauni_waterfall_Surajpur.jpg`, shortDesc: 'Beautiful seasonal waterfall in the Surajpur forests — a local favourite.', fullDesc: 'Attractive waterfall flowing through forest rocks, popular for day excursions from Surajpur town.', timings: 'Open all day', entryFee: 'Free', bestTime: 'August to January', rating: 4.2, tips: 'Visit shortly after monsoon for maximum flow.' },
  ]},
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function AITripPlanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlaceDetail, setSelectedPlaceDetail] = useState(null);
  const searchRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const [planningStep, setPlanningStep] = useState(1);
  const [startingDistrict, setStartingDistrict] = useState('');
  const [districtSearch, setDistrictSearch] = useState('');
  const [tripPreferences, setTripPreferences] = useState({ interests: [], pace: '', budget: '', groupType: '' });
  const [tripDuration, setTripDuration] = useState(3);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tripRecommendations, setTripRecommendations] = useState(null);
  const [viewingDistrictPlaces, setViewingDistrictPlaces] = useState(null);
  const districtColorIndexRef = useRef({});
  const districtColorCounterRef = useRef(0);

  // ── STEP 2: Lightbox state ──────────────────────────────────────────────────
  const [lightbox, setLightbox] = useState(null);

  // ── STEP 3: Saved itinerary state ───────────────────────────────────────────
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [savedShareUrl, setSavedShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [savedTrip, setSavedTrip] = useState(null);
  const [savedTripLoading, setSavedTripLoading] = useState(false);
  const [savedTripError, setSavedTripError] = useState('');
  const [myTripsOpen, setMyTripsOpen] = useState(false);
  const [myTrips, setMyTrips] = useState([]);
  const [myTripsLoading, setMyTripsLoading] = useState(false);
  const [myTripsError, setMyTripsError] = useState('');

  const districts = ALL_DISTRICTS;

  function getDistrictColor(districtName) {
    if (districtColorIndexRef.current[districtName] === undefined) {
      districtColorIndexRef.current[districtName] = districtColorCounterRef.current % DISTRICT_PALETTE.length;
      districtColorCounterRef.current++;
    }
    return DISTRICT_PALETTE[districtColorIndexRef.current[districtName]];
  }

  const heroImages = [
    `${CTB}001a7d7f9.jpg`,
    `${CTB}Kabir%20Dham-Madwa%20MahalBhoramdeo36a52e.jpg`,
    `${CTB}mahasamund-2.jpg`,
    `${CTB}0011122_Dantewada_Danteswari_Mata_Mandir_Chattisgarh_007.jpg`,
    `${CTB}gangrel-bandh-image.webp`,
    `${CTB}rajnandgaon.png`,
  ];

  const interestOptions = [
    { id: 'nature', label: 'Nature & Wildlife', icon: TreePine, color: 'green' },
    { id: 'spiritual', label: 'Spiritual & Temples', icon: Sun, color: 'purple' },
    { id: 'heritage', label: 'Heritage & Culture', icon: MapPin, color: 'blue' },
    { id: 'adventure', label: 'Adventure', icon: Mountain, color: 'red' },
    { id: 'photography', label: 'Photography', icon: Camera, color: 'yellow' },
    { id: 'tribal', label: 'Tribal Tourism', icon: Users, color: 'amber' },
    { id: 'ecotourism', label: 'Eco Tourism', icon: TreePine, color: 'teal' },
    { id: 'localculture', label: 'Local Culture', icon: Sparkles, color: 'violet' },
  ];

  const paceOptions = [
    { id: 'relaxed', label: 'Relaxed', desc: '2 places per day' },
    { id: 'moderate', label: 'Moderate', desc: '3 places per day' },
    { id: 'packed', label: 'Packed', desc: '4 places per day' },
  ];

  const budgetOptions = [
    { id: 'budget', label: 'Budget', desc: '₹2,000-4,000/day', icon: '💰' },
    { id: 'moderate', label: 'Moderate', desc: '₹4,000-8,000/day', icon: '💰💰' },
    { id: 'luxury', label: 'Luxury', desc: '₹8,000+/day', icon: '💰💰💰' },
  ];

  const groupOptions = [
    { id: 'solo', label: 'Solo Traveler', icon: '🧳' },
    { id: 'couple', label: 'Couple', icon: '❤️' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { id: 'friends', label: 'Friends Group', icon: '👥' },
  ];

  const performSearch = (query) => {
    if (!query.trim()) { setSearchResults([]); return; }
    const lq = query.toLowerCase();
    const results = [];
    districts.forEach(d => {
      if (d.name.toLowerCase().includes(lq) || d.desc.toLowerCase().includes(lq))
        results.push({ type: 'district', data: d, matchedText: d.name });
      d.touristPlaces.forEach(p => {
        if (p.name.toLowerCase().includes(lq) || p.type.toLowerCase().includes(lq) || (p.shortDesc && p.shortDesc.toLowerCase().includes(lq)))
          results.push({ type: 'place', data: p, district: d, matchedText: p.name });
      });
    });
    setSearchResults(results.slice(0, 10));
  };

  const toggleInterest = (interest) => {
    setTripPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) ? prev.interests.filter(i => i !== interest) : [...prev.interests, interest]
    }));
  };

  const generateTripRecommendations = () => {
    setIsAnalyzing(true);
    setPlanningStep(4);
    districtColorIndexRef.current = {};
    districtColorCounterRef.current = 0;
    setTimeout(() => {
      const { interests, pace, budget, groupType } = tripPreferences;
      const itinerary = generateGeoItinerary(districts, tripDuration, interests, pace, startingDistrict);
      const baseRate = budget === 'budget' ? 3000 : budget === 'moderate' ? 6000 : 10000;
      const mult = groupType === 'family' ? 3 : groupType === 'couple' ? 2 : groupType === 'friends' ? 4 : 1;
      const estimatedCost = {
        total: baseRate * tripDuration * mult,
        perDay: baseRate,
        breakdown: { accommodation: baseRate * 0.4 * tripDuration, food: baseRate * 0.3 * tripDuration, transport: baseRate * 0.2 * tripDuration, activities: baseRate * 0.1 * tripDuration }
      };
      const recs = [];
      if (interests.includes('nature') || interests.includes('ecotourism')) recs.push({ title: 'Book Wildlife Safaris in Advance', reason: 'Limited daily permits available at most sanctuaries', icon: '🦁' });
      if (interests.includes('tribal') || interests.includes('localculture')) recs.push({ title: 'Always Hire Local Tribal Guides', reason: 'Cultural accuracy, community income, and access to hidden sites', icon: '🏹' });
      if (interests.includes('tribal')) recs.push({ title: 'Buy Crafts Directly from Artisans', reason: 'Dhokra, Gond art and bamboo work purchased at source supports families', icon: '🎨' });
      if (interests.includes('ecotourism')) recs.push({ title: 'Stay in Community Homestays', reason: '40% of revenue goes to village conservation funds', icon: '🏡' });
      if (budget === 'budget') recs.push({ title: 'Stay in Government Rest Houses', reason: 'Save 40% on accommodation costs', icon: '💰' });
      if (interests.includes('spiritual')) recs.push({ title: 'Visit Temples at Early Morning', reason: 'Peaceful darshan and avoid large crowds', icon: '🛕' });
      recs.push({ title: 'Carry Cash in Remote Areas', reason: 'ATMs are sparse in forest and tribal zones', icon: '💵' });
      const responsibleTips = [];
      if (interests.includes('tribal') || interests.includes('localculture')) {
        responsibleTips.push({ icon: '📸', tip: 'Always ask permission before photographing tribal people, rituals, or sacred spaces' });
        responsibleTips.push({ icon: '🤝', tip: 'Engage respectfully — learn 2–3 words of the local tribal language before visiting' });
        responsibleTips.push({ icon: '💰', tip: 'Pay fair prices for crafts and experiences — aggressive bargaining harms livelihoods' });
      }
      if (interests.includes('ecotourism') || interests.includes('nature')) {
        responsibleTips.push({ icon: '🌿', tip: 'Zero waste in forests — every piece of rubbish must be carried back out' });
        responsibleTips.push({ icon: '🔇', tip: 'Silence is a virtue in forest zones — wildlife thrives when visitors are quiet' });
      }
      const districtsCovered = new Set(itinerary.flatMap(d => d.uniqueDistricts));
      const startDist = districts.find(d => d.name === startingDistrict);
      const startPlacesDay1 = itinerary[0]?.activities.filter(a => a.districtName === startingDistrict).length || 0;
      const insights = [
        `Your journey starts in ${startingDistrict}${startDist ? ` — ${startDist.highlights}` : ''}. Day 1 covers ${startPlacesDay1} place${startPlacesDay1 !== 1 ? 's' : ''} right in your starting district.`,
        `The route expands outward from ${startingDistrict} each day, reaching ${districtsCovered.size} district${districtsCovered.size !== 1 ? 's' : ''} over ${tripDuration} day${tripDuration !== 1 ? 's' : ''} — minimising unnecessary backtracking.`,
        `With a ${pace} pace (${SLOTS_PER_DAY[pace]} places/day), you'll spend quality time at each stop rather than rushing between them.`,
        ...(interests.includes('tribal') ? [`Tribal-interest scoring prioritises Dhokra workshops, tribal trails, and community markets in Bastar, Kondagaon, and Surguja districts.`] : []),
        ...(interests.includes('ecotourism') ? [`Eco-tourism routing favours forest lodges, nature camps, and wildlife sanctuaries with community conservation programmes.`] : []),
        `October–March is peak season for all activities in Chhattisgarh — roads are dry, wildlife is active, and temperatures are comfortable.`,
      ];
      setTripRecommendations({ itinerary, estimatedCost, recommendations: recs, responsibleTips, insights });
      setIsAnalyzing(false);
      setPlanningStep(5);
    }, 2200);
  };

  useEffect(() => {
    const handle = (e) => { if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearchResults(false); };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  // ── STEP 3: Load a shared itinerary from ?it=<id> in the URL ────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('it');
    if (!id) return;
    setSavedTripLoading(true);
    setSavedTripError('');
    fetchItinerary(id)
      .then((data) => { setSavedTrip(data); setSavedTripLoading(false); })
      .catch((err) => { setSavedTripError(err.message || 'Could not load the saved itinerary.'); setSavedTripLoading(false); });
  }, []);

  const buildShareUrl = (id) => `${window.location.origin}${window.location.pathname}?it=${id}`;

  const copyShareLink = () => {
    if (!savedShareUrl) return;
    navigator.clipboard.writeText(savedShareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSaveItinerary = async () => {
    if (!saveName.trim() || !tripRecommendations) return;
    const { interests, pace, budget, groupType } = tripPreferences;
    setSaving(true);
    setSaveError('');
    try {
      const data = await saveItinerary({
        name: saveName.trim(),
        starting_district: startingDistrict,
        days: tripDuration,
        pace,
        budget,
        group_type: groupType,
        interests,
        itinerary: tripRecommendations,
      });
      const url = buildShareUrl(data.id);
      setSavedShareUrl(url);
      setSavedTrip({ ...data, url });
      setSaving(false);
    } catch (err) {
      setSaveError(isSupabaseConfigured ? (err.message || 'Could not save the itinerary.') : 'Database not configured. Add your Supabase URL and anon key to continue.');
      setSaving(false);
    }
  };

  const loadMyTrips = async () => {
    setMyTripsOpen(true);
    setMyTripsLoading(true);
    setMyTripsError('');
    try {
      const rows = await listItineraries(50);
      setMyTrips(Array.isArray(rows) ? rows : []);
    } catch (err) {
      setMyTripsError(err.message || 'Could not load saved itineraries.');
    } finally {
      setMyTripsLoading(false);
    }
  };

  const openSavedTrip = async (id) => {
    setMyTripsOpen(false);
    setSavedTripLoading(true);
    setSavedTripError('');
    try {
      const data = await fetchItinerary(id);
      if (data && data.itinerary) {
        setSavedTrip({ ...data, url: buildShareUrl(data.id) });
      } else {
        setSavedTripError('Itinerary not found.');
      }
    } catch (err) {
      setSavedTripError(err.message || 'Could not load itinerary.');
    } finally {
      setSavedTripLoading(false);
    }
  };

  const handleDeleteTrip = async (id) => {
    if (!window.confirm('Delete this saved itinerary? This cannot be undone.')) return;
    try {
      await deleteItinerary(id);
      setMyTrips(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      alert(err.message || 'Could not delete itinerary.');
    }
  };

  const TRIBAL_DISTRICTS = new Set(['Bastar','Kondagaon','Narayanpur','Dantewada','Kanker','Sukma','Bijapur','Surguja','Jashpur','Korea','Kabirdham','Raigarh']);
  const filteredDestinations = selectedCategory === 'all' ? districts
    : selectedCategory === 'tribal' ? districts.filter(d => TRIBAL_DISTRICTS.has(d.name))
    : districts.filter(d => d.category === selectedCategory);

  const getRatingStars = (rating) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} size={12} className={i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : i < rating ? 'text-yellow-400 fill-yellow-200' : 'text-gray-300'} />
  ));

  const ImgWithFallback = ({ src, alt, className, districtName }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [attempt, setAttempt] = useState(0);
    const handleError = () => {
      if (attempt === 0) { setAttempt(1); setImgSrc((districtName && DISTRICT_FALLBACKS[districtName]) || FALLBACK); }
      else if (attempt === 1) { setAttempt(2); setImgSrc(FALLBACK); }
    };
    return <img src={imgSrc} alt={alt} className={className} onError={handleError} />;
  };

  const TYPE_COLORS = {
    nature: 'bg-green-100 text-green-700', spiritual: 'bg-purple-100 text-purple-700',
    heritage: 'bg-blue-100 text-blue-700', adventure: 'bg-red-100 text-red-700',
    culture: 'bg-gray-100 text-gray-700', tribal: 'bg-amber-100 text-amber-800', eco: 'bg-teal-100 text-teal-700',
  };

  const DistanceConnector = ({ km, driveLabel }) => {
    const col = distanceColor(km);
    return (
      <div className="flex items-center gap-2 px-4 py-1.5">
        <div className="flex-1 border-t border-dashed border-gray-200" />
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap" style={{ background: col.bg, color: col.text, borderColor: col.border }}>
          <Navigation size={10} />{km} km · {driveLabel}
        </div>
        <div className="flex-1 border-t border-dashed border-gray-200" />
      </div>
    );
  };

  const InterDistrictConnector = ({ km, driveLabel, toDistrict }) => {
    const col = distanceColor(km);
    return (
      <div className="flex items-center gap-2 mx-5 my-2">
        <div className="flex-1 border-t-2 border-dashed border-gray-300" />
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border whitespace-nowrap shadow-sm" style={{ background: col.bg, color: col.text, borderColor: col.border }}>
          <Navigation size={11} />{km} km to {toDistrict} · {driveLabel}
        </div>
        <div className="flex-1 border-t-2 border-dashed border-gray-300" />
      </div>
    );
  };

  const DistrictCard = ({ districtName, places, nextDistrictName, lastPlaceDistToNext, lastPlaceDriveToNext }) => {
    const col = getDistrictColor(districtName);
    return (
      <div className="mb-0">
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl mb-0" style={{ background: col.bg, border: `1.5px solid ${col.border}` }}>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: col.dot }} />
            <span className="font-bold text-sm" style={{ color: col.text }}>{districtName} District</span>
          </div>
          <span className="text-xs font-medium" style={{ color: col.text }}>{places.length} {places.length === 1 ? 'place' : 'places'}</span>
        </div>
        <div className="border rounded-xl overflow-hidden mt-1.5" style={{ borderColor: col.border }}>
          {places.map((act, i) => (
            <React.Fragment key={i}>
              <div className="activity-row flex gap-3 items-start px-4 py-3 bg-white">
                <div className="bg-orange-100 text-orange-700 px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap flex-shrink-0 mt-0.5">{act.time}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm leading-snug">{act.title}</p>
                  <div className="flex items-center flex-wrap gap-1.5 mt-0.5">
                    <span className="text-xs text-gray-400">{act.duration}</span>
                    {act.rating && (<><span className="text-xs text-gray-300">·</span><span className="text-xs text-yellow-600 font-medium">★ {act.rating}</span></>)}
                    {act.entryFee && (<><span className="text-xs text-gray-300">·</span><span className="text-xs text-gray-400">🎟 {act.entryFee}</span></>)}
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${TYPE_COLORS[act.type] || 'bg-gray-100 text-gray-700'}`}>{act.type}</span>
              </div>
              {i < places.length - 1 && act.distToNextKm != null && (<DistanceConnector km={act.distToNextKm} driveLabel={act.driveToNext} />)}
            </React.Fragment>
          ))}
        </div>
        {nextDistrictName && lastPlaceDistToNext != null && (<InterDistrictConnector km={lastPlaceDistToNext} driveLabel={lastPlaceDriveToNext} toDistrict={nextDistrictName} />)}
      </div>
    );
  };

  const DayCard = ({ day }) => {
    const groups = groupActivitiesByDistrict(day.activities);
    return (
      <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden day-card">
        <div className="bg-gradient-to-r from-orange-50 to-red-50 px-5 py-3 flex items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-lg text-orange-700">{day.title}</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {day.uniqueDistricts.map(d => (
                <span key={d} className="text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1" style={{ background: getDistrictColor(d).bg, color: getDistrictColor(d).text, border: `1px solid ${getDistrictColor(d).border}` }}>
                  <MapPin size={10} />{d}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-xs text-gray-500">{day.activities.length} stops</span>
            {day.totalDayKm > 0 && (<span className="flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full"><Navigation size={10} />{day.totalDayKm} km total</span>)}
          </div>
        </div>
        <div className="p-4 space-y-1">
          {groups.map((group, gi) => {
            const nextGroup = groups[gi + 1];
            const lastPlace = group.places[group.places.length - 1];
            return (<DistrictCard key={group.district} districtName={group.district} places={group.places} nextDistrictName={nextGroup ? nextGroup.district : null} lastPlaceDistToNext={nextGroup ? lastPlace.distToNextKm : null} lastPlaceDriveToNext={nextGroup ? lastPlace.driveToNext : null} />);
          })}
        </div>
      </div>
    );
  };

  const totalPlaces = districts.reduce((s, d) => s + d.touristPlaces.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
        .fade-in{animation:fadeIn .6s ease-out}
        .slide-up{animation:slideUp .5s ease-out}
        .analyzing-pulse{animation:pulse 1.5s ease-in-out infinite}
        .card-hover{transition:all .3s ease}
        .card-hover:hover{transform:translateY(-8px);box-shadow:0 20px 40px rgba(0,0,0,.15)}
        .gradient-text{background:linear-gradient(135deg,#f97316,#dc2626);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .detail-modal{animation:slideUp .4s ease-out}
        .day-card{border-left:4px solid #f97316}
        .activity-row{transition:background .2s}
        .activity-row:hover{background:#fff7ed}
      `}</style>

      {/* ── NAV ── */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center"><MapPin className="text-white" size={24} /></div>
            <span className={`font-bold text-xl ${scrolled ? 'text-gray-800' : 'text-white'}`}>Incredible Chhattisgarh</span>
          </div>
          <div className="hidden md:flex space-x-8">
            {[{ label: 'Destinations', anchor: '#destinations' }, { label: 'Tribal & Eco', anchor: '#tribal-eco' }, { label: 'Plan Trip', anchor: null }].map((item, i) => (
              <a key={i} href={item.anchor || '#'} onClick={e => { if (!item.anchor) { e.preventDefault(); setShowTripPlanner(true); } else { e.preventDefault(); document.getElementById(item.anchor.slice(1))?.scrollIntoView({ behavior: 'smooth' }); } }}
                className={`font-medium hover:text-orange-500 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}>{item.label}</a>
            ))}
          </div>
          <button onClick={() => setShowTripPlanner(true)} className={`hidden md:flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all ${scrolled ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg' : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-md'}`}>
            <Sparkles size={20} />Plan My Trip
          </button>
          <button onClick={loadMyTrips} className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-semibold transition-all border ${scrolled ? 'border-orange-200 text-orange-700 hover:bg-orange-50' : 'border-white/30 text-white hover:bg-white/10 backdrop-blur-md'}`}>
            <Bookmark size={18} />My Trips
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-800' : 'text-white'}`}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white shadow-lg mt-2 py-4 px-4 space-y-3">
            {['Destinations', 'Plan Trip'].map(item => (
              <a key={item} href="#" onClick={e => { e.preventDefault(); if (item === 'Plan Trip') setShowTripPlanner(true); setMenuOpen(false); }} className="block py-2 text-gray-700 hover:text-orange-500 font-medium">{item}</a>
            ))}
            <button onClick={() => { loadMyTrips(); setMenuOpen(false); }} className="flex items-center gap-2 w-full text-left py-2 text-gray-700 hover:text-orange-500 font-medium"><Bookmark size={18} />My Trips</button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <div className="relative h-screen overflow-hidden">
        {heroImages.map((img, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <ImgWithFallback src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="text-white px-4 fade-in w-full max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold mb-4">Chhattisgarh</h1>
            <p className="text-2xl md:text-4xl mb-8 font-light">Unravel the mesmerising beauty</p>
            <div className="mb-8 relative" ref={searchRef}>
              <div className="relative max-w-3xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                <input type="text" value={searchQuery} onChange={e => { setSearchQuery(e.target.value); performSearch(e.target.value); setShowSearchResults(true); }}
                  onFocus={() => setShowSearchResults(true)}
                  placeholder={`Search ${totalPlaces}+ places across all 33 districts...`}
                  className="w-full pl-14 pr-4 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-2xl" />
                {searchQuery && <button onClick={() => { setSearchQuery(''); setSearchResults([]); setShowSearchResults(false); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"><X size={20} /></button>}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-96 overflow-y-auto z-50">
                    {searchResults.map((r, i) => (
                      <button key={i} onClick={() => { if (r.type === 'district') setViewingDistrictPlaces(r.data); else setViewingDistrictPlaces(r.district); setShowSearchResults(false); setSearchQuery(''); }}
                        className="w-full px-6 py-4 text-left hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <ImgWithFallback src={r.data.image} alt="" className="w-full h-full object-cover" districtName={r.type === 'district' ? r.data.name : r.district?.name} />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-800">{r.data.name}</p>
                            <p className="text-sm text-gray-600">{r.type === 'district' ? r.data.desc : `${r.data.type} · ${r.district?.name} District`}</p>
                          </div>
                          <ChevronRight className="text-gray-400" size={20} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={() => setShowTripPlanner(true)} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2">
                <Sparkles size={24} />Plan My Route
              </button>
              <button onClick={() => document.getElementById('tribal-eco')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-amber-500/90 backdrop-blur-md rounded-full font-semibold hover:bg-amber-500 transition-all flex items-center gap-2">
                🏹 Tribal & Eco
              </button>
              <button onClick={() => window.scrollTo({ top: document.getElementById('destinations')?.offsetTop || 0, behavior: 'smooth' })} className="px-8 py-4 bg-white/20 backdrop-blur-md rounded-full font-semibold hover:bg-white/30 transition-all">
                Explore All 33 Districts
              </button>
            </div>
          </div>
        </div>
        <button onClick={() => setCurrentSlide((currentSlide - 1 + heroImages.length) % heroImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30"><ChevronLeft className="text-white" size={28} /></button>
        <button onClick={() => setCurrentSlide((currentSlide + 1) % heroImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/30"><ChevronRight className="text-white" size={28} /></button>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {heroImages.map((_, idx) => <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-white w-12' : 'bg-white/50'}`} />)}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 py-6">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          <div><div className="text-3xl font-bold">33</div><div className="text-sm opacity-90">Districts</div></div>
          <div><div className="text-3xl font-bold">{totalPlaces}+</div><div className="text-sm opacity-90">Tourist Places</div></div>
          <div><div className="text-3xl font-bold">44</div><div className="text-sm opacity-90">Wildlife Sanctuaries</div></div>
          <div><div className="text-3xl font-bold">5</div><div className="text-sm opacity-90">National Parks</div></div>
        </div>
      </div>

      {/* ── TRIBAL ECO SECTION ── */}
      <div id="tribal-eco" className="py-20 bg-gradient-to-b from-amber-50 via-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 text-sm font-bold px-4 py-1.5 rounded-full mb-4 border border-amber-200"><span>🏹</span> Authentic Experiences</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4"><span className="gradient-text">Tribal · Eco · Culture</span></h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Chhattisgarh is home to 42 tribal communities, ancient living traditions, and some of India's most pristine forests.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { icon: '🏹', title: 'Tribal Tourism', bg: 'from-amber-500 to-orange-500', lightBg: 'bg-amber-50', border: 'border-amber-200', textColor: 'text-amber-800', stats: '42 tribes', desc: 'Chhattisgarh is one of India\'s richest tribal homelands. Gondi, Maria, Muria, Halba and Bhatra communities have preserved art forms, rituals and ways of life for thousands of years.', highlights: ['Dhokra metal casting', 'Gond & Warli painting', 'Bastar Dussehra festival', 'Tribal weekly haats', 'Abujhmaad forest trail'] },
              { icon: '🌿', title: 'Eco Tourism', bg: 'from-green-500 to-teal-600', lightBg: 'bg-green-50', border: 'border-green-200', textColor: 'text-green-800', stats: '44 sanctuaries', desc: 'Forest cover, tiger reserves, elephant corridors, rare caves and pristine rivers make Chhattisgarh a world-class eco-tourism destination.', highlights: ['Tiger & leopard safaris', 'Kanger Valley caves', 'Achanakmar forest stays', 'Bird-watching circuits', 'River camping'] },
              { icon: '🎭', title: 'Local Culture', bg: 'from-violet-500 to-purple-600', lightBg: 'bg-violet-50', border: 'border-violet-200', textColor: 'text-violet-800', stats: '36 folk art forms', desc: 'Panthi dance, Raut Nacha, Karma festival, Pandwani music — Chhattisgarh\'s performing arts are a direct window into one of India\'s most distinctive cultural landscapes.', highlights: ['Panthi & Raut Nacha dance', 'Pandwani folk music', 'Karma & Hareli festivals', 'Village temple fairs', 'Traditional cuisine trails'] },
            ].map(pillar => (
              <div key={pillar.title} className={`${pillar.lightBg} border ${pillar.border} rounded-2xl overflow-hidden`}>
                <div className={`bg-gradient-to-r ${pillar.bg} p-6 text-white`}>
                  <div className="text-4xl mb-2">{pillar.icon}</div>
                  <h3 className="text-2xl font-bold">{pillar.title}</h3>
                  <div className="text-white/80 text-sm font-semibold mt-1">{pillar.stats}</div>
                </div>
                <div className="p-5">
                  <p className={`text-sm ${pillar.textColor} leading-relaxed mb-4`}>{pillar.desc}</p>
                  <ul className="space-y-1.5">{pillar.highlights.map(h => (<li key={h} className="flex items-center gap-2 text-sm text-gray-700"><Check size={14} className={pillar.textColor} />{h}</li>))}</ul>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Curated Experiences</h3>
            <p className="text-gray-500 text-sm mb-6">Hand-picked immersive encounters — each one puts money directly into local community hands</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {TRIBAL_ECO_EXPERIENCES.map(exp => (
                <div key={exp.id} className="bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-gray-100">
                  <div className="relative h-40 overflow-hidden">
                    <ImgWithFallback src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${exp.category === 'tribal' ? 'bg-amber-400 text-amber-900' : exp.category === 'ecotourism' ? 'bg-green-400 text-green-900' : 'bg-violet-400 text-violet-900'}`}>
                      {exp.icon} {exp.category === 'tribal' ? 'Tribal' : exp.category === 'ecotourism' ? 'Eco' : 'Culture'}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-sm leading-tight">{exp.title}</p>
                      <p className="text-white/70 text-xs">{exp.district} District</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3">{exp.description}</p>
                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <span className="text-xs font-semibold text-gray-600 flex items-center gap-1"><Clock size={11} />{exp.duration}</span>
                      <span className="text-xs font-semibold text-gray-600">{exp.bestFor}</span>
                    </div>
                    <div className="bg-teal-50 border border-teal-100 rounded-lg px-3 py-2 flex gap-2 items-start">
                      <span className="text-sm flex-shrink-0">♻️</span>
                      <p className="text-xs text-teal-700 leading-snug">{exp.responsibleTip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-r from-teal-600 to-green-700 rounded-2xl p-8 text-white">
            <div className="flex items-start gap-4">
              <div className="text-4xl flex-shrink-0">🌱</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Our Responsible Tourism Pledge</h3>
                <p className="text-teal-100 text-sm mb-5 max-w-2xl">Tourism in Chhattisgarh's tribal and forest regions carries a special responsibility.</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { icon: '🤝', text: 'Always engage authorised local guides from tribal communities' },
                    { icon: '💰', text: 'Buy crafts and food directly from artisans and village producers' },
                    { icon: '📸', text: 'Ask permission before photographing people, shrines, or rituals' },
                    { icon: '🌿', text: 'Leave no trace in forests — all waste must be carried out' },
                    { icon: '🏠', text: 'Prefer community homestays over outside-owned resorts' },
                    { icon: '🤐', text: 'Respect sacred spaces — follow dress codes and no-entry signs' },
                  ].map((p, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-white/10 rounded-xl px-3 py-2.5">
                      <span className="text-lg flex-shrink-0">{p.icon}</span>
                      <p className="text-sm text-teal-50">{p.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESTINATIONS ── */}
      <div id="destinations" className="bg-gradient-to-b from-orange-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4"><span className="gradient-text">All 33 Districts of Chhattisgarh</span></h2>
            <p className="text-gray-600 text-lg">Click any district to explore <strong>{totalPlaces}+</strong> tourist places</p>
          </div>
          <div className="flex gap-3 justify-center mb-8 flex-wrap">
            {[{ id: 'all', label: `All (${districts.length})` }, { id: 'nature', label: '🌿 Nature' }, { id: 'spiritual', label: '🛕 Spiritual' }, { id: 'heritage', label: '🏛 Heritage' }, { id: 'urban', label: '🏙 Urban' }, { id: 'tribal', label: '🏹 Tribal' }].map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${selectedCategory === cat.id ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'}`}>
                {cat.label}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover cursor-pointer fade-in" onClick={() => setViewingDistrictPlaces(dest)}>
                <div className="relative h-56 overflow-hidden">
                  <ImgWithFallback src={dest.image} alt={dest.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" districtName={dest.name} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-orange-600">{dest.highlights}</div>
                  <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">{dest.touristPlaces.length} Places</div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1">{dest.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{dest.desc}</p>
                  <div className="flex items-center gap-2 text-orange-600 font-semibold text-sm group">
                    Explore {dest.touristPlaces.length} places <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STEP 3: DISTRICT MODAL with PlaceImageCarousel ── */}
      {viewingDistrictPlaces && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative h-64 md:h-72">
              <ImgWithFallback src={viewingDistrictPlaces.image} alt={viewingDistrictPlaces.name} className="w-full h-full object-cover" districtName={viewingDistrictPlaces.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button onClick={() => setViewingDistrictPlaces(null)} className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30"><X className="text-white" size={24} /></button>
              <div className="absolute bottom-6 left-6 text-white">
                <h2 className="text-3xl font-bold mb-1">{viewingDistrictPlaces.name} District</h2>
                <p className="text-lg">{viewingDistrictPlaces.desc}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">{viewingDistrictPlaces.touristPlaces.length} Tourist Places</span>
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">{viewingDistrictPlaces.highlights}</span>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                {viewingDistrictPlaces.touristPlaces.map((place, idx) => {
                  const placeImgs = getPlaceImages(place.name, viewingDistrictPlaces.name, place.image);
                  return (
                    <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-orange-300 transition-all card-hover">

                      {/* ── STEP 3: Multi-image carousel ── */}
                      <PlaceImageCarousel
                        images={placeImgs}
                        placeName={place.name}
                        primaryImage={place.image}
                        onOpenLightbox={(startIdx) =>
                          setLightbox({ images: placeImgs, placeName: place.name, startIndex: startIdx })
                        }
                      />

                      <div className="px-4 pt-3 pb-0">
                        <span className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-0.5 rounded-full text-xs font-bold mb-2">
                          {place.type}
                        </span>
                      </div>
                      <div className="px-4 pb-4">
                        <h4 className="font-bold text-base mb-1">{place.name}</h4>
                        <p className="text-xs text-gray-500 mb-3">{place.shortDesc}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex gap-0.5">{getRatingStars(place.rating)}</div>
                          <span className="text-xs font-semibold text-gray-600">{place.rating}</span>
                        </div>
                        <button
                          onClick={() => setSelectedPlaceDetail({ ...place, _images: placeImgs })}
                          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 text-orange-600 hover:from-orange-500 hover:to-red-600 hover:text-white hover:border-transparent px-4 py-2.5 rounded-lg font-semibold text-sm transition-all">
                          <Info size={16} />View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                <button onClick={() => { setViewingDistrictPlaces(null); setShowTripPlanner(true); }} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg flex items-center gap-2">
                  <Sparkles size={20} />Plan Trip Here
                </button>
                <button onClick={() => setViewingDistrictPlaces(null)} className="px-8 py-3 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 4: PLACE DETAIL MODAL with PlaceImageGrid ── */}
      {selectedPlaceDetail && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl detail-modal overflow-hidden">
            <div className="relative">
              <button onClick={() => setSelectedPlaceDetail(null)} className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-white shadow"><X size={20} /></button>
              <div className="p-5 pb-0">
                {/* ── STEP 4: PlaceImageGrid replaces single image ── */}
                <PlaceImageGrid
                  images={selectedPlaceDetail._images || getPlaceImages(selectedPlaceDetail.name, '', selectedPlaceDetail.image)}
                  placeName={selectedPlaceDetail.name}
                  onOpenLightbox={(startIdx) =>
                    setLightbox({
                      images: selectedPlaceDetail._images || getPlaceImages(selectedPlaceDetail.name, '', selectedPlaceDetail.image),
                      placeName: selectedPlaceDetail.name,
                      startIndex: startIdx,
                    })
                  }
                />
              </div>
              <div className="px-5 pt-4 pb-2">
                <div className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">{selectedPlaceDetail.type}</div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedPlaceDetail.name}</h2>
                <div className="flex items-center gap-2 mt-1"><div className="flex gap-0.5">{getRatingStars(selectedPlaceDetail.rating)}</div><span className="text-sm text-gray-600">{selectedPlaceDetail.rating} / 5.0</span></div>
              </div>
            </div>
            <div className="px-5 pb-6 max-h-[45vh] overflow-y-auto">
              <p className="text-gray-700 italic mb-4 border-l-4 border-orange-500 pl-4 text-sm">{selectedPlaceDetail.shortDesc}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">{selectedPlaceDetail.fullDesc}</p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-blue-50 p-3 rounded-xl"><div className="text-xs font-bold text-blue-700 mb-1">⏰ Timings</div><p className="text-sm font-medium text-gray-700">{selectedPlaceDetail.timings}</p></div>
                <div className="bg-green-50 p-3 rounded-xl"><div className="text-xs font-bold text-green-700 mb-1">🎟 Entry Fee</div><p className="text-sm font-medium text-gray-700">{selectedPlaceDetail.entryFee}</p></div>
                <div className="bg-yellow-50 p-3 rounded-xl"><div className="text-xs font-bold text-yellow-700 mb-1">📅 Best Time</div><p className="text-sm font-medium text-gray-700">{selectedPlaceDetail.bestTime}</p></div>
                <div className="bg-purple-50 p-3 rounded-xl"><div className="text-xs font-bold text-purple-700 mb-1">⭐ Rating</div><div className="flex items-center gap-1">{getRatingStars(selectedPlaceDetail.rating)}<span className="text-sm ml-1">{selectedPlaceDetail.rating}</span></div></div>
              </div>
              {selectedPlaceDetail.tips && <div className="bg-amber-50 p-4 rounded-xl mb-4"><p className="text-xs font-bold text-amber-700 mb-1">💡 Traveler Tips</p><p className="text-sm text-gray-600">{selectedPlaceDetail.tips}</p></div>}
              <div className="flex gap-3">
                <button onClick={() => { setSelectedPlaceDetail(null); setShowTripPlanner(true); }} className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 text-sm"><Sparkles size={16} />Plan Trip Here</button>
                <button onClick={() => setSelectedPlaceDetail(null)} className="flex-1 border-2 border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-semibold text-sm">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TRIP PLANNER MODAL ── */}
      {showTripPlanner && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">

            {planningStep === 1 && (
              <div className="p-8 fade-in">
                <div className="flex justify-between items-center mb-6">
                  <div><h2 className="text-3xl font-bold gradient-text mb-1">Where do you start?</h2><p className="text-gray-600">Pick your starting district — we'll build your route outward from there</p></div>
                  <button onClick={() => { setShowTripPlanner(false); setPlanningStep(1); }} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1"><span className="text-orange-600 font-medium">Step 1 of 3</span><span className="text-gray-500">Starting Location</span></div>
                  <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full" style={{ width: '33%' }} /></div>
                </div>
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input type="text" value={districtSearch} onChange={e => setDistrictSearch(e.target.value)} placeholder="Search district name…" className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none text-sm" />
                  {districtSearch && <button onClick={() => setDistrictSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"><X size={16} /></button>}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1 mb-6">
                  {districts.filter(d => d.name.toLowerCase().includes(districtSearch.toLowerCase())).map(d => (
                    <button key={d.name} onClick={() => setStartingDistrict(d.name)}
                      className={`relative rounded-xl overflow-hidden text-left transition-all ${startingDistrict === d.name ? 'ring-4 ring-orange-400 ring-offset-2' : 'border-2 border-gray-200 hover:border-orange-300'}`}>
                      <div className="relative h-20 overflow-hidden">
                        <img src={d.image} alt={d.name} className="w-full h-full object-cover" onError={e => { e.target.src = DISTRICT_FALLBACKS[d.name] || FALLBACK; }} />
                        <div className={`absolute inset-0 ${startingDistrict === d.name ? 'bg-orange-500/40' : 'bg-black/30'}`} />
                        {startingDistrict === d.name && <div className="absolute top-2 right-2 bg-white rounded-full p-0.5"><Check className="text-orange-500" size={14} /></div>}
                      </div>
                      <div className="px-2.5 py-2 bg-white">
                        <p className={`font-bold text-sm truncate ${startingDistrict === d.name ? 'text-orange-600' : 'text-gray-800'}`}>{d.name}</p>
                        <p className="text-xs text-gray-400 truncate">{d.highlights}</p>
                      </div>
                    </button>
                  ))}
                </div>
                {startingDistrict && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
                    <MapPin className="text-orange-500 flex-shrink-0" size={20} />
                    <div><p className="font-bold text-orange-700 text-sm">Starting from: {startingDistrict}</p><p className="text-xs text-orange-600">{districts.find(d => d.name === startingDistrict)?.desc}</p></div>
                  </div>
                )}
                <div className="flex justify-end gap-3">
                  <button onClick={() => { setShowTripPlanner(false); setPlanningStep(1); }} className="px-6 py-3 border-2 border-gray-300 rounded-full font-semibold">Cancel</button>
                  <button onClick={() => setPlanningStep(2)} disabled={!startingDistrict} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">Continue <ArrowRight size={20} /></button>
                </div>
              </div>
            )}

            {planningStep === 2 && (
              <div className="p-8 fade-in">
                <div className="flex justify-between items-center mb-6">
                  <div><h2 className="text-3xl font-bold gradient-text mb-1">Your Preferences</h2><p className="text-gray-600">Tell us what you love — we'll score and rank every place for you</p></div>
                  <button onClick={() => { setShowTripPlanner(false); setPlanningStep(1); }} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1"><span className="text-orange-600 font-medium">Step 2 of 3</span><span className="text-gray-500">Preferences</span></div>
                  <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full" style={{ width: '66%' }} /></div>
                </div>
                <div className="mb-7">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Heart className="text-orange-500" size={20} />What interests you?</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {interestOptions.map(o => {
                      const Icon = o.icon;
                      const selected = tripPreferences.interests.includes(o.id);
                      const accentColors = { green: selected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300', purple: selected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300', blue: selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300', red: selected ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300', yellow: selected ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300', amber: selected ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300', teal: selected ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-teal-300', violet: selected ? 'border-violet-500 bg-violet-50' : 'border-gray-200 hover:border-violet-300' };
                      const iconColors = { green: selected ? 'text-green-600' : 'text-gray-400', purple: selected ? 'text-purple-600' : 'text-gray-400', blue: selected ? 'text-blue-600' : 'text-gray-400', red: selected ? 'text-red-600' : 'text-gray-400', yellow: selected ? 'text-yellow-600' : 'text-gray-400', amber: selected ? 'text-amber-700' : 'text-gray-400', teal: selected ? 'text-teal-600' : 'text-gray-400', violet: selected ? 'text-violet-600' : 'text-gray-400' };
                      const specialBadge = o.id === 'tribal' ? '🏹' : o.id === 'ecotourism' ? '🌿' : o.id === 'localculture' ? '🎭' : null;
                      return (
                        <button key={o.id} onClick={() => toggleInterest(o.id)} className={`p-3 rounded-xl border-2 transition-all flex flex-col items-start gap-1.5 ${accentColors[o.color]}`}>
                          <div className="flex items-center justify-between w-full">
                            {specialBadge ? <span className="text-xl">{specialBadge}</span> : <Icon className={iconColors[o.color]} size={22} />}
                            {selected && <Check className={iconColors[o.color]} size={15} />}
                          </div>
                          <span className="font-semibold text-sm text-gray-700">{o.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="mb-7">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><TrendingUp className="text-orange-500" size={20} />Travel pace?</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    {paceOptions.map(o => (
                      <button key={o.id} onClick={() => setTripPreferences(p => ({ ...p, pace: o.id }))} className={`p-4 rounded-xl border-2 transition-all ${tripPreferences.pace === o.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                        <p className="font-bold text-lg">{o.label}</p><p className="text-sm text-gray-600 mt-1">{o.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-7">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Wallet className="text-orange-500" size={20} />Budget?</h3>
                  <div className="grid md:grid-cols-3 gap-3">
                    {budgetOptions.map(o => (
                      <button key={o.id} onClick={() => setTripPreferences(p => ({ ...p, budget: o.id }))} className={`p-4 rounded-xl border-2 transition-all ${tripPreferences.budget === o.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                        <div className="text-2xl mb-1">{o.icon}</div><p className="font-bold">{o.label}</p><p className="text-sm text-gray-600">{o.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-7">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><Users className="text-orange-500" size={20} />Who's travelling?</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {groupOptions.map(o => (
                      <button key={o.id} onClick={() => setTripPreferences(p => ({ ...p, groupType: o.id }))} className={`p-4 rounded-xl border-2 transition-all ${tripPreferences.groupType === o.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                        <div className="text-2xl mb-1">{o.icon}</div><p className="font-semibold text-sm">{o.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between gap-3">
                  <button onClick={() => setPlanningStep(1)} className="px-6 py-3 border-2 border-gray-300 rounded-full font-semibold flex items-center gap-2"><ChevronLeft size={20} />Back</button>
                  <button onClick={() => setPlanningStep(3)} disabled={!tripPreferences.interests.length || !tripPreferences.pace || !tripPreferences.budget || !tripPreferences.groupType} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">Continue <ArrowRight size={20} /></button>
                </div>
              </div>
            )}

            {planningStep === 3 && (
              <div className="p-8 fade-in">
                <div className="flex justify-between items-center mb-6">
                  <div><h2 className="text-3xl font-bold gradient-text mb-1">How many days?</h2><p className="text-gray-600">We'll plan your full journey — starting in {startingDistrict} and expanding outward</p></div>
                  <button onClick={() => { setShowTripPlanner(false); setPlanningStep(1); }} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
                </div>
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-1"><span className="text-orange-600 font-medium">Step 3 of 3</span><span className="text-gray-500">Duration</span></div>
                  <div className="h-2 bg-gray-200 rounded-full"><div className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full" style={{ width: '100%' }} /></div>
                </div>
                <div className="flex items-center justify-center mb-6">
                  <button onClick={() => setTripDuration(Math.max(1, tripDuration - 1))} className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"><ChevronLeft size={24} /></button>
                  <div className="mx-12 text-center">
                    <div className="text-7xl font-bold gradient-text mb-2">{tripDuration}</div>
                    <div className="text-xl text-gray-600">Day{tripDuration > 1 ? 's' : ''}</div>
                  </div>
                  <button onClick={() => setTripDuration(Math.min(14, tripDuration + 1))} className="p-4 bg-gray-100 rounded-full hover:bg-gray-200 transition-all"><ChevronRight size={24} /></button>
                </div>
                <div className="flex justify-center gap-3 flex-wrap mb-6">
                  {[3, 5, 7, 10].map(d => (
                    <button key={d} onClick={() => setTripDuration(d)} className={`px-6 py-2 rounded-full font-semibold transition-all ${tripDuration === d ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{d} Days</button>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 p-5 rounded-2xl mb-6">
                  <p className="font-bold text-orange-800 mb-3 flex items-center gap-2"><Navigation size={18} className="text-orange-500" />How your route expands from {startingDistrict}</p>
                  <div className="space-y-2">
                    {[{ label: 'Day 1', desc: `Explore places in and around ${startingDistrict}`, icon: '📍' }, { label: 'Days 2–3', desc: 'Expand to nearest neighbouring districts', icon: '🔄' }, { label: `Days 4–${tripDuration}`, desc: 'Continue outward — each day moves to the next closest region', icon: '🗺️' }].map((r, i) => (
                      <div key={i} className="flex items-start gap-3 bg-white/70 rounded-lg px-3 py-2">
                        <span className="text-lg">{r.icon}</span>
                        <div><span className="font-bold text-orange-700 text-sm">{r.label}: </span><span className="text-sm text-gray-600">{r.desc}</span></div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-orange-600 mt-3 italic">💡 With {tripPreferences.pace} pace ({SLOTS_PER_DAY[tripPreferences.pace]} places/day), {tripDuration} days = up to {tripDuration * SLOTS_PER_DAY[tripPreferences.pace]} places from {totalPlaces}+ available</p>
                </div>
                <div className="flex justify-between gap-3">
                  <button onClick={() => setPlanningStep(2)} className="px-6 py-3 border-2 border-gray-300 rounded-full font-semibold flex items-center gap-2"><ChevronLeft size={20} />Back</button>
                  <button onClick={generateTripRecommendations} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg flex items-center gap-2"><Sparkles size={20} />Generate My Itinerary</button>
                </div>
              </div>
            )}

            {planningStep === 4 && (
              <div className="p-8 fade-in">
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="analyzing-pulse mb-6"><Sparkles className="text-orange-500" size={64} /></div>
                  <h2 className="text-3xl font-bold gradient-text mb-4">Building Your Route</h2>
                  <p className="text-gray-600 text-center max-w-md mb-6">Starting in <strong>{startingDistrict}</strong> and expanding outward across Chhattisgarh…</p>
                  <div className="flex flex-col gap-2.5 text-sm text-gray-500 mb-8 w-full max-w-sm">
                    <div className="flex items-center gap-2 bg-green-50 rounded-lg px-4 py-2.5 border border-green-100"><Check className="text-green-500 flex-shrink-0" size={16} /><span>Anchoring route to {startingDistrict}</span></div>
                    <div className="flex items-center gap-2 bg-green-50 rounded-lg px-4 py-2.5 border border-green-100"><Check className="text-green-500 flex-shrink-0" size={16} /><span>Scoring {totalPlaces}+ places by your interests</span></div>
                    <div className="flex items-center gap-2 bg-orange-50 rounded-lg px-4 py-2.5 border border-orange-100 analyzing-pulse"><Sparkles size={16} className="text-orange-400 flex-shrink-0" /><span>Grouping nearby places into each day…</span></div>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-2.5 border border-gray-100 opacity-50"><Navigation size={16} className="text-gray-400 flex-shrink-0" /><span>Calculating inter-district travel times</span></div>
                  </div>
                  <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-500 to-red-600 animate-pulse rounded-full" style={{ width: '65%' }} /></div>
                </div>
              </div>
            )}

            {planningStep === 5 && tripRecommendations && (
              <div className="p-8 fade-in">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-3xl font-bold gradient-text mb-1">Your Personalised Itinerary</h2>
                    <div className="flex items-center gap-2 flex-wrap mt-1">
                      <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full"><MapPin size={12} />Starting: {startingDistrict}</span>
                      <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full"><Calendar size={12} />{tripDuration} Days</span>
                      <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full"><Navigation size={12} />{new Set(tripRecommendations.itinerary.flatMap(d => d.uniqueDistricts)).size} Districts</span>
                    </div>
                  </div>
                  <button onClick={() => { setShowTripPlanner(false); setPlanningStep(1); }} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
                </div>
                <div className="flex items-center gap-3 flex-wrap mb-5 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                  <span className="font-bold text-gray-500 uppercase tracking-wide">Distance:</span>
                  {[{ bg: '#f0fdf4', text: '#166534', border: '#bbf7d0', label: '≤ 25 km' }, { bg: '#fffbeb', text: '#92400e', border: '#fde68a', label: '26–60 km' }, { bg: '#fef2f2', text: '#991b1b', border: '#fecaca', label: '> 60 km' }].map(c => (
                    <span key={c.label} className="flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold border" style={{ background: c.bg, color: c.text, borderColor: c.border }}><Navigation size={9} />{c.label}</span>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl mb-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Wallet className="text-green-600" size={22} />Estimated Cost</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><p className="text-3xl font-bold text-green-600 mb-1">₹{tripRecommendations.estimatedCost.total.toLocaleString()}</p><p className="text-sm text-gray-600">Total for {tripDuration} day{tripDuration > 1 ? 's' : ''} · {tripPreferences.groupType}</p></div>
                    <div className="space-y-1.5">{Object.entries(tripRecommendations.estimatedCost.breakdown).map(([k, v]) => (<div key={k} className="flex justify-between text-sm"><span className="text-gray-600 capitalize">{k}</span><span className="font-semibold">₹{v.toLocaleString()}</span></div>))}</div>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="font-bold text-xl mb-1 flex items-center gap-2"><Navigation className="text-orange-500" size={22} />Day-by-Day Route</h3>
                  <p className="text-sm text-gray-500 mb-4">Starts in <strong>{startingDistrict}</strong> · expands to nearest districts each day</p>
                  <div className="space-y-4">{tripRecommendations.itinerary.map(day => (<DayCard key={day.day} day={day} />))}</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl mb-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Sparkles className="text-blue-600" size={20} />Route Insights</h3>
                  <div className="space-y-2">{tripRecommendations.insights.map((ins, i) => (<div key={i} className="flex gap-3 items-start"><Check className="text-blue-600 mt-0.5 flex-shrink-0" size={18} /><p className="text-sm text-gray-700">{ins}</p></div>))}</div>
                </div>
                <div className="bg-amber-50 p-5 rounded-2xl mb-6">
                  <h3 className="font-bold text-lg mb-3">💡 Travel Tips</h3>
                  <div className="space-y-2">{tripRecommendations.recommendations.map((r, i) => (<div key={i} className="flex gap-3 items-start bg-white p-3 rounded-lg"><span className="text-lg flex-shrink-0">{r.icon || '✅'}</span><div><p className="text-sm font-semibold">{r.title}</p><p className="text-xs text-gray-500">{r.reason}</p></div></div>))}</div>
                </div>
                {tripRecommendations.responsibleTips?.length > 0 && (
                  <div className="bg-gradient-to-r from-teal-600 to-green-700 p-5 rounded-2xl mb-6 text-white">
                    <h3 className="font-bold text-lg mb-3">🌱 Responsible Tourism Reminders</h3>
                    <div className="space-y-2">{tripRecommendations.responsibleTips.map((r, i) => (<div key={i} className="flex gap-3 items-start bg-white/10 rounded-xl px-3 py-2.5"><span className="text-lg flex-shrink-0">{r.icon}</span><p className="text-sm text-teal-50">{r.tip}</p></div>))}</div>
                  </div>
                )}
                <div className="flex gap-4 justify-center flex-wrap">
                  <button onClick={() => setSaveModalOpen(true)} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg flex items-center gap-2"><Save size={20} />Save Itinerary</button>
                  <button onClick={() => setSaveModalOpen(true)} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold hover:shadow-lg flex items-center gap-2"><Share2 size={20} />Share Trip</button>
                  <button onClick={() => { setPlanningStep(1); setStartingDistrict(''); setDistrictSearch(''); setTripPreferences({ interests: [], pace: '', budget: '', groupType: '' }); setTripDuration(3); districtColorIndexRef.current = {}; districtColorCounterRef.current = 0; }} className="px-8 py-3 border-2 border-gray-300 rounded-full font-semibold hover:bg-gray-50">Plan Another</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4"><div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center"><MapPin size={24} /></div><span className="font-bold text-xl">Incredible Chhattisgarh</span></div>
              <p className="text-gray-400 text-sm">Smart geo-optimised trip planning for all 33 districts. {totalPlaces}+ tourist places mapped.</p>
              <p className="text-gray-500 text-xs mt-2">Photos: © CTB & Wikimedia Commons</p>
            </div>
            <div><h4 className="font-bold mb-4">Quick Links</h4><ul className="space-y-2">{['Destinations', 'Trip Planner', 'Contact'].map(l => <li key={l}><a href="#" className="text-gray-400 hover:text-orange-500 text-sm">{l}</a></li>)}</ul></div>
            <div><h4 className="font-bold mb-4">Support</h4><ul className="space-y-2">{['Help Center', 'FAQs', 'Privacy'].map(l => <li key={l}><a href="#" className="text-gray-400 hover:text-orange-500 text-sm">{l}</a></li>)}</ul></div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Get travel updates and tips</p>
              <div className="flex gap-2"><input type="email" placeholder="Your email" className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-orange-500 text-sm" /><button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold text-sm">Go</button></div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">© 2026 Chhattisgarh Tourism · Photos: CTB & Wikimedia Commons · Geographic routing powered by Haversine algorithm <span className="text-gray-600">· build v3-direct-rest</span></div>
        </div>
      </footer>

      {/* ── STEP 5: Lightbox renderer ── */}
      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          placeName={lightbox.placeName}
          startIndex={lightbox.startIndex}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* ── My Trips list modal ── */}
      {myTripsOpen && (
        <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] flex flex-col detail-modal">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2"><Bookmark className="text-orange-500" size={22} />My Saved Trips</h3>
              <button onClick={() => setMyTripsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
            </div>
            {myTripsLoading ? (
              <div className="flex-1 flex items-center justify-center py-12"><Loader2 size={32} className="text-orange-500 animate-spin" /></div>
            ) : myTripsError ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                <p className="text-gray-500 text-sm mb-4">{myTripsError}</p>
                <button onClick={loadMyTrips} className="text-orange-600 font-semibold hover:underline">Try again</button>
              </div>
            ) : myTrips.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-12 text-center">
                <p className="text-4xl mb-3">🗺️</p>
                <p className="text-gray-600 font-semibold mb-1">No saved trips yet</p>
                <p className="text-gray-400 text-sm">Generate an itinerary and save it to see it here.</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-3">
                {myTrips.map(trip => (
                  <div key={trip.id} className="flex items-center gap-2 border border-gray-200 rounded-xl hover:border-orange-300 transition-all p-2">
                    <button onClick={() => openSavedTrip(trip.id)} className="flex-1 text-left p-2">
                      <p className="font-bold text-gray-800 mb-1">{trip.name || 'Untitled Trip'}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        {trip.days && <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{trip.days} day{trip.days !== 1 ? 's' : ''}</span>}
                        {trip.starting_district && <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">{trip.starting_district}</span>}
                        {trip.group_type && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">{trip.group_type}</span>}
                        {trip.created_at && <span className="text-gray-400">{new Date(trip.created_at).toLocaleDateString()}</span>}
                      </div>
                    </button>
                    <button
                      onClick={() => handleDeleteTrip(trip.id)}
                      title="Delete this trip"
                      className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all flex-shrink-0"
                    ><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── STEP 6: Save Itinerary modal ── */}
      {saveModalOpen && (
        <div className="fixed inset-0 z-[90] bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-auto detail-modal">
            {!savedShareUrl ? (
              <>
                <h3 className="text-xl font-bold mb-1 flex items-center gap-2"><Save className="text-orange-500" size={22} />Save Your Itinerary</h3>
                <p className="text-sm text-gray-500 mb-4">Name your trip so it's easy to recognise later. You'll get a link to share.</p>
                <input
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && saveName.trim() && !saving) handleSaveItinerary(); }}
                  placeholder="e.g. Bastar Waterfall Adventure"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 mb-4"
                />
                {saveError && <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{saveError}</p>}
                <div className="flex gap-3">
                  <button onClick={() => { setSaveModalOpen(false); setSaveError(''); }} disabled={saving} className="flex-1 border-2 border-gray-300 rounded-xl font-semibold py-3 hover:bg-gray-50">Cancel</button>
                  <button onClick={handleSaveItinerary} disabled={saving || !saveName.trim()} className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold py-3 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}{saving ? 'Saving…' : 'Save'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Check className="text-green-600" size={22} />Trip Saved!</h3>
                <p className="text-sm text-gray-600 mb-4">Share this link — anyone with it can view the saved itinerary.</p>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 mb-4">
                  <Link2 size={18} className="text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 truncate flex-1">{savedShareUrl}</span>
                  <button onClick={copyShareLink} className="flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-orange-600 transition-all flex-shrink-0">
                    {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <button onClick={() => setSaveModalOpen(false)} className="w-full border-2 border-gray-300 rounded-xl font-semibold py-3 hover:bg-gray-50">Close</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── STEP 7: Shared itinerary viewer (?it=<id>) ── */}
      {savedTripLoading && (
        <div className="fixed inset-0 z-[95] bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 size={48} className="text-orange-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-semibold">Loading saved itinerary…</p>
          </div>
        </div>
      )}

      {savedTripError && !savedTripLoading && (
        <div className="fixed inset-0 z-[95] bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 max-w-md w-full text-center">
            <p className="text-4xl mb-4">🗺️</p>
            <h3 className="text-xl font-bold mb-2">Itinerary Not Found</h3>
            <p className="text-gray-600 text-sm mb-6">{savedTripError}</p>
            <button
              onClick={() => { setSavedTripError(''); window.location.search = ''; }}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg"
            >Return Home</button>
          </div>
        </div>
      )}

      {savedTrip && savedTrip.itinerary && (
        <div className="fixed inset-0 z-[95] bg-gray-50 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-1 flex items-center gap-2">{savedTrip.name || 'Shared Itinerary'}</h2>
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  {savedTrip.starting_district && (
                    <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full"><MapPin size={12} />Starting: {savedTrip.starting_district}</span>
                  )}
                  {savedTrip.days && (
                    <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full"><Calendar size={12} />{savedTrip.days} Days</span>
                  )}
                  {savedTrip.itinerary.itinerary && (
                    <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full"><Navigation size={12} />{new Set(savedTrip.itinerary.itinerary.flatMap(d => d.uniqueDistricts)).size} Districts</span>
                  )}
                  {savedTrip.created_at && (
                    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full"><Clock size={12} />Saved {new Date(savedTrip.created_at).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => { setSavedTrip(null); window.location.search = ''; }}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-semibold hover:shadow-lg flex items-center gap-2"
              ><Sparkles size={18} />Plan Your Own</button>
            </div>

            {savedTrip.itinerary.estimatedCost && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-2xl mb-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Wallet className="text-green-600" size={22} />Estimated Cost</h3>
                <p className="text-3xl font-bold text-green-600 mb-1">₹{savedTrip.itinerary.estimatedCost.total.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total for {savedTrip.days || ''} day{savedTrip.days !== 1 ? 's' : ''} · {savedTrip.group_type}</p>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Navigation className="text-orange-500" size={22} />Day-by-Day Route</h3>
              <div className="space-y-4">{savedTrip.itinerary.itinerary.map(day => (<DayCard key={day.day} day={day} />))}</div>
            </div>

            {savedTrip.itinerary.insights?.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl mb-6">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Sparkles className="text-blue-600" size={20} />Route Insights</h3>
                <div className="space-y-2">{savedTrip.itinerary.insights.map((ins, i) => (<div key={i} className="flex gap-3 items-start"><Check className="text-blue-600 mt-0.5 flex-shrink-0" size={18} /><p className="text-sm text-gray-700">{ins}</p></div>))}</div>
              </div>
            )}

            {savedTrip.itinerary.responsibleTips?.length > 0 && (
              <div className="bg-gradient-to-r from-teal-600 to-green-700 p-5 rounded-2xl mb-6 text-white">
                <h3 className="font-bold text-lg mb-3">🌱 Responsible Tourism Reminders</h3>
                <div className="space-y-2">{savedTrip.itinerary.responsibleTips.map((r, i) => (<div key={i} className="flex gap-3 items-start bg-white/10 rounded-xl px-3 py-2.5"><span className="text-lg flex-shrink-0">{r.icon}</span><p className="text-sm text-teal-50">{r.tip}</p></div>))}</div>
              </div>
            )}

            <div className="text-center pb-8">
              {savedTrip.url && (
                <button
                  onClick={() => { navigator.clipboard.writeText(savedTrip.url); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-orange-300 text-orange-700 rounded-full font-semibold hover:bg-orange-50 transition-all"
                >{copied ? <Check size={16} /> : <Link2 size={16} />}{copied ? 'Link Copied' : 'Copy Share Link'}</button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}