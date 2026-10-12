# Architecture — Incredible Chhattisgarh Travel Planner

> Updated 2026-09-21. Source of truth: the code in this repo.

---

## 1. System overview

A **static React SPA** served by Vercel, talking to **Supabase (PostgREST)** through **Vercel serverless functions**. Google Maps is loaded lazily **only when** an API key is configured.

```
┌────────────────────┐        ┌──────────────────────────────┐
│   Browser (SPA)     │        │          Vercel             │
│   React 19 + CRA 5  │        │ ┌──────────────────────────┐ │
│   Tailwind + lucide │        │ │  Static assets (build/)  │ │
└─────────┬──────────┘        │ └──────────────────────────┘ │
          │                    │ ┌──────────────────────────┐ │
          │  /api/* (fetch)    │ │  Serverless functions    │ │
          │                    │ │  save / get / list /     │ │
          │                    │ │  delete-itinerary        │ │
┌─────────▼──────────┐        │ └───────────┬──────────────┘ │
│   /api/* handlers   │        │             │ PostgREST       │
│   (same origin)     │        └─────────────┼────────────────┘
└────────────────────┘                      ▼
                                   ┌────────────────────┐
                                   │  Supabase (Postgres)│
                                   │  public.itineraries │  RLS + delete token
                                   └────────────────────┘

Google Maps JS (optional): loaded once via googleMapsConfig.js when
REACT_APP_GOOGLE_MAPS_API_KEY is set; otherwise a static placeholder map.
```

---

## 2. Tech stack

| Layer | Choice |
|---|---|
| UI | React 19, Create React App 5 (react-scripts) |
| Styling | Tailwind CSS 3 (via `@tailwind` in `src/index.css`), inline styles for dynamic colors |
| Icons | lucide-react |
| State | Local `useState`/`useEffect`/`useRef` in `App.js`; `LanguageProvider` context for `lang` |
| Data (read) | Static modules baked into the bundle (districts, places, translations) |
| Data (write) | Supabase via own serverless functions |
| Serverless | Vercel Node functions in `/api` (Vercel builds ESM→CJS automatically) |
| Testing | Jest via react-scripts (`react-app`, `react-app/jest`) |
| Deploy | Vercel (`vercel.json`: build + security headers) |

---

## 3. Directory layout (app root)

```
my-app/
├── api/                         # Vercel serverless functions
│   ├── save-itinerary.js        #   POST  /api/save-itinerary
│   ├── get-itinerary.js         #   GET   /api/get-itinerary?id=
│   ├── list-itineraries.js      #   GET   /api/list-itineraries?limit=
│   ├── delete-itinerary.js      #   DELETE /api/delete-itinerary?id=  (+ x-delete-token)
│   └── lib/
│       └── itineraryValidation.js # dependency-free shared validation
├── src/
│   ├── App.js                   # MAIN component + ALL_DISTRICTS data + DISTRICTS merged (core + supplemental)
│   ├── index.js                 # entry: <LanguageProvider><App/></LanguageProvider>
│   ├── index.css                # tailwind + base styles
│   ├── i18n.js                  # LanguageProvider, useLanguage, t(), en/hi/cg dicts
│   ├── districtData.js          # hi/cg district blurbs + localizeDistrict()
│   ├── placeNamesData.js        # hi/cg names of 385 places (239 core + 146 supplemental) + localizePlaceName()
│   ├── placeData/               # per-district place translation files
│   │   ├── index.js             #   merge + localizePlace()
│   │   ├── raipur1.js … raipur3.js, bilaspur.js … (35 files)
│   ├── supplemental/            # extra places: catalog/part1..6.js (English source) + lang/ (hi/cg blocks)
│   │   ├── index.js             #   SUPPLEMENTAL_PLACES barrel + countSupplemental()
│   ├── placeimage.js            # image URL maps (PLACE_IMAGES, getPlaceImages)
│   ├── imagegallery.jsx         # carousel / grid / lightbox components
│   ├── GoogleMapView.jsx        # lazy Google Maps component + placeholder
│   ├── googleMapsConfig.js      # key read, loadGoogleMaps() state machine
│   ├── supabaseClient.js        # thin fetch wrapper → /api/*
│   └── security/                # Jest tests (validation + RLS semantics)
│       ├── itineraryValidation.test.js
│       └── supabaseSecurity.test.js
├── supabase-schema.sql          # table + RLS policies
├── vercel.json                  # build command, output dir, security headers
├── prd.md, architecture.md, rules.md, design.md, task.md, memory.md
└── .env.example                 # env template (never commit real .env)
```

---

## 4. Module responsibilities

### 4.1 `src/App.js` — everything else
Single-export component `AITripPlanner()` that owns:
- Data (`ALL_DISTRICTS`, `TRIBAL_ECO_EXPERIENCES`), constants (`SLOTS_PER_DAY`, `TIME_SLOTS`, `DISTRICT_PALETTE`, `INTEREST_TYPE_MAP`, image base URLs).
- Pure helpers at module scope: `haversineDistance`, `driveTimeLabel`, `distanceColor`, `scorePlace`, `mapActivityType`, `buildPlacePool`, `generateGeoItinerary`, `groupActivitiesByDistrict`.
- In-component render helpers: `getRatingStars`, `ImgWithFallback`, `DistanceConnector`, `InterDistrictConnector`, `DistrictCard`, `DayCard`, `renderInsight`.
- All page sections: hero/carousel, stats, search, tribal/eco, district grid + modal, planner wizard, itinerary, save/share modals, My Trips, lightbox, footer.

> Note: `App.js` is large (~1900 lines) and is the single best candidate for future decomposition.

### 4.2 Localization modules
- `i18n.js` — `LANGUAGES` (`en/hi/cg`), `LanguageProvider` (persists to `localStorage`), `useLanguage()` returning `{ lang, setLang, t }`. `t(key, params)` interpolates `{param}` placeholders.
- `districtData.js` / `placeNamesData.js` / `placeData/` — content dictionaries. Because content is bundled, strings are already translated at runtime (no network fetch).

**Localization flow (render-time, English source of truth):**

```
UI stratum                Dictionary            Fallback
───────────────────────   ────────────────────   ─────────
t('nav.destinations')  →  i18n.js (en/hi/cg)     en key
localizeDistrict(...)  →  districtData.js        district.name/desc as-is
localizePlaceName(...) →  placeNamesData.js      place.name as-is
localizePlace(...)     →  placeData index merge  place.shortDesc/fullDesc/tips
```

`localizePlace(lang, place)` returns English data unchanged for `lang==='en'`; for `hi/cg` it overwrites `shortDesc/fullDesc/tips` when a matching entry exists (key = exact `place.name`).

### 4.3 Itinerary generation (pure function)
`generateGeoItinerary(districts, days, interests, pace, startingDistrictName)`:
1. Build a pool of every place across districts.
2. Score interest-fit (`scorePlace` via `INTEREST_TYPE_MAP` type→interest mapping).
3. Start at chosen district as anchor; each round sort **unvisited districts first**, then by haversine distance from the current anchor (≈ road planning without a routing API).
4. Fill each day up to `SLOTS_PER_DAY[pace]` slots/times, preferring the starting district on day 1 and re-anchoring each day on that day's centroid.
5. Emit per-day activities with `TimeSlot` times, `distToNextKm`, `driveToNext` labels; group by district for display.

### 4.4 Persistence path (save → share → reopen)
```
Save:  <App> → saveItinerary(payload) → POST /api/save-itinerary
        → Vercel fn validates input (lib/itineraryValidation.js)
        → generates delete_token → PostgREST INSERT (RLS: public insert)
        → returns row {id, delete_token} → App builds ?it=<id> share URL

Reopen: ?it=<id> → fetchItinerary(id) → GET /api/get-itinerary → PostgREST SELECT
My Trips: listItineraries(limit) → GET /api/list-itineraries
Delete: deleteItinerary(id, token) → DELETE /api/delete-itinerary with
        header x-delete-token → RLS compares header GUC to row delete_token.
```

### 4.5 Supabase security model
- `itineraries` is **public for read + insert** (share links require no auth) — enforced by RLS policies.
- **No UPDATE policy** → stored trips are immutable.
- **Delete is capability-gated**: client stores a per-row `delete_token` (returned only at creation); the delete policy matches `request.headers.x-delete-token` against the row value.
- All database access goes through our serverless layer (which applies validation + body-size limits); the browser never talks to Supabase directly.

See `supabase-schema.sql` for the full DDL + policies.

---

## 5. Serverless API surface

| Endpoint | Method | Purpose | Validation / limits |
|---|---|---|---|
| `/api/save-itinerary` | POST | Create & return a shareable itinerary | body ≤ 24 KB; allow-listed keys; interests allow-list; types/ratings curated |
| `/api/get-itinerary?id=` | GET | Fetch one itinerary | id must parse as UUID/handle unknown ids → 404 |
| `/api/list-itineraries?limit=` | GET | Recent public trips | limit capped |
| `/api/delete-itinerary?id=` | DELETE | Delete owned trip | requires `x-delete-token` header matching row |

`api/lib/itineraryValidation.js` is **dependency-free** so the exact code under test runs both in the functions and in Jest.

---

## 6. Security

- **Headers** (`vercel.json`, applied to all routes): CSP (tightened to allow Maps/Fonts/Wikimedia/CG-portal origins), HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`.
- **No secrets in client**: Google Maps key must come from env; Supabase anon key is a *publishable* client key, further protected by RLS. Service-role keys are never used.
- **Input hardening**: allow-list keys/interests, size caps, shape checks on itinerary JSON.
- **.env is gitignored**; only `.env.example` (placeholder values) is committed.

**Env vars (Vercel project)**
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`
- `REACT_APP_GOOGLE_MAPS_API_KEY` (optional — Maps degrades gracefully without it)

---

## 7. Build, test, deploy

- Build: `CI=false react-scripts build` (per `vercel.json`) → output `build/`.
- Local dev: `npm start` (port 3000).
- Tests: `npm test -- --watchAll=false` → 2 suites / 36 tests.
- Deploy: `vercel --prod` from `my-app` (Vercel project `chhattisgarh-travel-planner`, root directory = project root). Production alias: https://chhattisgarh-travel-planner.vercel.app.

---

## 8. Evolution notes

- Current bottleneck: monolith `App.js`. Suggested refactor: extract sections (Hero, PlannerWizard, ItineraryView, TripsManager) into `src/components/`.
- Google Maps key provisioning is the main open external dependency (blocked: billing decision).
- Place/content remain code-managed; a future content studio could drive `placeData` from a CMS instead.