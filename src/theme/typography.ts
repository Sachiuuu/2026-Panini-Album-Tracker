import { TextStyle } from 'react-native';

export const typography = {
  h1: { fontSize: 28, fontWeight: '800' } satisfies TextStyle,
  h2: { fontSize: 22, fontWeight: '700' } satisfies TextStyle,
  h3: { fontSize: 18, fontWeight: '700' } satisfies TextStyle,
  body: { fontSize: 15, fontWeight: '400' } satisfies TextStyle,
  bodyBold: { fontSize: 15, fontWeight: '600' } satisfies TextStyle,
  small: { fontSize: 13, fontWeight: '400' } satisfies TextStyle,
  smallBold: { fontSize: 13, fontWeight: '600' } satisfies TextStyle,
  mono: { fontSize: 14, fontWeight: '600', fontFamily: 'Courier' } satisfies TextStyle,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  pill: 999,
} as const;
