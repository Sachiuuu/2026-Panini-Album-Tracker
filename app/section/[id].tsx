import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '../../src/components/EmptyState';
import { FilterMode, FilterSegmented } from '../../src/components/FilterSegmented';
import { ProgressBar } from '../../src/components/ProgressBar';
import { StickerGrid } from '../../src/components/StickerGrid';
import { TeamCard } from '../../src/components/TeamCard';
import { ALBUM, getSection } from '../../src/data/album';
import { GROUP_COLORS } from '../../src/data/groupColors';
import { Sticker, Team } from '../../src/data/schema';
import { TEAMS_BY_GROUP } from '../../src/data/teams';
import { getSectionTitle } from '../../src/i18n/getSectionTitle';
import { useStrings } from '../../src/i18n/useStrings';
import { useAlbumStore } from '../../src/store/useAlbumStore';
import { useSectionProgress } from '../../src/store/selectors';
import { colors } from '../../src/theme/colors';
import { spacing, typography } from '../../src/theme/typography';
import { formatFraction, formatPercent, pct as pctOf } from '../../src/utils/format';

function applyFilter(
  stickers: Sticker[],
  mode: FilterMode,
  owned: Record<string, true>,
): Sticker[] {
  if (mode === 'all') return stickers;
  if (mode === 'owned') return stickers.filter((s) => owned[s.id]);
  return stickers.filter((s) => !owned[s.id]);
}

export default function SectionScreen() {
  const t = useStrings();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const sectionId = id ?? '';
  const section = getSection(sectionId);
  const progress = useSectionProgress(sectionId);
  const owned = useAlbumStore((s) => s.owned);

  const [filter, setFilter] = useState<FilterMode>('all');

  const isGroup = section?.kind === 'group';
  const groupLetter = isGroup ? sectionId.replace('group-', '') : '';
  const groupTeams: Team[] = useMemo(
    () => (isGroup ? TEAMS_BY_GROUP[groupLetter] ?? [] : []),
    [isGroup, groupLetter],
  );

  function getHeaderTheme() {
    if (!section) return { bg: colors.surface, text: colors.textPrimary, muted: colors.textMuted };
    if (section.kind === 'group') {
      return {
        bg: GROUP_COLORS[groupLetter] ?? colors.surface,
        text: '#ffffff',
        muted: 'rgba(255,255,255,0.7)',
      };
    }
    if (section.kind === 'cocacola') {
      return { bg: '#F40000', text: '#ffffff', muted: 'rgba(255,255,255,0.7)' };
    }
    if (section.kind === 'specials') {
      return { bg: '#F0F1F6', text: '#111111', muted: '#666666' };
    }
    return { bg: colors.surface, text: colors.textPrimary, muted: colors.textMuted };
  }
  const headerTheme = getHeaderTheme();

  const filteredStickers = useMemo(
    () => (section ? applyFilter(section.stickers, filter, owned) : []),
    [section, filter, owned],
  );

  if (!section) {
    return (
      <View style={[styles.notFound, { paddingTop: insets.top }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
        </Pressable>
        <EmptyState text={t.empty.noResults} icon="alert-circle" />
      </View>
    );
  }

  const title = getSectionTitle(section, t);

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.header,
          { backgroundColor: headerTheme.bg, paddingTop: insets.top + spacing.sm },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={8}>
          <Ionicons name="chevron-back" size={28} color={headerTheme.text} />
        </Pressable>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: headerTheme.text }]}>{title}</Text>
          <Text style={[styles.percent, { color: headerTheme.text }]}>
            {formatPercent(progress.pct)}
          </Text>
        </View>
        <ProgressBar
          value={progress.pct}
          tint={headerTheme.text === '#ffffff' ? 'rgba(255,255,255,0.9)' : undefined}
          trackColor={headerTheme.text === '#ffffff' ? 'rgba(0,0,0,0.2)' : undefined}
        />
        <Text style={[styles.fraction, { color: headerTheme.muted }]}>
          {formatFraction(progress.owned, progress.total)}
        </Text>
      </View>

      {isGroup ? (
        <ScrollView contentContainerStyle={styles.teamsList}>
          <Text style={styles.subheader}>{t.section.teamsInGroup}</Text>
          {groupTeams.map((team) => {
            const teamStickers = section.stickers.filter(
              (s) => s.teamCode === team.code,
            );
            const ownedCount = teamStickers.reduce(
              (acc, s) => acc + (owned[s.id] ? 1 : 0),
              0,
            );
            return (
              <TeamCard
                key={team.code}
                team={team}
                owned={ownedCount}
                total={teamStickers.length}
                pct={pctOf(ownedCount, teamStickers.length)}
                onPress={() => router.push(`/team/${team.code}`)}
              />
            );
          })}
        </ScrollView>
      ) : (
        <View style={styles.flex}>
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
          <StickerGrid
            stickers={filteredStickers}
            numColumns={4}
            ListEmptyComponent={
              <EmptyState
                text={
                  filter === 'owned'
                    ? t.empty.noOwned
                    : filter === 'missing'
                      ? t.empty.noMissing
                      : t.empty.noResults
                }
                icon={filter === 'missing' ? 'trophy' : 'sparkles'}
              />
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  flex: { flex: 1 },
  notFound: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.sm,
  },
  backBtn: {
    alignSelf: 'flex-start',
    padding: 4,
    marginBottom: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: spacing.sm,
  },
  title: { ...typography.h2, flexShrink: 1 },
  percent: { ...typography.h3, flexShrink: 0, minWidth: 52, textAlign: 'right' },
  fraction: { ...typography.small },
  filterRow: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  teamsList: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xxl,
  },
  subheader: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
});
