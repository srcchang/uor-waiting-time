import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://srcchang.github.io',
  base: '/uor-waiting-time',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://srcchang.github.io/uor-waiting-time/',
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          ja: 'ja',
          ko: 'ko',
          'zh-Hant': 'zh-Hant',
          'zh-Hans': 'zh-Hans',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: { allowedHosts: true },
    preview: { allowedHosts: true },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'ko', 'zh-Hant', 'zh-Hans'],
    routing: { prefixDefaultLocale: true },
  },
});
