import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { es } from '../../src/i18n/es';
import { useAlbumStore } from '../../src/store/useAlbumStore';
import { colors } from '../../src/theme/colors';
import { radius, spacing, typography } from '../../src/theme/typography';
import {
  exportAlbumToShare,
  ExportUnavailableError,
  ImportCancelledError,
  ImportInvalidError,
  ImportVersionError,
  pickAndReadAlbum,
} from '../../src/utils/exportImport';

interface RowProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  hint?: string;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

function Row({ icon, title, hint, onPress, destructive, disabled }: RowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.row,
        pressed && !disabled && { opacity: 0.85 },
        disabled && { opacity: 0.6 },
      ]}
    >
      <Ionicons
        name={icon}
        size={22}
        color={destructive ? colors.danger : colors.accent}
      />
      <View style={styles.rowBody}>
        <Text style={[styles.rowTitle, destructive && { color: colors.danger }]}>
          {title}
        </Text>
        {hint ? <Text style={styles.rowHint}>{hint}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

export default function Settings() {
  const owned = useAlbumStore((s) => s.owned);
  const replaceOwned = useAlbumStore((s) => s.replaceOwned);
  const mergeOwned = useAlbumStore((s) => s.mergeOwned);
  const [busy, setBusy] = useState(false);

  const handleExport = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await exportAlbumToShare(owned);
    } catch (err) {
      if (err instanceof ExportUnavailableError) {
        Alert.alert(es.exportDialog.errorTitle, es.exportDialog.unavailable);
      } else {
        Alert.alert(es.exportDialog.errorTitle, String((err as Error).message ?? err));
      }
    } finally {
      setBusy(false);
    }
  };

  const handleImport = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const parsed = await pickAndReadAlbum();
      Alert.alert(
        es.importDialog.title,
        es.importDialog.message,
        [
          {
            text: es.importDialog.replace,
            onPress: () => {
              replaceOwned(parsed.ownedMap);
              Alert.alert(es.importDialog.title, es.importDialog.successReplace);
            },
          },
          {
            text: es.importDialog.merge,
            onPress: () => {
              mergeOwned(parsed.ownedMap);
              Alert.alert(es.importDialog.title, es.importDialog.successMerge);
            },
          },
          { text: es.importDialog.cancel, style: 'cancel' },
        ],
      );
    } catch (err) {
      if (err instanceof ImportCancelledError) return;
      if (err instanceof ImportVersionError) {
        Alert.alert(es.importDialog.errorTitle, es.importDialog.versionTooNew);
        return;
      }
      if (err instanceof ImportInvalidError) {
        Alert.alert(es.importDialog.errorTitle, es.importDialog.invalidFile);
        return;
      }
      Alert.alert(es.importDialog.errorTitle, String((err as Error).message ?? err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{es.settings.title}</Text>

      <View style={styles.group}>
        <Row
          icon="cloud-upload"
          title={es.settings.export}
          hint={es.settings.exportHint}
          onPress={handleExport}
          disabled={busy}
        />
        <Row
          icon="cloud-download"
          title={es.settings.import}
          hint={es.settings.importHint}
          onPress={handleImport}
          disabled={busy}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  title: { ...typography.h1, color: colors.textPrimary },
  group: { gap: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 64,
  },
  rowBody: { flex: 1, gap: 4, minWidth: 0 },
  rowTitle: { ...typography.bodyBold, color: colors.textPrimary },
  rowHint: { ...typography.small, color: colors.textMuted },
});
