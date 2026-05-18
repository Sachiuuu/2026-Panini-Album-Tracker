import { StyleSheet, Text, View } from 'react-native';
import { es } from '../../src/i18n/es';
import { colors } from '../../src/theme/colors';
import { spacing, typography } from '../../src/theme/typography';

export default function Search() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>{es.search.typeToSearch}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  text: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
});
