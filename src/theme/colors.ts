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
  danger: '#f87171',
  overlay: 'rgba(0,0,0,0.35)',
} as const;

export type ColorKey = keyof typeof colors;
