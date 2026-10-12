#!/usr/bin/env python3
"""Offline evaluation of the recommendation model (no real user data exists yet).

Simulates implicit-feedback users: each synthetic user has a set of "seen"
places (which build their embedding profile) and "unseen target" places. We
measure whether the targets surface in the model's top-N ranked candidates
against a random baseline -> recall@N and lift. Metrics are written to
ml/artifacts/evaluation.json.
"""
import json
import os
import random

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EMB = os.path.join(ROOT, "src", "recommender", "models", "embeddings.json")
OUT = os.path.join(ROOT, "ml", "artifacts", "evaluation.json")

N_USERS = 60
SEEN_PER_USER = 5
TARGETS_PER_USER = 4
TOP_KS = [5, 10, 20]


def main():
    random.seed(7)
    with open(EMB, "r", encoding="utf-8") as fh:
        model = json.load(fh)
    V = np.array(model["vectors"])
    n = len(model["names"])
    rng = random.Random(7)

    hits = {k: 0 for k in TOP_KS}
    base_hits = {k: 0 for k in TOP_KS}
    totals = 0
    for _ in range(N_USERS):
        pool = list(range(n))
        rng.shuffle(pool)
        seen = pool[:SEEN_PER_USER]
        targets = pool[SEEN_PER_USER : SEEN_PER_USER + TARGETS_PER_USER]
        profile = V[seen].mean(axis=0)
        profile /= np.linalg.norm(profile) + 1e-9
        sims = V @ profile
        cand = [i for i in range(n) if i not in seen]
        for t in targets:
            order = sorted(cand, key=lambda i: -sims[i])
            random_order = list(cand)
            rng.shuffle(random_order)
            totals += 1
            for k in TOP_KS:
                if t in order[:k]:
                    hits[k] += 1
                if t in random_order[:k]:
                    base_hits[k] += 1

    metrics = {}
    for k in TOP_KS:
        r = hits[k] / totals
        b = base_hits[k] / totals
        metrics[f"recall@{k}"] = round(r, 4)
        metrics[f"random_baseline@{k}"] = round(b, 4)
        metrics[f"lift@{k}"] = round(r / b, 2) if b else None

    metrics["users"] = N_USERS
    metrics["targets"] = totals
    print(json.dumps(metrics, indent=2))

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as fh:
        json.dump(metrics, fh, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    main()