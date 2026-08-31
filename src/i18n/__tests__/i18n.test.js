import i18n from '../index';
import en from '../locales/en.json';
import pl from '../locales/pl.json';

// Rekurencyjnie zbiera ścieżki kluczy — do porównania kompletności słowników
function collectKeys(obj, prefix = '') {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return collectKeys(value, path);
    }
    return [path];
  });
}

describe('i18n', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  test('falls back to English outside the browser', () => {
    expect(i18n.resolvedLanguage).toBe('en');
  });

  test('serves English strings by default', () => {
    expect(i18n.t('hero.ctaWork')).toBe('See work');
    expect(i18n.t('work.title')).toBe('Every project is built around the client');
  });

  test('switches to Polish via changeLanguage', async () => {
    await i18n.changeLanguage('pl');
    expect(i18n.resolvedLanguage).toBe('pl');
    expect(i18n.t('hero.ctaWork')).toBe('Zobacz realizacje');
    expect(i18n.t('work.title')).toBe('Każdy projekt powstaje z myślą o kliencie');
  });

  test('resolves regional pl-PL to pl', async () => {
    await i18n.changeLanguage('pl-PL');
    expect(i18n.resolvedLanguage).toBe('pl');
  });

  test('interpolates the project counter', async () => {
    expect(i18n.t('work.counterAria', { current: 2, total: 5 })).toBe('Project 2 of 5');
    await i18n.changeLanguage('pl');
    expect(i18n.t('work.counterAria', { current: 2, total: 5 })).toBe('Projekt 2 z 5');
  });

  test('en and pl dictionaries expose identical key sets', () => {
    expect(collectKeys(pl).sort()).toEqual(collectKeys(en).sort());
  });
});
