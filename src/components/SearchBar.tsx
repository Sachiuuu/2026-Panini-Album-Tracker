import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/typography';

interface Props {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChange, placeholder, autoFocus }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={colors.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="characters"
        returnKeyType="search"
        autoFocus={autoFocus}
      />
      {value.length > 0 ? (
        <Pressable
          onPress={() => onChange('')}
          hitSlop={12}
          accessibilityLabel="Limpiar búsqueda"
        >
          <Ionicons name="close-circle" size={20} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 48,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    ...typography.body,
    padding: 0,
  },
});
