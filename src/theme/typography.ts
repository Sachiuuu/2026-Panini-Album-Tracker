import { TextStyle } from 'react-native';

export const fonts = {
  display: 'BebasNeue',
  regular: 'Inter',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
  extraBold: 'Inter-ExtraBold',
} as const;

export const typography = {
  h1: { fontFamily: fonts.extraBold, fontSize: 28 } satisfies TextStyle,
  h2: { fontFamily: fonts.bold, fontSize: 22 } satisfies TextStyle,
  h3: { fontFamily: fonts.bold, fontSize: 18 } satisfies TextStyle,
  body: { fontFamily: fonts.regular, fontSize: 15 } satisfies TextStyle,
  bodyBold: { fontFamily: fonts.semiBold, fontSize: 15 } satisfies TextStyle,
  small: { fontFamily: fonts.regular, fontSize: 13 } satisfies TextStyle,
  smallBold: { fontFamily: fonts.semiBold, fontSize: 13 } satisfies TextStyle,
  mono: { fontFamily: 'Courier', fontSize: 14, fontWeight: '600' } satisfies TextStyle,
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
