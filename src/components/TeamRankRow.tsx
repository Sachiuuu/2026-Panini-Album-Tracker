import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Team } from '../data/schema';
import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/typography';
import { formatFraction, formatPercent } from '../utils/format';
import { Flag } from './Flag';
import { ProgressBar } from './ProgressBar';

interface Props {
  rank: number;
  team: Team;
  owned: number;
  total: number;
  pct: number;
  onPress?: () => void;
  tint?: string;
}

export function TeamRankRow({ rank, team, owned, total, pct, onPress, tint }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.85 }]}
    >
      <Text style={styles.rank}>{rank}</Text>
      <Flag code={team.countryCode} height={22} />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {team.name}
          </Text>
          <Text style={[styles.percent, tint ? { color: tint } : null]}>
            {formatPercent(pct)}
          </Text>
        </View>
        <ProgressBar value={pct} height={6} tint={tint} />
        <Text style={styles.fraction}>{formatFraction(owned, total)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rank: {
    ...typography.bodyBold,
    color: colors.textMuted,
    width: 20,
    textAlign: 'center',
  },
  body: {
    flex: 1,
    gap: 4,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  name: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  percent: {
    ...typography.smallBold,
    color: colors.accent,
  },
  fraction: {
    ...typography.small,
    color: colors.textMuted,
  },
});
