import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStrings } from '../src/i18n/useStrings';
import { useAlbumStore } from '../src/store/useAlbumStore';
import { colors } from '../src/theme/colors';
import { radius, spacing, typography } from '../src/theme/typography';

const COUNT = 10;

export default function Onboarding() {
  const t = useStrings();
  const router = useRouter();
  const markOnboarded = useAlbumStore((s) => s.markOnboarded);
  const { width } = useWindowDimensions();

  const anims = useRef(
    Array.from({ length: COUNT }, () => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(28),
    })),
  ).current;

  const ctaScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.stagger(
      90,
      anims.map((a) =>
        Animated.parallel([
          Animated.timing(a.opacity, { toValue: 1, duration: 420, useNativeDriver: true }),
          Animated.timing(a.translateY, { toValue: 0, duration: 420, useNativeDriver: true }),
        ]),
      ),
    ).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(ctaScale, { toValue: 1.05, duration: 900, useNativeDriver: true }),
        Animated.timing(ctaScale, { toValue: 1, duration: 900, useNativeDriver: true }),
      ]),
    );
    const timer = setTimeout(() => pulse.start(), 1200);
    return () => {
      clearTimeout(timer);
      pulse.stop();
    };
  }, []);

  const a = (idx: number) => ({
    opacity: anims[idx].opacity,
    transform: [{ translateY: anims[idx].translateY }],
  });

  const handleStart = () => {
    markOnboarded();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        style={{ flex: 1 }}
        contentContainerStyle={{ width: width * 3 }}
      >
        {/* Slide 1 — Welcome */}
        <View style={[styles.slide, { width }]}>
          <Animated.View style={[styles.iconWrap, a(0)]}>
            <Ionicons name="football" size={64} color={colors.accent} />
          </Animated.View>
          <Animated.Text style={[styles.slideTitle, a(1)]}>
            {t.onboarding.title}
          </Animated.Text>
          <Animated.Text style={[styles.slideSubtitle, a(2)]}>
            {t.onboarding.subtitle}
          </Animated.Text>
          <Animated.Text style={[styles.swipeHint, a(2)]}>
            {'→'}
          </Animated.Text>
        </View>

        {/* Slide 2 — Features */}
        <View style={[styles.slide, { width }]}>
          <Animated.View style={[styles.iconWrap, a(3)]}>
            <Ionicons name="list-circle" size={64} color={colors.accent} />
          </Animated.View>
          <View style={styles.bullets}>
            {t.onboarding.bullets.map((line, i) => (
              <Animated.View key={line} style={[styles.bullet, a(4 + i)]}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text style={styles.bulletText}>{line}</Text>
              </Animated.View>
            ))}
          </View>
          <Animated.Text style={[styles.swipeHint, a(8)]}>
            {'→'}
          </Animated.Text>
        </View>

        {/* Slide 3 — CTA */}
        <View style={[styles.slide, { width }]}>
          <Animated.View style={[styles.iconWrap, a(9)]}>
            <Ionicons name="trophy" size={64} color={colors.accent} />
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
            <Pressable
              onPress={handleStart}
              style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.ctaText}>{t.onboarding.cta}</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Dot indicators */}
      <View style={styles.dots}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={styles.dot} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.lg,
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
  slideTitle: {
    ...typography.h1,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  slideSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  swipeHint: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  bullets: {
    gap: spacing.md,
    alignSelf: 'stretch',
  },
  bullet: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
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
    minWidth: 200,
    alignItems: 'center',
  },
  ctaText: {
    ...typography.h3,
    color: colors.bg,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
});
