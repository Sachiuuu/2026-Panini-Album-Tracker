import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fonts, radius, spacing, typography } from '../theme/typography';

interface Props {
  label: string;
  value: string;
  hint?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  tint?: string;
}

export function StatTile({ label, value, hint, icon, tint = colors.accent }: Props) {
  return (
    <View style={styles.tile}>
      <View style={styles.header}>
        {icon ? <Ionicons name={icon} size={16} color={tint} /> : null}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={[styles.value, { color: tint }]}>{value}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
    minWidth: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    ...typography.smallBold,
    color: colors.textMuted,
    letterSpacing: 0.4,
  },
  value: {
    fontFamily: fonts.display,
    fontSize: 36,
    lineHeight: 40,
  },
  hint: {
    ...typography.small,
    color: colors.textMuted,
  },
});
