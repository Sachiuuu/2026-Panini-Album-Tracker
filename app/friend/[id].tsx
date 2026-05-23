import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '../../src/components/EmptyState';
import { FilterMode, FilterSegmented } from '../../src/components/FilterSegmented';
import { StickerGrid } from '../../src/components/StickerGrid';
import { StickerTile } from '../../src/components/StickerTile';
import { ALBUM } from '../../src/data/album';
import { Sticker } from '../../src/data/schema';
import { useStrings } from '../../src/i18n/useStrings';
import { useAlbumStore } from '../../src/store/useAlbumStore';
import { useFriendsStore } from '../../src/store/useFriendsStore';
import { colors } from '../../src/theme/colors';
import { radius, spacing, typography } from '../../src/theme/typography';

const LIST_PADDING = spacing.lg;
const COL_GAP = spacing.md;
const NUM_COLS = 4;

function applyFilter(
  stickers: Sticker[],
  mode: FilterMode,
  owned: Record<string, true>,
): Sticker[] {
  if (mode === 'all') return stickers;
  if (mode === 'owned') return stickers.filter((s) => owned[s.id]);
  return stickers.filter((s) => !owned[s.id]);
}

export default function FriendDetailScreen() {
  const t = useStrings();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();

  const friend = useFriendsStore((s) => s.friends.find((f) => f.id === id));
  const removeFriend = useFriendsStore((s) => s.removeFriend);
  const renameFriend = useFriendsStore((s) => s.renameFriend);
  const owned = useAlbumStore((s) => s.owned);

  const [filter, setFilter] = useState<FilterMode>('all');
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  const canGiveStickers = useMemo<Sticker[]>(() => {
    if (!friend) return [];
    return friend.missing
      .filter((sid) => owned[sid])
      .map((sid) => ALBUM.stickerById[sid])
      .filter(Boolean) as Sticker[];
  }, [friend, owned]);

  const theyNeedStickers = useMemo<Sticker[]>(() => {
    if (!friend) return [];
    return friend.missing
      .map((sid) => ALBUM.stickerById[sid])
      .filter(Boolean) as Sticker[];
  }, [friend]);

  const filteredTheyNeed = useMemo(
    () => applyFilter(theyNeedStickers, filter, owned),
    [theyNeedStickers, filter, owned],
  );

  const tileSize = Math.floor(
    (width - LIST_PADDING * 2 - COL_GAP * (NUM_COLS - 1)) / NUM_COLS,
  );

  const startRename = () => {
    setRenameValue(friend?.name ?? '');
    setIsRenaming(true);
  };

  const confirmRename = () => {
    const name = renameValue.trim();
    if (name && friend) renameFriend(friend.id, name);
    setIsRenaming(false);
  };

  const handleDelete = () => {
    if (!friend) return;
    const doDelete = () => {
      removeFriend(friend.id);
      router.back();
    };
    if (Platform.OS === 'web') {
      if (window.confirm(`${t.friends.removeFriend}?`)) doDelete();
      return;
    }
    Alert.alert(t.friends.removeFriend, friend.name, [
      { text: t.friendImportDialog.cancel, style: 'cancel' },
      { text: t.friends.removeFriend, style: 'destructive', onPress: doDelete },
    ]);
  };

  if (!friend) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
        </Pressable>
        <EmptyState text={t.empty.noResults} icon="alert-circle" />
      </View>
    );
  }

  const ListHeader = (
    <View>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
            <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
          </Pressable>
          <View style={styles.headerActions}>
            <Pressable onPress={startRename} style={styles.actionBtn} hitSlop={8}>
              <Ionicons name="pencil-outline" size={20} color={colors.textMuted} />
            </Pressable>
            <Pressable onPress={handleDelete} style={styles.actionBtn} hitSlop={8}>
              <Ionicons name="trash-outline" size={20} color={colors.danger} />
            </Pressable>
          </View>
        </View>

        {isRenaming ? (
          <View style={styles.renameRow}>
            <TextInput
              style={styles.renameInput}
              value={renameValue}
              onChangeText={setRenameValue}
              autoFocus
              maxLength={40}
              returnKeyType="done"
              onSubmitEditing={confirmRename}
              placeholderTextColor={colors.textMuted}
            />
            <Pressable onPress={confirmRename} style={styles.renameSave} hitSlop={8}>
              <Ionicons name="checkmark" size={22} color={colors.accent} />
            </Pressable>
            <Pressable onPress={() => setIsRenaming(false)} style={styles.renameCancel} hitSlop={8}>
              <Ionicons name="close" size={22} color={colors.textMuted} />
            </Pressable>
          </View>
        ) : (
          <Text style={styles.friendName}>{friend.name}</Text>
        )}
      </View>

      {canGiveStickers.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t.friends.youCanGive}</Text>
            <Text style={styles.sectionCount}>{canGiveStickers.length}</Text>
          </View>
          <View style={styles.miniGrid}>
            {canGiveStickers.map((sticker) => (
              <StickerTile key={sticker.id} sticker={sticker} size={tileSize} />
            ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t.friends.theyNeed}</Text>
          <Text style={styles.sectionCount}>{friend.missing.length}</Text>
        </View>
        <View style={styles.filterRow}>
          <FilterSegmented
            value={filter}
            onChange={setFilter}
            labels={{
              all: t.filter.all,
              owned: t.filter.owned,
              missing: t.filter.missing,
            }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.screen}>
      <StickerGrid
        stickers={filteredTheyNeed}
        numColumns={NUM_COLS}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          <EmptyState
            text={
              filter === 'owned'
                ? t.empty.noOwned
                : filter === 'missing'
                ? t.empty.noMissing
                : t.empty.noResults
            }
            icon={filter === 'missing' ? 'trophy-outline' : 'search-outline'}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },

  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    padding: spacing.xs,
    marginLeft: -spacing.xs,
  },
  headerActions: { flexDirection: 'row', gap: spacing.sm },
  actionBtn: { padding: spacing.xs },

  friendName: { ...typography.h2, color: colors.textPrimary },

  renameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  renameInput: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    ...typography.h3,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  renameSave: { padding: spacing.xs },
  renameCancel: { padding: spacing.xs },

  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  sectionTitle: { ...typography.h3, color: colors.textPrimary },
  sectionCount: {
    ...typography.smallBold,
    color: colors.accent,
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },

  miniGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: COL_GAP,
  },

  filterRow: { marginBottom: spacing.xs },
});
