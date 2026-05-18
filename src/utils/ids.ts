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

export function teamEmblemCode(teamCode: string): string {
  return `${teamCode}0`;
}

export function teamLineupCode(teamCode: string): string {
  return `${teamCode}1`;
}

export function teamPlayerCode(teamCode: string, n: number): string {
  return `${teamCode}${n}`;
}
