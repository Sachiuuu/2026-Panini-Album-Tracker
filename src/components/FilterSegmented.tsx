import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/typography';

export type FilterMode = 'all' | 'owned' | 'missing';

interface Props {
  value: FilterMode;
  onChange: (next: FilterMode) => void;
  labels: { all: string; owned: string; missing: string };
}

const OPTIONS: FilterMode[] = ['all', 'owned', 'missing'];

export function FilterSegmented({ value, onChange, labels }: Props) {
  return (
    <View style={styles.container}>
      {OPTIONS.map((opt) => {
        const active = opt === value;
        return (
          <Pressable
            key={opt}
            onPress={() => onChange(opt)}
            style={[styles.option, active && styles.optionActive]}
            hitSlop={8}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {labels[opt]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    padding: 4,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.pill,
    minHeight: 44,
  },
  optionActive: {
    backgroundColor: colors.accent,
  },
  label: {
    ...typography.smallBold,
    color: colors.textSecondary,
  },
  labelActive: {
    color: colors.bg,
  },
});
