export const locales = ['en', 'ja', 'ko', 'zh-Hant', 'zh-Hans'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  ja: '日本語',
  ko: '한국어',
  'zh-Hant': '繁體中文',
  'zh-Hans': '简体中文',
};

export const htmlLang: Record<Locale, string> = {
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  'zh-Hant': 'zh-Hant',
  'zh-Hans': 'zh-Hans',
};

export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  ja: 'ja_JP',
  ko: 'ko_KR',
  'zh-Hant': 'zh_TW',
  'zh-Hans': 'zh_CN',
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
