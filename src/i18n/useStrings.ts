import { useLocaleStore } from '../store/useLocaleStore';
import { en } from './en';
import { es, Strings } from './es';
import { fr } from './fr';

const STRINGS: Record<string, Strings> = { es, en, fr };

export function useStrings(): Strings {
  const locale = useLocaleStore((s) => s.locale);
  return STRINGS[locale] ?? es;
}
