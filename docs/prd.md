# Product Requirements Document — Incredible Chhattisgarh Travel Planner

| Field | Value |
|---|---|
| Product name | Incredible Chhattisgarh (CG Travel Planner) |
| Version | 0.1.0 |
| Status | In production (MVP) |
| Last updated | 2026-09-21 |
| Repo | https://github.com/vartikaverma737/chhattisgarh_travel-planner |

---

## 1. Overview

A browser-based tourism discovery + trip-planning web app for **Chhattisgarh, India**. It lets travellers explore all **33 districts** and **385 tourist places**, filter by interest, learn about tribal & eco experiences, and generate a **geo-optimised day-by-day itinerary** that is shareable and re-openable via a link. The entire UI is available in **English, Hindi (हिन्दी) and Chhattisgarhi (छत्तीसगढ़ी)**.

**Problem it solves:** Chhattisgarh is one of India's most under-travelled states despite immense natural, heritage and tribal wealth. Existing state-portal pages are catalogues, not planners. This app turns discovery into an actionable, route-aware plan.

**Outcome:** A tourist can go from "no idea what to see" to a saved, shareable multi-day route plan — in their own language — in under two minutes.

---

## 2. Goals

- G1. Complete, accurate catalogue: all 33 districts and their notable places.
- G2. Usable by non-English speakers (Hindi + Chhattisgarhi UI and content).
- G3. Generate sensible, geographically coherent itineraries from a few simple preferences.
- G4. Let users save/share itineraries without creating accounts.
- G5. Deploy cost-effectively on static + serverless hosting with a free-tier database.
- G6. Respect and responsibly present tribal communities and protected areas.

## 3. Non-goals

- No user authentication/accounts (by design — share links are capability-based).
- No flight/hotel booking or payments.
- No real-time pricing or live availability.
- No native mobile apps (responsive web only).
- No CMS — content is code-managed (git).

---

## 4. Target users & personas

| Persona | Needs | Example flow |
|---|---|---|
| **Domestic family traveller** (Hindi/CG speaker) | Explore in own language, easy planning | Switch to हिन्दी → pick district → save itinerary → share with family |
| **Weekend road-tripper from Raipur** | Nearby waterfall/temple/market plans | Search "waterfall" → plan 2-day trip from Raipur |
| **Photography / culture tourist** | Tribal, eco and heritage spots + responsible-travel guidance | Browse Tribal & Eco experiences → understand etiquette |
| **International backpacker** | English, shareable plans, offline-referable trips | Save trip → copy share link |
| **Tourism researcher** | Complete, accurate place data | Browse all districts, place-level details |

---

## 5. Functional requirements

### FR-1 — Trilingual UI (i18n)
- FR-1.1 Language switch between `en`, `hi`, `cg` (top nav + mobile menu).
- FR-1.2 All visible UI chrome strings route through the `useLanguage()` / `t()` dictionary.
- FR-1.3 Content is localised: district names/blurbs, place names, place short/full descriptions, tips, trip-planner labels, insights, tribal/eco cards.
- FR-1.4 English is the source of truth; unknown translation keys fall back to English silently.

### FR-2 — District & place catalogue
- FR-2.1 Show all 33 districts as cards with image, name, highlight, blurbs.
- FR-2.2 Filter districts by category: All / Nature / Spiritual / Heritage / Urban / Tribal.
- FR-2.3 Clicking a district opens its places; each place shows name, type, image, rating, timings, entry fee, best time, description, tips.
- FR-2.4 Detail modal includes image gallery (carousel/grid) and lightbox.

### FR-3 — Search
- FR-3.1 Debounced type-ahead search across districts and places (matches localized names/descriptions).
- FR-3.2 Results grouped by type (`district` or `place`); clicking opens the district or detail modal.
- FR-3.3 Click-outside closes results panel.

### FR-4 — Tribal & Eco experiences
- FR-4.1 Curated experience cards (Bastar Dussehra, Dhokra, Abujhmaad trail, Mainpat, Kanger safari, Gond art, tribal haat, Sabari camp, Achanakmar homestay).
- FR-4.2 Each card carries duration, best-for, tags, and a **responsible-tourism tip**.
- FR-4.3 A "Responsible Tourism Pledge" section with rules of respectful travel.

### FR-5 — Trip planner wizard (5 steps)
1. **Destination** — pick a starting district (searchable).
2. **Interests** — multi-select from nature/spiritual/heritage/adventure/photography/tribal/eco/local-culture.
3. **Pace** — relaxed / moderate / packed (2 / 3 / 4 slots per day).
4. **Budget** — budget indicator.
5. **Group** — traveller type.
- FR-5.6 Generates a day-by-day plan: per-day activities with times, driving distances (km + drive time), district colors, inter-district connectors.

### FR-6 — Itinerary details & insights
- FR-6.1 Per-place cards with rating, fee category, type chip.
- FR-6.2 Itinerary insights: total places, days, distance, budget estimate, difficulty.
- FR-6.3 Recommendations ("why you'll love it") and travel tips per plan.
- FR-6.4 Map rendering per day (Google Maps when an API key is configured; graceful placeholder otherwise).

### FR-7 — Save, share, browse
- FR-7.1 Save itinerary to Supabase via Vercel serverless functions (no account).
- FR-7.2 Returns a share URL `?it=<id>`; copy-to-clipboard.
- FR-7.3 "My Trips" lists saved trips; opening a link re-hydrates the plan.
- FR-7.4 Owner can delete a trip via its **delete token** (capability-based; no passwords).

### FR-8 — Images & maps
- FR-8.1 Imagery from Chhattisgarh Tourism portal (portal-tourism.cgstate.gov.in) and Wikimedia Commons, with a graceful local fallback image and per-district fallbacks.
- FR-8.2 Google Maps (markers, route polyline, open-in-maps) **only when** `REACT_APP_GOOGLE_MAPS_API_KEY` is provided; otherwise a styled static placeholder + coordinates info. Never a runtime error.

---

## 6. Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Static React SPA, ~215 kB gzip JS. Code-splitting-friendly. Aim LCP < 3 s on typical broadband. |
| Responsiveness | Breakpoints for mobile / tablet / desktop; hamburger menu on small screens; touch-friendly. |
| Accessibility | Semantic markup, alt text, keyboard-friendly modals, contrast-aware text, focus styles. |
| i18n support | All content localizable; layout tolerates longer Devanagari strings. |
| Security | CSP + security headers on all responses; RLS on database; no secrets in client; download-size capped API bodies. |
| Availability | Vercel static + serverless; Supabase free tier. No custom backend to maintain. |
| Testability | Validation logic dependency-free so it runs in Jest; 36 tests cover validation + Supabase RLS semantics. |

---

## 7. Data requirements

- **33 district records**: name, image, English desc, highlight, coordinates (lat/lng), category, `touristPlaces[]`.
- **385 place records** (239 core + 146 supplemental): name, type, image(s), shortDesc, fullDesc, timings, entryFee, bestTime, rating, tips, coordinates.
- **Translations**: per-district hi/cg blurb; per-place hi/cg name; per-place hi/cg shortDesc/fullDesc/tips.
- **Images**: remote URLs (Wikimedia / CG Tourism portal) + `FALLBACK` for missing.
- **Persistence (Supabase `itineraries` table)**: id, name, starting_district, days, pace, budget, group_type, interests[], itinerary(jsonb), delete_token, created_at.

---

## 8. External integrations

| Service | Use | Notes |
|---|---|---|
| **Vercel** | Hosting, CDN, serverless functions, deployment | `vercel.json` sets build + security headers |
| **Supabase (Postgres + PostgREST)** | Persist/reopen shared itineraries | Accessed only via our `/api/*` functions; RLS + delete-token model |
| **Google Maps JS API** | Map markers, polyline, place links | Optional; gated by env var |

---

## 9. Example acceptance criteria

- **AC-1 (i18n):** Switching EN→HI→CG changes nav, hero, districts, place details and itinerary text; no untranslated chrome strings visible.
- **AC-2 (planner):** 3-day "Moderate" plan starting in Raipur returns a day-by-day plan where every place is in a neighbouring district on the road network (max ~1 long leg/day) and a map renders per day.
- **AC-3 (share):** Saving returns a URL; opening it in a fresh/incognito tab shows the exact same itinerary; deleting from "My Trips" with the owner token removes it and a second delete fails.
- **AC-4 (maps fallback):** With no Maps key set, every map area renders a friendly placeholder (title + hint) and never throws.
- **AC-5 (headers):** Production responses carry CSP, HSTS, nosniff, X-Frame-Options `DENY`, Referrer-Policy.

---

## 10. Out of scope / roadmap candidates

- Accounts & personalisation (wishlist, ratings by users).
- Booking integration (hotels, safaris, guides).
- Offline PWA support.
- Auto-translation QA tooling / glossary enforcement.
- District boundary maps and offline GPX export.
- Admin content studio (non-git updates).

---

## 11. Success metrics (proposed)

- Sessions/day and % with `hi`/`cg` selected.
- Plan-started → plan-generated conversion.
- Plans saved per week; share-link opens within 7 days.
- Map render success rate (key availability).
- Page speed / Lighthouse scores.