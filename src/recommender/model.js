// ─────────────────────────────────────────────────────────────────────────────
// Recommender core — pure, dependency-free maths used by the runtime engine and
// the Jest suite. This is the "online half" of a hybrid two-tower recommender:
//
//   Offline half (ml/): TF-IDF features → TruncatedSVD embeddings per place,
//                       cosine item-item neighbours, popularity priors.
//                       Exported to src/recommender/models/*.json
//   Online half (this): a user profile = recency-weighted mean of the
//                       embeddings of every place the user has viewed, then
//                       candidates are ranked by cosine similarity to that
//                       profile + popularity + contextual logic.
//
// Nothing in this file touches React, the DOM, or storage — so Jest runs the
// exact same code that ships to production.
// ─────────────────────────────────────────────────────────────────────────────

const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'from', 'this', 'that', 'are', 'its', 'you',
  'your', 'all', 'one', 'two', 'most', 'some', 'into', 'over', 'about', 'very',
  'also', 'when', 'which', 'their', 'there', 'them', 'than', 'they', 'those',
]);

// Tune these to shift behaviour. They feed every ranking in the app.
export const REC_WEIGHTS = {
  similarity: 0.7, // how much the profile/related embedding match matters
  popularity: 0.2, // how much crowd wisdom (rating prior) matters
  freshness: 0.1, // small recency prior so recommendations stay lively
};

export const SEARCH_WEIGHTS = {
  relevance: 0.75, // lexical match on the query (always dominant)
  personalization: 0.25, // preference boost (YouTube-style "for you" ranking)
};

export const PROFILE_DECAY_PERCENT = 2; // % weight lost every DECAY_HALFWAY_DAYS
export const DECAY_HALFWAY_DAYS = 14;

/**
 * Keep the same token light-stopword behaviour in both halves of the model.
 */
export function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(value) {
  return normalizeText(value)
    .split(' ')
    .filter(t => t.length >= 3 && !STOPWORDS.has(t));
}

/**
 * L2 norm of a dense vector.
 */
export function l2Norm(vec) {
  if (!vec) return 0;
  let sum = 0;
  for (let i = 0; i < vec.length; i++) sum += vec[i] * vec[i];
  return Math.sqrt(sum);
}

/**
 * Cosine similarity between two dense vectors (optionally with precomputed norms).
 */
export function cosine(a, b, normA, normB) {
  if (!a || !b || a.length !== b.length || a.length === 0) return 0;
  const na = normA == null ? l2Norm(a) : normA;
  const nb = normB == null ? l2Norm(b) : normB;
  if (!na || !nb) return 0;
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot / (na * nb);
}

/**
 * Lightweight runtime TF-IDF builder (fallback when SVD embedding artifacts are
 * not bundled). tokenDocs is an array of token arrays (already tokenized).
 * Returns { terms, vectors, norms } where vectors[i] is a Map<term, tfIdf>.
 */
export function buildTFIDF(tokenDocs) {
  const df = new Map();
  tokenDocs.forEach(tokens => {
    const seen = new Set();
    tokens.forEach(t => {
      if (!seen.has(t)) {
        seen.add(t);
        df.set(t, (df.get(t) || 0) + 1);
      }
    });
  });
  const N = tokenDocs.length;
  const vectors = tokenDocs.map(tokens => {
    const tf = new Map();
    tokens.forEach(t => tf.set(t, (tf.get(t) || 0) + 1));
    const max = Math.max(1, ...tf.values());
    const vec = new Map();
    tf.forEach((count, t) => {
      const idf = Math.log((N + 1) / ((df.get(t) || 0) + 1)) + 1;
      vec.set(t, (count / max) * idf);
    });
    return vec;
  });
  const norms = vectors.map(vec => l2Norm([...vec.values()]));
  return { terms: [...df.keys()], vectors, norms };
}

export function sparseCosine(a, b, normA, normB) {
  if (!a || !b || a.size === 0 || b.size === 0) return 0;
  const na = normA == null ? l2Norm([...a.values()]) : normA;
  const nb = normB == null ? l2Norm([...b.values()]) : normB;
  if (!na || !nb) return 0;
  let base = a;
  let other = b;
  if (base.size > other.size) { base = b; other = a; }
  let dot = 0;
  base.forEach((v, k) => {
    if (other.has(k)) dot += v * other.get(k);
  });
  return dot / (na * nb);
}

/**
 * Concatenate the fields used for content features (must mirror ml/feature text).
 */
export function itemText(place) {
  return [place.name, place.type, place.shortDesc, place.fullDesc].filter(Boolean).join(' ');
}

/**
 * Map an item to its own embedding (dense). `embeddings` may be:
 *  - an array of dense vectors indexed by the order items were inserted, or
 *  - a sparse index Map<term, weight> from the TF-IDF fallback.
 */
export function vectorOf(item, index, embeddings, sparseVectors) {
  if (embeddings && Array.isArray(embeddings) && index < embeddings.length) return embeddings[index];
  if (sparseVectors && sparseVectors[index]) return sparseVectors[index];
  return null;
}

/**
 * Build a recency-weighted mean profile vector from a list of viewed items.
 * viewEntries: [{ vector, ts }] (dens down to profile; sparse needs embedding).
 * Returns { vector, norm, count }.
 */
export function buildUserProfile(viewEntries, decayPct = PROFILE_DECAY_PERCENT, halfwayDays = DECAY_HALFWAY_DAYS) {
  const dense = viewEntries.filter(e => Array.isArray(e.vector) && e.vector.length > 0);
  if (dense.length === 0) return { vector: null, norm: 0, count: 0 };
  const dim = dense[0].vector.length;
  const profile = new Array(dim).fill(0);
  const now = Date.now();
  let wsum = 0;
  dense.forEach(entry => {
    const ageDays = (now - (entry.ts || now)) / 86400000;
    const halfLives = ageDays / halfwayDays;
    const weight = Math.pow(1 - decayPct / 100, halfLives);
    for (let i = 0; i < dim; i++) profile[i] += entry.vector[i] * weight;
    wsum += weight;
  });
  if (wsum <= 0) return { vector: null, norm: 0, count: 0 };
  for (let i = 0; i < dim; i++) profile[i] /= wsum;
  return { vector: profile, norm: l2Norm(profile), count: dense.length };
}

/**
 * Hybrid candidate score for an item against a user profile (or a seed item).
 */
export function hybridScore(profile, itemEmbedding, itemNorm, popularity, freshness, weights = REC_WEIGHTS) {
  const sim = cosine(profile, itemEmbedding, null, itemNorm);
  let score = (sim + 1) * 0.5 * weights.similarity; // cosine ∈ [-1,1] → lift to [0,1]
  score += (popularity || 0) * weights.popularity;
  score += (freshness || 0) * weights.freshness;
  return Math.round(score * 100000) / 100000;
}

/**
 * Rank every item in `indices` against a profile or seed embedding.
 * Returns desc-sorted [{ index, score }].
 */
export function rankCandidates(indices, embeddings, norms, profileNorm, profile, popularity, freshness, weights = REC_WEIGHTS) {
  const scored = [];
  for (const index of indices) {
    const vec = embeddings[index];
    if (!vec) continue;
    scored.push({
      index,
      score: hybridScore(profile, vec, norms[index], popularity?.[index], freshness?.[index], weights),
    });
  }
  return scored.sort((a, b) => b.score - a.score);
}

/**
 * Item-to-item neighbours on dense embeddings (cosine). Excludes self.
 */
export function nearestNeighbors(itemIndex, embeddings, norms, k = 8) {
  const me = embeddings[itemIndex];
  if (!me) return [];
  const all = [];
  for (let i = 0; i < embeddings.length; i++) {
    if (i === itemIndex) continue;
    const sim = cosine(me, embeddings[i], norms[itemIndex], norms[i]);
    all.push({ index: i, similarity: sim });
  }
  all.sort((a, b) => b.similarity - a.similarity);
  return all.slice(0, k);
}

/**
 * Lexical search score for a place against a query (token bag matching on TF).
 * Weighted fields: name > type > shortDesc > fullDesc.
 */
export function searchRelevance(queryTokens, place) {
  if (!queryTokens.length) return 0;
  const text = (key) => normalizeText(place[key] || '');
  const fields = [
    { tokens: text('name'), weight: 4 },
    { tokens: text('type'), weight: 3 },
    { tokens: text('shortDesc'), weight: 2 },
    { tokens: text('fullDesc'), weight: 1 },
    { tokens: text('districtName'), weight: 2 },
  ];
  let score = 0;
  queryTokens.forEach(qt => {
    fields.forEach(f => {
      const hits = f.tokens.split(' ').filter(w => w === qt).length;
      if (hits > 0) score += f.weight * hits;
    });
  });
  return score;
}

/**
 * YouTube-style personalised search ranking: lexical relevance blended with the
 * user's preference profile. Only items with relevance > 0 are returned.
 * Each result carries { index, relevance, personalization, score, fuzzy }.
 */
export function personalizeSearch(queryTokens, indices, places, embeddings, norms, profile, profileNorm, popularity, weights = SEARCH_WEIGHTS) {
  const results = [];
  indices.forEach(index => {
    const place = places[index];
    const relevance = searchRelevance(queryTokens, place);
    if (relevance <= 0) return;
    const personalization = profile && profileNorm && embeddings[index]
      ? Math.max(0, cosine(profile, embeddings[index], profileNorm, norms[index]))
      : 0;
    const score = weights.relevance * relevance + weights.personalization * (1 + relevance) * personalization;
    results.push({
      index,
      relevance,
      personalization,
      popularity: popularity?.[index] || 0,
      score: Math.round(score * 1000) / 1000,
    });
  });
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Popularity prior from ratings: min-max scaled (0..1) over the catalogue.
 * Returns an array aligned to `items` order.
 */
export function popularityPrior(items, getRating = (p) => p.rating) {
  const ratings = items.map(getRating).filter(r => Number.isFinite(r));
  const min = ratings.length ? Math.min(...ratings) : 0;
  const max = ratings.length ? Math.max(...ratings) : 1;
  return items.map(p => {
    const r = getRating(p);
    if (!Number.isFinite(r)) return 0;
    return max === min ? 1 : (r - min) / (max - min);
  });
}

/**
 * Tiny deterministic hash so we can spread identical queries but keep a stable
 * per-item ordering for the identical-score ties.
 */
export function hashString(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return h >>> 0;
}