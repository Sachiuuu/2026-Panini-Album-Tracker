export interface CountryStyle {
  primary: string;
  secondary: string;
  text: string;
  iso2: string;
}

const TBD_STYLE: CountryStyle = {
  primary: '#4b5563',
  secondary: '#9ca3af',
  text: '#ffffff',
  iso2: '',
};

export const COUNTRY_COLORS: Record<string, CountryStyle> = {
  // Grupo A
  MEX: { primary: '#006847', secondary: '#CE1126', text: '#FFFFFF', iso2: 'MX' },
  RSA: { primary: '#007A4D', secondary: '#FFB612', text: '#FFFFFF', iso2: 'ZA' },
  KOR: { primary: '#003478', secondary: '#C60C30', text: '#FFFFFF', iso2: 'KR' },
  CZE: { primary: '#11457E', secondary: '#D7141A', text: '#FFFFFF', iso2: 'CZ' },

  // Grupo B
  CAN: { primary: '#D52B1E', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'CA' },
  BIH: { primary: '#002395', secondary: '#FECB00', text: '#FFFFFF', iso2: 'BA' },
  QAT: { primary: '#8A1538', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'QA' },
  SUI: { primary: '#D52B1E', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'CH' },

  // Grupo C
  BRA: { primary: '#009C3B', secondary: '#FEDF00', text: '#0b1220', iso2: 'BR' },
  MAR: { primary: '#C1272D', secondary: '#006233', text: '#FFFFFF', iso2: 'MA' },
  HAI: { primary: '#00209F', secondary: '#D21034', text: '#FFFFFF', iso2: 'HT' },
  SCO: { primary: '#0065BD', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'GB-SCT' },

  // Grupo D
  USA: { primary: '#3C3B6E', secondary: '#B22234', text: '#FFFFFF', iso2: 'US' },
  PAR: { primary: '#D52B1E', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'PY' },
  AUS: { primary: '#00843D', secondary: '#FFCD00', text: '#FFFFFF', iso2: 'AU' },
  TUR: { primary: '#E30A17', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'TR' },

  // Grupo E
  GER: { primary: '#000000', secondary: '#DD0000', text: '#FFFFFF', iso2: 'DE' },
  CUR: { primary: '#002B7F', secondary: '#F9E814', text: '#FFFFFF', iso2: 'CW' },
  CIV: { primary: '#FF8200', secondary: '#009E60', text: '#FFFFFF', iso2: 'CI' },
  ECU: { primary: '#FFD100', secondary: '#003893', text: '#0b1220', iso2: 'EC' },

  // Grupo F
  NED: { primary: '#FF6C00', secondary: '#21468B', text: '#FFFFFF', iso2: 'NL' },
  JPN: { primary: '#BC002D', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'JP' },
  TUN: { primary: '#E70013', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'TN' },
  SWE: { primary: '#006AA7', secondary: '#FECC00', text: '#FFFFFF', iso2: 'SE' },

  // Grupo G
  BEL: { primary: '#000000', secondary: '#FAE042', text: '#FFFFFF', iso2: 'BE' },
  EGY: { primary: '#CE1126', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'EG' },
  IRN: { primary: '#239F40', secondary: '#DA0000', text: '#FFFFFF', iso2: 'IR' },
  NZL: { primary: '#00247D', secondary: '#CC142B', text: '#FFFFFF', iso2: 'NZ' },

  // Grupo H
  ESP: { primary: '#AA151B', secondary: '#F1BF00', text: '#FFFFFF', iso2: 'ES' },
  CPV: { primary: '#003893', secondary: '#CF2027', text: '#FFFFFF', iso2: 'CV' },
  KSA: { primary: '#006C35', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'SA' },
  URU: { primary: '#0038A8', secondary: '#FCD116', text: '#FFFFFF', iso2: 'UY' },

  // Grupo I
  FRA: { primary: '#0055A4', secondary: '#EF4135', text: '#FFFFFF', iso2: 'FR' },
  SEN: { primary: '#00853F', secondary: '#FDEF42', text: '#FFFFFF', iso2: 'SN' },
  IRQ: { primary: '#CE1126', secondary: '#000000', text: '#FFFFFF', iso2: 'IQ' },
  NOR: { primary: '#BA0C2F', secondary: '#00205B', text: '#FFFFFF', iso2: 'NO' },

  // Grupo J
  ARG: { primary: '#75AADB', secondary: '#FFFFFF', text: '#0b1220', iso2: 'AR' },
  ALG: { primary: '#006233', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'DZ' },
  AUT: { primary: '#ED2939', secondary: '#FFFFFF', text: '#FFFFFF', iso2: 'AT' },
  JOR: { primary: '#007A3D', secondary: '#CE1126', text: '#FFFFFF', iso2: 'JO' },

  // Grupo K
  POR: { primary: '#006600', secondary: '#FF0000', text: '#FFFFFF', iso2: 'PT' },
  COD: { primary: '#007FFF', secondary: '#F7D618', text: '#FFFFFF', iso2: 'CD' },
  UZB: { primary: '#0099B5', secondary: '#1EB53A', text: '#FFFFFF', iso2: 'UZ' },
  COL: { primary: '#FCD116', secondary: '#003893', text: '#0b1220', iso2: 'CO' },

  // Grupo L
  ENG: { primary: '#FFFFFF', secondary: '#CE1124', text: '#0b1220', iso2: 'GB-ENG' },
  CRO: { primary: '#171796', secondary: '#FF0000', text: '#FFFFFF', iso2: 'HR' },
  GHA: { primary: '#CE1126', secondary: '#FCD116', text: '#FFFFFF', iso2: 'GH' },
  PAN: { primary: '#005AA7', secondary: '#D21034', text: '#FFFFFF', iso2: 'PA' },
};

export function getCountryStyle(code: string): CountryStyle {
  return COUNTRY_COLORS[code] ?? TBD_STYLE;
}
