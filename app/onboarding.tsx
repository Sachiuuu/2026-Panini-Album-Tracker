import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStrings } from '../src/i18n/useStrings';
import { useAlbumStore } from '../src/store/useAlbumStore';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/typography';

export default function Onboarding() {
  const t = useStrings();
  const router = useRouter();
  const markOnboarded = useAlbumStore((s) => s.markOnboarded);

  const handleStart = () => {
    markOnboarded();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="football" size={64} color={colors.accent} />
        </View>
        <Text style={styles.title}>{t.onboarding.title}</Text>
        <Text style={styles.subtitle}>{t.onboarding.subtitle}</Text>

        <View style={styles.bullets}>
          {t.onboarding.bullets.map((line) => (
            <View key={line} style={styles.bullet}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={colors.success}
              />
              <Text style={styles.bulletText}>{line}</Text>
            </View>
          ))}
        </View>

        <Pressable
          onPress={handleStart}
          style={({ pressed }) => [
            styles.cta,
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.ctaText}>{t.onboarding.cta}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: {
    padding: spacing.xl,
    gap: spacing.lg,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  bullets: {
    gap: spacing.md,
    alignSelf: 'stretch',
    marginTop: spacing.md,
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  bulletText: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  cta: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    borderRadius: radius.pill,
    marginTop: spacing.lg,
    minWidth: 200,
    alignItems: 'center',
  },
  ctaText: {
    ...typography.h3,
    color: colors.bg,
  },
});
