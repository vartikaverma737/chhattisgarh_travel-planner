import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, Grid, Play } from 'lucide-react';

// ─── THUMBNAIL STRIP CAROUSEL (used inside place cards in the district modal) ─
export function PlaceImageCarousel({ images, placeName, onOpenLightbox, primaryImage }) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState({});
  const [errors, setErrors] = useState({});

  const allImgs = images && images.length > 0 ? images : [primaryImage].filter(Boolean);
  const total = allImgs.length;

  const prev = (e) => { e.stopPropagation(); setCurrent(c => (c - 1 + total) % total); };
  const next = (e) => { e.stopPropagation(); setCurrent(c => (c + 1) % total); };

  const handleError = (idx) => {
    setErrors(e => ({ ...e, [idx]: true }));
  };

  const imgSrc = (idx) => errors[idx]
    ? 'https://portal-tourism.cgstate.gov.in/files/gangrel-bandh-image.webp'
    : allImgs[idx];

  return (
    <div className="relative h-44 overflow-hidden bg-gray-100 group">
      {/* Main image */}
      <img
        src={imgSrc(current)}
        alt={`${placeName} - image ${current + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
        onError={() => handleError(current)}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

      {/* Nav arrows — show only if multiple images */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={next}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Next image"
          >
            <ChevronRight size={14} />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {allImgs.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setCurrent(i); }}
              className={`rounded-full transition-all ${i === current ? 'bg-white w-3 h-1.5' : 'bg-white/60 w-1.5 h-1.5'}`}
            />
          ))}
        </div>
      )}

      {/* Image count badge */}
      {total > 1 && (
        <div className="absolute top-2.5 right-2.5 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full font-medium">
          {current + 1}/{total}
        </div>
      )}

      {/* Open gallery button */}
      <button
        onClick={e => { e.stopPropagation(); onOpenLightbox(current); }}
        className="absolute bottom-2 right-2.5 bg-black/60 hover:bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 transition-colors opacity-0 group-hover:opacity-100 z-10"
      >
        <ZoomIn size={11} /> Gallery
      </button>
    </div>
  );
}

// ─── GRID GALLERY (used inside detail modal — shows 4–5 images as a grid) ────
export function PlaceImageGrid({ images, placeName, onOpenLightbox }) {
  const [errors, setErrors] = useState({});
  const fallback = 'https://portal-tourism.cgstate.gov.in/files/gangrel-bandh-image.webp';

  const imgs = (images && images.length > 0 ? images : [fallback]).slice(0, 5);
  const handleError = idx => setErrors(e => ({ ...e, [idx]: true }));
  const src = idx => errors[idx] ? fallback : imgs[idx];

  if (imgs.length === 1) {
    return (
      <div className="relative h-72 rounded-2xl overflow-hidden cursor-pointer" onClick={() => onOpenLightbox(0)}>
        <img src={src(0)} alt={placeName} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onError={() => handleError(0)} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white flex items-center gap-2 text-sm font-medium">
          <ZoomIn size={16} /> View photo
        </div>
      </div>
    );
  }

  // 2 images
  if (imgs.length === 2) return (
    <div className="grid grid-cols-2 gap-1.5 h-64 rounded-2xl overflow-hidden">
      {imgs.map((_, i) => (
        <div key={i} className="relative cursor-pointer overflow-hidden" onClick={() => onOpenLightbox(i)}>
          <img src={src(i)} alt={`${placeName} ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" onError={() => handleError(i)} />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn className="text-white opacity-0 hover:opacity-100 transition-opacity" size={24} />
          </div>
        </div>
      ))}
    </div>
  );

  // 3 images
  if (imgs.length === 3) return (
    <div className="grid grid-cols-3 gap-1.5 h-56 rounded-2xl overflow-hidden">
      {imgs.map((_, i) => (
        <div key={i} className="relative cursor-pointer overflow-hidden" onClick={() => onOpenLightbox(i)}>
          <img src={src(i)} alt={`${placeName} ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" onError={() => handleError(i)} />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors" />
        </div>
      ))}
    </div>
  );

  // 4 images — 2×2 grid
  if (imgs.length === 4) return (
    <div className="grid grid-cols-2 gap-1.5 h-64 rounded-2xl overflow-hidden">
      {imgs.map((_, i) => (
        <div key={i} className="relative cursor-pointer overflow-hidden" onClick={() => onOpenLightbox(i)}>
          <img src={src(i)} alt={`${placeName} ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" onError={() => handleError(i)} />
          {i === 3 && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <span className="text-white text-sm font-semibold flex items-center gap-1"><Grid size={14} /> View all</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // 5+ images — hero + 4 thumbnails
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-1.5 h-72 rounded-2xl overflow-hidden">
      {/* Hero — spans 2 cols + 2 rows */}
      <div className="col-span-2 row-span-2 relative cursor-pointer overflow-hidden" onClick={() => onOpenLightbox(0)}>
        <img src={src(0)} alt={`${placeName} main`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" onError={() => handleError(0)} />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
      </div>
      {/* 4 smaller thumbnails */}
      {imgs.slice(1, 5).map((_, j) => {
        const i = j + 1;
        const isLast = j === 3 && imgs.length > 5;
        return (
          <div key={i} className="relative cursor-pointer overflow-hidden" onClick={() => onOpenLightbox(i)}>
            <img src={src(i)} alt={`${placeName} ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" onError={() => handleError(i)} />
            {isLast && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-sm font-bold">+{imgs.length - 4} more</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── FULL-SCREEN LIGHTBOX ─────────────────────────────────────────────────────
export function ImageLightbox({ images, placeName, startIndex = 0, onClose }) {
  const [current, setCurrent] = useState(startIndex);
  const [errors, setErrors] = useState({});
  const fallback = 'https://portal-tourism.cgstate.gov.in/files/gangrel-bandh-image.webp';

  const imgs = images && images.length > 0 ? images : [fallback];
  const total = imgs.length;

  const handleError = idx => setErrors(e => ({ ...e, [idx]: true }));
  const src = idx => errors[idx] ? fallback : imgs[idx];

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col" onClick={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" onClick={e => e.stopPropagation()}>
        <div>
          <h3 className="text-white font-bold text-lg">{placeName}</h3>
          <p className="text-gray-400 text-sm">{current + 1} / {total} photos</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all">
          <X size={24} />
        </button>
      </div>

      {/* Main image area */}
      <div className="flex-1 relative flex items-center justify-center px-16 min-h-0" onClick={e => e.stopPropagation()}>
        <img
          key={current}
          src={src(current)}
          alt={`${placeName} - photo ${current + 1}`}
          className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
          style={{ animation: 'lightboxFadeIn 0.2s ease-out' }}
          onError={() => handleError(current)}
        />

        {/* Prev / Next */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-orange-500 text-white p-3 rounded-full transition-all backdrop-blur-sm border border-white/20"
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-orange-500 text-white p-3 rounded-full transition-all backdrop-blur-sm border border-white/20"
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {total > 1 && (
        <div className="flex-shrink-0 px-6 pb-5 pt-3" onClick={e => e.stopPropagation()}>
          <div className="flex gap-2 justify-center overflow-x-auto pb-1">
            {imgs.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                  i === current ? 'border-orange-500 scale-105 shadow-lg shadow-orange-500/30' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={src(i)}
                  alt={`thumb ${i + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleError(i)}
                />
              </button>
            ))}
          </div>

          {/* Keyboard hint */}
          <p className="text-center text-gray-500 text-xs mt-2">Use ← → arrow keys to navigate · ESC to close</p>
        </div>
      )}

      <style>{`
        @keyframes lightboxFadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}