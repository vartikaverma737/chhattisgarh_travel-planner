#!/usr/bin/env python3
"""Train the offline half of the hybrid recommender and export runtime artifacts.

Pipeline (all deterministic, random_state pinned):
  1. Load ml/data/places.json (extracted from src/App.js).
  2. TF-IDF text features over name + type + shortDesc + fullDesc.
  3. TruncatedSVD (matrix factorization) -> dense latent embeddings.
  4. Cosine item-to-item neighbours (top-k).
  5. Popularity prior from ratings (min-max scaled).

Exports (also copied to ml/models/ for audit):
  src/recommender/models/embeddings.json   - { names[], dim, vectors[][] }
  src/recommender/models/neighbors.json    - { names[], edges[[idx, score][]], k }
  src/recommender/models/popularity.json   - { names[], scores[] }
  ml/artifacts/tfidf.json                  - vectorizer vocab/idf (audit only)
  ml/artifacts/model_meta.json             - training metadata
"""
import json
import math
import os

import numpy as np
from sklearn.decomposition import TruncatedSVD
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import normalize

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "ml", "data", "places.json")
OUT_JS = os.path.join(ROOT, "src", "recommender", "models")
OUT_ML = os.path.join(ROOT, "ml", "models")
OUT_ART = os.path.join(ROOT, "ml", "artifacts")
RANDOM_STATE = 42
EMBED_DIM = 20
TOP_K_NEIGHBORS = 10


def field(place):
    parts = [
        place["name"],
        place.get("type", ""),
        place.get("shortDesc", ""),
        place.get("fullDesc", ""),
    ]
    return " ".join(str(p) for p in parts if p)


def main():
    for d in (OUT_JS, OUT_ML, OUT_ART):
        os.makedirs(d, exist_ok=True)

    with open(DATA, "r", encoding="utf-8") as fh:
        districts = json.load(fh)

    places = [p for d in districts for p in d["touristPlaces"]]
    names = [p["name"] for p in places]
    corpus = [field(p) for p in places]
    print(f"Catalogue: {len(names)} places")

    vec = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2),
        max_features=1500,
        sublinear_tf=True,
    )
    X = vec.fit_transform(corpus)
    print(f"TF-IDF matrix: {X.shape}")

    svd = TruncatedSVD(n_components=min(EMBED_DIM, X.shape[1] - 1), random_state=RANDOM_STATE)
    embeddings = normalize(svd.fit_transform(X))
    print(f"Embeddings: {embeddings.shape}, explained variance: {svd.explained_variance_ratio_.sum():.3f}")

    # Dense cosine similarity -> neighbours
    S = embeddings @ embeddings.T
    edges = []
    for i in range(len(names)):
        order = np.argsort(-S[i])[1 : TOP_K_NEIGHBORS + 1]  # skip self (largest)
        edges.append([[int(j), float(round(S[i, j], 6))] for j in order])

    ratings = np.array([float(p.get("rating") or 0.0) for p in places])
    rmin, rmax = ratings.min(), ratings.max()
    popular = [0.0] * len(ratings)
    if rmax > rmin:
        popular = [float(round((r - rmin) / (rmax - rmin), 6)) for r in ratings]

    def dump(name, payload):
        path = os.path.join(OUT_JS, name)
        with open(path, "w", encoding="utf-8") as fh:
            json.dump(payload, fh, separators=(",", ":"))
        with open(os.path.join(OUT_ML, name), "w", encoding="utf-8") as fh:
            json.dump(payload, fh, separators=(",", ":"))
        print(f"Exported {name} ({os.path.getsize(path)} bytes)")

    dump("embeddings.json", {
        "names": names,
        "dim": embeddings.shape[1],
        "vectors": [[float(round(float(v), 6)) for v in row] for row in embeddings],
    })
    dump("neighbors.json", {"names": names, "k": TOP_K_NEIGHBORS, "edges": edges})
    dump("popularity.json", {"names": names, "scores": popular})

    with open(os.path.join(OUT_ART, "tfidf.json"), "w", encoding="utf-8") as fh:
        vocab = {str(k): int(v) for k, v in vec.vocabulary_.items()}
        json.dump({"vocabulary": vocab, "idf": vec.idf_.tolist()}, fh, separators=(",", ":"))
    with open(os.path.join(OUT_ART, "model_meta.json"), "w", encoding="utf-8") as fh:
        json.dump({
            "places": len(names),
            "features": int(X.shape[1]),
            "embed_dim": embeddings.shape[1],
            "explained_variance": float(svd.explained_variance_ratio_.sum()),
            "districts": len(districts),
            "random_state": RANDOM_STATE,
            "n_neighbors": TOP_K_NEIGHBORS,
        }, fh, indent=2, ensure_ascii=False)
    print("Done.")


if __name__ == "__main__":
    main()