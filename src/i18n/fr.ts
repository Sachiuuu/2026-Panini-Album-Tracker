import { Strings } from './es';

export const fr: Strings = {
  appName: 'WC 2026 Sticker Tracker',

  tabs: {
    album: 'Accueil',
    search: 'Rechercher',
    settings: 'Paramètres',
  },

  onboarding: {
    title: 'Bienvenue !',
    subtitle: 'Suivez votre album de stickers FIFA Coupe du Monde 2026 (USA · Mexique · Canada).',
    bullets: [
      'Marquez les stickers que vous avez déjà.',
      'Recherchez par pays ou par code (ex. MEX5).',
      'Filtrez ceux qui vous manquent.',
      'Exportez vos progrès pour les utiliser sur un autre téléphone.',
    ],
    cta: 'Commencer',
  },

  home: {
    title: 'WC 2026 Sticker Tracker',
    sectionsHeader: 'Sections',
    stats: {
      collected: 'Obtenus',
      missing: 'Manquants',
      emblems: 'Écussons',
      lineups: "Photos d'équipe",
      top5: 'Top 5 les plus complets',
      bottom5: 'Top 5 les moins complets',
      of: 'sur',
    },
  },

  section: {
    specials: 'Spéciaux',
    cocacola: 'Coca-Cola',
    group: 'Groupe',
    teamsInGroup: "Équipes du groupe",
  },

  filter: {
    all: 'Tous',
    owned: "J'ai",
    missing: 'Manquants',
  },

  search: {
    placeholder: 'Rechercher un pays ou un code (ex. MEX5)',
    noResults: 'Aucun résultat',
    typeToSearch: 'Tapez un nom de pays ou un code de sticker.',
    teamsHeader: 'Équipes',
    stickersHeader: 'Stickers',
  },

  settings: {
    title: 'Paramètres',
    language: 'Langue',
    export: 'Exporter mon album',
    exportHint: 'Partagez un fichier .json avec vos progrès.',
    import: 'Importer depuis un fichier',
    importHint: "Chargez un fichier .json depuis un autre appareil.",
    reset: "Réinitialiser l'album",
    resetHint: 'Supprime toutes les marques. Irréversible.',
    about: 'À propos',
    version: 'Version',
    totalStickers: "Stickers dans l'album",
    developer: 'Développeur',
  },

  importDialog: {
    title: 'Importer les progrès',
    message: 'Voulez-vous remplacer vos progrès actuels ou les combiner avec les données importées ?',
    replace: 'Remplacer',
    merge: 'Combiner',
    cancel: 'Annuler',
    successReplace: 'Progrès remplacés.',
    successMerge: 'Progrès combinés.',
    errorTitle: "Impossible d'importer",
    invalidFile: "Le fichier n'est pas valide.",
    versionTooNew: "Ce fichier provient d'une version plus récente. Veuillez mettre à jour l'application.",
  },

  resetDialog: {
    title: "Réinitialiser l'album",
    message: 'Êtes-vous sûr ? Toutes les marques seront supprimées.',
    confirm: 'Oui, réinitialiser',
    cancel: 'Annuler',
  },

  exportDialog: {
    errorTitle: "Impossible d'exporter",
    unavailable: "Le partage n'est pas disponible sur cet appareil.",
  },

  empty: {
    noOwned: "Vous n'avez pas encore marqué de stickers dans cette section.",
    noMissing: 'Vous avez complété cette section ! 🏆',
    noResults: 'Aucun résultat.',
  },

  common: {
    loading: 'Chargement…',
    percent: (v: number) => `${Math.round(v * 100)}%`,
    fraction: (owned: number, total: number) => `${owned}/${total}`,
    complete: 'complet',
  },

  teamNames: {
    MEX: 'Mexique',        RSA: 'Afrique du Sud',         KOR: 'Corée du Sud',
    CZE: 'Rép. tchèque',   CAN: 'Canada',                 BIH: 'Bosnie-Herzégovine',
    QAT: 'Qatar',          SUI: 'Suisse',                 BRA: 'Brésil',
    MAR: 'Maroc',          HAI: 'Haïti',                  SCO: 'Écosse',
    USA: 'États-Unis',     PAR: 'Paraguay',               AUS: 'Australie',
    TUR: 'Turquie',        GER: 'Allemagne',              CUR: 'Curaçao',
    CIV: "Côte d'Ivoire",  ECU: 'Équateur',               NED: 'Pays-Bas',
    JPN: 'Japon',          TUN: 'Tunisie',                SWE: 'Suède',
    BEL: 'Belgique',       EGY: 'Égypte',                 IRN: 'Iran',
    NZL: 'Nouvelle-Zélande', ESP: 'Espagne',              CPV: 'Cap-Vert',
    KSA: 'Arabie saoudite', URU: 'Uruguay',               FRA: 'France',
    SEN: 'Sénégal',        IRQ: 'Irak',                   NOR: 'Norvège',
    ARG: 'Argentine',      ALG: 'Algérie',                AUT: 'Autriche',
    JOR: 'Jordanie',       POR: 'Portugal',               COD: 'RD Congo',
    UZB: 'Ouzbékistan',    COL: 'Colombie',               ENG: 'Angleterre',
    CRO: 'Croatie',        GHA: 'Ghana',                  PAN: 'Panama',
  },
};
