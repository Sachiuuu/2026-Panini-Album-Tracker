import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Section, Team } from '../data/schema';
import { TEAMS_BY_GROUP } from '../data/teams';
import { getSectionTitle } from '../i18n/getSectionTitle';
import { useStrings } from '../i18n/useStrings';
import { useAlbumStore } from '../store/useAlbumStore';
import { useSectionProgress } from '../store/selectors';
import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/typography';
import { formatFraction, formatPercent, pct as pctOf } from '../utils/format';
import { Flag } from './Flag';
import { ProgressBar } from './ProgressBar';

interface Props {
  section: Section;
}

interface TeamProgress {
  team: Team;
  owned: number;
  total: number;
  pct: number;
}

export function GroupSectionCard({ section }: Props) {
  const t = useStrings();
  const router = useRouter();
  const owned = useAlbumStore((s) => s.owned);
  const groupLetter = section.id.replace('group-', '');
  const sectionProgress = useSectionProgress(section.id);
  const title = getSectionTitle(section, t);

  const teamRows: TeamProgress[] = useMemo(() => {
    const teams = TEAMS_BY_GROUP[groupLetter] ?? [];
    return teams.map((team) => {
      const teamStickers = section.stickers.filter((s) => s.teamCode === team.code);
      const ownedCount = teamStickers.reduce(
        (acc, s) => acc + (owned[s.id] ? 1 : 0),
        0,
      );
      return {
        team,
        owned: ownedCount,
        total: teamStickers.length,
        pct: pctOf(ownedCount, teamStickers.length),
      };
    });
  }, [groupLetter, section.stickers, owned]);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="people" size={20} color={colors.accent} />
        </View>
        <View style={styles.headerBody}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.percent}>{formatPercent(sectionProgress.pct)}</Text>
          </View>
          <ProgressBar value={sectionProgress.pct} height={6} />
          <Text style={styles.fraction}>
            {formatFraction(sectionProgress.owned, sectionProgress.total)}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.teamList}>
        {teamRows.map((row) => (
          <Pressable
            key={row.team.code}
            onPress={() => router.push(`/team/${row.team.code}`)}
            style={({ pressed }) => [
              styles.teamRow,
              pressed && { backgroundColor: colors.surfaceAlt },
            ]}
          >
            <Flag code={row.team.countryCode} height={22} />
            <View style={styles.teamBody}>
              <View style={styles.teamTopRow}>
                <Text style={styles.teamName} numberOfLines={1}>
                  {t.teamNames[row.team.code] ?? row.team.name}
                </Text>
                <Text style={styles.teamPct}>{formatPercent(row.pct)}</Text>
              </View>
              <ProgressBar value={row.pct} height={5} />
              <Text style={styles.teamFraction}>
                {formatFraction(row.owned, row.total)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBody: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  percent: {
    ...typography.smallBold,
    color: colors.accent,
    flexShrink: 0,
    marginLeft: spacing.sm,
  },
  fraction: {
    ...typography.small,
    color: colors.textMuted,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  teamList: {
    paddingVertical: spacing.xs,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 56,
  },
  teamBody: {
    flex: 1,
    gap: 3,
    minWidth: 0,
  },
  teamTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  teamName: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  teamPct: {
    ...typography.smallBold,
    color: colors.success,
    flexShrink: 0,
    marginLeft: spacing.sm,
  },
  teamFraction: {
    ...typography.small,
    color: colors.textMuted,
  },
});
