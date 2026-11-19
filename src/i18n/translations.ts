import type { Locale } from './config';

const translationModules = import.meta.glob('./locales/*.json', { eager: true });

export type TranslationTree = Record<string, any>;

export function getTranslations(locale: Locale): TranslationTree {
  const mod = translationModules[`./locales/${locale}.json`] as {
    default: TranslationTree;
  };
  if (!mod) throw new Error(`Missing translations for locale: ${locale}`);
  return mod.default;
}

export function t(translations: TranslationTree, key: string): string {
  const result = key
    .split('.')
    .reduce<any>((obj, k) => obj?.[k], translations);
  return (typeof result === 'string' ? result : key) as string;
}

export function tList<T = any>(translations: TranslationTree, key: string): T[] {
  const result = key
    .split('.')
    .reduce<any>((obj, k) => obj?.[k], translations);
  return Array.isArray(result) ? (result as T[]) : [];
}
