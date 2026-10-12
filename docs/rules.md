# Rules & Conventions — Incredible Chhattisgarh

Rules every change to this repo must follow. These exist so the trilingual content model, the security model and the build stay consistent.

---

## 1. Commands (the gate)

Every change must keep these green:

```bash
npm install        # first time only
npm start          # dev server (port 3000)
npm test -- --watchAll=false   # REQUIRED before shipping — 36 tests, 2 suites
npm run build      # REQUIRED before shipping — must exit clean
```

> Build may emit **pre-existing warnings only**:
> `placeimage.js` — 'CTBP' defined but never used; `RAIPUR_NEW_IMAGES` unused.
> Do not introduce new warnings; do not force-clean the two known ones without removing the dead code properly.

---

## 2. Content model rules (CRITICAL — this is a trilingual catalogue)

1. **English is the source of truth.**
   - District data lives in `App.js` (`ALL_DISTRICTS`).
   - Place data lives in the district records (`touristPlaces[]` with `shortDesc`, `fullDesc`, `tips`…).
   - `entryFee` and `bestTime`/`timings` stay **English** (the UI parses `/free/i` and formats fee labels from them).
2. **Translations are additive, never replacement.**
   - `src/districtData.js` → hi/cg district blurbs (`localizeDistrict`).
   - `src/placeNamesData.js` → hi/cg place *names* (`localizePlaceName`).
   - `src/placeData/<district>.js` → hi/cg `shortDesc/fullDesc/tips` (`localizePlace`).
   - **Key = exact English `place.name`.** If a key doesn't match, the translation is silently dropped and English is shown — that counts as a bug.
3. **Adding a translation file requires:**
   - One file per district in `src/placeData/` (Raipur is split into `raipur1/2/3`).
   - Register every file in `src/placeData/index.js` (import + spread into the merged map).
   - A full-fidelity scan check: every `place.name` in the merged catalogue (core 239 + supplemental 146) must have a translation entry (script compares merged `TOURIST_PLACES` keys vs merged `placeData` + `supplemental/lang` keys → expect `total 385, missing 0`; supplemental parity is enforced by `src/supplemental/supplemental.test.js`).
   - Do **not** add zh/cg guesswork — work from the English canonical strings.
4. **All visible UI chrome strings use i18n** (`t('key')`) in `src/i18n.js` dictionaries. Do not hardcode user-visible English in JSX. Keep `en/hi/cg` keys in sync — a key added in one dictionary must be added in all three.
5. **Dynamic interpolation** uses `{param}` placeholders, e.g. `t('stats.cities', { count })`. Never build sentences by string concatenation (breaks Hindi/CG word order).

---

## 3. Structure & naming

- Data modules stay in `src/`; translation files live in `src/placeData/` (core) and `src/supplemental/lang/` (supplemental).
- Supplemental places live in `src/supplemental/` — English catalogue (`catalog/part1..6.js`) + `lang/` hi/cg blocks; merged into the runtime `DISTRICTS` and the ML catalogue (`ml/scripts/extract_catalog.mjs`). Keys must match the exact English `place.name`; order per district must match `src/supplemental/index.js`.
- API handlers live in `api/`; shared logic in `api/lib/` (must stay **dependency-free** so Jest can import it without a bundler).
- Follow existing patterns (see a neighbor file) rather than introducing new structure.
- `App.js` is the monolith — prefer **editing within its conventions** for feature work; suggest decomposition in `task.md` before doing a refactor as a by-product change.

---

## 4. Security rules (non-negotiable)

1. **Never commit real secrets.** `.env`, `.env.production`, `*.log` are gitignored. Commit only `.env.example` with placeholder values.
2. **Publishable keys only in the browser.** Supabase **anon** key is fine client-side (RLS protects the data). Never expose `service_role` or `postgres` keys anywhere.
3. **Never talk to Supabase directly from the browser** — always through `/api/*` serverless functions, which validate the payload.
4. **Keep RLS intact** — public insert/select, capability-gated delete via `x-delete-token`, no update. Don't "simplify" by opening DELETE.
5. **Google Maps**: never hardcode a key. `googleMapsConfig.js` gates on env var; the app must render the placeholder when it's missing.
6. **Headers**: any new vercel.json change must keep CSP/HSTS/nosniff/DENY referrer rules. Verify with a production fetch after deploy.

---

## 5. Testing rules

- New validation logic goes in `api/lib/` (dependency-free) and gets a test in `src/security/`.
- Run the full suite, not just the new test.
- Keep tests hermetic — no live Supabase calls (RLS tests simulate the SQL semantics or assert SQL text).

---

## 6. Git & workflow

- Default branch: `main`. Remote: `origin` → `https://github.com/vartikaverma737/chhattisgarh_travel-planner.git`.
- Commit with a concise summary line describing user-visible change; no secrets, no generated files (`build/`, env files, logs).
- Deploy after verified build+tests: `vercel --prod` from `my-app` (project `chhattisgarh-travel-planner`). Root directory is the project root; do not reintroduce a stale subdirectory root.
- Vercel env vars (Production): `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_ANON_KEY`; optional `REACT_APP_GOOGLE_MAPS_API_KEY`.

---

## 7. Content quality & tone

- Keep descriptions factual; mention tribal/eco context respectfully.
- Every tribal/eco experience card carries a `responsibleTip` — keep those.
- Categorical labels map types→interests (natural: nature, culture: localculture…). Extend the maps when adding a new place type, and keep `cat.*` i18n keys aligned.
- District color palette is centralised (`DISTRICT_PALETTE`) — index trips by district color, don't invent new colors per place.