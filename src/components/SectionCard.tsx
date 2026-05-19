import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Section } from '../data/schema';
import { getSectionTitle } from '../i18n/getSectionTitle';
import { useStrings } from '../i18n/useStrings';
import { useSectionProgress } from '../store/selectors';
import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/typography';
import { formatFraction, formatPercent } from '../utils/format';
import { ProgressBar } from './ProgressBar';

interface Props {
  section: Section;
  onPress: () => void;
}

function iconForSection(kind: Section['kind']): keyof typeof Ionicons.glyphMap {
  switch (kind) {
    case 'specials': return 'sparkles';
    case 'group': return 'people';
    case 'cocacola': return 'wine';
  }
}

export function SectionCard({ section, onPress }: Props) {
  const t = useStrings();
  const progress = useSectionProgress(section.id);
  const icon = iconForSection(section.kind);
  const complete = progress.total > 0 && progress.owned === progress.total;
  const title = getSectionTitle(section, t);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.iconWrap}>
          <Ionicons
            name={icon}
            size={22}
            color={complete ? colors.success : colors.accent}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.percent}>{formatPercent(progress.pct)}</Text>
          </View>
          <ProgressBar value={progress.pct} />
          <Text style={styles.subtitle}>
            {formatFraction(progress.owned, progress.total)}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  body: {
    flex: 1,
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  percent: {
    ...typography.smallBold,
    color: colors.accent,
  },
  subtitle: {
    ...typography.small,
    color: colors.textMuted,
  },
});
