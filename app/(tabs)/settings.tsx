import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ALBUM } from '../../src/data/album';
import { useStrings } from '../../src/i18n/useStrings';
import { useAlbumStore } from '../../src/store/useAlbumStore';
import { Locale, useLocaleStore } from '../../src/store/useLocaleStore';
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

const LOCALE_OPTIONS: { value: Locale; label: string }[] = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
];

const GITHUB_URL = 'https://github.com/Sachiuuu';

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
  const t = useStrings();
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);
  const owned = useAlbumStore((s) => s.owned);
  const replaceOwned = useAlbumStore((s) => s.replaceOwned);
  const mergeOwned = useAlbumStore((s) => s.mergeOwned);
  const resetAll = useAlbumStore((s) => s.resetAll);
  const [busy, setBusy] = useState(false);

  const handleReset = () => {
    Alert.alert(
      t.resetDialog.title,
      t.resetDialog.message,
      [
        { text: t.resetDialog.cancel, style: 'cancel' },
        {
          text: t.resetDialog.confirm,
          style: 'destructive',
          onPress: () => resetAll(),
        },
      ],
    );
  };

  const appVersion =
    (Constants.expoConfig?.version as string | undefined) ?? '0.1.0';

  const handleExport = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await exportAlbumToShare(owned);
    } catch (err) {
      if (err instanceof ExportUnavailableError) {
        Alert.alert(t.exportDialog.errorTitle, t.exportDialog.unavailable);
      } else {
        Alert.alert(t.exportDialog.errorTitle, String((err as Error).message ?? err));
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
        t.importDialog.title,
        t.importDialog.message,
        [
          {
            text: t.importDialog.replace,
            onPress: () => {
              replaceOwned(parsed.ownedMap);
              Alert.alert(t.importDialog.title, t.importDialog.successReplace);
            },
          },
          {
            text: t.importDialog.merge,
            onPress: () => {
              mergeOwned(parsed.ownedMap);
              Alert.alert(t.importDialog.title, t.importDialog.successMerge);
            },
          },
          { text: t.importDialog.cancel, style: 'cancel' },
        ],
      );
    } catch (err) {
      if (err instanceof ImportCancelledError) return;
      if (err instanceof ImportVersionError) {
        Alert.alert(t.importDialog.errorTitle, t.importDialog.versionTooNew);
        return;
      }
      if (err instanceof ImportInvalidError) {
        Alert.alert(t.importDialog.errorTitle, t.importDialog.invalidFile);
        return;
      }
      Alert.alert(t.importDialog.errorTitle, String((err as Error).message ?? err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{t.settings.title}</Text>

      <View style={styles.group}>
        <Text style={styles.groupLabel}>{t.settings.language}</Text>
        <View style={styles.langRow}>
          {LOCALE_OPTIONS.map(({ value, label }) => {
            const active = locale === value;
            return (
              <Pressable
                key={value}
                onPress={() => setLocale(value)}
                style={[styles.langBtn, active && styles.langBtnActive]}
              >
                <Text style={[styles.langBtnText, active && styles.langBtnTextActive]}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.group}>
        <Row
          icon="cloud-upload"
          title={t.settings.export}
          hint={t.settings.exportHint}
          onPress={handleExport}
          disabled={busy}
        />
        <Row
          icon="cloud-download"
          title={t.settings.import}
          hint={t.settings.importHint}
          onPress={handleImport}
          disabled={busy}
        />
      </View>

      <View style={styles.group}>
        <Row
          icon="trash"
          title={t.settings.reset}
          hint={t.settings.resetHint}
          onPress={handleReset}
          destructive
          disabled={busy}
        />
      </View>

      <View style={styles.about}>
        <Text style={styles.aboutTitle}>{t.settings.about}</Text>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>{t.settings.version}</Text>
          <Text style={styles.aboutValue}>{appVersion}</Text>
        </View>
        <View style={styles.aboutRow}>
          <Text style={styles.aboutLabel}>{t.settings.totalStickers}</Text>
          <Text style={styles.aboutValue}>{ALBUM.totalStickers}</Text>
        </View>
        <View style={styles.aboutDivider} />
        <Pressable
          onPress={() => Linking.openURL(GITHUB_URL)}
          style={({ pressed }) => [styles.aboutRow, pressed && { opacity: 0.7 }]}
        >
          <Text style={styles.aboutLabel}>{t.settings.developer}</Text>
          <Text style={[styles.aboutValue, styles.link]}>@Sachiuuu</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xxl },
  title: { ...typography.h1, color: colors.textPrimary },
  group: { gap: spacing.md },
  groupLabel: {
    ...typography.smallBold,
    color: colors.textMuted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  langRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  langBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  langBtnActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  langBtnText: {
    ...typography.smallBold,
    color: colors.textSecondary,
  },
  langBtnTextActive: {
    color: colors.bg,
  },
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
  about: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  aboutTitle: { ...typography.h3, color: colors.textPrimary, marginBottom: spacing.xs },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aboutLabel: { ...typography.body, color: colors.textSecondary },
  aboutValue: { ...typography.bodyBold, color: colors.textPrimary },
  aboutDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  link: { color: colors.accent },
});
