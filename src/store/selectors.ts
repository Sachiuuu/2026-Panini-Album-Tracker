import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ALBUM } from '../data/album';
import { Section, Sticker, StickerKind, Team } from '../data/schema';
import { TEAMS } from '../data/teams';
import { pct } from '../utils/format';
import { useAlbumStore } from './useAlbumStore';
import { useLocaleStore } from './useLocaleStore';

export interface ProgressInfo {
  owned: number;
  total: number;
  missing: number;
  pct: number;
}

function countOwned(stickers: Sticker[], owned: Record<string, true>): number {
  let n = 0;
  for (const s of stickers) if (owned[s.id]) n++;
  return n;
}

function toProgress(ownedCount: number, total: number): ProgressInfo {
  return {
    owned: ownedCount,
    total,
    missing: Math.max(0, total - ownedCount),
    pct: pct(ownedCount, total),
  };
}

export function useGlobalProgress(): ProgressInfo {
  const owned = useAlbumStore((s) => s.owned);
  return useMemo(() => {
    const total = ALBUM.totalStickers;
    let n = 0;
    for (const id of Object.keys(owned)) if (ALBUM.stickerById[id]) n++;
    return toProgress(n, total);
  }, [owned]);
}

export function useSectionProgress(sectionId: string): ProgressInfo {
  const owned = useAlbumStore((s) => s.owned);
  return useMemo(() => {
    const section: Section | undefined = ALBUM.sections.find((s) => s.id === sectionId);
    if (!section) return toProgress(0, 0);
    return toProgress(countOwned(section.stickers, owned), section.stickers.length);
  }, [owned, sectionId]);
}

export function useStickerOwned(id: string): boolean {
  return useAlbumStore((s) => !!s.owned[id]);
}

export function useHydrated(): boolean {
  const albumReady = useAlbumStore((s) => s._hasHydrated);
  const localeReady = useLocaleStore((s) => s._hasHydrated);
  return albumReady && localeReady;
}

export function useOnboarded(): boolean {
  return useAlbumStore((s) => s.hasOnboarded);
}

export const useAlbumActions = () =>
  useAlbumStore(
    useShallow((s) => ({
      toggleOwned: s.toggleOwned,
      setOwned: s.setOwned,
      markOnboarded: s.markOnboarded,
      resetAll: s.resetAll,
      replaceOwned: s.replaceOwned,
      mergeOwned: s.mergeOwned,
    })),
  );

const STICKERS_BY_KIND: Record<StickerKind, Sticker[]> = (() => {
  const map: Record<StickerKind, Sticker[]> = {
    special: [], emblem: [], lineup: [], player: [], cocacola: [],
  };
  for (const sticker of Object.values(ALBUM.stickerById)) {
    map[sticker.kind].push(sticker);
  }
  return map;
})();

const STICKERS_BY_TEAM: Record<string, Sticker[]> = (() => {
  const map: Record<string, Sticker[]> = {};
  for (const team of TEAMS) map[team.code] = [];
  for (const sticker of Object.values(ALBUM.stickerById)) {
    if (sticker.teamCode && map[sticker.teamCode]) {
      map[sticker.teamCode].push(sticker);
    }
  }
  return map;
})();

export function useCountByKind(kind: StickerKind): ProgressInfo {
  const owned = useAlbumStore((s) => s.owned);
  return useMemo(() => {
    const list = STICKERS_BY_KIND[kind];
    return toProgress(countOwned(list, owned), list.length);
  }, [owned, kind]);
}

export interface TeamStanding {
  team: Team;
  owned: number;
  total: number;
  pct: number;
}

export function useTeamStandings(): TeamStanding[] {
  const owned = useAlbumStore((s) => s.owned);
  return useMemo(() => {
    const rows: TeamStanding[] = TEAMS.map((team) => {
      const list = STICKERS_BY_TEAM[team.code] ?? [];
      const ownedCount = countOwned(list, owned);
      return {
        team,
        owned: ownedCount,
        total: list.length,
        pct: pct(ownedCount, list.length),
      };
    });
    return rows;
  }, [owned]);
}

export function useTopTeams(n = 5): TeamStanding[] {
  const standings = useTeamStandings();
  return useMemo(() => {
    return [...standings]
      .sort((a, b) => {
        if (b.pct !== a.pct) return b.pct - a.pct;
        if (b.owned !== a.owned) return b.owned - a.owned;
        return a.team.name.localeCompare(b.team.name, 'es');
      })
      .slice(0, n);
  }, [standings, n]);
}

export function useBottomTeams(n = 5): TeamStanding[] {
  const standings = useTeamStandings();
  return useMemo(() => {
    return [...standings]
      .sort((a, b) => {
        if (a.pct !== b.pct) return a.pct - b.pct;
        if (a.owned !== b.owned) return a.owned - b.owned;
        return a.team.name.localeCompare(b.team.name, 'es');
      })
      .slice(0, n);
  }, [standings, n]);
}
