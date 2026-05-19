import { StyleSheet, Text, View } from 'react-native';
import { getCountryStyle } from '../data/countryColors';
import { Team } from '../data/schema';
import { useStrings } from '../i18n/useStrings';
import { colors } from '../theme/colors';
import { spacing, typography } from '../theme/typography';
import { formatFraction, formatPercent } from '../utils/format';
import { Flag } from './Flag';
import { ProgressBar } from './ProgressBar';

interface Props {
  team: Team;
  owned: number;
  total: number;
  pct: number;
}

export function TeamHeader({ team, owned, total, pct }: Props) {
  const t = useStrings();
  const style = getCountryStyle(team.countryCode);
  const name = t.teamNames[team.code] ?? team.name;
  return (
    <View style={[styles.container, { backgroundColor: style.primary }]}>
      <View style={styles.topRow}>
        <Flag code={team.countryCode} height={44} />
        <View style={styles.titleBlock}>
          <Text style={[styles.name, { color: style.text }]} numberOfLines={1}>
            {name}
          </Text>
          <Text style={[styles.group, { color: style.text }]}>
            {t.section.group} {team.group}
          </Text>
        </View>
      </View>

      <View style={styles.progressBlock}>
        <View style={styles.progressRow}>
          <Text style={[styles.fraction, { color: style.text }]}>
            {formatFraction(owned, total)}
          </Text>
          <Text style={[styles.percent, { color: style.text }]}>
            {formatPercent(pct)}
          </Text>
        </View>
        <ProgressBar
          value={pct}
          height={10}
          tint={style.secondary}
          trackColor={colors.overlay}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  titleBlock: {
    flex: 1,
    minWidth: 0,
  },
  name: { ...typography.h1 },
  group: { ...typography.bodyBold, opacity: 0.9 },
  progressBlock: { gap: spacing.xs },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fraction: { ...typography.bodyBold },
  percent: { ...typography.h3 },
});
