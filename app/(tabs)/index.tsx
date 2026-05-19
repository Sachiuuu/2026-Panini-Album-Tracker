import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GroupSectionCard } from '../../src/components/GroupSectionCard';
import { ProgressBar } from '../../src/components/ProgressBar';
import { SectionCard } from '../../src/components/SectionCard';
import { StatsDashboard } from '../../src/components/StatsDashboard';
import { ALBUM } from '../../src/data/album';
import { useStrings } from '../../src/i18n/useStrings';
import { useGlobalProgress } from '../../src/store/selectors';
import { colors } from '../../src/theme/colors';
import { radius, spacing, typography } from '../../src/theme/typography';
import { formatFraction, formatPercent } from '../../src/utils/format';

export default function AlbumHome() {
  const t = useStrings();
  const router = useRouter();
  const progress = useGlobalProgress();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t.home.title}</Text>

      <View style={styles.hero}>
        <View style={styles.heroHeader}>
          <Text style={styles.heroLabel}>{t.common.complete.toUpperCase()}</Text>
          <Text style={styles.heroPercent}>{formatPercent(progress.pct)}</Text>
        </View>
        <ProgressBar value={progress.pct} height={14} />
        <View style={styles.heroFooter}>
          <Text style={styles.heroFraction}>
            {formatFraction(progress.owned, progress.total)} {t.home.stats.collected.toLowerCase()}
          </Text>
          <Text style={styles.heroFraction}>
            {progress.missing} {t.home.stats.missing.toLowerCase()}
          </Text>
        </View>
      </View>

      <StatsDashboard />

      <Text style={styles.sectionHeader}>{t.home.sectionsHeader}</Text>

      <View style={styles.list}>
        {ALBUM.sections.map((section) =>
          section.kind === 'group' ? (
            <GroupSectionCard key={section.id} section={section} />
          ) : (
            <SectionCard
              key={section.id}
              section={section}
              onPress={() => router.push(`/section/${section.id}`)}
            />
          ),
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  title: { ...typography.h1, color: colors.textPrimary },

  hero: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.lg,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabel: {
    ...typography.smallBold,
    color: colors.textMuted,
    letterSpacing: 1,
  },
  heroPercent: {
    ...typography.h1,
    color: colors.accent,
  },
  heroFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  heroFraction: {
    ...typography.small,
    color: colors.textSecondary,
  },

  sectionHeader: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  list: {
    gap: spacing.md,
  },
});
