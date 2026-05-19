import { GroupLetter, GROUP_LETTERS } from './schema';

export interface GroupInfo {
  letter: GroupLetter;
  sectionId: string;
}

export const GROUPS: GroupInfo[] = GROUP_LETTERS.map((letter) => ({
  letter,
  sectionId: `group-${letter}`,
}));
