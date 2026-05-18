import {
  AR, AT, AU, BA, BE, BR, CA, CD, CH, CI,
  CO, CV, CW, CZ, DE, DZ, EC, EG, ES, FR,
  GB_ENG, GB_SCT, GH, HR, HT, IQ, IR, JO, JP, KR,
  MA, MX, NL, NO, NZ, PA, PT, PY, QA, SA,
  SE, SN, TN, TR, US, UY, UZ, ZA,
} from 'country-flag-icons/string/3x2';

export const FLAG_SVGS: Record<string, string> = {
  AR, AT, AU, BA, BE, BR, CA, CD, CH, CI,
  CO, CV, CW, CZ, DE, DZ, EC, EG, ES, FR,
  'GB-ENG': GB_ENG,
  'GB-SCT': GB_SCT,
  GH, HR, HT, IQ, IR, JO, JP, KR,
  MA, MX, NL, NO, NZ, PA, PT, PY, QA, SA,
  SE, SN, TN, TR, US, UY, UZ, ZA,
};

export function getFlagSvg(iso2: string | undefined): string | undefined {
  if (!iso2) return undefined;
  return FLAG_SVGS[iso2];
}
