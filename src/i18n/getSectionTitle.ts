import { Section } from '../data/schema';
import { Strings } from './es';

export function getSectionTitle(
  section: Pick<Section, 'id' | 'kind'>,
  strings: Strings,
): string {
  if (section.kind === 'specials') return strings.section.specials;
  if (section.kind === 'cocacola') return strings.section.cocacola;
  if (section.kind === 'group') {
    const letter = section.id.replace('group-', '');
    return `${strings.section.group} ${letter}`;
  }
  return section.id;
}
