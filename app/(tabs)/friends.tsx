import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useStrings } from '../../src/i18n/useStrings';
import { useAlbumStore } from '../../src/store/useAlbumStore';
import { FriendProfile, useFriendsStore } from '../../src/store/useFriendsStore';
import { colors } from '../../src/theme/colors';
import { radius, spacing, typography } from '../../src/theme/typography';
import {
  ImportCancelledError,
  ImportInvalidError,
  ImportVersionError,
  ParsedMissingImport,
  pickAndReadMissingList,
} from '../../src/utils/exportImport';

interface FriendCardProps {
  friend: FriendProfile;
  canGive: number;
  onPress: () => void;
}

function FriendCard({ friend, canGive, onPress }: FriendCardProps) {
  const t = useStrings();
  const date = new Date(friend.importedAt).toLocaleDateString();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <View style={styles.cardIcon}>
        <Ionicons name="person" size={22} color={colors.accent} />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardName}>{friend.name}</Text>
        <Text style={styles.cardSub}>
          {t.friends.stickersCount(friend.missing.length)} · {date}
        </Text>
        {canGive > 0 && (
          <Text style={styles.cardCanGive}>{t.friends.canGiveCount(canGive)}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

export default function FriendsScreen() {
  const t = useStrings();
  const router = useRouter();
  const friends = useFriendsStore((s) => s.friends);
  const addFriend = useFriendsStore((s) => s.addFriend);
  const owned = useAlbumStore((s) => s.owned);

  const [busy, setBusy] = useState(false);
  const [pendingMissing, setPendingMissing] = useState<ParsedMissingImport | null>(null);
  const [pendingName, setPendingName] = useState('');

  const handleImport = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const result = await pickAndReadMissingList();
      setPendingMissing(result);
      setPendingName('');
    } catch (err) {
      if (err instanceof ImportCancelledError) { setBusy(false); return; }
      const showError = (title: string, body: string) =>
        Platform.OS === 'web' ? window.alert(`${title}: ${body}`) : Alert.alert(title, body);
      if (err instanceof ImportVersionError)
        showError(t.friendImportDialog.errorTitle, t.friendImportDialog.versionTooNew);
      else if (err instanceof ImportInvalidError)
        showError(t.friendImportDialog.errorTitle, t.friendImportDialog.invalidFile);
      else
        showError(t.friendImportDialog.errorTitle, String((err as Error).message ?? err));
    } finally {
      setBusy(false);
    }
  };

  const confirmImport = () => {
    if (!pendingMissing) return;
    const name = pendingName.trim();
    if (!name) return;
    addFriend({ name, missing: pendingMissing.missing });
    setPendingMissing(null);
    setPendingName('');
  };

  const cancelImport = () => {
    setPendingMissing(null);
    setPendingName('');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t.friends.title}</Text>

      <Pressable
        onPress={handleImport}
        disabled={busy}
        style={({ pressed }) => [styles.importBtn, (pressed || busy) && { opacity: 0.7 }]}
      >
        <Ionicons name="add-circle-outline" size={20} color={colors.bg} />
        <Text style={styles.importBtnText}>{t.friends.importFriend}</Text>
      </Pressable>

      {pendingMissing && (
        <View style={styles.nameCard}>
          <Text style={styles.nameCardTitle}>{t.friendImportDialog.title}</Text>
          <TextInput
            style={styles.nameInput}
            placeholder={t.friendImportDialog.namePlaceholder}
            placeholderTextColor={colors.textMuted}
            value={pendingName}
            onChangeText={setPendingName}
            autoFocus
            maxLength={40}
            returnKeyType="done"
            onSubmitEditing={confirmImport}
          />
          <View style={styles.nameCardBtns}>
            <Pressable
              style={({ pressed }) => [styles.confirmBtn, pressed && { opacity: 0.8 }]}
              onPress={confirmImport}
            >
              <Text style={styles.confirmBtnText}>{t.friendImportDialog.confirm}</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [styles.cancelBtn, pressed && { opacity: 0.8 }]}
              onPress={cancelImport}
            >
              <Text style={styles.cancelBtnText}>{t.friendImportDialog.cancel}</Text>
            </Pressable>
          </View>
        </View>
      )}

      {friends.length === 0 && !pendingMissing ? (
        <View style={styles.empty}>
          <Ionicons name="people-outline" size={48} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>{t.friends.emptyTitle}</Text>
          <Text style={styles.emptyHint}>{t.friends.emptyHint}</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {friends.map((friend) => {
            const canGive = friend.missing.filter((id) => owned[id]).length;
            return (
              <FriendCard
                key={friend.id}
                friend={friend}
                canGive={canGive}
                onPress={() => router.push(`/friend/${friend.id}`)}
              />
            );
          })}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  title: { ...typography.h1, color: colors.textPrimary },

  importBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  importBtnText: { ...typography.bodyBold, color: colors.bg },

  nameCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.accent,
    gap: spacing.md,
  },
  nameCardTitle: { ...typography.h3, color: colors.textPrimary },
  nameInput: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    ...typography.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  nameCardBtns: { flexDirection: 'row', gap: spacing.sm },
  confirmBtn: {
    flex: 1,
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  confirmBtnText: { ...typography.bodyBold, color: colors.bg },
  cancelBtn: { alignSelf: 'center', paddingHorizontal: spacing.md },
  cancelBtnText: { ...typography.body, color: colors.textMuted },

  empty: {
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: { ...typography.h3, color: colors.textSecondary, textAlign: 'center' },
  emptyHint: { ...typography.body, color: colors.textMuted, textAlign: 'center' },

  list: { gap: spacing.md },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: { flex: 1, gap: 2 },
  cardName: { ...typography.bodyBold, color: colors.textPrimary },
  cardSub: { ...typography.small, color: colors.textMuted },
  cardCanGive: { ...typography.smallBold, color: colors.accent, marginTop: 2 },
});
