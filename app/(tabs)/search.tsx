import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../src/components/EmptyState';
import { Flag } from '../../src/components/Flag';
import { SearchBar } from '../../src/components/SearchBar';
import { ALBUM } from '../../src/data/album';
import { Sticker, Team } from '../../src/data/schema';
import { TEAMS } from '../../src/data/teams';
import { useStrings } from '../../src/i18n/useStrings';
import { useAlbumStore } from '../../src/store/useAlbumStore';
import { colors } from '../../src/theme/colors';
import { radius, spacing, typography } from '../../src/theme/typography';
import { useDebounced } from '../../src/utils/debounce';

type Row =
  | { kind: 'header'; id: string; title: string }
  | { kind: 'team'; id: string; team: Team }
  | { kind: 'sticker'; id: string; sticker: Sticker };

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

export default function Search() {
  const t = useStrings();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounced(query, 150);
  const owned = useAlbumStore((s) => s.owned);

  const rows = useMemo<Row[]>(() => {
    const q = normalize(debouncedQuery.trim());
    if (!q) return [];

    const matchedTeams = TEAMS.filter((team) => {
      const localName = t.teamNames[team.code] ?? team.name;
      return (
        normalize(localName).includes(q) ||
        normalize(team.name).includes(q) ||
        normalize(team.code).includes(q) ||
        normalize(team.countryCode).includes(q)
      );
    });

    const allStickers = Object.values(ALBUM.stickerById);
    const matchedStickers = allStickers
      .filter((s) => {
        return (
          normalize(s.code).includes(q) ||
          (s.label ? normalize(s.label).includes(q) : false)
        );
      })
      .slice(0, 100);

    const result: Row[] = [];
    if (matchedTeams.length > 0) {
      result.push({ kind: 'header', id: 'h-teams', title: t.search.teamsHeader });
      for (const team of matchedTeams) {
        result.push({ kind: 'team', id: `team-${team.code}`, team });
      }
    }
    if (matchedStickers.length > 0) {
      result.push({
        kind: 'header',
        id: 'h-stickers',
        title: t.search.stickersHeader,
      });
      for (const sticker of matchedStickers) {
        result.push({ kind: 'sticker', id: `st-${sticker.id}`, sticker });
      }
    }
    return result;
  }, [debouncedQuery, t]);

  const isEmpty = debouncedQuery.trim().length > 0 && rows.length === 0;

  return (
    <View style={styles.screen}>
      <View style={styles.searchWrap}>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={t.search.placeholder}
        />
      </View>

      {debouncedQuery.trim().length === 0 ? (
        <View style={styles.intro}>
          <EmptyState text={t.search.typeToSearch} icon="search" />
        </View>
      ) : isEmpty ? (
        <EmptyState text={t.search.noResults} icon="sad" />
      ) : (
        <FlatList
          data={rows}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            if (item.kind === 'header') {
              return <Text style={styles.sectionHeader}>{item.title}</Text>;
            }
            if (item.kind === 'team') {
              const team = item.team;
              return (
                <Pressable
                  onPress={() => router.push(`/team/${team.code}`)}
                  style={({ pressed }) => [
                    styles.row,
                    pressed && { opacity: 0.85 },
                  ]}
                >
                  <Flag code={team.countryCode} height={24} />
                  <View style={styles.rowBody}>
                    <Text style={styles.rowTitle}>{t.teamNames[team.code] ?? team.name}</Text>
                    <Text style={styles.rowHint}>
                      {team.code} · {t.section.group} {team.group}
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={colors.textMuted}
                  />
                </Pressable>
              );
            }
            const sticker = item.sticker;
            const isOwned = !!owned[sticker.id];
            const target = sticker.teamCode
              ? `/team/${sticker.teamCode}`
              : `/section/${sticker.sectionId}`;
            return (
              <Pressable
                onPress={() => router.push(target)}
                style={({ pressed }) => [
                  styles.row,
                  pressed && { opacity: 0.85 },
                ]}
              >
                <View
                  style={[
                    styles.codeBadge,
                    {
                      backgroundColor: isOwned ? colors.success : colors.surfaceAlt,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.codeText,
                      { color: isOwned ? colors.bg : colors.textPrimary },
                    ]}
                  >
                    {sticker.code}
                  </Text>
                </View>
                <View style={styles.rowBody}>
                  <Text style={styles.rowTitle} numberOfLines={1}>
                    {sticker.label ?? sticker.code}
                  </Text>
                  <Text style={styles.rowHint}>#{sticker.albumIndex + 1}</Text>
                </View>
                <Ionicons
                  name={isOwned ? 'checkmark-circle' : 'chevron-forward'}
                  size={18}
                  color={isOwned ? colors.success : colors.textMuted}
                />
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  searchWrap: { padding: spacing.lg, paddingBottom: spacing.sm },
  intro: { flex: 1, justifyContent: 'center' },
  list: { padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.xxl },
  sectionHeader: {
    ...typography.smallBold,
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowBody: { flex: 1, gap: 2, minWidth: 0 },
  rowTitle: { ...typography.bodyBold, color: colors.textPrimary },
  rowHint: { ...typography.small, color: colors.textMuted },
  codeBadge: {
    minWidth: 48,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeText: { ...typography.smallBold, letterSpacing: 0.4 },
});
