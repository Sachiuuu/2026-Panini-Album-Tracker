export const ALBUM_SCHEMA_VERSION = 1 as const;

export type SectionKind = 'specials' | 'group' | 'cocacola';

export type GroupLetter =
  | 'A' | 'B' | 'C' | 'D'
  | 'E' | 'F' | 'G' | 'H'
  | 'I' | 'J' | 'K' | 'L';

export const GROUP_LETTERS: GroupLetter[] = [
  'A', 'B', 'C', 'D', 'E', 'F',
  'G', 'H', 'I', 'J', 'K', 'L',
];

export type StickerKind =
  | 'special'
  | 'emblem'
  | 'lineup'
  | 'player'
  | 'cocacola';

export interface Sticker {
  id: string;
  code: string;
  albumIndex: number;
  sectionId: string;
  kind: StickerKind;
  label?: string;
  teamCode?: string;
}

export interface Team {
  code: string;
  name: string;
  countryCode: string;
  group: GroupLetter | 'TBD';
  seedOrder: number;
  stickerCount?: number;
}

export interface Section {
  id: string;
  kind: SectionKind;
  title: string;
  stickers: Sticker[];
  teamCode?: string;
}

export interface Album {
  version: typeof ALBUM_SCHEMA_VERSION;
  sections: Section[];
  stickerById: Record<string, Sticker>;
  teamByCode: Record<string, Team>;
  totalStickers: number;
}

export const DEFAULT_TEAM_STICKERS = 20;
