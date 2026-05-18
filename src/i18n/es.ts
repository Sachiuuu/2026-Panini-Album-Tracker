export const es = {
  appName: 'Panini 2026 Tracker',

  tabs: {
    album: 'Álbum',
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
    title: 'Mi Álbum',
    sectionsHeader: 'Secciones',
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
    cover: 'Portada',
    intro: 'Introducción',
    stadiums: 'Estadios',
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
    teamsHeader: 'Equipos',
    stickersHeader: 'Láminas',
  },

  settings: {
    title: 'Ajustes',
    export: 'Exportar mi álbum',
    exportHint: 'Comparte un archivo .json con tu progreso.',
    import: 'Importar desde archivo',
    importHint: 'Carga un archivo .json desde otro dispositivo.',
    reset: 'Reiniciar el álbum',
    resetHint: 'Elimina todas las marcas. No se puede deshacer.',
    about: 'Acerca de',
    version: 'Versión',
    totalStickers: 'Láminas en el álbum',
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
} as const;

export type Strings = typeof es;
