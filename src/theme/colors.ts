export const colors = {
  bg: '#0b1220',
  surface: '#111827',
  surfaceAlt: '#1f2937',
  border: '#374151',
  textPrimary: '#ffffff',
  textSecondary: '#cbd5e1',
  textMuted: '#9ca3af',
  accent: '#fbbf24',
  accentDark: '#b45309',
  success: '#34d399',
  successDark: '#059669',
  danger: '#f87171',
  overlay: 'rgba(0,0,0,0.35)',
  // gradient stops
  heroTop: '#1a2a4a',
  heroBg: '#0f1a2e',
} as const;

export type ColorKey = keyof typeof colors;
