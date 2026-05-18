import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { es } from '../../src/i18n/es';
import { colors } from '../../src/theme/colors';
import { radius, spacing, typography } from '../../src/theme/typography';

export default function AlbumHome() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{es.home.title}</Text>
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>El álbum aparecerá aquí.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.lg },
  title: { ...typography.h1, color: colors.textPrimary },
  placeholder: {
    padding: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  placeholderText: { ...typography.body, color: colors.textMuted },
});
