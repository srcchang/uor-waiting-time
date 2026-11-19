/**
 * App-wide facts used by the marketing site.
 *
 * Keep store IDs and the support address here so the download badges,
 * structured data and footer can never drift apart.
 */
export const APP = {
  name: 'UOR Waiting Time',
  androidPackage: 'com.src.app.universalstudios.orlandoresort',
  /** Fill in when the App Store listing is live. `null` hides the iOS badge. */
  iosAppId: null as string | null,
  supportEmail: 'srcchang@gmail.com',
  refreshMinutes: 15,
  localeCount: 5,
  parkCount: 4,
} as const;

export const playStoreUrl =
  `https://play.google.com/store/apps/details?id=${APP.androidPackage}`;

export const appStoreUrl = APP.iosAppId
  ? `https://apps.apple.com/app/id${APP.iosAppId}`
  : null;
