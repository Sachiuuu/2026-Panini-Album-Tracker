export interface CountryStyle {
  primary: string;
  secondary: string;
  text: string;
  flagEmoji: string;
}

const TBD_STYLE: CountryStyle = {
  primary: '#4b5563',
  secondary: '#9ca3af',
  text: '#ffffff',
  flagEmoji: '🏳️',
};

export const COUNTRY_COLORS: Record<string, CountryStyle> = {
  // CONCACAF — hosts
  USA: { primary: '#3C3B6E', secondary: '#B22234', text: '#FFFFFF', flagEmoji: '🇺🇸' },
  MEX: { primary: '#006847', secondary: '#CE1126', text: '#FFFFFF', flagEmoji: '🇲🇽' },
  CAN: { primary: '#D52B1E', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇨🇦' },

  // CONCACAF — other qualifiers (likely)
  CRC: { primary: '#002B7F', secondary: '#CE1126', text: '#FFFFFF', flagEmoji: '🇨🇷' },
  PAN: { primary: '#005AA7', secondary: '#D21034', text: '#FFFFFF', flagEmoji: '🇵🇦' },
  JAM: { primary: '#009B3A', secondary: '#FED100', text: '#000000', flagEmoji: '🇯🇲' },
  HON: { primary: '#0073CF', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇭🇳' },
  HAI: { primary: '#00209F', secondary: '#D21034', text: '#FFFFFF', flagEmoji: '🇭🇹' },
  CUR: { primary: '#002B7F', secondary: '#F9E814', text: '#FFFFFF', flagEmoji: '🇨🇼' },

  // CONMEBOL
  ARG: { primary: '#75AADB', secondary: '#FFFFFF', text: '#0b1220', flagEmoji: '🇦🇷' },
  BRA: { primary: '#009C3B', secondary: '#FEDF00', text: '#0b1220', flagEmoji: '🇧🇷' },
  COL: { primary: '#FCD116', secondary: '#003893', text: '#0b1220', flagEmoji: '🇨🇴' },
  URU: { primary: '#0038A8', secondary: '#FCD116', text: '#FFFFFF', flagEmoji: '🇺🇾' },
  ECU: { primary: '#FFD100', secondary: '#003893', text: '#0b1220', flagEmoji: '🇪🇨' },
  PAR: { primary: '#D52B1E', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇵🇾' },
  BOL: { primary: '#D52B1E', secondary: '#F4E400', text: '#FFFFFF', flagEmoji: '🇧🇴' },
  VEN: { primary: '#FFCC00', secondary: '#CE1126', text: '#0b1220', flagEmoji: '🇻🇪' },
  CHI: { primary: '#D52B1E', secondary: '#0033A0', text: '#FFFFFF', flagEmoji: '🇨🇱' },
  PER: { primary: '#D91023', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇵🇪' },

  // UEFA
  ESP: { primary: '#AA151B', secondary: '#F1BF00', text: '#FFFFFF', flagEmoji: '🇪🇸' },
  FRA: { primary: '#0055A4', secondary: '#EF4135', text: '#FFFFFF', flagEmoji: '🇫🇷' },
  ENG: { primary: '#FFFFFF', secondary: '#CE1124', text: '#0b1220', flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  POR: { primary: '#006600', secondary: '#FF0000', text: '#FFFFFF', flagEmoji: '🇵🇹' },
  NED: { primary: '#FF6C00', secondary: '#21468B', text: '#FFFFFF', flagEmoji: '🇳🇱' },
  BEL: { primary: '#000000', secondary: '#FAE042', text: '#FFFFFF', flagEmoji: '🇧🇪' },
  GER: { primary: '#000000', secondary: '#DD0000', text: '#FFFFFF', flagEmoji: '🇩🇪' },
  ITA: { primary: '#0066CC', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇮🇹' },
  CRO: { primary: '#171796', secondary: '#FF0000', text: '#FFFFFF', flagEmoji: '🇭🇷' },
  SUI: { primary: '#D52B1E', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇨🇭' },
  AUT: { primary: '#ED2939', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇦🇹' },
  DEN: { primary: '#C8102E', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇩🇰' },
  NOR: { primary: '#BA0C2F', secondary: '#00205B', text: '#FFFFFF', flagEmoji: '🇳🇴' },
  TUR: { primary: '#E30A17', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇹🇷' },
  POL: { primary: '#FFFFFF', secondary: '#DC143C', text: '#0b1220', flagEmoji: '🇵🇱' },
  CZE: { primary: '#11457E', secondary: '#D7141A', text: '#FFFFFF', flagEmoji: '🇨🇿' },
  BIH: { primary: '#002395', secondary: '#FECB00', text: '#FFFFFF', flagEmoji: '🇧🇦' },
  SWE: { primary: '#006AA7', secondary: '#FECC00', text: '#FFFFFF', flagEmoji: '🇸🇪' },
  CPV: { primary: '#003893', secondary: '#CF2027', text: '#FFFFFF', flagEmoji: '🇨🇻' },
  COD: { primary: '#007FFF', secondary: '#F7D618', text: '#FFFFFF', flagEmoji: '🇨🇩' },
  SCO: { primary: '#0065BD', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  WAL: { primary: '#D30731', secondary: '#00AB39', text: '#FFFFFF', flagEmoji: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
  SRB: { primary: '#C6363C', secondary: '#0C4076', text: '#FFFFFF', flagEmoji: '🇷🇸' },
  UKR: { primary: '#005BBB', secondary: '#FFD500', text: '#FFFFFF', flagEmoji: '🇺🇦' },

  // AFC
  JPN: { primary: '#BC002D', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇯🇵' },
  KOR: { primary: '#003478', secondary: '#C60C30', text: '#FFFFFF', flagEmoji: '🇰🇷' },
  IRN: { primary: '#239F40', secondary: '#DA0000', text: '#FFFFFF', flagEmoji: '🇮🇷' },
  AUS: { primary: '#00843D', secondary: '#FFCD00', text: '#FFFFFF', flagEmoji: '🇦🇺' },
  KSA: { primary: '#006C35', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇸🇦' },
  UZB: { primary: '#0099B5', secondary: '#1EB53A', text: '#FFFFFF', flagEmoji: '🇺🇿' },
  IRQ: { primary: '#CE1126', secondary: '#000000', text: '#FFFFFF', flagEmoji: '🇮🇶' },
  QAT: { primary: '#8A1538', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇶🇦' },
  JOR: { primary: '#007A3D', secondary: '#CE1126', text: '#FFFFFF', flagEmoji: '🇯🇴' },

  // CAF
  MAR: { primary: '#C1272D', secondary: '#006233', text: '#FFFFFF', flagEmoji: '🇲🇦' },
  EGY: { primary: '#CE1126', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇪🇬' },
  ALG: { primary: '#006233', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇩🇿' },
  TUN: { primary: '#E70013', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇹🇳' },
  SEN: { primary: '#00853F', secondary: '#FDEF42', text: '#FFFFFF', flagEmoji: '🇸🇳' },
  NGA: { primary: '#008753', secondary: '#FFFFFF', text: '#FFFFFF', flagEmoji: '🇳🇬' },
  CIV: { primary: '#FF8200', secondary: '#009E60', text: '#FFFFFF', flagEmoji: '🇨🇮' },
  CMR: { primary: '#007A5E', secondary: '#FCD116', text: '#FFFFFF', flagEmoji: '🇨🇲' },
  GHA: { primary: '#CE1126', secondary: '#FCD116', text: '#FFFFFF', flagEmoji: '🇬🇭' },
  RSA: { primary: '#007A4D', secondary: '#FFB612', text: '#FFFFFF', flagEmoji: '🇿🇦' },

  // OFC
  NZL: { primary: '#00247D', secondary: '#CC142B', text: '#FFFFFF', flagEmoji: '🇳🇿' },

  // Playoff placeholders
  TBD1: TBD_STYLE,
  TBD2: TBD_STYLE,
};

export function getCountryStyle(code: string): CountryStyle {
  return COUNTRY_COLORS[code] ?? TBD_STYLE;
}
