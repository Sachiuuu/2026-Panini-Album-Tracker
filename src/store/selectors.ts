import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ALBUM } from '../data/album';
import { Section, Sticker } from '../data/schema';
import { pct } from '../utils/format';
import { useAlbumStore } from './useAlbumStore';

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
  return useAlbumStore((s) => s._hasHydrated);
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
