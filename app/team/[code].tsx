import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ConfettiBurst } from '../../src/components/ConfettiBurst';
import { EmptyState } from '../../src/components/EmptyState';
import { FilterMode, FilterSegmented } from '../../src/components/FilterSegmented';
import { StickerGrid } from '../../src/components/StickerGrid';
import { TeamHeader } from '../../src/components/TeamHeader';
import { ALBUM, getTeamStickers } from '../../src/data/album';
import { Sticker } from '../../src/data/schema';
import { useStrings } from '../../src/i18n/useStrings';
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
  const t = useStrings();
  const { code } = useLocalSearchParams<{ code: string }>();
  const teamCode = code ?? '';
  const team = ALBUM.teamByCode[teamCode];
  const stickers = useMemo(() => getTeamStickers(teamCode), [teamCode]);
  const owned = useAlbumStore((s) => s.owned);
  const [filter, setFilter] = useState<FilterMode>('all');
  const [confetti, setConfetti] = useState(false);

  const filtered = useMemo(
    () => applyFilter(stickers, filter, owned),
    [stickers, filter, owned],
  );

  const ownedCount = useMemo(
    () => stickers.reduce((acc, s) => acc + (owned[s.id] ? 1 : 0), 0),
    [stickers, owned],
  );

  const prevCountRef = useRef<number | null>(null);
  useEffect(() => {
    const prev = prevCountRef.current;
    prevCountRef.current = ownedCount;
    if (
      stickers.length > 0 &&
      ownedCount === stickers.length &&
      prev !== null &&
      prev < stickers.length
    ) {
      setConfetti(true);
    }
  }, [ownedCount, stickers.length]);

  if (!team) {
    return (
      <View style={styles.notFound}>
        <EmptyState text={t.empty.noResults} icon="alert-circle" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
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
            all: t.filter.all,
            owned: t.filter.owned,
            missing: t.filter.missing,
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
                ? t.empty.noOwned
                : filter === 'missing'
                  ? t.empty.noMissing
                  : t.empty.noResults
            }
            icon={filter === 'missing' ? 'trophy' : 'sparkles'}
          />
        }
      />
      <ConfettiBurst active={confetti} />
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
