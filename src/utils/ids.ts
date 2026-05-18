export function makeStickerId(sectionId: string, code: string): string {
  return `${sectionId}:${code}`;
}

export function makeGroupSectionId(letter: string): string {
  return `group-${letter}`;
}

export const SECTION_IDS = {
  specials: 'specials',
  cocacola: 'cocacola',
} as const;

// Official Panini per-team sticker layout (20 láminas):
//   1     → escudo (emblem)
//   2-12  → jugadores 1-11
//   13    → foto de equipo (lineup)
//   14-20 → jugadores 12-18
export const EMBLEM_INDEX = 1;
export const LINEUP_INDEX = 13;
export const TEAM_STICKER_INDICES = [
  1,
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  13,
  14, 15, 16, 17, 18, 19, 20,
];

export function teamEmblemCode(teamCode: string): string {
  return `${teamCode}${EMBLEM_INDEX}`;
}

export function teamLineupCode(teamCode: string): string {
  return `${teamCode}${LINEUP_INDEX}`;
}

export function teamPlayerCode(teamCode: string, n: number): string {
  return `${teamCode}${n}`;
}

/**
 * Returns the label suffix for a player at album position `n`:
 * codes 2-12 are players 1-11, codes 14-20 are players 12-18.
 */
export function playerOrdinal(n: number): number {
  if (n >= 2 && n <= 12) return n - 1;
  if (n >= 14 && n <= 20) return n - 2;
  return n;
}
