import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { PanResponder, Pressable, StyleSheet, Text, View } from 'react-native';
import { ConfettiBurst } from '../../src/components/ConfettiBurst';
import { EmptyState } from '../../src/components/EmptyState';
import { FilterMode, FilterSegmented } from '../../src/components/FilterSegmented';
import { StickerGrid } from '../../src/components/StickerGrid';
import { TeamHeader } from '../../src/components/TeamHeader';
import { ALBUM, getTeamStickers } from '../../src/data/album';
import { Sticker } from '../../src/data/schema';
import { TEAMS_BY_GROUP } from '../../src/data/teams';
import { useStrings } from '../../src/i18n/useStrings';
import { useAlbumStore } from '../../src/store/useAlbumStore';
import { useUIStore } from '../../src/store/useUIStore';
import { colors } from '../../src/theme/colors';
import { fonts, spacing } from '../../src/theme/typography';
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

const SWIPE_THRESHOLD = 50;

export default function TeamScreen() {
  const t = useStrings();
  const router = useRouter();
  const { code } = useLocalSearchParams<{ code: string }>();
  const teamCode = code ?? '';
  const team = ALBUM.teamByCode[teamCode];
  const stickers = useMemo(() => getTeamStickers(teamCode), [teamCode]);
  const owned = useAlbumStore((s) => s.owned);
  const filter = useUIStore((s) => s.stickerFilter);
  const setFilter = useUIStore((s) => s.setStickerFilter);
  const [confetti, setConfetti] = useState(false);

  const { prevTeam, nextTeam } = useMemo(() => {
    if (!team || team.group === 'TBD') return { prevTeam: null, nextTeam: null };
    const siblings = TEAMS_BY_GROUP[team.group] ?? [];
    const idx = siblings.findIndex((s) => s.code === teamCode);
    return {
      prevTeam: idx > 0 ? siblings[idx - 1] : null,
      nextTeam: idx < siblings.length - 1 ? siblings[idx + 1] : null,
    };
  }, [team, teamCode]);

  // Refs so the PanResponder callback always sees the latest values without recreating it
  const prevTeamRef = useRef(prevTeam);
  const nextTeamRef = useRef(nextTeam);
  prevTeamRef.current = prevTeam;
  nextTeamRef.current = nextTeam;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > 10 && Math.abs(gs.dx) > Math.abs(gs.dy),
      onPanResponderRelease: (_, gs) => {
        if (gs.dx > SWIPE_THRESHOLD && prevTeamRef.current) {
          router.replace(`/team/${prevTeamRef.current.code}`);
        } else if (gs.dx < -SWIPE_THRESHOLD && nextTeamRef.current) {
          router.replace(`/team/${nextTeamRef.current.code}`);
        }
      },
    }),
  ).current;

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
    <View style={styles.screen} {...panResponder.panHandlers}>
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
      {(prevTeam || nextTeam) && (
        <View style={styles.navBar}>
          {prevTeam ? (
            <Pressable
              style={styles.navBtn}
              onPress={() => router.replace(`/team/${prevTeam.code}`)}
            >
              <Ionicons name="chevron-back" size={16} color={colors.textMuted} />
              <Text style={styles.navText} numberOfLines={1}>
                {prevTeam.name}
              </Text>
            </Pressable>
          ) : (
            <View style={styles.navSpacer} />
          )}
          {nextTeam ? (
            <Pressable
              style={[styles.navBtn, styles.navBtnRight]}
              onPress={() => router.replace(`/team/${nextTeam.code}`)}
            >
              <Text style={styles.navText} numberOfLines={1}>
                {nextTeam.name}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
            </Pressable>
          ) : (
            <View style={styles.navSpacer} />
          )}
        </View>
      )}
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
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '47%',
    paddingVertical: spacing.xs,
  },
  navBtnRight: {
    justifyContent: 'flex-end',
  },
  navSpacer: {
    flex: 1,
  },
  navText: {
    color: colors.textMuted,
    fontSize: 13,
    fontFamily: fonts.regular,
    marginHorizontal: 2,
  },
});
