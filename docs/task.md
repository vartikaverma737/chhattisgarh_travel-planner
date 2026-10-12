# Task Board — Incredible Chhattisgarh

Live working list. Legend: ✅ done · 🚧 in progress · ⏸️ paused/blocked · ☐ backlog.

---

## Docs & repo hygiene ✅
- ✅ Verify translation coverage script: 239/239 core place keys matched; supplemental parity enforced by `src/supplemental/supplemental.test.js` (merged catalogue now 385).
- ✅ 6 docs created (this file, prd, architecture, rules, design, memory).
- ✅ `.env`/`.env.production` removed from git history; `.env.example` added.
- ✅ `.gitignore` covers `.env.*` (except `.env.example`) + `*.log`.

## Trilingual content ✅
- ✅ All 35 `src/placeData/*.js` files written & registered in `placeData/index.js`.
- ✅ `districtData.js` (33 hi/cg blurbs), `placeNamesData.js` (239 core + 146 supplemental names) complete.
- ✅ Supplemental catalogue: 146 new places across all 33 districts in `src/supplemental/` (English source + `lang/` hi/cg blocks), wired into `App.js DISTRICTS`, `placeData`, `placeNamesData` — merged catalogue = 385 places.
- ✅ `i18n.js` EN/HI/CG dictionaries aligned; render-time fallback to English.
- ✅ Tribal & eco experiences localised (Bastar Dussehra, Dhokra, Abujhmaad, Mainpat, haats, Gond art, Sabari, Achanakmar, Kanger).
- ✅ Build + tests green after content pass.

## Itinerary & maps
- ✅ Geo heuristic planner: `generateGeoItinerary`, `scorePlace`, distance/time connectors, per-day maps.
- ✅ Lazy Google Maps via `googleMapsConfig.js` (`MAPS_LOADING/LOADED/ERROR/MISSING_KEY`) with `PlaceholderMap` fallback.
- ⏸️ **Add real Google Maps API key** (`REACT_APP_GOOGLE_MAPS_API_KEY`) to Vercel env. Paused — requires billing decision, no key on hand.

## Persistence & security ✅
- ✅ Supabase schema + RLS (public insert/select, capability delete, no update). SQL in `supabase-schema.sql`.
- ✅ Serverless `/api` — save/get/list/delete with dependency-free validation in `api/lib/itineraryValidation.js`; body-size + key/interests allow-lists.
- ✅ 36 tests green (`security/itineraryValidation.test.js`, `security/supabaseSecurity.test.js`).
- ✅ Security headers via `vercel.json` (CSP, HSTS, nosniff, DENY referrer).
- ✅ Verified live on production host (200 + CSP header check).

## Recommender (ML) — YouTube-style discovery ✅
- ✅ Offline pipe: `ml/scripts/extract_catalog.mjs` (merges core + supplemental) + `ml/train.py` (TF-IDF → TruncatedSVD 20-d embeddings, top-10 cosine neighbours, rating popularity prior) → artifacts `src/recommender/models/{embeddings,neighbors,popularity}.json` (385 places, unique names).
- ✅ `ml/evaluate.py` simulated-user eval → recall@5 0.021 (lift 1.67), recall@10 0.046 (1.57), recall@20 0.083 (1.82); `ml/artifacts/evaluation.json`.
- ✅ `src/recommender/model.js` pure JS core (profile from recency-weighted views, hybrid rank, personalised search, sparse TF-IDF fallback); `storage.js` localStorage view/search history.
- ✅ `src/recommender/useRecommender.js` hook wiring artifacts + history into App.js.
- ✅ App integration: "Recommended for you / Trending" home strip, "More places like this" in the detail modal, personalised search ranking + "because you watched" chip, view tracking on detail open.
- ✅ i18n `rec.*` keys added EN/HI/CG.
- ✅ 19 recommender Jest tests + 6 supplemental guard tests — **61 total pass**.

## Deployment ✅
- ✅ Vercel project `chhattisgarh-travel-planner`; root directory corrected (was stale `my-travel-app/my-app`).
- ✅ Vercel env: `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY` (Production).
- ✅ Prod live: https://chhattisgarh-travel-planner.vercel.app
- ✅ Git: `main` synced with `origin`; all commits pushed.

---

## ☐ Backlog / next candidates

- ☐ **Decompose `App.js`** (~1900 lines) into `src/components/` modules (Hero, PlannerWizard, ItineraryView, TripsManager…) without behavior change.
- ☐ **Refresh README.md** — currently stock CRA boilerplate + dead demo URL (`my-app-eight-livid-93.vercel.app`); replace with real name, live URL, setup commands (incl. env) and pointers to the docs.
- ☐ **Lint cleanup:** remove unused `CTBP` / `RAIPUR_NEW_IMAGES` in `placeimage.js` (build warning), and any i18n duplicate-key warnings.
- ☐ **Add Google Maps key** (then un-pause map integration tests; verify real polyline render + fallback removal conditions).
- ☐ **Search QA:** verify debounce + localized matching across the 385-place merged catalogue (add Jest coverage for search helper if extracted).
- ☐ **PWA/offline** evaluation (service worker caching for images-heavy catalogue).
- ☐ **Retrain recommender** whenever the catalogue in `App.js` changes (`node ml/scripts/extract_catalog.mjs && python ml/train.py`) — new places get zero vectors until then.
- ☐ **Per-district place counts** — surface a "N places" stat on district cards (data already present).
- ☐ **Analytics** — lightweight event counters for plan conversions and language preference (no ad-trackers).
- ☐ **i18n glossary enforcement** — tooling to lint for hardcoded UI strings.

---

## Regression checklist (before every release)

1. `npm test -- --watchAll=false` → 61 pass (36 security + 19 recommender + 6 supplemental).
2. `npm run build` → no new warnings.
3. Manual: lang switch EN→HI→CG renders chrome + content; search works; planner produces a sensible 2–3 day trip; save/share URL reopens; delete works with token; maps placeholder graceful (no key).
4. `vercel --prod`, then fetch production URL for status 200 + CSP headers present.