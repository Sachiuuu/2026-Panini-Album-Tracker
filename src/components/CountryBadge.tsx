import { StyleSheet, Text, View } from 'react-native';
import { getCountryStyle } from '../data/countryColors';
import { radius } from '../theme/typography';

interface Props {
  code: string;
  size?: number;
}

export function CountryBadge({ code, size = 36 }: Props) {
  const style = getCountryStyle(code);
  const fontSize = Math.max(10, Math.floor(size * 0.34));
  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: radius.pill,
          backgroundColor: style.primary,
          borderColor: style.secondary,
        },
      ]}
    >
      <Text style={[styles.text, { color: style.text, fontSize }]}>{code}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
