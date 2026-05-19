export interface Strings {
  appName: string;
  tabs: { album: string; search: string; settings: string };
  onboarding: {
    title: string;
    subtitle: string;
    bullets: string[];
    cta: string;
  };
  home: {
    title: string;
    sectionsHeader: string;
    motivationLines: string[];
    stats: {
      collected: string;
      missing: string;
      emblems: string;
      lineups: string;
      top5: string;
      bottom5: string;
      of: string;
    };
  };
  section: {
    specials: string;
    cocacola: string;
    group: string;
    teamsInGroup: string;
  };
  filter: { all: string; owned: string; missing: string };
  search: {
    placeholder: string;
    noResults: string;
    typeToSearch: string;
    browseGroups: string;
    teamsHeader: string;
    stickersHeader: string;
  };
  settings: {
    title: string;
    language: string;
    export: string;
    exportHint: string;
    import: string;
    importHint: string;
    reset: string;
    resetHint: string;
    about: string;
    version: string;
    totalStickers: string;
    developer: string;
  };
  importDialog: {
    title: string;
    message: string;
    replace: string;
    merge: string;
    cancel: string;
    successReplace: string;
    successMerge: string;
    errorTitle: string;
    invalidFile: string;
    versionTooNew: string;
  };
  resetDialog: {
    title: string;
    message: string;
    confirm: string;
    cancel: string;
  };
  exportDialog: { errorTitle: string; unavailable: string };
  empty: { noOwned: string; noMissing: string; noResults: string };
  common: {
    loading: string;
    percent: (v: number) => string;
    fraction: (owned: number, total: number) => string;
    complete: string;
  };
  teamNames: Record<string, string>;
}

export const es: Strings = {
  appName: 'WC 2026 Sticker Tracker',

  tabs: {
    album: 'Inicio',
    search: 'Buscar',
    settings: 'Ajustes',
  },

  onboarding: {
    title: '¡Bienvenido!',
    subtitle: 'Lleva el control de tu álbum del Mundial 2026 (USA · México · Canadá).',
    bullets: [
      'Marca las láminas que ya tienes.',
      'Busca por país o por código (ej. MEX5).',
      'Filtra por las que te faltan.',
      'Exporta tu progreso para usarlo en otro celular.',
    ],
    cta: 'Empezar',
  },

  home: {
    title: 'WC 2026 Sticker Tracker',
    sectionsHeader: 'Secciones',
    motivationLines: [
      'Tu álbum está vacío. ¡Empieza a pegar!',
      '¡Buen comienzo! Sigue así.',
      'Ya llevas más del 10 %. ¡Sigue!',
      'Casi a la mitad. ¡No pares!',
      'Ya pasaste el ecuador. ¡Casi!',
      '¡Qué cerca! Te faltan muy pocas.',
      '¡Álbum completo! ¡Eres un campeón!',
    ],
    stats: {
      collected: 'Obtenidas',
      missing: 'Faltan',
      emblems: 'Escudos',
      lineups: 'Fotos de equipo',
      top5: 'Top 5 más completas',
      bottom5: 'Top 5 menos completas',
      of: 'de',
    },
  },

  section: {
    specials: 'Especiales',
    cocacola: 'Coca-Cola',
    group: 'Grupo',
    teamsInGroup: 'Equipos del grupo',
  },

  filter: {
    all: 'Todos',
    owned: 'Tengo',
    missing: 'Faltan',
  },

  search: {
    placeholder: 'Buscar país o código (ej. MEX5)',
    noResults: 'Sin resultados',
    typeToSearch: 'Escribe el nombre del país o el código de una lámina.',
    browseGroups: 'Explorar por grupo',
    teamsHeader: 'Equipos',
    stickersHeader: 'Láminas',
  },

  settings: {
    title: 'Ajustes',
    language: 'Idioma',
    export: 'Exportar mi álbum',
    exportHint: 'Comparte un archivo .json con tu progreso.',
    import: 'Importar desde archivo',
    importHint: 'Carga un archivo .json desde otro dispositivo.',
    reset: 'Reiniciar el álbum',
    resetHint: 'Elimina todas las marcas. No se puede deshacer.',
    about: 'Acerca de',
    version: 'Versión',
    totalStickers: 'Láminas en el álbum',
    developer: 'Desarrollador',
  },

  importDialog: {
    title: 'Importar progreso',
    message: '¿Quieres reemplazar tu progreso actual o combinarlo con lo importado?',
    replace: 'Reemplazar',
    merge: 'Combinar',
    cancel: 'Cancelar',
    successReplace: 'Progreso reemplazado.',
    successMerge: 'Progreso combinado.',
    errorTitle: 'No se pudo importar',
    invalidFile: 'El archivo no es válido.',
    versionTooNew: 'Este archivo es de una versión más nueva. Actualiza la app.',
  },

  resetDialog: {
    title: 'Reiniciar el álbum',
    message: '¿Seguro? Se borrarán todas las láminas marcadas.',
    confirm: 'Sí, reiniciar',
    cancel: 'Cancelar',
  },

  exportDialog: {
    errorTitle: 'No se pudo exportar',
    unavailable: 'No es posible compartir desde este dispositivo.',
  },

  empty: {
    noOwned: 'Todavía no marcaste láminas en esta sección.',
    noMissing: '¡Completaste esta sección! 🏆',
    noResults: 'No hay resultados.',
  },

  common: {
    loading: 'Cargando…',
    percent: (v: number) => `${Math.round(v * 100)}%`,
    fraction: (owned: number, total: number) => `${owned}/${total}`,
    complete: 'completo',
  },

  teamNames: {
    MEX: 'México',         RSA: 'Sudáfrica',              KOR: 'República de Corea',
    CZE: 'República Checa', CAN: 'Canadá',                BIH: 'Bosnia y Herzegovina',
    QAT: 'Catar',          SUI: 'Suiza',                  BRA: 'Brasil',
    MAR: 'Marruecos',      HAI: 'Haití',                  SCO: 'Escocia',
    USA: 'Estados Unidos', PAR: 'Paraguay',               AUS: 'Australia',
    TUR: 'Turquía',        GER: 'Alemania',               CUR: 'Curazao',
    CIV: 'Costa de Marfil', ECU: 'Ecuador',               NED: 'Países Bajos',
    JPN: 'Japón',          TUN: 'Túnez',                  SWE: 'Suecia',
    BEL: 'Bélgica',        EGY: 'Egipto',                 IRN: 'Irán',
    NZL: 'Nueva Zelanda',  ESP: 'España',                 CPV: 'Cabo Verde',
    KSA: 'Arabia Saudita', URU: 'Uruguay',                FRA: 'Francia',
    SEN: 'Senegal',        IRQ: 'Irak',                   NOR: 'Noruega',
    ARG: 'Argentina',      ALG: 'Argelia',                AUT: 'Austria',
    JOR: 'Jordania',       POR: 'Portugal',               COD: 'R.D. Congo',
    UZB: 'Uzbekistán',     COL: 'Colombia',               ENG: 'Inglaterra',
    CRO: 'Croacia',        GHA: 'Ghana',                  PAN: 'Panamá',
  },
};
