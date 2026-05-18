import { StyleSheet, View } from 'react-native';
import { es } from '../i18n/es';
import {
  ProgressInfo,
  useBottomTeams,
  useCountByKind,
  useGlobalProgress,
  useTopTeams,
} from '../store/selectors';
import { colors } from '../theme/colors';
import { spacing } from '../theme/typography';
import { formatFraction } from '../utils/format';
import { CollapsibleRankBlock } from './CollapsibleRankBlock';
import { StatTile } from './StatTile';

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

      <CollapsibleRankBlock
        title={es.home.stats.top5}
        rows={top}
        tint={colors.success}
      />
      <CollapsibleRankBlock
        title={es.home.stats.bottom5}
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
