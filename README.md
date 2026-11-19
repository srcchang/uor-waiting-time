# UOR Waiting Time — Official Website

Marketing and legal site for the **UOR Waiting Time** mobile app for Universal
Orlando Resort. It is a static, multilingual Astro site deployed to GitHub
Pages, and it also serves the privacy policy and terms that the app opens in
its in-app WebView.

## Stack

- Astro 7 (`output: 'static'`)
- Tailwind CSS 4 via `@tailwindcss/vite`
- `@astrojs/sitemap`
- Fontsource: Outfit + Noto Sans JP/KR/SC/TC
- Vanilla TypeScript for nav, theme, FAQ accordion, and scroll reveal

## Commands

```bash
npm install
npm run dev          # local dev server
npm run check        # astro check
npm run check:i18n   # locale key/shape parity
npm run build        # static build to dist/
npm run preview      # preview the production build
npm run verify       # check + i18n + build
```

## Structure

```text
src/
├─ config/app.ts             # app name, store IDs, support email
├─ data/parks.ts             # the four parks and their icons/colors
├─ i18n/
│  ├─ config.ts              # locales, labels, htmlLang, ogLocale
│  ├─ translations.ts        # JSON loading + t()/tList()
│  └─ locales/*.json         # UI copy (en, ja, ko, zh-Hant, zh-Hans)
├─ content/legal/<locale>/   # privacy.md / terms.md
├─ components/               # layout, sections, language/theme controls
├─ pages/
│  ├─ index.astro            # locale detection + redirect
│  ├─ 404.astro
│  └─ [locale]/{index,faq,privacy,terms}.astro
├─ scripts/                  # nav, theme, FAQ, scroll reveal
├─ styles/global.css         # Tailwind theme tokens + legal prose
└─ utils/base.ts             # normalized BASE_URL
```

## Localization

- Locales: `en` (default), `ja`, `ko`, `zh-Hant`, `zh-Hans`.
- Every page is generated per locale with `getStaticPaths`.
- `scripts/check-i18n.mjs` compares every locale against `en.json` and fails
  CI on missing keys, extra keys, array-length changes, or type changes.
- `/` detects the browser language and redirects to `/en/`, `/ja/`, etc. The
  redirect page is `noindex`.

## Legal pages and the app WebView

The app opens:

```text
https://srcchang.github.io/uor-waiting-time/<locale>/<privacy|terms>?embed=1&theme=<light|dark>
```

- `embed=1` hides the site nav, footer, download CTA, and skip link.
- `theme=` overrides localStorage and the system preference so the page matches
  the app theme on first paint.
- Long-form documents live in `src/content/legal/<locale>/*.md`; UI copy stays
  in JSON.
- Legacy content IDs are lowercased by the Astro glob loader, so `zh-Hant`
  resolves to `zh-hant/privacy` internally (handled in `LegalPage.astro`).

When the app-side URL changes, update
`uor_flutter/lib/core/config/legal_document.dart` so it builds the same URL
with the app locale and brightness.

## Store links

`src/config/app.ts` is the single source of truth:

- Android: `com.src.app.universalstudios.orlandoresort` (live)
- iOS: `iosAppId: null`

While `iosAppId` is `null`, the App Store badge, `apple-itunes-app` meta tag,
and the iOS entry in structured data are all omitted. Fill in the numeric App
Store ID and the badge appears automatically.

## Deployment

Push to `main`; `.github/workflows/deploy.yml` runs:

```text
npm ci
npm run check
npm run check:i18n
npm run build
→ GitHub Pages
```

Site URL: <https://srcchang.github.io/uor-waiting-time/>

The Astro `site` / `base` values live in `astro.config.mjs`. If the site moves
to a custom domain, update `site`, set `base: '/'`, update `public/robots.txt`,
and add `public/CNAME`.

## Notes

- No analytics or advertising trackers are loaded on the website.
- The site intentionally has no customer account, checkout, or live-data UI.
- iOS screenshot assets are not used yet; the hero uses a CSS phone mockup.
