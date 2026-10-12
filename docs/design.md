# Design — Incredible Chhattisgarh Travel Planner

> Visual system & UI patterns. Tailwind CSS 3 + inline styles for dynamic colors. Component inventory.

---

## 1. Brand

- **Name:** Incredible Chhattisgarh (छत्तीसगढ़ / छत्तीसगढ़ी in localised UI).
- **Positioning:** discovery-first, calm, warm, traversal — evoke forests, rivers, tribal art, ancient temples, not neon.
- **Emoji are used as the primary "iconography" accent** for content cards (`🏹`, `🏕️`, `🛕`, `🎨`) alongside `lucide-react` line icons for UI chrome.

---

## 2. Color system

Base: Tailwind palette. Primary accent is **orange** family (`orange-700`/`orange-500`, used for CTAs, day titles, active states).

| Role | Value | Used for |
|---|---|---|
| Primary | Tailwind `orange-700` | Day header bars, buttons, active tabs |
| Accent | `orange-500` | Hover / highlights, small badges |
| Neutral surfaces | `white` / `gray-50` / `gray-100` | Page background, cards |
| Text | `gray-800`/`gray-900` headings, `gray-600` body | Hierarchy |
| Border | `gray-200` / `gray-300` | Card edges, dividers |
| Danger | `red-600` | Delete actions |

**Dynamic colors (not Tailwind classes):**
- `DISTRICT_PALETTE` — per-district accent used for district avatars, day/badge backgrounds, and itinerary connectors. Generated with per-index HSL shifting so Dashboards distinct from each other.
- `distanceColor(km)` — green→amber→red based on drive length (feeds `distanceBadge` styling).

Category chips:
- `nature` → green, `spiritual` → amber, `heritage` → stone/sepia, `urban` → slate, `tribal` → orange.

---

## 3. Typography

- Font stack (Tailwind base in `index.css`): `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif`.
- Headings: bold (`font-bold`), tight leading; Devanagari glyphs render from system fonts (no icon font dependence).
- Long-form descriptions: `text-sm`→`text-base`, `text-gray-700`, justified via CSS (`.justified-text`) for readability with Devanagari.
- FEE/OPEN badges: small `uppercase text-[10px]` with strong color contrast.

---

## 4. Spacing & layout

- Sections are `max-w-7xl mx-auto px-4` containers; hero full-bleed dark.
- Cards: `rounded-xl`, `shadow-sm` resting, `shadow-md` hover, `ring-1 ring-gray-200`.
- CTA / primary buttons: `bg-orange-700 text-white rounded-lg` with hover `bg-orange-600`.
- Breakpoints used: mobile-first; grids go `grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-3`; district detail grid `lg:grid-cols-3` (images | gallery | details).
- Consistently keeps spacing `gap-4/6/8` and padding `p-4/6`.

---

## 5. Components inventory

| Component | Notes |
|---|---|
| `Navbar` | Sticky, translucent-dark over hero; logo left, links + `LanguageSwitcher` right; collapses to hamburger on mobile. Shows "Plan My Trip" + "My Trips" CTAs. |
| `HeroCarousel` | Full-bleed rotating background images w/ `CTB` URLs; overlay gradient; search bar + stats row (33 districts / 385 places / 11 sanctuaries / 3 parks). |
| `SearchAutocomplete` | Debounced; groups results by district vs place; localised matching; click-outside close. |
| `CategoryFilter` | Pill chips: All / Nature / Spiritual / Heritage / Urban / Tribal (with emoji). |
| `DistrictCard` | Image, district name, highlight, dark gradient overlay, hover zoom; click → detail. |
| `DistrictDetailModal` | State "modal" (overlay, full-screen scroll): district header, place grid, filters; each place row expands to gallery + photos + full details. |
| `PlaceDetailModal` | Photo hero row, rating stars (lucide `Star`), badges (FEE, OPEN), `shortDesc`/`fullDesc`, tips list, gallery `PlaceImageGrid` + carousel + `ImageLightbox`. |
| `TribalEcoCard` | Emoji-lead cards: icon, title, duration, description, tags, `responsibleTip` callout. |
| `PlannerWizard` | Stepper (1–5) with steps: Starting District → Interests → Pace → Budget → Group type. Back/Next + final "Build My Itinerary (✨)". |
| `ItineraryView` | Day tabs/cards colored by `DISTRICT_PALETTE`; ordered activity rows w/ time chips; `DistanceConnector` for within-day km/time + inter-district connector bars. |
| `InsightCard` / `RecommendationCard` | Icons + point form; itinerary summary (days, places, km, budget, difficulty). |
| `DayMap` | Wrapped `GoogleMapView` (markers + polyline) when key present; `PlaceholderMap` (styled box, coords + hint) otherwise. |
| `SaveModal` | Trip name + Save; returns share link with copy button (`?it=<id>`). |
| `MyTripsView` | Grid of saved trips (name/date/district/days); open link or delete with token. |
| `Footer` | Links, credit, responsible-travel line. |

---

## 6. Imagery

- **Remote images only** (bundle stays small): Wikimedia Commons thumbs and Chhattisgarh Tourism portal (`CTB` base URL) + old `WM`/`WMF` bases.
- `ImgWithFallback` swap to `FALLBACK` (local jpg) on error; `DISTRICT_FALLBACKS` per-district themed images.
- Object-fit: `object-cover` everywhere; heights standardized (`h-40/48/52`) so cards stay aligned.
- All images: `loading="lazy"` below the fold, `alt` text present.

---

## 7. States & feedback

- Loading (maps, save, trips fetch): skeleton or subtle spinner; never blank.
- Empty: friendly message (e.g. no search results).
- Error (image broken, no maps key, save failed): graceful fallback + actionable hint; never crash.
- Modal/lightbox: overlay + Esc/close button; body scroll lock.

---

## 8. Accessibility & i18n rendering

- Colors remain readable on the orange buttons (white text) and light surfaces (gray-800 text).
- Devanagari strings are longer than Latin — layouts use `flex-wrap`, truncate with `…`, and no fixed widths on labels.
- Interactive targets ≥ 40 px; focus-visible outlines retained.
- `©`/superscripts and stacked badges avoid clipping in `text-[10px]`.

---

## 9. Anti-patterns

- Do **not** inline new hex colors for content accents — reuse `DISTRICT_PALETTE` / Tailwind scale.
- Do **not** hardcode screenshot-specific layouts (e.g., exact pixel widths) — keep to the scale.
- Do **not** introduce image domains outside the trusted set (Wikimedia, CG portal, local fallback) without checking CSP in `vercel.json`.