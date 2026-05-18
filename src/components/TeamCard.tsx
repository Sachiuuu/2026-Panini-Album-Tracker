import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getCountryStyle } from '../data/countryColors';
import { Team } from '../data/schema';
import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/typography';
import { formatFraction, formatPercent } from '../utils/format';
import { Flag } from './Flag';
import { ProgressBar } from './ProgressBar';

interface Props {
  team: Team;
  owned: number;
  total: number;
  pct: number;
  onPress: () => void;
}

export function TeamCard({ team, owned, total, pct, onPress }: Props) {
  const style = getCountryStyle(team.countryCode);
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: style.primary, opacity: pressed ? 0.9 : 1 },
      ]}
    >
      <View style={styles.row}>
        <Flag code={team.countryCode} height={30} />
        <View style={styles.body}>
          <Text style={[styles.name, { color: style.text }]} numberOfLines={1}>
            {team.name}
          </Text>
          <View style={styles.metaRow}>
            <Text style={[styles.fraction, { color: style.text }]}>
              {formatFraction(owned, total)}
            </Text>
            <Text style={[styles.percent, { color: style.text }]}>
              {formatPercent(pct)}
            </Text>
          </View>
          <ProgressBar
            value={pct}
            height={6}
            tint={style.secondary}
            trackColor={colors.overlay}
          />
        </View>
        <Ionicons name="chevron-forward" size={20} color={style.text} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  body: {
    flex: 1,
    gap: 6,
    minWidth: 0,
  },
  name: {
    ...typography.h3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fraction: {
    ...typography.smallBold,
  },
  percent: {
    ...typography.smallBold,
  },
});
