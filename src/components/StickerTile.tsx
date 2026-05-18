import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Sticker } from '../data/schema';
import { useStickerOwned } from '../store/selectors';
import { useAlbumStore } from '../store/useAlbumStore';
import { colors } from '../theme/colors';
import { radius, typography } from '../theme/typography';

interface Props {
  sticker: Sticker;
  size?: number;
  onScan?: () => void; // PHASE_2: camera scan entry point
}

function StickerTileBase({ sticker, size = 72 }: Props) {
  const owned = useStickerOwned(sticker.id);
  const toggle = useAlbumStore((s) => s.toggleOwned);

  return (
    <Pressable
      onPress={() => toggle(sticker.id)}
      style={({ pressed }) => [
        styles.tile,
        {
          width: size,
          height: size,
          backgroundColor: owned ? colors.success : colors.surface,
          borderColor: owned ? colors.success : colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
      hitSlop={6}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: owned }}
      accessibilityLabel={sticker.label ?? sticker.code}
    >
      <Text
        style={[
          styles.code,
          { color: owned ? colors.bg : colors.textPrimary },
        ]}
        numberOfLines={1}
      >
        {sticker.code}
      </Text>
      {owned ? (
        <View style={styles.check}>
          <Ionicons name="checkmark" size={14} color={colors.bg} />
        </View>
      ) : null}
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
  },
  code: {
    ...typography.bodyBold,
    fontSize: 13,
    letterSpacing: 0.3,
  },
  check: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
