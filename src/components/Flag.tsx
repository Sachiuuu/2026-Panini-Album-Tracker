import { StyleSheet, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { getCountryStyle } from '../data/countryColors';
import { getFlagSvg } from '../data/flagSvgs';
import { colors } from '../theme/colors';
import { radius } from '../theme/typography';
import { CountryBadge } from './CountryBadge';

interface Props {
  /** team code (3-letter) — used to look up iso2 + colors */
  code: string;
  /** desired height in points; width is 3:2 (height * 1.5) */
  height?: number;
  /** if true, round corners — default true */
  rounded?: boolean;
}

export function Flag({ code, height = 22, rounded = true }: Props) {
  const style = getCountryStyle(code);
  const svg = getFlagSvg(style.iso2);
  const width = Math.round(height * 1.5);

  if (!svg) {
    return <CountryBadge code={code} size={height + 6} />;
  }

  return (
    <View
      style={[
        styles.frame,
        {
          width,
          height,
          borderRadius: rounded ? radius.sm : 0,
        },
      ]}
    >
      <SvgXml xml={svg} width={width} height={height} preserveAspectRatio="xMidYMid slice" />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
  },
});
