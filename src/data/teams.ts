import { Team } from './schema';

export const TEAMS: Team[] = [
  { code: 'MEX', name: 'México',       countryCode: 'MEX', group: 'A', seedOrder: 1 },
  { code: 'CRO', name: 'Croacia',      countryCode: 'CRO', group: 'A', seedOrder: 2 },
  { code: 'ECU', name: 'Ecuador',      countryCode: 'ECU', group: 'A', seedOrder: 3 },
  { code: 'PAR', name: 'Paraguay',     countryCode: 'PAR', group: 'A', seedOrder: 4 },

  { code: 'CAN', name: 'Canadá',       countryCode: 'CAN', group: 'B', seedOrder: 1 },
  { code: 'ITA', name: 'Italia',       countryCode: 'ITA', group: 'B', seedOrder: 2 },
  { code: 'IRN', name: 'Irán',         countryCode: 'IRN', group: 'B', seedOrder: 3 },
  { code: 'CRC', name: 'Costa Rica',   countryCode: 'CRC', group: 'B', seedOrder: 4 },

  { code: 'USA', name: 'Estados Unidos', countryCode: 'USA', group: 'C', seedOrder: 1 },
  { code: 'COL', name: 'Colombia',     countryCode: 'COL', group: 'C', seedOrder: 2 },
  { code: 'AUS', name: 'Australia',    countryCode: 'AUS', group: 'C', seedOrder: 3 },
  { code: 'PAN', name: 'Panamá',       countryCode: 'PAN', group: 'C', seedOrder: 4 },

  { code: 'ARG', name: 'Argentina',    countryCode: 'ARG', group: 'D', seedOrder: 1 },
  { code: 'URU', name: 'Uruguay',      countryCode: 'URU', group: 'D', seedOrder: 2 },
  { code: 'KSA', name: 'Arabia Saudí', countryCode: 'KSA', group: 'D', seedOrder: 3 },
  { code: 'JAM', name: 'Jamaica',      countryCode: 'JAM', group: 'D', seedOrder: 4 },

  { code: 'BRA', name: 'Brasil',       countryCode: 'BRA', group: 'E', seedOrder: 1 },
  { code: 'JPN', name: 'Japón',        countryCode: 'JPN', group: 'E', seedOrder: 2 },
  { code: 'UZB', name: 'Uzbekistán',   countryCode: 'UZB', group: 'E', seedOrder: 3 },
  { code: 'IRQ', name: 'Irak',         countryCode: 'IRQ', group: 'E', seedOrder: 4 },

  { code: 'FRA', name: 'Francia',      countryCode: 'FRA', group: 'F', seedOrder: 1 },
  { code: 'MAR', name: 'Marruecos',    countryCode: 'MAR', group: 'F', seedOrder: 2 },
  { code: 'NGA', name: 'Nigeria',      countryCode: 'NGA', group: 'F', seedOrder: 3 },
  { code: 'JOR', name: 'Jordania',     countryCode: 'JOR', group: 'F', seedOrder: 4 },

  { code: 'ENG', name: 'Inglaterra',   countryCode: 'ENG', group: 'G', seedOrder: 1 },
  { code: 'SUI', name: 'Suiza',        countryCode: 'SUI', group: 'G', seedOrder: 2 },
  { code: 'CIV', name: 'Costa de Marfil', countryCode: 'CIV', group: 'G', seedOrder: 3 },
  { code: 'SEN', name: 'Senegal',      countryCode: 'SEN', group: 'G', seedOrder: 4 },

  { code: 'ESP', name: 'España',       countryCode: 'ESP', group: 'H', seedOrder: 1 },
  { code: 'KOR', name: 'Corea del Sur', countryCode: 'KOR', group: 'H', seedOrder: 2 },
  { code: 'GHA', name: 'Ghana',        countryCode: 'GHA', group: 'H', seedOrder: 3 },
  { code: 'CMR', name: 'Camerún',      countryCode: 'CMR', group: 'H', seedOrder: 4 },

  { code: 'POR', name: 'Portugal',     countryCode: 'POR', group: 'I', seedOrder: 1 },
  { code: 'DEN', name: 'Dinamarca',    countryCode: 'DEN', group: 'I', seedOrder: 2 },
  { code: 'EGY', name: 'Egipto',       countryCode: 'EGY', group: 'I', seedOrder: 3 },
  { code: 'TUN', name: 'Túnez',        countryCode: 'TUN', group: 'I', seedOrder: 4 },

  { code: 'NED', name: 'Países Bajos', countryCode: 'NED', group: 'J', seedOrder: 1 },
  { code: 'POL', name: 'Polonia',      countryCode: 'POL', group: 'J', seedOrder: 2 },
  { code: 'ALG', name: 'Argelia',      countryCode: 'ALG', group: 'J', seedOrder: 3 },
  { code: 'NZL', name: 'Nueva Zelanda', countryCode: 'NZL', group: 'J', seedOrder: 4 },

  { code: 'GER', name: 'Alemania',     countryCode: 'GER', group: 'K', seedOrder: 1 },
  { code: 'AUT', name: 'Austria',      countryCode: 'AUT', group: 'K', seedOrder: 2 },
  { code: 'TUR', name: 'Turquía',      countryCode: 'TUR', group: 'K', seedOrder: 3 },
  { code: 'TBD1', name: 'Repechaje 1', countryCode: 'TBD1', group: 'K', seedOrder: 4 },

  { code: 'BEL', name: 'Bélgica',      countryCode: 'BEL', group: 'L', seedOrder: 1 },
  { code: 'NOR', name: 'Noruega',      countryCode: 'NOR', group: 'L', seedOrder: 2 },
  { code: 'CZE', name: 'Chequia',      countryCode: 'CZE', group: 'L', seedOrder: 3 },
  { code: 'TBD2', name: 'Repechaje 2', countryCode: 'TBD2', group: 'L', seedOrder: 4 },
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
