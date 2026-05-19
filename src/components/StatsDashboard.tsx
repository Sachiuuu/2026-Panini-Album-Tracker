import { StyleSheet, View } from 'react-native';
import { useStrings } from '../i18n/useStrings';
import {
  ProgressInfo,
  useBottomTeams,
  useCountByKind,
  useGlobalProgress,
  useTopTeams,
} from '../store/selectors';
import { colors } from '../theme/colors';
import { spacing } from '../theme/typography';
import { formatFraction, formatPercent, pct as pctOf } from '../utils/format';
import { CollapsibleRankBlock } from './CollapsibleRankBlock';
import { StatTile } from './StatTile';

export function StatsDashboard() {
  const t = useStrings();
  const global: ProgressInfo = useGlobalProgress();
  const emblems = useCountByKind('emblem');
  const lineups = useCountByKind('lineup');
  const top = useTopTeams(5);
  const bottom = useBottomTeams(5);

  return (
    <View style={styles.container}>
      <View style={styles.tilesRow}>
        <StatTile
          label={t.home.stats.collected.toUpperCase()}
          value={String(global.owned)}
          hint={`${formatPercent(global.pct)} ${t.home.stats.of} ${global.total}`}
          icon="checkmark-circle"
          tint={colors.success}
        />
        <StatTile
          label={t.home.stats.missing.toUpperCase()}
          value={String(global.missing)}
          hint={`${formatPercent(pctOf(global.missing, global.total))} ${t.home.stats.of} ${global.total}`}
          icon="ellipse-outline"
          tint={colors.danger}
        />
      </View>

      <View style={styles.tilesRow}>
        <StatTile
          label={t.home.stats.emblems.toUpperCase()}
          value={formatPercent(pctOf(emblems.owned, emblems.total))}
          hint={formatFraction(emblems.owned, emblems.total)}
          icon="shield"
          tint={colors.accent}
        />
        <StatTile
          label={t.home.stats.lineups.toUpperCase()}
          value={formatPercent(pctOf(lineups.owned, lineups.total))}
          hint={formatFraction(lineups.owned, lineups.total)}
          icon="people-circle"
          tint={colors.accent}
        />
      </View>

      <CollapsibleRankBlock
        title={t.home.stats.top5}
        rows={top}
        tint={colors.success}
      />
      <CollapsibleRankBlock
        title={t.home.stats.bottom5}
        rows={bottom}
        tint={colors.danger}
      />
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
});
