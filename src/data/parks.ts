export interface Park {
  id: 'usf' | 'ioa' | 'epic' | 'volcano';
  icon: string;
  color: string;
  accent: string;
}

/** Names and descriptions live in the locale JSON (`parks.<id>`). */
export const parks: Park[] = [
  { id: 'usf', icon: 'movie', color: '#005395', accent: '#0068D1' },
  { id: 'ioa', icon: 'compass', color: '#0E7A55', accent: '#12A06E' },
  { id: 'epic', icon: 'sparkles', color: '#7B2FF7', accent: '#9B5CFF' },
  { id: 'volcano', icon: 'waves', color: '#0B6E99', accent: '#12A4C9' },
];
