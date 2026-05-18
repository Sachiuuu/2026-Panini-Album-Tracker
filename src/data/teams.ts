import { Team } from './schema';

export const TEAMS: Team[] = [
  { code: 'MEX', name: 'México',                  countryCode: 'MEX', group: 'A', seedOrder: 1 },
  { code: 'RSA', name: 'Sudáfrica',               countryCode: 'RSA', group: 'A', seedOrder: 2 },
  { code: 'KOR', name: 'República de Corea',      countryCode: 'KOR', group: 'A', seedOrder: 3 },
  { code: 'CZE', name: 'República Checa',         countryCode: 'CZE', group: 'A', seedOrder: 4 },

  { code: 'CAN', name: 'Canadá',                  countryCode: 'CAN', group: 'B', seedOrder: 1 },
  { code: 'BIH', name: 'Bosnia y Herzegovina',    countryCode: 'BIH', group: 'B', seedOrder: 2 },
  { code: 'QAT', name: 'Catar',                   countryCode: 'QAT', group: 'B', seedOrder: 3 },
  { code: 'SUI', name: 'Suiza',                   countryCode: 'SUI', group: 'B', seedOrder: 4 },

  { code: 'BRA', name: 'Brasil',                  countryCode: 'BRA', group: 'C', seedOrder: 1 },
  { code: 'MAR', name: 'Marruecos',               countryCode: 'MAR', group: 'C', seedOrder: 2 },
  { code: 'HAI', name: 'Haití',                   countryCode: 'HAI', group: 'C', seedOrder: 3 },
  { code: 'SCO', name: 'Escocia',                 countryCode: 'SCO', group: 'C', seedOrder: 4 },

  { code: 'USA', name: 'Estados Unidos',          countryCode: 'USA', group: 'D', seedOrder: 1 },
  { code: 'PAR', name: 'Paraguay',                countryCode: 'PAR', group: 'D', seedOrder: 2 },
  { code: 'AUS', name: 'Australia',               countryCode: 'AUS', group: 'D', seedOrder: 3 },
  { code: 'TUR', name: 'Turquía',                 countryCode: 'TUR', group: 'D', seedOrder: 4 },

  { code: 'GER', name: 'Alemania',                countryCode: 'GER', group: 'E', seedOrder: 1 },
  { code: 'CUR', name: 'Curazao',                 countryCode: 'CUR', group: 'E', seedOrder: 2 },
  { code: 'CIV', name: 'Costa de Marfil',         countryCode: 'CIV', group: 'E', seedOrder: 3 },
  { code: 'ECU', name: 'Ecuador',                 countryCode: 'ECU', group: 'E', seedOrder: 4 },

  { code: 'NED', name: 'Países Bajos',            countryCode: 'NED', group: 'F', seedOrder: 1 },
  { code: 'JPN', name: 'Japón',                   countryCode: 'JPN', group: 'F', seedOrder: 2 },
  { code: 'TUN', name: 'Túnez',                   countryCode: 'TUN', group: 'F', seedOrder: 3 },
  { code: 'SWE', name: 'Suecia',                  countryCode: 'SWE', group: 'F', seedOrder: 4 },

  { code: 'BEL', name: 'Bélgica',                 countryCode: 'BEL', group: 'G', seedOrder: 1 },
  { code: 'EGY', name: 'Egipto',                  countryCode: 'EGY', group: 'G', seedOrder: 2 },
  { code: 'IRN', name: 'Irán',                    countryCode: 'IRN', group: 'G', seedOrder: 3 },
  { code: 'NZL', name: 'Nueva Zelanda',           countryCode: 'NZL', group: 'G', seedOrder: 4 },

  { code: 'ESP', name: 'España',                  countryCode: 'ESP', group: 'H', seedOrder: 1 },
  { code: 'CPV', name: 'Cabo Verde',              countryCode: 'CPV', group: 'H', seedOrder: 2 },
  { code: 'KSA', name: 'Arabia Saudita',          countryCode: 'KSA', group: 'H', seedOrder: 3 },
  { code: 'URU', name: 'Uruguay',                 countryCode: 'URU', group: 'H', seedOrder: 4 },

  { code: 'FRA', name: 'Francia',                 countryCode: 'FRA', group: 'I', seedOrder: 1 },
  { code: 'SEN', name: 'Senegal',                 countryCode: 'SEN', group: 'I', seedOrder: 2 },
  { code: 'IRQ', name: 'Irak',                    countryCode: 'IRQ', group: 'I', seedOrder: 3 },
  { code: 'NOR', name: 'Noruega',                 countryCode: 'NOR', group: 'I', seedOrder: 4 },

  { code: 'ARG', name: 'Argentina',               countryCode: 'ARG', group: 'J', seedOrder: 1 },
  { code: 'ALG', name: 'Argelia',                 countryCode: 'ALG', group: 'J', seedOrder: 2 },
  { code: 'AUT', name: 'Austria',                 countryCode: 'AUT', group: 'J', seedOrder: 3 },
  { code: 'JOR', name: 'Jordania',                countryCode: 'JOR', group: 'J', seedOrder: 4 },

  { code: 'POR', name: 'Portugal',                countryCode: 'POR', group: 'K', seedOrder: 1 },
  { code: 'COD', name: 'República Democrática del Congo', countryCode: 'COD', group: 'K', seedOrder: 2 },
  { code: 'UZB', name: 'Uzbekistán',              countryCode: 'UZB', group: 'K', seedOrder: 3 },
  { code: 'COL', name: 'Colombia',                countryCode: 'COL', group: 'K', seedOrder: 4 },

  { code: 'ENG', name: 'Inglaterra',              countryCode: 'ENG', group: 'L', seedOrder: 1 },
  { code: 'CRO', name: 'Croacia',                 countryCode: 'CRO', group: 'L', seedOrder: 2 },
  { code: 'GHA', name: 'Ghana',                   countryCode: 'GHA', group: 'L', seedOrder: 3 },
  { code: 'PAN', name: 'Panamá',                  countryCode: 'PAN', group: 'L', seedOrder: 4 },
];

export function getTeam(code: string): Team | undefined {
  return TEAMS.find((t) => t.code === code);
}

export const TEAMS_BY_GROUP: Record<string, Team[]> = TEAMS.reduce((acc, team) => {
  const key = team.group;
  if (!acc[key]) acc[key] = [];
  acc[key].push(team);
  return acc;
}, {} as Record<string, Team[]>);

for (const key of Object.keys(TEAMS_BY_GROUP)) {
  TEAMS_BY_GROUP[key].sort((a, b) => a.seedOrder - b.seedOrder);
}
