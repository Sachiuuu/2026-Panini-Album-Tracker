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

const SECTION_COLORS: Partial<Record<Section['kind'], { bg: string; text: string; muted: string; icon: string }>> = {
  specials: { bg: '#F0F1F6', text: '#111111', muted: '#666666', icon: colors.accent },
  cocacola: { bg: '#F40000', text: '#ffffff', muted: 'rgba(255,255,255,0.7)', icon: '#ffffff' },
};

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
  const theme = SECTION_COLORS[section.kind];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        theme && { backgroundColor: theme.bg, borderColor: theme.bg },
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={styles.row}>
        <View style={[styles.iconWrap, theme && { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
          <Ionicons
            name={icon}
            size={22}
            color={theme ? theme.icon : (complete ? colors.success : colors.accent)}
          />
        </View>
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={[styles.title, theme && { color: theme.text }]}>{title}</Text>
            <Text style={[styles.percent, theme && { color: theme.text }]}>{formatPercent(progress.pct)}</Text>
          </View>
          <ProgressBar
            value={progress.pct}
            tint={theme ? 'rgba(255,255,255,0.9)' : undefined}
            trackColor={theme ? 'rgba(0,0,0,0.2)' : undefined}
          />
          <Text style={[styles.subtitle, theme && { color: theme.muted }]}>
            {formatFraction(progress.owned, progress.total)}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme ? theme.muted : colors.textMuted} />
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
    paddingRight: spacing.sm,
  },
  title: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  percent: {
    ...typography.smallBold,
    color: colors.accent,
    flexShrink: 0,
    minWidth: 38,
    textAlign: 'right',
  },
  subtitle: {
    ...typography.small,
    color: colors.textMuted,
  },
});
