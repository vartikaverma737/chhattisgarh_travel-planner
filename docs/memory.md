# Memory — Project context & decisions log

Living memory of the project so future sessions pick up instantly. Update on meaningful change.

---

## 1. Project snapshot

- **What:** "Incredible Chhattisgarh" — trilingual (EN/HI/CG) tourism discovery + trip planner for Chhattisgarh, India.
- **Coverage:** 33 districts, 385 tourist places (239 core + 146 supplemental), 11 wildlife sanctuaries, 3 national parks.
- **Stack:** React 19 + CRA 5 (plain JS/JSX — **no TypeScript**), Tailwind 3, lucide-react, Vercel serverless + Supabase Postgres, optional Google Maps.
- **Tests:** 61 (4 suites) — validation, RLS semantics, recommender, supplemental parity (`security/*` + `recommender/model.test.js` + `supplemental/supplemental.test.js`). **Always run + pass before shipping.**
- **Concurrency note:** no SSR; content bundles into the JS. App is a single `App.js` monolith (~1900 lines).

## 2. Local environment & paths

```
Working dir: C:\Users\verma\OneDrive\Desktop\travel_planner\my-travel-app\my-app   (git root)
Shell:       Windows PowerShell 5.1   (no && — use "; if ($?) {...}")
Dev server:  npm start  → http://localhost:3000
Temp/tool:   C:\Users\verma\AppData\Local\Temp\opencode (pre-approved scratch)
```

Use the `workdir` param instead of `cd`. Quote paths with spaces. When piping/encoding on PS 5.1, prefer `Get-Content -Raw` + explicit UTF-8 where Devanagari is involved.

## 3. Services inventory

| Service | Identifier | Purpose |
|---|---|---|
| Git remote | `origin`: https://github.com/vartikaverma737/chhattisgarh_travel-planner.git | Source of truth; branch `main` in sync with `origin/main` |
| Vercel | Project `chhattisgarh-travel-planner` (team `vartikaverma737s-projects`); Vercel CLI 59.23.2, authed as `vartikaverma737` | Production host. Root dir = project root (was wrongly `my-travel-app/my-app`; fix committed with `vercel project update --auto-detect root-directory`) |
| Prod URL | https://chhattisgarh-travel-planner.vercel.app | Live site; verify 200 + CSP after deploy |
| Supabase | `https://ofwkmyxmatzaibpeiuvx.supabase.co` – anon key `sb_publishable_qdyVlChuGW9fdMSwOYqzQA_AOGRb3tJ` | PostgREST backend for itineraries. **Publishable key only; RLS is the real gate.** |
| Maps | Leaflet 1.9.4 (CDN, lazy) + OpenStreetMap tiles | **Free & key-less** — no API key, no billing. `googleMapsConfig.js` loads Leaflet on demand; `GoogleMapView.jsx` renders markers, popups, route polyline. Google named surface kept for easy swap. |

## 4. Key decisions (and why)

1. **Render-time localization, English source of truth.** Data stays English; hi/cg translations live in sibling dicts keyed by exact English place/district name (`districtData`, `placeNamesData`, `placeData/*`). Fallback = English automatically. → lowest maintenance; no backend i18n.
2. **`entryFee` / `bestTime` / `timings` remain English** because UI parses `/free/i` and formats fee labels programmatically.
3. **Insights stored as structured `{key, params}`** so legacy saved English trips still translate at render; never store raw HTML strings.
4. **No accounts.** Capability-based persistence: save returns `delete_token`; delete requires matching it via `x-delete-token` header (PostgREST GUC in RLS). No UPDATE policy → immutable trips.
5. **Browser never touches Supabase directly** — always through `/api/*` serverless functions which validate input (allow-lists, ≤24 KB body). `api/lib/itineraryValidation.js` stays dependency-free so Jest tests the exact prod code.
6. **Maps = free Leaflet + OSM, key-less.** `googleMapsConfig.js` lazily injects Leaflet CSS/JS from unpkg and keeps the `MAPS_*` state machine; `GoogleMapView.jsx` renders tiles/markers/popups/polyline and `invalidateSize()`s after mount (modals). Historic Google-named API (`loadGoogleMaps`, `getMapsStatus`) retained so a paid key can be swapped back in by touching only these two files.
7. **Static content in bundle** (no CMS) — keeps product simple; tradeoff flagged in backlog.
8. **Hybrid two-tower recommender (YouTube-style).** Offline half = Python (`ml/train.py`): TF-IDF → TruncatedSVD (20-d) embeddings + top-10 cosine neighbours + popularity prior, exported to `src/recommender/models/*.json`. Online half = JS (`model.js` + `useRecommender.js`): user profile = recency-weighted mean embedding of viewed places, candidates ranked by cosine + popularity (+ freshness slot); search = lexical relevance (0.75) blended with profile (0.25). Artifacts are looked up **by name**, so order-safe; missing names degrade gracefully to popularity. `ml/evaluate.py` shows recall@20 lift 1.82× vs random. Retrain command documented in `ml/README.md`.

## 5. Gotchas & warnings

- **Build warnings (pre-existing, tolerated):** `placeimage.js` `CTBP` unused; `RAIPUR_NEW_IMAGES` unused. Don't add new warnings.
- **Recommender sync:** embeddings are aligned to `buildPlacePool` order (district `flatMap`) at extraction time; the hook looks up by name so order changes are safe, but new/renamed places show zero-profile until `ml/train.py` re-runs.
- **i18n dup keys:** couple of keys are intentionally duplicated (`lang.label.java` legacy) — don't "clean" without checking the switcher still renders.
- **`App.js` line numbers drift fast** — reference by symbol not line.
- **ESLint + anonymous Arrow default exports** (`App.js`: `export default () => …`) — CRA noisy-cwx-compliant; fine.
- **LF/CRLF + Unicode:** `git` may warn on line ending changes; Devanagari must be written with UTF-8 (write tool handles it).
- **`dev-server.log`** was generated during debugging — gitignored now; don't commit such logs.
- **Vercel stale root directory** risk — never point root to a subfolder again; env set at project level (Production context).
- Real creds referenced in this doc were already embedded in repo **history**; future security review may rotate them — rotate before making the repo public beyond current collaborators.

## 6. Recurring commands

```bash
npm test -- --watchAll=false
npm run build
npm start
vercel --prod                 # deploy from my-app
vercel env add REACT_APP_SUPABASE_URL   # set prod env (one-time done)
python ml/train.py            # retrain recommender artifacts (from ml/; see ml/README.md)
```

## 7. Next-up (see task.md for full board)

1. Refresh README (currently CRA boilerplate + dead URL).
2. (Resolved) Maps now run key-less via Leaflet + OSM. Optional later: swap in a paid Google Maps key if richer imagery/Street View is wanted.
3. Retrain recommender (`ml/train.py`) whenever place data in `App.js` changes.
4. Optional architecture cleanup: decompose `App.js`.
5. Keep translation coverage scan at 385/385 (core 239 + supplemental 146) when touching place data.

## 8. Note on this file

This file is the session memory; update the "Key decisions / Gotchas / Next-up" sections whenever a significant choice or block resolves.