# offline recommender pipeline (ML)

Trains the offline half of the hybrid two-tower recommender that powers the
app's personalised discovery. The online half is `src/recommender/useRecommender.js`.

## Why

- Home page "Recommended for you" uses a recency-weighted user profile built
  from the local view history, ranked by cosine similarity against latent
  place embeddings, plus popularity and freshness priors.
- "More places like this" uses a precomputed similarity graph.
- Search results are personalised by blending lexical relevance with profile
  similarity.

## Pipeline

1. `node scripts/extract_catalog.mjs`
   Parses `const ALL_DISTRICTS` from `src/App.js` and writes the flat,
   deterministic catalogue to `data/places.json` (33 districts, 239 places).
   Ordering here MUST match `buildPlacePool` in App.js: district
   `flatMap` order — it defines the embedding row order.

2. `python train.py`
   - TF-IDF (`English` stop words, 1-2 word n-grams, max 1500 features,
     sublinear TF) over each place's name, type, short/full descriptions,
     district name, tags and tips.
   - `TruncatedSVD` → 20-dim latent embeddings (literal embeddings).
   - Top-10 cosine neighbours per place (item-item graph).
   - Min-max scaled popularity prior from ratings.
   - Writes the JS-consumed artifacts to `src/recommender/models/`:
     `embeddings.json`, `neighbors.json`, `popularity.json` — plus model
     copies under `ml/models/` and audit dumps under `ml/artifacts/`.

3. `python evaluate.py`
   Simulates users who browse several similar places, then measures
   recall@N / lift over a random baseline. Latest run writes
   `ml/artifacts/evaluation.json`: recall@5 0.021 (lift 1.67), recall@10
   0.046 (lift 1.57), recall@20 0.083 (lift 1.82).

## Retraining

Re-run steps 1-2 whenever the catalogue in `src/App.js` changes (new places,
districts, or descriptions). Because the app looks embeddings up by name,
newly added places get zero vectors until retrained; they still surface via
popularity.

- Dependencies: `pip install -r ml/requirements.txt`
- Windows: use `py -3.11` or `py -3.13` (scikit-learn 1.5.2 verified).

## Runtime

- `src/recommender/model.js` — pure JS math (TF-IDF fallback, cosine, profile,
  hybrid ranking, personalised search).
- `src/recommender/storage.js` — localStorage view/search history.
- `src/recommender/useRecommender.js` — React hook wiring model + artifacts +
  history into App.js.