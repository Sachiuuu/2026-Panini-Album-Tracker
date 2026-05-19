import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { memo, useRef } from 'react';
import { Animated, Platform, Pressable, StyleSheet, Text } from 'react-native';

const USE_NATIVE_DRIVER = Platform.OS !== 'web';
import { Sticker } from '../data/schema';
import { useStickerOwned } from '../store/selectors';
import { useAlbumStore } from '../store/useAlbumStore';
import { colors } from '../theme/colors';
import { fonts, radius } from '../theme/typography';

interface Props {
  sticker: Sticker;
  size?: number;
  // PHASE_2: si en el futuro agregamos escaneo con cámara, este callback dispara la cámara
  // desde un long-press sobre la lámina. Ver src/scan/README.md.
  onScan?: () => void;
}

function StickerTileBase({ sticker, size = 80 }: Props) {
  const owned = useStickerOwned(sticker.id);
  const toggle = useAlbumStore((s) => s.toggleOwned);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    const willBeOwned = !owned;
    toggle(sticker.id);

    if (willBeOwned) {
      scale.setValue(0.82);
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: USE_NATIVE_DRIVER,
        speed: 16,
        bounciness: 16,
      }).start();
      if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      Animated.sequence([
        Animated.timing(scale, { toValue: 0.93, duration: 60, useNativeDriver: USE_NATIVE_DRIVER }),
        Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: USE_NATIVE_DRIVER }),
      ]).start();
      if (Platform.OS !== 'web') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const checkSize = Math.round(size * 0.44);

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={4}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: owned }}
      accessibilityLabel={sticker.label ?? sticker.code}
    >
      <Animated.View
        style={[
          styles.tile,
          {
            width: size,
            height: size,
            backgroundColor: owned ? colors.success : colors.surface,
            borderColor: owned ? colors.successDark : colors.border,
            borderStyle: owned ? 'solid' : 'dashed',
            transform: [{ scale }],
          },
        ]}
      >
        {owned ? (
          <>
            <Ionicons name="checkmark" size={checkSize} color={colors.bg} />
            <Text style={[styles.codeOwned, { fontSize: Math.max(9, size * 0.145) }]}>
              {sticker.code}
            </Text>
          </>
        ) : (
          <Text style={[styles.code, { fontSize: Math.max(10, size * 0.165) }]}>
            {sticker.code}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

export const StickerTile = memo(StickerTileBase);

const styles = StyleSheet.create({
  tile: {
    borderRadius: radius.md,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    gap: 2,
  },
  code: {
    fontFamily: fonts.semiBold,
    color: colors.textMuted,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  codeOwned: {
    fontFamily: fonts.semiBold,
    color: colors.bg,
    opacity: 0.75,
    letterSpacing: 0.2,
    textAlign: 'center',
  },
});
