import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { EmptyState } from '../../src/components/EmptyState';
import { FilterMode, FilterSegmented } from '../../src/components/FilterSegmented';
import { StickerGrid } from '../../src/components/StickerGrid';
import { TeamHeader } from '../../src/components/TeamHeader';
import { ALBUM, getTeamStickers } from '../../src/data/album';
import { Sticker } from '../../src/data/schema';
import { es } from '../../src/i18n/es';
import { useAlbumStore } from '../../src/store/useAlbumStore';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/typography';
import { pct as pctOf } from '../../src/utils/format';

function applyFilter(
  stickers: Sticker[],
  mode: FilterMode,
  owned: Record<string, true>,
): Sticker[] {
  if (mode === 'all') return stickers;
  if (mode === 'owned') return stickers.filter((s) => owned[s.id]);
  return stickers.filter((s) => !owned[s.id]);
}

export default function TeamScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const teamCode = code ?? '';
  const team = ALBUM.teamByCode[teamCode];
  const stickers = useMemo(() => getTeamStickers(teamCode), [teamCode]);
  const owned = useAlbumStore((s) => s.owned);
  const [filter, setFilter] = useState<FilterMode>('all');

  const filtered = useMemo(
    () => applyFilter(stickers, filter, owned),
    [stickers, filter, owned],
  );

  const ownedCount = useMemo(
    () => stickers.reduce((acc, s) => acc + (owned[s.id] ? 1 : 0), 0),
    [stickers, owned],
  );

  if (!team) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ title: es.empty.noResults }} />
        <EmptyState text={es.empty.noResults} icon="alert-circle" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: team.name }} />
      <TeamHeader
        team={team}
        owned={ownedCount}
        total={stickers.length}
        pct={pctOf(ownedCount, stickers.length)}
      />
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
        stickers={filtered}
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
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  notFound: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterRow: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
});
