/**
 * Astro exposes `BASE_URL` without a trailing slash for project sites
 * (`/uor-waiting-time`). Normalize it once so string concatenation never
 * produces `/uor-waiting-timeimages/...`.
 */
const rawBase = import.meta.env.BASE_URL;
export const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
