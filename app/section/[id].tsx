import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../../src/components/EmptyState';
import { FilterMode, FilterSegmented } from '../../src/components/FilterSegmented';
import { ProgressBar } from '../../src/components/ProgressBar';
import { StickerGrid } from '../../src/components/StickerGrid';
import { TeamCard } from '../../src/components/TeamCard';
import { ALBUM, getSection } from '../../src/data/album';
import { Sticker, Team } from '../../src/data/schema';
import { TEAMS_BY_GROUP } from '../../src/data/teams';
import { es } from '../../src/i18n/es';
import { useAlbumStore } from '../../src/store/useAlbumStore';
import { useSectionProgress } from '../../src/store/selectors';
import { colors } from '../../src/theme/colors';
import { radius, spacing, typography } from '../../src/theme/typography';
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
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
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

  const filteredStickers = useMemo(
    () => (section ? applyFilter(section.stickers, filter, owned) : []),
    [section, filter, owned],
  );

  if (!section) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ title: es.empty.noResults }} />
        <EmptyState text={es.empty.noResults} icon="alert-circle" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: section.title }} />

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{section.title}</Text>
          <Text style={styles.percent}>{formatPercent(progress.pct)}</Text>
        </View>
        <ProgressBar value={progress.pct} />
        <Text style={styles.fraction}>
          {formatFraction(progress.owned, progress.total)}
        </Text>
      </View>

      {isGroup ? (
        <ScrollView contentContainerStyle={styles.teamsList}>
          <Text style={styles.subheader}>{es.section.teamsInGroup}</Text>
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
                all: es.filter.all,
                owned: es.filter.owned,
                missing: es.filter.missing,
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
                    ? es.empty.noOwned
                    : filter === 'missing'
                      ? es.empty.noMissing
                      : es.empty.noResults
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
    padding: spacing.lg,
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { ...typography.h2, color: colors.textPrimary },
  percent: { ...typography.h3, color: colors.accent },
  fraction: { ...typography.small, color: colors.textMuted },
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
