import { LinearGradient } from 'expo-linear-gradient';
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
import { fonts, radius, spacing, typography } from '../../src/theme/typography';
import { formatFraction, formatPercent } from '../../src/utils/format';

function getMotivationLine(pct: number, lines: string[]): string {
  if (pct >= 1) return lines[6];
  if (pct >= 0.75) return lines[5];
  if (pct >= 0.5) return lines[4];
  if (pct >= 0.25) return lines[3];
  if (pct >= 0.1) return lines[2];
  if (pct > 0) return lines[1];
  return lines[0];
}

export default function AlbumHome() {
  const t = useStrings();
  const router = useRouter();
  const progress = useGlobalProgress();
  const motivation = getMotivationLine(progress.pct, t.home.motivationLines);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t.home.title}</Text>

      <LinearGradient
        colors={[colors.heroTop, colors.heroBg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.heroLabel}>{t.common.complete.toUpperCase()}</Text>
            <Text style={styles.heroPercent}>{formatPercent(progress.pct)}</Text>
          </View>
          <View style={styles.heroRight}>
            <Text style={styles.heroFraction}>
              {formatFraction(progress.owned, progress.total)}
            </Text>
            <Text style={styles.heroMissing}>
              {progress.missing} {t.home.stats.missing.toLowerCase()}
            </Text>
          </View>
        </View>
        <ProgressBar value={progress.pct} height={10} />
        <Text style={styles.heroMotivation}>{motivation}</Text>
      </LinearGradient>

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
    padding: spacing.xl,
    borderRadius: radius.xl,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  heroLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 1.5,
  },
  heroPercent: {
    fontFamily: fonts.display,
    fontSize: 52,
    color: colors.accent,
    lineHeight: 56,
  },
  heroRight: {
    alignItems: 'flex-end',
    paddingTop: spacing.sm,
    gap: spacing.xs,
  },
  heroFraction: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  heroMissing: {
    ...typography.small,
    color: colors.textMuted,
  },
  heroMotivation: {
    ...typography.small,
    color: colors.textSecondary,
    fontStyle: 'italic',
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
