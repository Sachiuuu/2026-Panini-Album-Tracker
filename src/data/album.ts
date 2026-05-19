import {
  EMBLEM_INDEX,
  LINEUP_INDEX,
  makeStickerId,
  playerOrdinal,
  teamEmblemCode,
  teamLineupCode,
  teamPlayerCode,
  TEAM_STICKER_INDICES,
} from '../utils/ids';
import {
  ALBUM_SCHEMA_VERSION,
  Album,
  Section,
  Sticker,
  StickerKind,
  Team,
} from './schema';
import { GROUPS } from './groups';
import {
  COCACOLA_STICKERS,
  SPECIAL_STICKERS,
  SpecialStickerSeed,
} from './specialSections';
import { TEAMS, TEAMS_BY_GROUP } from './teams';

function makeFlatSection(
  id: string,
  kind: Section['kind'],
  seeds: SpecialStickerSeed[],
  stickerKind: StickerKind,
): Section {
  const stickers: Sticker[] = seeds.map((s) => ({
    id: makeStickerId(id, s.code),
    code: s.code,
    albumIndex: 0,
    sectionId: id,
    kind: stickerKind,
    label: s.label,
  }));
  return { id, kind, title: id, stickers };
}

function makeGroupSection(letter: string, teams: Team[]): Section {
  const sectionId = `group-${letter}`;
  const stickers: Sticker[] = [];

  for (const team of teams) {
    for (const n of TEAM_STICKER_INDICES) {
      let kind: StickerKind;
      let label: string;
      let code: string;
      if (n === EMBLEM_INDEX) {
        kind = 'emblem';
        code = teamEmblemCode(team.code);
        label = `${team.name} — Escudo`;
      } else if (n === LINEUP_INDEX) {
        kind = 'lineup';
        code = teamLineupCode(team.code);
        label = `${team.name} — Foto de equipo`;
      } else {
        kind = 'player';
        code = teamPlayerCode(team.code, n);
        label = `${team.name} — Jugador ${playerOrdinal(n)}`;
      }
      stickers.push({
        id: makeStickerId(sectionId, code),
        code,
        albumIndex: 0,
        sectionId,
        kind,
        teamCode: team.code,
        label,
      });
    }
  }

  return { id: sectionId, kind: 'group', title: sectionId, stickers };
}

function buildAlbum(): Album {
  const sections: Section[] = [];

  sections.push(makeFlatSection('specials', 'specials', SPECIAL_STICKERS, 'special'));

  for (const group of GROUPS) {
    const teams = TEAMS_BY_GROUP[group.letter] ?? [];
    sections.push(makeGroupSection(group.letter, teams));
  }

  sections.push(makeFlatSection('cocacola', 'cocacola', COCACOLA_STICKERS, 'cocacola'));

  let albumIndex = 0;
  const stickerById: Record<string, Sticker> = {};
  for (const section of sections) {
    for (const sticker of section.stickers) {
      sticker.albumIndex = albumIndex++;
      stickerById[sticker.id] = sticker;
    }
  }

  const teamByCode: Record<string, Team> = {};
  for (const team of TEAMS) teamByCode[team.code] = team;

  return {
    version: ALBUM_SCHEMA_VERSION,
    sections,
    stickerById,
    teamByCode,
    totalStickers: albumIndex,
  };
}

export const ALBUM: Album = buildAlbum();

export function getSection(id: string): Section | undefined {
  return ALBUM.sections.find((s) => s.id === id);
}

export function getTeamStickers(teamCode: string): Sticker[] {
  return Object.values(ALBUM.stickerById).filter((s) => s.teamCode === teamCode);
}
