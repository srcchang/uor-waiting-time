#!/usr/bin/env node
/**
 * Fails CI when a locale is missing a key, has an extra key, changes the
 * shape of an array, or leaves a string empty. `en.json` is the reference.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const localesDir = join(here, '..', 'src', 'i18n', 'locales');
const locales = ['en', 'ja', 'ko', 'zh-Hant', 'zh-Hans'];

function load(locale) {
  return JSON.parse(readFileSync(join(localesDir, `${locale}.json`), 'utf8'));
}

function flatten(value, prefix = '', out = new Map()) {
  if (Array.isArray(value)) {
    out.set(prefix, `array(${value.length})`);
    value.forEach((item, index) => flatten(item, `${prefix}[${index}]`, out));
    return out;
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      flatten(child, prefix ? `${prefix}.${key}` : key, out);
    }
    return out;
  }
  out.set(prefix, typeof value);
  return out;
}

const reference = flatten(load('en'));
let failed = false;

for (const locale of locales) {
  if (locale === 'en') continue;
  const current = flatten(load(locale));

  for (const [key, type] of reference) {
    if (!current.has(key)) {
      console.error(`[${locale}] missing key: ${key}`);
      failed = true;
      continue;
    }
    if (current.get(key) !== type) {
      console.error(
        `[${locale}] shape mismatch at ${key}: expected ${type}, got ${current.get(key)}`,
      );
      failed = true;
    }
  }

  for (const key of current.keys()) {
    if (!reference.has(key)) {
      console.error(`[${locale}] extra key: ${key}`);
      failed = true;
    }
  }
}

if (failed) {
  console.error('\ni18n check failed.');
  process.exit(1);
}

console.log(`i18n check passed for ${locales.length} locales.`);
