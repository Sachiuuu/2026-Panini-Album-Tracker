import { es } from '../i18n/es';
import { makeStickerId, teamEmblemCode, teamLineupCode, teamPlayerCode } from '../utils/ids';
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
import { getStickerCountForTeam } from './stickerCounts';
import { TEAMS, TEAMS_BY_GROUP } from './teams';

function makeFlatSection(
  id: string,
  title: string,
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
  return { id, kind, title, stickers };
}

function makeGroupSection(letter: string, teams: Team[]): Section {
  const sectionId = `group-${letter}`;
  const title = `${es.section.group} ${letter}`;
  const stickers: Sticker[] = [];

  for (const team of teams) {
    const count = getStickerCountForTeam(team.code);
    const emblem = teamEmblemCode(team.code);
    const lineup = teamLineupCode(team.code);

    stickers.push({
      id: makeStickerId(sectionId, emblem),
      code: emblem,
      albumIndex: 0,
      sectionId,
      kind: 'emblem',
      teamCode: team.code,
      label: `${team.name} — Escudo`,
    });

    stickers.push({
      id: makeStickerId(sectionId, lineup),
      code: lineup,
      albumIndex: 0,
      sectionId,
      kind: 'lineup',
      teamCode: team.code,
      label: `${team.name} — Foto de equipo`,
    });

    for (let n = 2; n < count; n++) {
      const code = teamPlayerCode(team.code, n);
      stickers.push({
        id: makeStickerId(sectionId, code),
        code,
        albumIndex: 0,
        sectionId,
        kind: 'player',
        teamCode: team.code,
        label: `${team.name} — Jugador ${n - 1}`,
      });
    }
  }

  return { id: sectionId, kind: 'group', title, stickers };
}

function buildAlbum(): Album {
  const sections: Section[] = [];

  sections.push(
    makeFlatSection('specials', es.section.specials, 'specials', SPECIAL_STICKERS, 'special'),
  );

  for (const group of GROUPS) {
    const teams = TEAMS_BY_GROUP[group.letter] ?? [];
    sections.push(makeGroupSection(group.letter, teams));
  }

  sections.push(
    makeFlatSection('cocacola', es.section.cocacola, 'cocacola', COCACOLA_STICKERS, 'cocacola'),
  );

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
