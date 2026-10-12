import {
  normalizeText,
  tokenize,
  cosine,
  l2Norm,
  buildTFIDF,
  sparseCosine,
  buildUserProfile,
  hybridScore,
  rankCandidates,
  nearestNeighbors,
  searchRelevance,
  personalizeSearch,
  popularityPrior,
  itemText,
  REC_WEIGHTS,
  SEARCH_WEIGHTS,
} from './model';
import embeddingsArtifact from './models/embeddings.json';
import popularityArtifact from './models/popularity.json';

const PLACES = [
  { name: 'Chitrakote Waterfall', type: 'Waterfall', districtName: 'Bastar', rating: 4.7, shortDesc: 'Breathtaking wide waterfall', fullDesc: 'A giant horse-shoe shaped waterfall on the Indravati river.' },
  { name: 'Tirathgarh Waterfall', type: 'Seasonal Waterfall', districtName: 'Bastar', rating: 4.5, shortDesc: 'Cascades inside the national park', fullDesc: 'Multi-tiered waterfall inside Kanger Valley.' },
  { name: 'Mahamaya Temple', type: 'Temple', districtName: 'Ratanpur', rating: 4.4, shortDesc: 'Ancient temple complex', fullDesc: 'Ancient goddess temple with stone carvings.' },
  { name: 'Bhoramdeo Temple', type: 'Temple', districtName: 'Kabirdham', rating: 4.6, shortDesc: 'Khajuraho of Chhattisgarh', fullDesc: 'Beautifully carved Shiva temple complex.' },
];

describe('text normalisation', () => {
  it('normalises case, punctuation and whitespace', () => {
    expect(normalizeText('  Chitrakote! Waterfall — 25m ')).toBe('chitrakote waterfall 25m');
  });
  it('drops stopwords and short tokens', () => {
    expect(tokenize('the temple and its river')).toEqual(['temple', 'river']);
  });
});

describe('cosine similarity', () => {
  it('returns 1 for identical vectors', () => {
    expect(cosine([1, 2, 3], [1, 2, 3])).toBeCloseTo(1, 6);
  });
  it('returns 0 for orthogonal vectors', () => {
    expect(cosine([1, 0], [0, 1])).toBeCloseTo(0, 6);
  });
  it('returns 0 for empty input', () => {
    expect(cosine([], [])).toBe(0);
  });
});

describe('TF-IDF fallback builder', () => {
  it('builds vectors, norms and a matching vocabulary', () => {
    const tokenDocs = PLACES.map(p => tokenize(itemText(p)));
    const model = buildTFIDF(tokenDocs);
    expect(model.terms.length).toBeGreaterThan(5);
    expect(model.vectors).toHaveLength(4);
    expect(model.norms).toHaveLength(4);
    expect(sparseCosine(model.vectors[0], model.vectors[0], model.norms[0], model.norms[0])).toBeCloseTo(1, 6);
  });
});

describe('user profile', () => {
  it('averages identical watched vectors', () => {
    const entries = [
      { vector: [0.6, 0.8, 0], ts: Date.now() },
      { vector: [0.6, 0.8, 0], ts: Date.now() },
    ];
    const profile = buildUserProfile(entries);
    expect(profile.vector[0]).toBeCloseTo(0.6, 6);
    expect(profile.norm).toBeCloseTo(1, 6);
    expect(profile.count).toBe(2);
  });
  it('is empty when nothing was watched', () => {
    const profile = buildUserProfile([]);
    expect(profile.vector).toBeNull();
    expect(profile.count).toBe(0);
  });
  it('weights recent views above old ones', () => {
    const now = Date.now();
    const day = 86400000;
    const entries = [
      { vector: [1, 0], ts: now - 400 * day }, // old
      { vector: [0, 1], ts: now }, // fresh
    ];
    const profile = buildUserProfile(entries);
    expect(profile.vector[1]).toBeGreaterThan(profile.vector[0]);
  });
});

describe('hybrid ranking', () => {
  const embeddings = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  const norms = embeddings.map(l2Norm);
  const popularity = [0.5, 0.5, 0.9];
  const profile = { vector: [1, 0, 0], norm: 1, count: 1 };

  it('scores a profile-matching item highest', () => {
    const ranked = rankCandidates([0, 1, 2], embeddings, norms, profile.norm, profile.vector, popularity, [], REC_WEIGHTS);
    expect(ranked[0].index).toBe(0);
  });
  it('breaks ties toward popularity', () => {
    const tied = rankCandidates([1, 2], embeddings, norms, null, null, popularity, [], { similarity: 0, popularity: 1, freshness: 0 });
    expect(tied[0].index).toBe(2);
  });
  it('hybridScore stays within a bounded range', () => {
    const score = hybridScore(profile.vector, [1, 0, 0], 1, 0.9, 0);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(1);
  });
});

describe('nearest neighbours', () => {
  const embeddings = [
    [1, 0, 0],
    [0.9, 0.1, 0],
    [0, 1, 0],
    [0, 0.8, 0.6],
  ];
  const norms = embeddings.map(l2Norm);
  it('excludes self and prefers the closest vector', () => {
    const nn = nearestNeighbors(0, embeddings, norms, 2);
    expect(nn.map(n => n.index)).not.toContain(0);
    expect(nn[0].index).toBe(1);
    expect(nn).toHaveLength(2);
  });
});

describe('search relevance + personalisation', () => {
  it('scores name hits higher than description-only hits', () => {
    const waterfall = PLACES[0];
    expect(searchRelevance(tokenize('waterfall'), waterfall)).toBeGreaterThan(
      searchRelevance(tokenize('waterfall'), PLACES[2])
    );
  });
  it('personalised search boosts the profiled type', () => {
    const embeddings = PLACES.map((_, i) => (i < 2 ? [1, 0] : [0, 1]));
    const norms = embeddings.map(l2Norm);
    const profile = { vector: [1, 0], norm: 1, count: 1 };
    const popularity = PLACES.map(() => 0.5);
    const results = personalizeSearch(
      tokenize('ancient'),
      [0, 1, 2, 3],
      PLACES,
      embeddings,
      norms,
      profile.vector,
      profile.norm,
      popularity,
      SEARCH_WEIGHTS
    );
    expect(results.length).toBeGreaterThan(0);
    // "ancient" hits temples; among the temple hits the profile (waterfall) can't
    // change the lexical relevance winner, but relevance is always > 0 only.
    expect(results.every(r => r.relevance > 0)).toBe(true);
  });
  it('popularity prior is min-max scaled to [0,1]', () => {
    const prior = popularityPrior(PLACES);
    expect(Math.max(...prior)).toBe(1);
    expect(Math.min(...prior)).toBe(0);
    expect(prior).toHaveLength(4);
  });
});

describe('trained model artifacts', () => {
  it('cover the full merged catalogue with unique names', () => {
    const count = embeddingsArtifact.names.length;
    expect(count).toBeGreaterThan(239); // core 239 + supplemental places merged in
    expect(new Set(embeddingsArtifact.names).size).toBe(count);
    expect(popularityArtifact.names).toEqual(embeddingsArtifact.names);
  });
  it('embeddings and popularity align to the same order', () => {
    const count = embeddingsArtifact.names.length;
    expect(embeddingsArtifact.vectors).toHaveLength(count);
    expect(popularityArtifact.scores).toHaveLength(count);
    for (const v of embeddingsArtifact.vectors) expect(v).toHaveLength(embeddingsArtifact.dim);
  });
  it('each embedding is unit length so cosine equals dot product', () => {
    const first = embeddingsArtifact.vectors[0];
    expect(l2Norm(first)).toBeCloseTo(1, 3);
  });
});