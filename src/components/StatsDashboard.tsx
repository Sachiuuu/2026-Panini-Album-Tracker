import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { es } from '../i18n/es';
import {
  ProgressInfo,
  useBottomTeams,
  useCountByKind,
  useGlobalProgress,
  useTopTeams,
} from '../store/selectors';
import { colors } from '../theme/colors';
import { spacing, typography } from '../theme/typography';
import { formatFraction } from '../utils/format';
import { StatTile } from './StatTile';
import { TeamRankRow } from './TeamRankRow';

interface RankBlockProps {
  title: string;
  rows: ReturnType<typeof useTopTeams>;
  tint?: string;
  empty?: boolean;
}

function RankBlock({ title, rows, tint, empty }: RankBlockProps) {
  const router = useRouter();
  return (
    <View style={styles.rankBlock}>
      <Text style={styles.rankTitle}>{title}</Text>
      {empty ? (
        <Text style={styles.emptyText}>—</Text>
      ) : (
        <View style={styles.rankList}>
          {rows.map((row, idx) => (
            <TeamRankRow
              key={row.team.code}
              rank={idx + 1}
              team={row.team}
              owned={row.owned}
              total={row.total}
              pct={row.pct}
              tint={tint}
              onPress={() => router.push(`/team/${row.team.code}`)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export function StatsDashboard() {
  const global: ProgressInfo = useGlobalProgress();
  const emblems = useCountByKind('emblem');
  const lineups = useCountByKind('lineup');
  const top = useTopTeams(5);
  const bottom = useBottomTeams(5);

  return (
    <View style={styles.container}>
      <View style={styles.tilesRow}>
        <StatTile
          label={es.home.stats.collected.toUpperCase()}
          value={String(global.owned)}
          hint={`${es.home.stats.of} ${global.total}`}
          icon="checkmark-circle"
          tint={colors.success}
        />
        <StatTile
          label={es.home.stats.missing.toUpperCase()}
          value={String(global.missing)}
          hint={`${es.home.stats.of} ${global.total}`}
          icon="ellipse-outline"
          tint={colors.danger}
        />
      </View>

      <View style={styles.tilesRow}>
        <StatTile
          label={es.home.stats.emblems.toUpperCase()}
          value={formatFraction(emblems.owned, emblems.total)}
          icon="shield"
          tint={colors.accent}
        />
        <StatTile
          label={es.home.stats.lineups.toUpperCase()}
          value={formatFraction(lineups.owned, lineups.total)}
          icon="people-circle"
          tint={colors.accent}
        />
      </View>

      <RankBlock title={es.home.stats.top5} rows={top} tint={colors.success} />
      <RankBlock title={es.home.stats.bottom5} rows={bottom} tint={colors.danger} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  tilesRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  rankBlock: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  rankTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  rankList: {
    gap: spacing.sm,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },
});
