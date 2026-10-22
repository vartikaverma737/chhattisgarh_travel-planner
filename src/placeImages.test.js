import { DISTRICTS } from './App';
import { getPlaceImages } from './placeimage';

describe('place image coverage', () => {
  it('every place resolves to at least one usable image', () => {
    const missing = [];

    DISTRICTS.forEach(d => {
      (d.touristPlaces || []).forEach(p => {
        const imgs = getPlaceImages(p.name, d.name, p.image);
        if (!imgs || imgs.length === 0) {
          missing.push(`${d.name} / ${p.name}`);
          return;
        }
        imgs.forEach(u => {
          if (!/^https?:\/\//.test(u)) missing.push(`${d.name} / ${p.name} -> ${u}`);
        });
      });
    });

    expect(missing).toEqual([]);
  });

  it('no place falls back to the generic cross-district Gangrel image', () => {
    const gangrel = 'https://portal-tourism.cgstate.gov.in/files/gangrel-bandh-image.webp';
    const offenders = [];

    DISTRICTS.forEach(d => {
      (d.touristPlaces || []).forEach(p => {
        if (d.name === 'Dhamtari') return; // Gangrel Dam belongs to Dhamtari
        if (p.image === gangrel) offenders.push(`${d.name} / ${p.name}`);
      });
    });

    expect(offenders).toEqual([]);
  });

  it('every district banner points at an absolute https url', () => {
    DISTRICTS.forEach(d => {
      expect(d.image).toMatch(/^https?:\/\//);
    });
  });
});
