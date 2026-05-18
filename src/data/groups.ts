import { GroupLetter, GROUP_LETTERS } from './schema';
import { es } from '../i18n/es';

export interface GroupInfo {
  letter: GroupLetter;
  title: string;
  sectionId: string;
}

export const GROUPS: GroupInfo[] = GROUP_LETTERS.map((letter) => ({
  letter,
  title: `${es.section.group} ${letter}`,
  sectionId: `group-${letter}`,
}));
